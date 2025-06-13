import { TokenOptionType } from 'types';

export enum SovereignTransferFormFieldsEnum {
  amount = 'amount',
  contract = 'contract',
  receiver = 'receiver',
  token = 'token',
  tokens = 'tokens',
  type = 'type'
}

export interface SovereignTransferTokenType {
  amount: string;
  token: TokenOptionType;
  type: string;
}

export interface SovereignTransferFormType {
  contract: string;
  receiver: string;
  tokens: SovereignTransferTokenType[];
}
