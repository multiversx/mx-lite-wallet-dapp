import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  getAccountProvider,
  ProviderTypeEnum,
  Transaction,
  TransactionsDisplayInfoType,
  useGetAccountInfo,
  useGetPendingTransactions,
  getActiveTransactionsStatus
} from 'lib';

import { sendAndTrackTransactions } from './helpers/sendAndTrackTransactions';

interface SendTransactionsParamsType {
  redirectRoute?: string;
  skipAddNonce?: boolean;
}

export function useSendTransactions(params?: SendTransactionsParamsType) {
  const {
    account: { nonce }
  } = useGetAccountInfo();
  const navigate = useNavigate();
  const pendingTransactions = useGetPendingTransactions();
  const provider = getAccountProvider();
  const providerType = provider.getType();

  const shouldRemoveUsernames = providerType === ProviderTypeEnum.walletConnect;

  const sendTransactions = async (transactions: Transaction[]) => {
    const mappedTransactions = transactions.map((tx, index) => {
      if (!params?.skipAddNonce) {
        tx.nonce = BigInt(nonce + index);
      }

      const plainTransactionObject = tx.toPlainObject();

      if (shouldRemoveUsernames) {
        delete plainTransactionObject.receiverUsername;
        delete plainTransactionObject.senderUsername;
      }

      return Transaction.newFromPlainObject(plainTransactionObject);
    });

    const transactionsDisplayInfo: TransactionsDisplayInfoType = {
      successMessage: 'Transactions successfully sent',
      submittedMessage: 'Success',
      processingMessage: 'Processing transactions'
    };

    await sendAndTrackTransactions({
      transactions: mappedTransactions,
      options: {
        transactionsDisplayInfo
      }
    });
  };

  const sendBatchTransactions = async ({
    transactions,
    transactionsDisplayInfo
  }: {
    transactions: Transaction[][];
    transactionsDisplayInfo?: TransactionsDisplayInfoType;
  }) => {
    const defaultTransactionsDisplayInfo: TransactionsDisplayInfoType = {
      successMessage: 'Transactions successful',
      errorMessage: 'An error has occurred',
      submittedMessage: 'Success',
      processingMessage: 'Processing transactions',
      transactionDuration: 10000
    };

    await sendAndTrackTransactions({
      transactions,
      options: {
        transactionsDisplayInfo:
          transactionsDisplayInfo ?? defaultTransactionsDisplayInfo
      }
    });
  };

  useEffect(() => {
    if (!pendingTransactions || !params?.redirectRoute) {
      return;
    }

    const status = getActiveTransactionsStatus();
    const canNavigate = status.success;

    if (!canNavigate) {
      return;
    }

    return navigate(params?.redirectRoute);
  }, [pendingTransactions]);

  return {
    sendTransactions,
    sendBatchTransactions
  };
}
