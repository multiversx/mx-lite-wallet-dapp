import { useEffect } from 'react';
import { IPlainTransactionObject } from '@multiversx/sdk-core/out';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetAccountInfo } from 'hooks';
import { useAbortAndRemoveAllTxs } from 'hooks/useAbortAndRemoveAllTx';
import { hookSelector } from 'redux/selectors';
import { resetHook } from 'redux/slices';
import { routeNames } from 'routes';
import { TransactionSignatureDataType } from 'types';
import { useReplyWithSignedTransactions } from './useReplyWithSignedTransactions';
import { mapSignedTransactions } from '../helpers';

interface UseSendSignedTxsParamsType {
  signatureData: TransactionSignatureDataType[];
  txs: IPlainTransactionObject[];
}

export const useSendSignedTxs = ({
  signatureData,
  txs
}: UseSendSignedTxsParamsType) => {
  const { callbackUrl } = useSelector(hookSelector);
  const {
    account: { address },
    ledgerAccount
  } = useGetAccountInfo();
  const navigate = useNavigate();
  const replyWithSignedTransactions = useReplyWithSignedTransactions();
  const dispatch = useDispatch();
  const removeAllTransactions = useAbortAndRemoveAllTxs();

  useEffect(() => {
    const signingEnabled =
      txs.length > 0 && signatureData.length === txs.length;

    if (!signingEnabled) {
      return;
    }

    const transactions = mapSignedTransactions({
      txs,
      signatureData,
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
  }, [txs, signatureData]);
};
