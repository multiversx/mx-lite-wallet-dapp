import { HooksPageEnum, RouteNamesEnum } from 'localConstants';
import {
  Dashboard,
  Disclaimer,
  Home,
  Unlock,
  LoginHook,
  Logout,
  LogoutHook,
  SignHook,
  SignMessage,
  SignMessageHook,
  Send,
  Sign,
  SovereignTransfer,
  RegisterToken,
  IssueNft,
  Faucet
} from 'pages';
import {
  CreateRecoverRoutes,
  CreateRecoverRoutesEnum
} from '../pages/CreateRecover/routes';
import { IssueCollection } from '../pages/IssueCollection/IssueCollection';
import { IssueToken } from '../pages/IssueToken/IssueToken';

export interface RouteType {
  authenticatedRoute?: boolean;
  path: RouteNamesEnum | HooksPageEnum | CreateRecoverRoutesEnum;
  title: string;
  component: React.ComponentType;
}

const routesObject: Record<
  RouteNamesEnum | HooksPageEnum | CreateRecoverRoutesEnum,
  RouteType
> = {
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
  [RouteNamesEnum.logout]: {
    path: RouteNamesEnum.logout,
    title: 'Logout',
    component: Logout
  },
  [RouteNamesEnum.dashboard]: {
    path: RouteNamesEnum.dashboard,
    authenticatedRoute: true,
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
    authenticatedRoute: true,
    title: 'Send',
    component: () => <Send />
  },
  [RouteNamesEnum.sign]: {
    path: RouteNamesEnum.sign,
    title: 'Sign',
    component: () => <Sign />
  },
  [RouteNamesEnum.signMessage]: {
    path: RouteNamesEnum.signMessage,
    title: 'Sign Message',
    component: () => <SignMessage />
  },
  [RouteNamesEnum.sovereignTransfer]: {
    path: RouteNamesEnum.sovereignTransfer,
    title: 'Sovereign Transfer',
    component: () => <SovereignTransfer />
  },
  [RouteNamesEnum.issueToken]: {
    path: RouteNamesEnum.issueToken,
    title: 'Issue Token',
    component: () => <IssueToken />
  },
  [RouteNamesEnum.issueCollection]: {
    path: RouteNamesEnum.issueCollection,
    title: 'Issue Collection',
    component: () => <IssueCollection />
  },
  [RouteNamesEnum.createNft]: {
    path: RouteNamesEnum.createNft,
    title: 'Create NFT',
    component: () => <IssueNft />
  },
  [RouteNamesEnum.registerToken]: {
    path: RouteNamesEnum.registerToken,
    title: 'Register Token',
    component: () => <RegisterToken />
  },
  [RouteNamesEnum.faucet]: {
    path: RouteNamesEnum.faucet,
    title: '',
    component: () => <Faucet />
  },
  [HooksPageEnum.login]: {
    path: HooksPageEnum.login,
    title: 'Login',
    component: LoginHook
  },
  [HooksPageEnum.sign]: {
    path: HooksPageEnum.sign,
    title: 'Sign',
    component: SignHook
  },
  [HooksPageEnum.signMessage]: {
    path: HooksPageEnum.signMessage,
    title: 'Sign Message',
    component: SignMessageHook
  },
  [HooksPageEnum.logout]: {
    path: HooksPageEnum.logout,
    title: 'Logout',
    component: LogoutHook
  },
  ...CreateRecoverRoutes
};

export const routes: RouteType[] = Object.values(routesObject);

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

export const sendRouteBuilder = (params?: Record<string, string>) => {
  const url = new URL(`${window.location.origin}${RouteNamesEnum.send}`);

  if (!params) {
    return url.pathname;
  }

  for (const key in params) {
    url.searchParams.set(key, params[key]);
  }

  return `${url.pathname}?${url.searchParams}`;
};
