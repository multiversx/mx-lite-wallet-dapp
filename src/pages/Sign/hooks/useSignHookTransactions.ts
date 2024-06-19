import { useGetAccountInfo, useGetNetworkConfig } from 'lib';
import {
  IPlainTransactionObject,
  parseSignUrl,
  validateSignTransactions
} from 'lib';
import {
  extractSessionId,
  sendBatchTransactionsSdkDapp,
  sendTransactions
} from 'lib/sdkDapp';

import { MultiSignTransactionType, TransactionsDataTokensType } from 'types';
import { SendBatchTransactionsPropsType } from 'types';
import { createNewTransactionsFromRaw } from '../helpers/createNewTransactionsFromRaw';

interface ValidatedTxsStateType {
  executeAfterSign?: string;
  multiSignTxs: MultiSignTransactionType[];
  rawTxs: IPlainTransactionObject[];
  txErrors: { [key: string]: string };
  txsDataTokens: TransactionsDataTokensType;
  multiSigContract?: string | null;
}

export interface ValidateAndSignTxsReturnType extends ValidatedTxsStateType {
  sessionId: string | null;
}

const emptyState: ValidatedTxsStateType & {
  sessionId: string | null;
} = {
  multiSignTxs: [],
  txErrors: {},
  txsDataTokens: {},
  rawTxs: [],
  sessionId: null
};

export const useSignHookTransactions = () => {
  const {
    network: { chainId, apiAddress, apiTimeout, egldLabel }
  } = useGetNetworkConfig();

  const {
    account: { address, balance }
  } = useGetAccountInfo();

  const apiConfig = {
    baseURL: apiAddress,
    timeout: parseInt(String(apiTimeout))
  };

  const signHookTransactions = async (
    hookUrl: string
  ): Promise<ValidateAndSignTxsReturnType> => {
    // 1. get the raw transactions
    const { txs: rawTxs, executeAfterSign } =
      parseSignUrl<IPlainTransactionObject>(hookUrl);

    // Step 1. Validate the transactions
    const txData = await validateSignTransactions({
      extractedTxs: rawTxs,
      address,
      egldLabel: String(egldLabel),
      balance,
      chainId: String(chainId),
      apiConfig
    });

    if (!txData || Object.keys(txData.errors).length > 0) {
      return {
        ...emptyState,
        txErrors: txData?.errors || {}
      };
    }

    // Step 2. Send individual or batch transactions
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

    const partialState = {
      executeAfterSign,
      multiSignTxs: txData.parsedTransactions,
      rawTxs,
      txErrors: txData.errors,
      txsDataTokens: txData.txsDataTokens
    };

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
        return emptyState;
      }

      return {
        ...partialState,
        sessionId: batchSessionId.toString()
      };
    }

    const { sessionId } = await sendTransactions({
      transactions: mappedTransactions,
      signWithoutSending: executeAfterSign !== 'true',
      transactionsDisplayInfo,
      redirectAfterSign: false
    });

    return {
      ...partialState,
      sessionId
    };
  };

  return signHookTransactions;
};
