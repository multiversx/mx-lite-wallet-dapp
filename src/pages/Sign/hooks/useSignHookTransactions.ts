import type { TransactionsDisplayInfoType } from '@multiversx/sdk-dapp/out/types/transactions.types';
import {
  useGetAccountInfo,
  useGetNetworkConfig,
  TransactionManager,
  IPlainTransactionObject,
  parseSignUrl,
  validateSignTransactions
} from 'lib';
import { createNewTransactionsFromRaw } from '../helpers/createNewTransactionsFromRaw';

interface ValidatedTxsStateType {
  executeAfterSign?: string;
  multiSignTxs: any[]; // TODO: Define proper type
  rawTxs: IPlainTransactionObject[];
  txErrors: { [key: string]: string };
  txsDataTokens: { [key: string]: any }; // TODO: Define proper type
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

    const transactionsDisplayInfo: TransactionsDisplayInfoType = {
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

    const txManager = TransactionManager.getInstance();

    if (executeAfterSign === 'true') {
      // Send as batch transactions
      const sentTransactions = await txManager.send([mappedTransactions]);
      const sessionId = await txManager.track(sentTransactions, {
        transactionsDisplayInfo,
        disableToasts: false
      });

      if (!sessionId) {
        console.error('Batch transactions session id is invalid');
        return emptyState;
      }

      return {
        ...partialState,
        sessionId
      };
    }

    // Send as individual transactions
    const sentTransactions = await txManager.send(mappedTransactions);
    const sessionId = await txManager.track(sentTransactions, {
      transactionsDisplayInfo,
      disableToasts: false
    });

    return {
      ...partialState,
      sessionId
    };
  };

  return signHookTransactions;
};
