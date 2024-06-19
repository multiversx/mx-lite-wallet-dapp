import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import uniq from 'lodash/uniq';

import { SignTransactionsModals } from 'components';

import {
  useGetAccountProvider,
  useSignTransactionsWithDevice,
  useSignTransactionsWithLedger,
  useGetLastPendingTransactionHash,
  useSignTransactionsCommonData,
  useGetSignTransactionsError
} from 'lib';

import { MAX_ALLOWED_TRANSACTIONS_TO_SIGN } from 'localConstants';
import { signTransactionsCancelMessageSelector } from 'redux/sdkDapp.selectors';
import { sdkDappStore } from 'redux/sdkDapp.store';
import {
  LoginMethodsEnum,
  MultiSignTransactionType,
  SignModalPropsType
} from 'types';

const isUnderMaxAllowedTransactions = (
  allTransactions: MultiSignTransactionType[]
) => {
  const uniqNonces = uniq(
    allTransactions.map(({ transaction }) => transaction.getNonce().valueOf())
  );
  return uniqNonces.length <= MAX_ALLOWED_TRANSACTIONS_TO_SIGN;
};

const CustomConfirmScreens = {
  Extra: (props: SignModalPropsType) => {
    const { onSignTransaction, allTransactions, currentTransaction } =
      useSignTransactionsWithDevice({
        onCancel: props.handleClose
      });

    const ref = useRef(null);

    useEffect(() => {
      const sign =
        isUnderMaxAllowedTransactions(allTransactions) &&
        currentTransaction &&
        ref.current != null;

      if (sign) {
        onSignTransaction();
      }
    }, [allTransactions, currentTransaction]);

    return <div ref={ref} />;
  },
  Ledger: (props: SignModalPropsType) => {
    const { onSignTransaction, currentTransaction, allTransactions } =
      useSignTransactionsWithLedger({
        onCancel: props.handleClose
      });

    const ref = useRef(null);

    useEffect(() => {
      const sign =
        isUnderMaxAllowedTransactions(allTransactions) &&
        currentTransaction &&
        ref.current != null;

      if (sign) {
        onSignTransaction();
      }
    }, [allTransactions, currentTransaction]);

    return <div ref={ref} />;
  }
};

export const SendModals = () => {
  const { providerType } = useGetAccountProvider();
  const { onAbort, transactionsToSign } = useSignTransactionsCommonData();
  const lastPendingTxHash = useGetLastPendingTransactionHash();
  const signTransactionsError = useGetSignTransactionsError();
  const [lastTxHash, setLastTxHash] = useState(lastPendingTxHash);

  useEffect(() => {
    // Preserve the latest pending transaction hash
    // even after all transactions completed
    if (lastPendingTxHash && lastTxHash !== lastPendingTxHash) {
      setLastTxHash(lastPendingTxHash);
    }
  }, [lastPendingTxHash]);

  const signTransactionsCancelMessage = signTransactionsCancelMessageSelector(
    sdkDappStore.getState()
  );

  useEffect(() => {
    const shouldAbort =
      signTransactionsError || Boolean(signTransactionsCancelMessage);

    if (shouldAbort) {
      onAbort(transactionsToSign?.sessionId);
    }
  }, [
    signTransactionsCancelMessage,
    transactionsToSign,
    signTransactionsError
  ]);

  return (
    <SignTransactionsModals
      className={classNames({
        'd-none': providerType !== LoginMethodsEnum.extra
      })}
      CustomConfirmScreens={CustomConfirmScreens}
    />
  );
};
