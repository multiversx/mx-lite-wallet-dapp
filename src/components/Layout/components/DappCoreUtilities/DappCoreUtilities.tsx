import React from 'react';
import { useSelector } from 'react-redux';
import { NotificationModal, TransactionsToastList } from 'components';
import { useGetAccount } from 'hooks';
import { CUSTOM_TOAST_DEFAULT_DURATION } from 'localConstants';
import { hookSelector } from 'redux/selectors';
import { HooksEnum } from 'routes';
import {
  InternalTestnetLoop,
  SendModals,
  SignModals,
  TransactionReceivedToast,
  VersionCheck
} from './components';

const SEND_ROUTE_HIDE_CLASS = 'hide-child';

export const DappCoreUtilities = () => {
  const { type: hook } = useSelector(hookSelector);

  const { address } = useGetAccount();
  const isLoggedIn = Boolean(address);
  const SignTransactionsModals =
    hook && hook !== HooksEnum.transaction ? SignModals : SendModals;

  if (!isLoggedIn) {
    return null;
  }

  return (
    <>
      <TransactionsToastList
        successfulToastLifetime={CUSTOM_TOAST_DEFAULT_DURATION}
        customToastClassName='transaction-toast'
        transactionToastClassName='transaction-toast'
        className={SEND_ROUTE_HIDE_CLASS}
      />

      <NotificationModal />
      <SignTransactionsModals />
      <TransactionReceivedToast />
      <VersionCheck />
      <InternalTestnetLoop />
    </>
  );
};
