import { useEffect, useState } from 'react';
import { IPlainTransactionObject } from '@multiversx/sdk-core/out';
import { useGetAccountInfo, useGetNetworkConfig } from 'hooks';

import { parseSignUrl, validateSignTransactions } from 'lib';
import { MultiSignTransactionType, TransactionsDataTokensType } from 'types';

export interface UseValidateAndBuildUrlTransactionsType {
  hookUrl: string;
}

export interface ValidatedTxsStateType {
  executeAfterSign?: string;
  multiSignTxs: MultiSignTransactionType[];
  rawTxs: IPlainTransactionObject[];
  txErrors: { [key: string]: string };
  txsDataTokens: TransactionsDataTokensType;
  multiSigContract?: string | null;
}

export const useValidateAndBuildUrlTransactions = ({
  hookUrl
}: UseValidateAndBuildUrlTransactionsType) => {
  const {
    network: { chainId, apiAddress, apiTimeout, egldLabel }
  } = useGetNetworkConfig();

  const { account } = useGetAccountInfo();

  const apiConfig = {
    baseURL: apiAddress,
    timeout: parseInt(String(apiTimeout))
  };

  const [txState, setTxState] = useState<ValidatedTxsStateType>({
    multiSignTxs: [],
    rawTxs: [],
    txErrors: {},
    txsDataTokens: {}
  });

  const { txs: rawTxs, executeAfterSign } =
    parseSignUrl<IPlainTransactionObject>(hookUrl);

  const buildAndValidate = async () => {
    const balance = account.balance;
    const address = account.address;

    const txData = await validateSignTransactions({
      extractedTxs: rawTxs,
      address,
      egldLabel: String(egldLabel),
      balance,
      chainId: String(chainId),
      apiConfig
    });

    if (!txData) {
      return;
    }

    const { errors, parsedTransactions } = txData;

    setTxState({
      executeAfterSign,
      multiSignTxs: parsedTransactions,
      rawTxs,
      txErrors: errors,
      txsDataTokens: txData.txsDataTokens
    });
  };

  useEffect(() => {
    buildAndValidate();
  }, [hookUrl]);

  return txState;
};
