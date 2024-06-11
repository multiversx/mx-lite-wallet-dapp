import { LayoutsEnum } from 'components/Layout/types/layouts.enum';
import { MouseEvent, ReactNode } from 'react';
import { WithClassnameType } from 'types';

export interface NestedRouteType extends WithClassnameType {
  authenticatedRoute?: boolean;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  component: any;
  hideHeaderCloseBtn?: boolean;
  layout?: LayoutsEnum;
  onBack?: (event: MouseEvent) => void;
  path: string;
  subtitle?: ReactNode;
  title?: ReactNode;
}

export interface RouteType extends NestedRouteType {
  nestedRoutes?: NestedRouteType[];
}

enum WalletBgRoutesEnum {
  home = 'home',
  unlock = 'unlock',
  dashboard = 'dashboard',
  logout = 'logout'
}

export const BackgroundRoutesEnum = {
  ...WalletBgRoutesEnum
};

export type BackgroundRoutesType = keyof typeof BackgroundRoutesEnum;

export enum HooksEnum {
  login = 'login',
  logout = 'logout',
  sign = 'sign'
}

export enum HooksPageEnum {
  login = 'loginHook',
  logout = 'logoutHook',
  sign = 'signHook',
  twoFa = '2FaHook',
  transaction = 'transactionHook'
}
