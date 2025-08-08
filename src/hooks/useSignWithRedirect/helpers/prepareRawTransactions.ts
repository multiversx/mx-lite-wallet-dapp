import { stringIsInteger, IPlainTransactionObject } from 'lib';

export interface CreateNewTransactionsFromRawParamsType {
  address: string;
  chainId: string;
  transactions: IPlainTransactionObject[];
}

export const prepareRawTransactions = ({
  address,
  chainId,
  transactions
}: CreateNewTransactionsFromRawParamsType): IPlainTransactionObject[] =>
  transactions.map((tx) => {
    const rawTransaction = {
      ...tx,
      chainID: chainId,
      sender: tx.sender || address
    };

    const integerKeys: (keyof typeof rawTransaction)[] = [
      'gasLimit',
      'gasPrice',
      'options',
      'nonce',
      'version'
    ];

    const rawTransactionPartial: Record<string, number | string> = {};

    integerKeys.forEach((key) => {
      const prop = rawTransaction[key];

      if (prop == null) {
        return;
      }

      const propString = prop.toString();

      if (stringIsInteger(propString)) {
        rawTransactionPartial[key] = parseInt(propString);
      }
    });

    return { ...rawTransaction, ...rawTransactionPartial };
  });
