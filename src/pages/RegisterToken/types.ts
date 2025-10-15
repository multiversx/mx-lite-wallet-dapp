import { TokenOptionType } from 'types';

export enum RegisterTokenFormFieldsEnum {
  contract = 'contract',
  token = 'token',
  type = 'type'
}

export interface RegisterTokenFormType {
  contract: string;
  token: TokenOptionType;
  type: string;
}
