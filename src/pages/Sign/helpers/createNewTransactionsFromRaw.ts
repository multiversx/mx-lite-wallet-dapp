import { Transaction, newTransaction } from 'lib';
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

  return preparedRawTransactions.map((tx) => newTransaction(tx));
};
