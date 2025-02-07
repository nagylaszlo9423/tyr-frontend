<template>
  <div id="navigation-drawer" class="d-flex" :class="{'navigation-drawer-open': isOpen}">
    <v-touch class="swipe-zone" @swiperight="isOpen = true" @swipeleft="isOpen = false"
             :class="{'navigation-drawer-open': isOpen}">
      <nav class="navbar navbar-brand">
        <ul class="navbar-nav mr-auto">
          <li v-for="item in items" class="nav-item t-fade" :class="{'t-fade-away': !isOpen && item.hidden}">
            <router-link :to="item.to" v-on:click.native="setActive(item.name)"
                         :class="{active: isActive(item.name)}"
                         class="d-flex nav-link">
              <font-awesome-icon class="fa-1x" fixed-width :icon="item.icon"/>
              <div class="nav-link-text pl-1" :class="{'nav-link-text-open': isOpen}">
                <span>{{$t(item.title)}}</span>
              </div>
            </router-link>
          </li>
          <li class="nav-item t-fade">
            <a @click="logout"
               class="d-flex nav-link"
               :class="{active: isActive('logout')}">
              <font-awesome-icon class="fa-1x" fixed-width icon="sign-out-alt"></font-awesome-icon>
              <div class="nav-link-text pl-1" :class="{'nav-link-text-open': isOpen}">
                <span>{{ $t('LOGOUT') }}</span>
              </div>
            </a>
          </li>
        </ul>
      </nav>
    </v-touch>
    <v-touch :class="{'swipe-zone-open': !isOpen}" @swiperight="isOpen = true">
    </v-touch>
    <div id="navigation-drawer-underlay" :class="{'navigation-drawer-underlay-visible': isOpen}"
         @click="isOpen = !isOpen">
    </div>
  </div>
</template>

<script lang="ts">
  import {Component} from 'vue-property-decorator';
  import {ComponentOptions} from 'vue';
  import {events} from '@/services/events';
  import {NavBarItem} from '@/components/common/navigation/nav-bar-item';
  import {NavNarItems} from '@/components/common/navigation/nav-nar-items';
  import {eventBus} from '@/services/event-bus';
  import {authService} from '@/services/auth.service';
  import {BaseVue} from '@/components/common/base/base.vue';

  @Component
  export default class NavigationDrawer extends BaseVue implements ComponentOptions<NavigationDrawer> {
    isOpen = false;
    items: NavBarItem[] = NavNarItems;
    activeItem = 'map';

    created() {
      eventBus.$off(events.common.titleBar.toggleNavigationDrawer);
      eventBus.$on(events.common.titleBar.toggleNavigationDrawer, this.toggleHandler);
      for (let item of this.items) {
        if (this.$route.path.indexOf(item.to) > -1) {
          this.activeItem = item.name;
        }
      }
    }

    toggleHandler() {
      this.isOpen = !this.isOpen;
    }

    isActive(item: string): boolean {
      return item === this.activeItem;
    }

    setActive(item: string) {
      this.activeItem = item;
    }

    logout() {
      authService.logout();
    }
  }

</script>

<style lang="scss" scoped>
  @import "../../../style/media";
  @import "../../../style/variables";


  #navigation-drawer {
    transition: width $navigationDrawerTransition ease-in-out;
    width: $navigationDrawerWidth;
    float: left;
    position: relative;
    z-index: 10;
    top: 0;
    left: 0;

    .navbar.navbar-brand {
      margin: .6rem;
      padding: 0;
      text-align: right;

      .nav-item {
        overflow: hidden;
      }

      svg {
        display: block;
        margin: auto;
      }

      .nav-link-text {
        overflow-x: hidden;
        text-align: left;
        width: 0;
        transition: width $navigationDrawerTransition ease-in-out;

        span {
          font-size: .8rem;
        }

        &.nav-link-text-open {
          width: 8rem;
        }
      }
    }

    .t-fade {
      transition: max-height .3s ease-in-out;
      max-height: 3rem;

      &.t-fade-away {
        max-height: 0;
      }
    }

    .swipe-zone {
      width: 3rem;
      overflow-x: hidden;
      background: #FFFFFFAA;
      transition: width $navigationDrawerTransition ease-in-out;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    #navigation-drawer-underlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100%;
      z-index: -1000;
      background-color: #00000022;
      visibility: hidden;
    }

    &.navigation-drawer-open, .swipe-zone.navigation-drawer-open {
      width: 11em;
    }
  }

  .chevron {
    transition: .3s;

    &.chevron-open {
      transform: rotateZ(180deg);
    }
  }

  @include media-md {
    #navigation-drawer {
      position: absolute;
      top: $titleBarHeight;

      .navigation-drawer-underlay-visible {
        visibility: visible !important;
      }
    }
  }

  @include media-sm {
    #navigation-drawer, .swipe-zone {
      width: 0;
    }

    .swipe-zone {
      nav {
        overflow-x: hidden;
      }
    }

    .swipe-zone-open {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 10000;
      height: 100%;
      width: 1rem;
    }
  }
</style>
