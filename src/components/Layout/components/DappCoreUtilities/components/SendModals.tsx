import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import uniq from 'lodash/uniq';
import { useSelector } from 'react-redux';

import { SignTransactionsModals } from 'components';
import { replyToDapp } from 'helpers';

import {
  useGetAccountProvider,
  useGetAccount,
  useGetActiveTransactionsStatus,
  useGetLastPendingTransactionHash,
  useGetSignTransactionsError
} from 'hooks';
import {
  useSignTransactionsCommonData,
  useSignTransactionsWithLedger,
  useSignTransactionsWithDevice,
  useReplyWithCancelled
} from 'hooks';
import {
  HookResponseStatusEnum,
  MAX_ALLOWED_TRANSACTIONS_TO_SIGN
} from 'localConstants';
import { sdkDappStore } from 'redux/sdkDapp.store';
import {
  hookSelector,
  signTransactionsCancelMessageSelector
} from 'redux/selectors';
import { HooksEnum } from 'routes';
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
  const { fail, success } = useGetActiveTransactionsStatus();
  const signTransactionsError = useGetSignTransactionsError();
  const { type: hook, callbackUrl } = useSelector(hookSelector);
  const { address, isGuarded } = useGetAccount();
  const replyWithCancelled = useReplyWithCancelled({
    caller: 'SendModals'
  });
  const [lastTxHash, setLastTxHash] = useState(lastPendingTxHash);

  useEffect(() => {
    // Preserve the latest pending transaction hash
    // even after all transactions completed
    if (lastPendingTxHash && lastTxHash !== lastPendingTxHash) {
      setLastTxHash(lastPendingTxHash);
    }
  }, [lastPendingTxHash]);

  useEffect(() => {
    if (hook !== HooksEnum.transaction) {
      return;
    }

    if (fail) {
      replyWithCancelled();
    }

    if (success && lastTxHash && callbackUrl) {
      replyToDapp({
        callbackUrl,
        transactionData: {
          address,
          status: HookResponseStatusEnum.success,
          txHash: lastTxHash
        }
      });
    }
  }, [fail, success, hook, lastTxHash]);

  const signTransactionsCancelMessage = signTransactionsCancelMessageSelector(
    sdkDappStore.getState()
  );

  useEffect(() => {
    const shouldAbort =
      (isGuarded && signTransactionsError) ||
      Boolean(signTransactionsCancelMessage);

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
