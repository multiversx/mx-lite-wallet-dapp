import { TokenOptionType } from 'types';

export enum FormFieldsEnum {
  amount = 'amount',
  data = 'data',
  gasLimit = 'gasLimit',
  receiver = 'receiver',
  token = 'token',
  type = 'type'
}

export interface SendFormType {
  amount: string;
  data: string;
  gasLimit: number;
  receiver: string;
  token: TokenOptionType;
  type: string;
}
