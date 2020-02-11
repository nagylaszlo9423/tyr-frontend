import {NavBarItem} from '@/components/common/navigation/NavBarItem';

export const NavBarItems: NavBarItem[] = [
  {
    name: 'search',
    title: 'ADVANCED_SEARCH',
    icon: 'search',
    to: '/pages/search',
    hidden: false
  },
  {
    name: 'map',
    title: 'MAP',
    icon: 'map-marked',
    to: '/pages/map',
    hidden: false
  },
  {
    name: 'routes',
    title: 'ROUTES',
    icon: 'route',
    to: '/pages/routes',
    hidden: true
  },
  {
    name: 'groups',
    title: 'GROUPS',
    icon: 'users',
    to: '/pages/groups',
    hidden: true
  },
  {
    name: 'profile',
    title: 'PROFILE',
    icon: 'user-alt',
    to: '/pages/profile',
    hidden: true
  },
  {
    name: 'settings',
    title: 'SETTINGS',
    icon: 'cog',
    to: '/pages/settings',
    hidden: true
  }
];
