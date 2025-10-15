import { CreateRecover } from './CreateRecover';

export enum CreateRecoverRoutesEnum {
  create = '/create',
  recover = '/recover'
}

export interface RouteType {
  authenticatedRoute?: boolean;
  path: string;
  title: string;
  component: React.ComponentType;
  children?: RouteType[];
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
