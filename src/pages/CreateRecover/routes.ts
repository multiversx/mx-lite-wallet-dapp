import { CreateRecover } from './CreateRecover';
import { RouteType } from '../../routes/routes';

export enum CreateRecoverRoutesEnum {
  create = '/create',
  recover = '/recover'
}

export const CreateRecoverRoutes: Record<CreateRecoverRoutesEnum, RouteType> = {
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
