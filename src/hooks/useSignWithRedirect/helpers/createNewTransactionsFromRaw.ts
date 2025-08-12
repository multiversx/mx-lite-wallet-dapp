import { Transaction } from 'lib';
import {
  CreateNewTransactionsFromRawParamsType,
  prepareRawTransactions
} from './prepareRawTransactions';

export const createNewTransactionsFromRaw = ({
  address,
  chainId,
  transactions
}: CreateNewTransactionsFromRawParamsType): Transaction[] => {
  const preparedRawTransactions = prepareRawTransactions({
    address,
    chainId,
    transactions
  });

  return preparedRawTransactions.map((tx) => {
    const newTx = {
      ...tx,
      data: Buffer.from(tx.data ?? '').toString('base64')
    };

    const transaction = Transaction.newFromPlainObject(newTx);
    return transaction;
  });
};
