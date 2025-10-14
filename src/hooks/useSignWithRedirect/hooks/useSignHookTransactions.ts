import type { TransactionsDisplayInfoType } from '@multiversx/sdk-dapp/out/types/transactions.types';
import { Transaction, IPlainTransactionObject } from 'lib/sdkCore';
import {
  useGetAccountInfo,
  useGetNetworkConfig
} from 'lib/sdkDapp/sdkDapp.hooks';
import {
  TransactionManager,
  getAccountProvider
} from 'lib/sdkDapp/sdkDapp.utils';
import { validateSignTransactions } from 'lib/sdkDappForm/sdkDappForm.utils';
import { parseSignUrl } from 'lib/sdkJsWebWalletIo/sdkJsWebWalletIo.utils';
import { createNewTransactionsFromRaw } from '../helpers/createNewTransactionsFromRaw';

export interface ValidateAndSignTxsReturnType {
  sessionId: string | null;
  signedTransactions: Transaction[] | null;
  txErrors: { [key: string]: string };
}

const emptyState: ValidateAndSignTxsReturnType = {
  signedTransactions: [],
  txErrors: {},
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

  const provider = getAccountProvider();

  const signHookTransactions = async (
    hookUrl: string
  ): Promise<ValidateAndSignTxsReturnType> => {
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

    if (!txData || Object.keys(txData.errors).length > 0) {
      return {
        ...emptyState,
        txErrors: txData?.errors || {}
      };
    }

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

    const txManager = TransactionManager.getInstance();

    try {
      const signedTransactions =
        await provider.signTransactions(mappedTransactions);

      const partialState: ValidateAndSignTxsReturnType = {
        sessionId: null,
        txErrors: txData.errors,
        signedTransactions
      };

      if (executeAfterSign === 'true') {
        const sentTransactions = await txManager.send(signedTransactions);
        const sessionId = await txManager.track(sentTransactions, {
          transactionsDisplayInfo,
          disableToasts: false
        });

        if (!sessionId) {
          console.error('Transactions session id is invalid');
          return emptyState;
        }

        return {
          ...partialState,
          sessionId
        };
      }

      return partialState;
    } catch (error) {
      console.error(error);
      return emptyState;
    }
  };

  return signHookTransactions;
};
