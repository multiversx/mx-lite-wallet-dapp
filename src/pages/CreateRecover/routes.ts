import { RouteType } from '../../types/sdkDapp.types';
import {
  CreateDisclaimer,
  CreateDownload,
  CreateMnemonics,
  CreatePassword,
  CreateQuiz
} from './Create';
import { RecoverDownload, RecoverMnemonics, RecoverPassword } from './Recover';

export enum CreateRecoverRoutesEnum {
  info = '/create',
  createMnemonic = '/create/mnemonic',
  createCheckMnemonic = '/create/check',
  createPassword = '/create/password',
  createDownload = '/create/download',
  recoverMnemonic = '/recover',
  recoverPassword = '/recover/password',
  recoverDownload = '/recover/download'
}

export enum UnlockRoutesEnum {
  keystore = '/unlock/keystore',
  pem = '/unlock/pem'
}

export interface RouteWithTitleType extends RouteType {
  title: string;
}

export const CreateRecoverRoutes: Record<
  CreateRecoverRoutesEnum,
  RouteWithTitleType
> = {
  [CreateRecoverRoutesEnum.info]: {
    path: CreateRecoverRoutesEnum.info,
    title: 'Create Disclaimer',
    component: CreateDisclaimer
  },
  [CreateRecoverRoutesEnum.createMnemonic]: {
    path: CreateRecoverRoutesEnum.createMnemonic,
    title: 'Create Mnemonics',
    component: CreateMnemonics
  },
  [CreateRecoverRoutesEnum.createCheckMnemonic]: {
    path: CreateRecoverRoutesEnum.createCheckMnemonic,
    title: 'Create Mnemonics',
    component: CreateQuiz
  },
  [CreateRecoverRoutesEnum.createPassword]: {
    path: CreateRecoverRoutesEnum.createPassword,
    title: 'Create Password',
    component: CreatePassword
  },
  [CreateRecoverRoutesEnum.createDownload]: {
    path: CreateRecoverRoutesEnum.createDownload,
    title: 'Create Download',
    component: CreateDownload
  },
  [CreateRecoverRoutesEnum.recoverMnemonic]: {
    path: CreateRecoverRoutesEnum.recoverMnemonic,
    title: 'Recover Mnemonics',
    component: RecoverMnemonics
  },
  [CreateRecoverRoutesEnum.recoverPassword]: {
    path: CreateRecoverRoutesEnum.recoverPassword,
    title: 'Recover Password',
    component: RecoverPassword
  },
  [CreateRecoverRoutesEnum.recoverDownload]: {
    path: CreateRecoverRoutesEnum.recoverDownload,
    title: 'Recover Download',
    component: RecoverDownload
  }
};
