import { FeaturePageLayout } from 'components';
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
  children?: RouteType[];
}

const routesObject: Record<
  RouteNamesEnum | HooksPageEnum | CreateRecoverRoutesEnum,
  RouteType
> = {
  [RouteNamesEnum.home]: {
    path: RouteNamesEnum.home,
    title: 'Home',
    component: Home,
    children: [
      {
        path: RouteNamesEnum.unlock,
        title: 'Unlock',
        component: Unlock
      }
    ]
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
      <FeaturePageLayout title='Send'>
        <Send />
      </FeaturePageLayout>
    )
  },
  [RouteNamesEnum.sign]: {
    path: RouteNamesEnum.sign,
    title: 'Sign',
    component: () => <Sign />
  },
  [RouteNamesEnum.signMessage]: {
    path: RouteNamesEnum.signMessage,
    title: 'Sign Message',
    component: () => (
      <FeaturePageLayout title='Sign Message'>
        <SignMessage />
      </FeaturePageLayout>
    )
  },
  [RouteNamesEnum.sovereignTransfer]: {
    path: RouteNamesEnum.sovereignTransfer,
    title: 'Sovereign Transfer',
    component: () => (
      <FeaturePageLayout title='Sovereign Transfer'>
        <SovereignTransfer />
      </FeaturePageLayout>
    )
  },
  [RouteNamesEnum.issueToken]: {
    path: RouteNamesEnum.issueToken,
    title: 'Issue Token',
    component: () => (
      <FeaturePageLayout title='Issue Token'>
        <IssueToken />
      </FeaturePageLayout>
    )
  },
  [RouteNamesEnum.issueCollection]: {
    path: RouteNamesEnum.issueCollection,
    title: 'Issue Collection',
    component: () => (
      <FeaturePageLayout title='Issue Collection'>
        <IssueCollection />
      </FeaturePageLayout>
    )
  },
  [RouteNamesEnum.createNft]: {
    path: RouteNamesEnum.createNft,
    title: 'Create NFT',
    component: () => (
      <FeaturePageLayout title='Create NFT'>
        <IssueNft />
      </FeaturePageLayout>
    )
  },
  [RouteNamesEnum.registerToken]: {
    path: RouteNamesEnum.registerToken,
    title: 'Register Token',
    component: () => (
      <FeaturePageLayout title="Register Sovereign Token">
        <RegisterToken />
      </FeaturePageLayout>
    )
  },
  [RouteNamesEnum.faucet]: {
    path: RouteNamesEnum.faucet,
    title: 'Faucet',
    component: () => (
      <FeaturePageLayout title="Faucet">
        <Faucet />
      </FeaturePageLayout>
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
