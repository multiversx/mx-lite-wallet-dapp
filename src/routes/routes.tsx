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
  SignMessageHook
} from 'pages';
import { Send } from 'pages/Send/Send';
import { Sign } from 'pages/Sign/Sign';
import { RouteType } from 'types/sdkDapp.types';

interface RouteWithTitleType extends RouteType {
  title: string;
}

const routesObject: Record<RouteNamesEnum | HooksPageEnum, RouteWithTitleType> =
  {
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
