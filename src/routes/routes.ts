import { RouteNamesEnum } from 'localConstants';
import { Dashboard, Disclaimer, Home, Send, Unlock } from 'pages';
import { RouteType } from 'types';

export enum HooksEnum {
  login = 'login',
  logout = 'logout',
  sign = 'sign'
}

export enum HooksPageEnum {
  login = 'loginHook',
  logout = 'logoutHook',
  sign = 'signHook'
}

interface RouteWithTitleType extends RouteType {
  title: string;
}

const routesObject: Record<RouteNamesEnum, RouteWithTitleType> = {
  [RouteNamesEnum.home]: {
    path: RouteNamesEnum.home,
    title: 'Home',
    component: Home
  },
  [RouteNamesEnum.unlock]: {
    path: RouteNamesEnum.unlock,
    title: 'Unlock',
    component: Unlock
  },
  [RouteNamesEnum.dashboard]: {
    path: RouteNamesEnum.dashboard,
    title: 'Dashboard',
    component: Dashboard
  },
  [RouteNamesEnum.disclaimer]: {
    path: RouteNamesEnum.disclaimer,
    title: 'Disclaimer',
    component: Disclaimer
  },
  [RouteNamesEnum.send]: {
    path: RouteNamesEnum.send,
    title: 'Send',
    component: Send
  }
};

export const routes: RouteWithTitleType[] = Object.values(routesObject);

export const routeNames = Object.keys(RouteNamesEnum).reduce(
  (acc, key) => {
    const name = key as keyof typeof RouteNamesEnum;
    return {
      ...acc,
      [name]: RouteNamesEnum[name]
    };
  },
  {} as { [key in keyof typeof RouteNamesEnum]: string }
);
