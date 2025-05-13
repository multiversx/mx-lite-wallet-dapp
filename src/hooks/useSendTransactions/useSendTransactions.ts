import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  extractSessionId,
  removeTransactionsToSign,
  sendBatchTransactionsSdkDapp,
  sendTransactions as sendTransactionsSdkDapp,
  useGetAccountInfo,
  useGetAccountProvider,
  useGetActiveTransactionsStatus,
  useGetPendingTransactions,
  Transaction
} from 'lib';

import { TransactionBatchStatusesEnum } from 'localConstants/sdkDapp';
import {
  LoginMethodsEnum,
  SendBatchTransactionsPropsType,
  SendTransactionsPropsType,
  TransactionsDisplayInfoType
} from 'types';

interface SendTransactionsParamsType {
  redirectRoute?: string;
  skipAddNonce?: boolean;
}

export function useSendTransactions(params?: SendTransactionsParamsType) {
  const {
    account: { nonce }
  } = useGetAccountInfo();
  const navigate = useNavigate();
  const { pendingTransactions } = useGetPendingTransactions();
  const { fail, timedOut } = useGetActiveTransactionsStatus();
  const { providerType } = useGetAccountProvider();
  const [localState, setLocalState] = useState<{
    setIsFormSubmitted?: React.Dispatch<React.SetStateAction<boolean>>;
  }>({});

  const [sessionId, setSessionId] = useState<string | null>(null);

  const shouldRemoveUsernames =
    providerType === LoginMethodsEnum.walletconnectv2;

  const sendTransactions = async (
    transactions: Transaction[],
    cancelInProvider?: Dispatch<SetStateAction<boolean>>
  ) => {
    setLocalState({
      setIsFormSubmitted: cancelInProvider
    });

    // TODO: Undo when xPortal with usernames is launched
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

    const props: SendTransactionsPropsType = {
      transactions: mappedTransactions,
      signWithoutSending: false,
      transactionsDisplayInfo: {
        successMessage: 'Transactions successfully sent',
        submittedMessage: 'Success',
        processingMessage: 'Processing transactions'
      },
      redirectAfterSign: false
    };

    const { sessionId: sendSessionId } = await sendTransactionsSdkDapp(props);

    setSessionId(sendSessionId);
  };

  const sendBatchTransactions = async ({
    transactions,
    transactionsDisplayInfo,
    cancelInProvider
  }: {
    transactions: Transaction[][];
    transactionsDisplayInfo?: TransactionsDisplayInfoType;
    cancelInProvider?: Dispatch<SetStateAction<boolean>>;
  }) => {
    setLocalState({
      setIsFormSubmitted: cancelInProvider
    });

    const props: SendBatchTransactionsPropsType = {
      transactions,
      signWithoutSending: false,
      transactionsDisplayInfo: transactionsDisplayInfo ?? {
        successMessage: 'Transactions successful',
        errorMessage: 'An error has occurred',
        submittedMessage: 'Success',
        processingMessage: 'Processing transactions',
        transactionDuration: 10000
      },
      redirectAfterSign: false
    };

    const { batchId } = await sendBatchTransactionsSdkDapp(props);
    const batchSessionId = extractSessionId(batchId);

    if (!batchSessionId) {
      console.error('Batch transactions session id is invalid');
      return;
    }

    setSessionId(batchSessionId.toString());
  };

  useEffect(() => {
    const hasFailedTransactions = fail || timedOut;

    if (!hasFailedTransactions) {
      return;
    }

    // go back from confirm screen to send screen
    localState.setIsFormSubmitted?.(false);

    if (sessionId) {
      removeTransactionsToSign(sessionId);
    }
  }, [fail, timedOut]);

  useEffect(() => {
    if (!sessionId || !pendingTransactions || !params?.redirectRoute) {
      return;
    }

    const canNavigate =
      pendingTransactions[sessionId]?.status ===
      TransactionBatchStatusesEnum.sent;

    if (!canNavigate) {
      return;
    }

    return navigate(params?.redirectRoute);
  }, [pendingTransactions, sessionId]);

  return {
    sendTransactions,
    sendBatchTransactions,
    sessionId
  };
}
