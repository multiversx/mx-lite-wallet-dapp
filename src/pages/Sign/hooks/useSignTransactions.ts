import { useMemo, useState } from 'react';
import { IPlainTransactionObject } from '@multiversx/sdk-core/out';
import { useReplyWithCancelled } from 'hooks';

import { TransactionBatchStatusesEnum } from 'localConstants/sdkDapp.constants';
import {
  SignedTransactionType,
  SignedTransactionsType,
  TransactionSignatureDataType
} from 'types';
import { useSendSignedTxs } from './useSendSignedTxs';
import { mapAndSendTransactions } from '../helpers';

interface UseSignTransactionsParamsType {
  txErrors: { [p: string]: string };
  chainId?: string;
  address: string;
  rawTxs: IPlainTransactionObject[];
  signedTransactions: SignedTransactionsType;
}

export const useSignTransactions = ({
  address,
  chainId,
  rawTxs,
  signedTransactions,
  txErrors
}: UseSignTransactionsParamsType) => {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const replyWithCancelled = useReplyWithCancelled({
    caller: 'useSignTransactions'
  });

  const signTransactions = async (props = { signWithoutSending: true }) => {
    const noErrors = Object.keys(txErrors).length === 0;
    const readyToSign = rawTxs.length > 0 && noErrors;

    if (readyToSign && sessionId == null && chainId) {
      const id = await mapAndSendTransactions({
        address,
        chainId,
        transactions: rawTxs,
        signWithoutSending: props.signWithoutSending
      });

      setSessionId(id);
    }
  };

  const signatureData = useMemo(() => {
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

    return txsSignatures;
  }, [signedTransactions, sessionId]);

  useSendSignedTxs({ signatureData, txs: rawTxs });

  return { sessionId, signTransactions };
};
