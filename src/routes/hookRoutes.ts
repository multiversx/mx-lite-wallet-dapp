import { LoginHook } from 'pages/Hook/LoginHook';
import { LogoutHook } from 'pages/Hook/LogoutHook';
import { SignHook } from 'pages/Hook/SignHook';
import { SignMessageHook } from 'pages/Hook/SignMessageHook';
import { TransactionHook } from 'pages/Hook/TransactionHook';
import { HooksEnum, HooksPageEnum, RouteType } from './routeTypes';

export const hookRoutes: { [key: string]: RouteType } = {
  [HooksPageEnum.login]: {
    path: `/hook/${HooksEnum.login}`,
    component: LoginHook
  },
  [HooksPageEnum.logout]: {
    path: `/hook/${HooksEnum.logout}`,
    component: LogoutHook
  },
  [HooksPageEnum.sign]: {
    path: `/hook/${HooksEnum.sign}`,
    component: SignHook
  },
  [HooksPageEnum.signMessage]: {
    path: `/hook/${HooksEnum.signMessage}`,
    component: SignMessageHook
  }
};

export const hookRouteNames = Object.keys(hookRoutes).reduce(
  (acc, cur) => ({
    ...acc,
    [cur]: hookRoutes[cur as HooksPageEnum].path
  }),
  {} as Record<HooksPageEnum, string>
);
