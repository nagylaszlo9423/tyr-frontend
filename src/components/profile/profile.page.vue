<template>
  <div>
    <h1>ProfilePage</h1>
    <ValidationObserver ref="validator" v-slot="{ }" tag="form"
                        novalidate @submit.prevent="onSubmit">
      <input-field id="wow"
                   info="asdqwe"
                   label="asdqwe"
                   rules="email"/>
      <input />
    </ValidationObserver>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import InputField from '../common/controls/input-field.vue';
  import {ValidationObserver} from 'vee-validate';
  import {VeeValidator} from '@/types';

  @Component({
    components: {
      InputField,
      ValidationObserver
    }
  })
  export default class ProfilePage extends Vue {
    $refs: {
      validator: Vue & VeeValidator
    };

    async onSubmit() {
      const isValid = this.$refs.validator.validate();
    }
  }
</script>

<style lang="scss" scoped>

</style>
