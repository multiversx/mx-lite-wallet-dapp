import React from 'react';
import { Keystore, Ledger, Pem, WalletConnect } from 'pages/Unlock/providers';
import { BackgroundRoutesEnum, RouteType } from './routeTypes';
import { LayoutsEnum } from 'components/Layout/types/layouts.enum';
import { Send, Sign, SignMessage } from 'pages';
import { PrivateKeyCheckWrapper } from 'components/Layout/components/PrivateKeyCheckWrapper';

enum ModalRoutesEnum {
  keystore = 'keystore',
  ledger = 'ledger',
  pem = 'pem',
  send = 'send',
  sign = 'sign',
  signMessage = 'sign-message',
  walletconnect = 'walletconnect'
}

export const ModalRoutes = {
  ...ModalRoutesEnum
};

type ValueOf<T> = T[keyof T];

export type ModalRoutesType = ValueOf<typeof ModalRoutes>;

export const modalRoutes: Record<ModalRoutesType, RouteType> = {
  [ModalRoutesEnum.send]: {
    path: `/${ModalRoutesEnum.send}`,
    className: 'send-modal',
    'data-testid': 'sendModal',
    layout: LayoutsEnum.modal,
    hideHeaderCloseBtn: true,
    component: () => (
      <PrivateKeyCheckWrapper>
        <Send />
      </PrivateKeyCheckWrapper>
    ),
    authenticatedRoute: true
  },

  [ModalRoutesEnum.signMessage]: {
    path: `/${ModalRoutes.signMessage}`,
    className: 'sign-message-modal',
    'data-testid': 'signMessageModal',
    layout: LayoutsEnum.modal,
    hideHeaderCloseBtn: true,
    authenticatedRoute: true,
    component: () => (
      <PrivateKeyCheckWrapper>
        <SignMessage />
      </PrivateKeyCheckWrapper>
    )
  },
  [ModalRoutesEnum.sign]: {
    path: `/${ModalRoutesEnum.sign}`,
    title: 'Sign',
    layout: LayoutsEnum.empty,
    component: () => (
      <PrivateKeyCheckWrapper>
        <Sign />
      </PrivateKeyCheckWrapper>
    ),
    authenticatedRoute: true
  },
  [ModalRoutesEnum.walletconnect]: {
    path: `${BackgroundRoutesEnum.unlock}/${ModalRoutesEnum.walletconnect}`,
    component: WalletConnect,
    layout: LayoutsEnum.loginModal,
    className: 'xPortal-modal'
  },
  [ModalRoutesEnum.pem]: {
    component: Pem,
    layout: LayoutsEnum.modal,
    path: `${BackgroundRoutesEnum.unlock}/${ModalRoutesEnum.pem}`,
    className: 'pem-modal',
    title: 'Login using PEM',
    subtitle: 'Drag & drop your PEM file here or select file',
    hideHeaderCloseBtn: true
  },
  [ModalRoutesEnum.keystore]: {
    path: `${BackgroundRoutesEnum.unlock}/${ModalRoutesEnum.keystore}`,
    component: Keystore,
    layout: LayoutsEnum.modal,
    className: 'keystore-modal',
    hideHeaderCloseBtn: true
  },
  [ModalRoutesEnum.ledger]: {
    path: `${BackgroundRoutesEnum.unlock}/${ModalRoutesEnum.ledger}`,
    component: Ledger,
    className: 'ledger-modal',
    layout: LayoutsEnum.loginModal
  }
};

export const modalRouteNames = Object.keys(modalRoutes).reduce(
  (acc, cur) => ({
    ...acc,
    [cur]: modalRoutes[cur as ModalRoutesType].path
  }),
  {} as Record<ModalRoutesType, string>
);
