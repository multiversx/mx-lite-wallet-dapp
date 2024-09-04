import { PrivateKeyCheckWrapper } from 'components/PrivateKeyCheckWrapper/PrivateKeyCheckWrapper';
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
  IssueNft
} from 'pages';
import { RouteType } from 'types/sdkDapp.types';
import {
  CreateRecoverRoutes,
  CreateRecoverRoutesEnum
} from '../pages/CreateRecover/routes';
import { IssueToken } from '../pages/IssueToken/IssueToken';
import { IssueCollection } from '../pages/IssueCollection/IssueCollection';

export interface RouteWithTitleType extends RouteType {
  title: string;
}

const routesObject: Record<
  RouteNamesEnum | HooksPageEnum | CreateRecoverRoutesEnum,
  RouteWithTitleType
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
    component: () => (
      <PrivateKeyCheckWrapper>
        <Send />
      </PrivateKeyCheckWrapper>
    )
  },
  [RouteNamesEnum.sign]: {
    path: RouteNamesEnum.sign,
    title: 'Sign',
    component: () => (
      <PrivateKeyCheckWrapper>
        <Sign />
      </PrivateKeyCheckWrapper>
    )
  },
  [RouteNamesEnum.signMessage]: {
    path: RouteNamesEnum.signMessage,
    title: 'Sign Message',
    component: () => (
      <PrivateKeyCheckWrapper>
        <SignMessage />
      </PrivateKeyCheckWrapper>
    )
  },
  [RouteNamesEnum.sovereignTransfer]: {
    path: RouteNamesEnum.sovereignTransfer,
    title: 'Sovereign Transfer',
    component: () => (
      <PrivateKeyCheckWrapper>
        <SovereignTransfer />
      </PrivateKeyCheckWrapper>
    )
  },
  [RouteNamesEnum.issueToken]: {
    path: RouteNamesEnum.issueToken,
    title: 'Issue Token',
    component: () => (
      <PrivateKeyCheckWrapper>
        <IssueToken />
      </PrivateKeyCheckWrapper>
    )
  },
  [RouteNamesEnum.issueCollection]: {
    path: RouteNamesEnum.issueCollection,
    title: 'Issue Collection',
    component: () => (
      <PrivateKeyCheckWrapper>
        <IssueCollection />
      </PrivateKeyCheckWrapper>
    )
  },
  [RouteNamesEnum.issueNft]: {
    path: RouteNamesEnum.issueNft,
    title: 'Issue NFT',
    component: () => (
      <PrivateKeyCheckWrapper>
        <IssueNft />
      </PrivateKeyCheckWrapper>
    )
  },
  [RouteNamesEnum.registerToken]: {
    path: RouteNamesEnum.registerToken,
    title: 'Register Token',
    component: () => (
      <PrivateKeyCheckWrapper>
        <RegisterToken />
      </PrivateKeyCheckWrapper>
    )
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
