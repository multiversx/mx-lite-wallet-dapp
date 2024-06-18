import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  useGetAccount,
  useGetNetworkConfig,
  useGetSignedTransactions
} from 'hooks';
import { useSendTransactions } from 'pages/Send/hooks';
import { hookSelector } from 'redux/selectors';
import { routeNames } from 'routes';
import { useSignTransactions } from './useSignTransactions';
import {
  ValidatedTxsStateType,
  useValidateAndBuildUrlTransactions
} from './useValidateAndBuildTransactions';
import { createNewTransactionsFromRaw } from '../helpers/createNewTransactionsFromRaw';

interface UseValidateAndSignTxsReturnType extends ValidatedTxsStateType {
  sessionId: string | null;
}

export const useValidateAndSignTxs = (): UseValidateAndSignTxsReturnType => {
  const { hookUrl } = useSelector(hookSelector);
  const {
    network: { chainId }
  } = useGetNetworkConfig();
  const { address } = useGetAccount();
  const { signedTransactions } = useGetSignedTransactions();

  const {
    executeAfterSign,
    multiSignTxs,
    rawTxs,
    txsDataTokens,
    txErrors,
    multiSigContract
  } = useValidateAndBuildUrlTransactions({
    hookUrl
  });

  const { sessionId: batchId, sendBatchTransactions } = useSendTransactions(
    routeNames.dashboard
  );

  const { sessionId: signSessionId, signTransactions } = useSignTransactions({
    address,
    chainId,
    rawTxs,
    signedTransactions,
    txErrors
  });

  const sessionId = batchId || signSessionId;

  const completeSignTransaction = async () => {
    if (rawTxs.length === 0) {
      return;
    }

    if (executeAfterSign === 'true') {
      await sendBatchTransactions({
        transactions: [
          createNewTransactionsFromRaw({
            address,
            chainId: String(chainId),
            transactions: rawTxs
          })
        ]
      });

      return;
    }

    const signWithoutSending = executeAfterSign !== 'true';

    await signTransactions({ signWithoutSending });
  };

  useEffect(() => {
    completeSignTransaction();
  }, [txErrors, rawTxs, multiSigContract]);

  return {
    sessionId,
    multiSignTxs,
    txErrors,
    txsDataTokens,
    rawTxs
  };
};
