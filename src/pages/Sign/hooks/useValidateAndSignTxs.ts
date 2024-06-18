import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  extractSessionId,
  sendBatchTransactionsSdkDapp,
  sendTransactions
} from 'helpers/sdkDapp/sdkDapp.helpers';
import {
  useGetAccountInfo,
  useGetNetworkConfig,
  useGetSignedTransactions,
  useReplyWithCancelled
} from 'hooks';
import { useAbortAndRemoveAllTxs } from 'hooks/useAbortAndRemoveAllTx';
import {
  IPlainTransactionObject,
  parseSignUrl,
  validateSignTransactions
} from 'lib';

import { TransactionBatchStatusesEnum } from 'localConstants';
import { hookSelector } from 'redux/selectors';
import { resetHook } from 'redux/slices';
import { routeNames } from 'routes';
import { MultiSignTransactionType, TransactionsDataTokensType } from 'types';
import {
  SendBatchTransactionsPropsType,
  SignedTransactionType,
  TransactionSignatureDataType
} from 'types';
import { useReplyWithSignedTransactions } from './useReplyWithSignedTransactions';
import { createNewTransactionsFromRaw } from '../helpers/createNewTransactionsFromRaw';
import { mapSignedTransactions } from '../helpers/mapSignedTransactions';

interface ValidatedTxsStateType {
  executeAfterSign?: string;
  multiSignTxs: MultiSignTransactionType[];
  rawTxs: IPlainTransactionObject[];
  txErrors: { [key: string]: string };
  txsDataTokens: TransactionsDataTokensType;
  multiSigContract?: string | null;
}

interface UseValidateAndSignTxsReturnType extends ValidatedTxsStateType {
  sessionId: string | null;
}

export const useValidateAndSignTxs = (): UseValidateAndSignTxsReturnType => {
  const { hookUrl, callbackUrl } = useSelector(hookSelector);
  const {
    network: { chainId, apiAddress, apiTimeout, egldLabel }
  } = useGetNetworkConfig();
  const replyWithSignedTransactions = useReplyWithSignedTransactions();
  const navigate = useNavigate();

  const replyWithCancelled = useReplyWithCancelled({
    caller: 'useSignTransactions'
  });
  const dispatch = useDispatch();
  const removeAllTransactions = useAbortAndRemoveAllTxs();

  const { signedTransactions } = useGetSignedTransactions();
  const {
    account: { address, balance },
    ledgerAccount
  } = useGetAccountInfo();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [state, setState] = useState<ValidatedTxsStateType>({
    multiSignTxs: [],
    txErrors: {},
    txsDataTokens: {},
    rawTxs: []
  });

  const apiConfig = {
    baseURL: apiAddress,
    timeout: parseInt(String(apiTimeout))
  };

  const completeSignTransaction = async () => {
    // 1. get the raw transactions

    const { txs: rawTxs, executeAfterSign } =
      parseSignUrl<IPlainTransactionObject>(hookUrl);

    const txData = await validateSignTransactions({
      extractedTxs: rawTxs,
      address,
      egldLabel: String(egldLabel),
      balance,
      chainId: String(chainId),
      apiConfig
    });

    setState((existing) => ({
      ...existing,
      txErrors: txData?.errors || {}
    }));

    if (!txData || Object.keys(txData.errors).length > 0) {
      return;
    }

    // 2. stign the transactions

    const mappedTransactions = createNewTransactionsFromRaw({
      address,
      chainId,
      transactions: rawTxs
    });

    const transactionsDisplayInfo = {
      successMessage: 'Transactions successfully sent',
      errorMessage: 'An error has occurred',
      submittedMessage: 'Success',
      processingMessage: 'Processing transactions',
      transactionDuration: 10000
    };

    setState({
      executeAfterSign,
      multiSignTxs: txData.parsedTransactions,
      rawTxs,
      txErrors: txData.errors,
      txsDataTokens: txData.txsDataTokens
    });

    if (executeAfterSign === 'true') {
      const props: SendBatchTransactionsPropsType = {
        transactions: [rawTxs],
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

      return setSessionId(batchSessionId.toString());
    }

    const { sessionId: id } = await sendTransactions({
      transactions: mappedTransactions,
      signWithoutSending: executeAfterSign !== 'true',
      transactionsDisplayInfo,
      redirectAfterSign: false
    });

    setSessionId(id);
  };

  useEffect(() => {
    completeSignTransaction();
  }, [hookUrl]);

  const reply = () => {
    if (sessionId == null) {
      return [];
    }

    const sessionObject = signedTransactions[sessionId];

    if (sessionObject == null) {
      return [];
    }

    const signedTxs: SignedTransactionType[] = sessionObject.transactions ?? [];

    const status = sessionObject.status;

    if (
      status === TransactionBatchStatusesEnum.cancelled ||
      status === TransactionBatchStatusesEnum.fail ||
      status === TransactionBatchStatusesEnum.invalid
    ) {
      replyWithCancelled();
    }

    if (!signedTxs) {
      return [];
    }

    const txsSignatures = signedTxs
      .filter((tx) => Boolean(tx.signature))
      .map(({ options, signature, version }) => {
        const txSignature: TransactionSignatureDataType = {
          signature: String(signature),
          version: String(version),
          options: String(options)
        };

        return txSignature;
      });

    if (txsSignatures.length === 0) {
      return [];
    }

    const txs = state.rawTxs;

    const signingEnabled =
      txs.length > 0 && txsSignatures.length === txs.length;

    if (!signingEnabled) {
      return;
    }

    const transactions = mapSignedTransactions({
      txs,
      signatureData: txsSignatures,
      address,
      isLedgerWithHashSign: Boolean(ledgerAccount?.version)
    });

    const isValidHook = Boolean(callbackUrl);

    if (isValidHook) {
      replyWithSignedTransactions(transactions);
    }

    dispatch(resetHook());
    removeAllTransactions();

    navigate(routeNames.dashboard);
  };

  useEffect(() => {
    reply();
  }, [sessionId, signedTransactions, state.rawTxs]);

  return {
    sessionId,
    ...state
  };
};
