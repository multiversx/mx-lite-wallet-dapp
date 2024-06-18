import { sendTransactions } from 'helpers/sdkDapp/sdkDapp.helpers';
import { IPlainTransactionObject } from 'types/sdkCore.types';
import { createNewTransactionsFromRaw } from './createNewTransactionsFromRaw';

interface MapAndSendTransactionsParamsType {
  address: string;
  chainId: string;
  transactions: IPlainTransactionObject[];
  signWithoutSending?: boolean;
}

export const mapAndSendTransactions = async ({
  address,
  chainId,
  transactions,
  signWithoutSending = true
}: MapAndSendTransactionsParamsType): Promise<string> => {
  const mappedTransactions = createNewTransactionsFromRaw({
    address,
    chainId,
    transactions
  });

  const { sessionId: id } = await sendTransactions({
    transactions: mappedTransactions,
    signWithoutSending,
    transactionsDisplayInfo: {
      successMessage: 'Transactions successfully sent',
      errorMessage: 'An error has occurred',
      submittedMessage: 'Success',
      processingMessage: 'Processing transactions',
      transactionDuration: 10000
    },
    redirectAfterSign: false
  });

  return id;
};
