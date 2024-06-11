import { Home } from 'pages/Home';
import { Logout } from 'pages/Logout';
import { Unlock } from 'pages/Unlock';

import {
  BackgroundRoutesEnum,
  BackgroundRoutesType,
  RouteType
} from './routeTypes';
import { LayoutsEnum } from 'components/Layout/types/layouts.enum';
import { Dashboard } from 'pages';

export const backgroundRoutes: Record<BackgroundRoutesType, RouteType> = {
  [BackgroundRoutesEnum.home]: {
    path: '/',
    layout: LayoutsEnum.navbar,
    component: Home
  },
  [BackgroundRoutesEnum.dashboard]: {
    path: `/${BackgroundRoutesEnum.dashboard}`,
    title: 'Dashboard',
    component: Dashboard,
    authenticatedRoute: true
  },
  [BackgroundRoutesEnum.unlock]: {
    path: '/unlock',
    title: 'Unlock',
    layout: LayoutsEnum.navbar,
    component: Unlock
  },
  [BackgroundRoutesEnum.logout]: {
    path: '/logout',
    title: 'Logout',
    layout: LayoutsEnum.empty,
    component: Logout
  }
};

export const backgroundRouteNames = Object.keys(backgroundRoutes).reduce(
  (acc, cur) => ({
    ...acc,
    [cur]: backgroundRoutes[cur as BackgroundRoutesType].path
  }),
  {} as Record<BackgroundRoutesType, string>
);
