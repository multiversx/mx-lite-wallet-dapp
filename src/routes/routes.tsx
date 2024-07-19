import { PrivateKeyCheckWrapper } from 'components/PrivateKeyCheckWrapper/PrivateKeyCheckWrapper';
import {
  CreateRoutesEnum,
  HooksPageEnum,
  RecoverRoutesEnum,
  RouteNamesEnum
} from 'localConstants';
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
  Sign
} from 'pages';
import { RouteType } from 'types/sdkDapp.types';
import { CreateDisclaimer } from '../pages/Create/components/CreateDisclaimer';
import { CreateMnemonics } from '../pages/Create/components/CreateMnemonics';
import { CreateQuiz } from '../pages/Create/components/CreateQuiz';
import { CreatePassword } from '../pages/Create/components/CreatePassword';
import { CreateDownload } from '../pages/Create/components/CreateDownload';
import { RecoverMnemonics } from '../pages/Recover/components/RecoverMnemonics';
import { RecoverPassword } from '../pages/Recover/components/RecoverPassword';
import { RecoverDownload } from '../pages/Recover/components/RecoverDownload';

interface RouteWithTitleType extends RouteType {
  title: string;
}

const routesObject: Record<
  RouteNamesEnum | HooksPageEnum | CreateRoutesEnum | RecoverRoutesEnum,
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
  [CreateRoutesEnum.info]: {
    path: CreateRoutesEnum.info,
    title: 'Create Disclaimer',
    component: CreateDisclaimer
  },
  [CreateRoutesEnum.mnemonicPhrase]: {
    path: CreateRoutesEnum.mnemonicPhrase,
    title: 'Create Mnemonics',
    component: CreateMnemonics
  },
  [CreateRoutesEnum.checkMnemonic]: {
    path: CreateRoutesEnum.checkMnemonic,
    title: 'Create Mnemonics',
    component: CreateQuiz
  },
  [CreateRoutesEnum.setPassword]: {
    path: CreateRoutesEnum.setPassword,
    title: 'Create Password',
    component: CreatePassword
  },
  [CreateRoutesEnum.download]: {
    path: CreateRoutesEnum.download,
    title: 'Create Download',
    component: CreateDownload
  },
  [RecoverRoutesEnum.mnemonicPhrase]: {
    path: RecoverRoutesEnum.mnemonicPhrase,
    title: 'Recover Mnemonics',
    component: RecoverMnemonics
  },
  [RecoverRoutesEnum.setPassword]: {
    path: RecoverRoutesEnum.setPassword,
    title: 'Recover Password',
    component: RecoverPassword
  },
  [RecoverRoutesEnum.download]: {
    path: RecoverRoutesEnum.download,
    title: 'Recover Download',
    component: RecoverDownload
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
