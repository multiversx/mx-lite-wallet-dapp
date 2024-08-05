import { CreateRecover } from './CreateRecover';
import { RouteType } from '../../types/sdkDapp.types';

export enum CreateRecoverRoutesEnum {
  create = '/create',
  recover = '/recover'
}

export interface RouteWithTitleType extends RouteType {
  title: string;
}

export const CreateRecoverRoutes: Record<
  CreateRecoverRoutesEnum,
  RouteWithTitleType
> = {
  [CreateRecoverRoutesEnum.create]: {
    path: CreateRecoverRoutesEnum.create,
    title: 'Create',
    component: CreateRecover
  },
  [CreateRecoverRoutesEnum.recover]: {
    path: CreateRecoverRoutesEnum.recover,
    title: 'Recover',
    component: CreateRecover
  }
};
