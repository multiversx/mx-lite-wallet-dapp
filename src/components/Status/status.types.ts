import { ReactNode } from 'react';
import { WithClassnameType } from 'types';

export enum StatusTypeEnum {
  success = 'success',
  pending = 'pending',
  info = 'info',
  fail = 'fail'
}

export interface StatusPropsType extends WithClassnameType {
  type: StatusTypeEnum;
  title: ReactNode;
  subtitle: ReactNode;
  titleDataTestId?: string;
  subtitleDataTestId?: string;
}
