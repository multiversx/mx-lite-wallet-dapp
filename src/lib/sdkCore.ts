import BigNumber from 'bignumber.js';

export {
  Mnemonic,
  UserSecretKey,
  UserWallet,
  UserSigner,
  AddressValue,
  TokenTransfer,
  Message,
  Address,
  Transaction,
  MessageComputer,
  TransactionOptions,
  TransactionVersion,
  TokenManagementTransactionsFactory,
  TransactionsFactoryConfig
} from '@multiversx/sdk-core';

export type { IPlainTransactionObject } from '@multiversx/sdk-core/out';

export function numberToPaddedHex(value: bigint | number | BigNumber.Value) {
  let hexableNumber: { toString(radix?: number): string };

  if (typeof value === 'bigint' || typeof value === 'number') {
    hexableNumber = value;
  } else {
    hexableNumber = new BigNumber(value);
  }

  const hex = hexableNumber.toString(16);
  return zeroPadStringIfOddLength(hex);
}

export function zeroPadStringIfOddLength(input: string): string {
  input = input || '';

  if (input.length % 2 == 1) {
    return '0' + input;
  }

  return input;
}
