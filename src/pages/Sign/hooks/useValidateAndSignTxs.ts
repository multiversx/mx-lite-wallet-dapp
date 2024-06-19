import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useReplyWithCancelled } from 'hooks';
import { useAbortAndRemoveAllTxs } from 'hooks/useAbortAndRemoveAllTx';
import { useGetAccountInfo, useGetSignedTransactions } from 'lib';

import { TransactionBatchStatusesEnum } from 'localConstants';
import { hookSelector } from 'redux/selectors';
import { resetHook } from 'redux/slices';
import { routeNames } from 'routes';
import { SignedTransactionType, TransactionSignatureDataType } from 'types';
import { useReplyWithSignedTransactions } from './useReplyWithSignedTransactions';
import {
  ValidateAndSignTxsReturnType,
  useSignHookTransactions
} from './useSignHookTransactions';
import { mapSignedTransactions } from '../helpers';

/*
  This is a hook that validates and signs transactions as a two-step process
*/
export const useValidateAndSignTxs = (): ValidateAndSignTxsReturnType => {
  const { hookUrl, callbackUrl } = useSelector(hookSelector);

  const replyWithSignedTransactions = useReplyWithSignedTransactions();
  const navigate = useNavigate();

  const replyWithCancelled = useReplyWithCancelled({
    caller: 'useSignTransactions'
  });
  const dispatch = useDispatch();
  const removeAllTransactions = useAbortAndRemoveAllTxs();

  const { signedTransactions } = useGetSignedTransactions();
  const {
    account: { address },
    ledgerAccount
  } = useGetAccountInfo();
  const [state, setState] = useState<ValidateAndSignTxsReturnType>({
    multiSignTxs: [],
    txErrors: {},
    txsDataTokens: {},
    rawTxs: [],
    sessionId: null
  });

  const signHookTransactions = useSignHookTransactions();

  const sendReplyToDapp = () => {
    if (state.sessionId == null) {
      return [];
    }

    const sessionObject = signedTransactions[state.sessionId];

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

  const validateAndSign = async () => {
    const newState = await signHookTransactions(hookUrl);
    setState(newState);
  };

  // 1. Validate and sign transactions
  useEffect(() => {
    validateAndSign();
  }, [hookUrl]);

  // 2. Reply with signed transactions
  useEffect(() => {
    sendReplyToDapp();
  }, [signedTransactions, state]);

  return state;
};
