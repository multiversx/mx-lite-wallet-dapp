import { TokenOptionType } from 'types';

export enum RegisterTokenFormFieldsEnum {
  contract = 'contract',
  chainId = 'chainId',
  token = 'token',
  type = 'type'
}

export interface RegisterTokenFormType {
  contract: string;
  chainId: TokenOptionType;
  token: TokenOptionType;
  type: string;
}
