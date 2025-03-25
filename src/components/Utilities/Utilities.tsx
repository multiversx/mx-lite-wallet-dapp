import { useSelector } from 'react-redux';
import {
  TransactionsToastList,
  NotificationModal,
  AxiosInterceptorContext
} from 'components';
import { CUSTOM_TOAST_DEFAULT_DURATION } from 'localConstants';
import { hookSelector } from 'redux/selectors';
import {
  PostMessageListener,
  SendModals,
  SignModals,
  RedirectWebviewLogin
} from './components';

export const Utilities = () => {
  const { type: hook } = useSelector(hookSelector);

  const SignTransactionsModals = hook ? SignModals : SendModals;

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
      <AxiosInterceptorContext.Listener />
      <RedirectWebviewLogin />
    </>
  );
};
