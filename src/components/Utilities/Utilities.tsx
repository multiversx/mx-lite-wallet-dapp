import { TransactionsToastList, NotificationModal } from 'components';
import { CUSTOM_TOAST_DEFAULT_DURATION } from 'localConstants';
import { PostMessageListener, SendModals } from './components';

export const Utilities = () => {
  const SignTransactionsModals = SendModals; // hook ? SignModals : SendModals;

  return (
    <>
      <TransactionsToastList
        successfulToastLifetime={CUSTOM_TOAST_DEFAULT_DURATION}
        customToastClassName='transaction-toast'
        transactionToastClassName='transaction-toast'
      />
      <NotificationModal />
      <SignTransactionsModals />
      <PostMessageListener />
    </>
  );
};
