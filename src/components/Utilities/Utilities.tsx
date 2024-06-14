import { TransactionsToastList, NotificationModal } from 'components';
import { useGetIsLoggedIn } from 'hooks';
import { CUSTOM_TOAST_DEFAULT_DURATION } from 'localConstants';
import { PostMessageListener, SendModals } from './components';

export const Utilities = () => {
  const isLoggedIn = useGetIsLoggedIn();

  const SignTransactionsModals = SendModals; // hook ? SignModals : SendModals;

  if (!isLoggedIn) {
    return null;
  }

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
