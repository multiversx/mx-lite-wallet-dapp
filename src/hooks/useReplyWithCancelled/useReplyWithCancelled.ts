import { useDispatch } from 'react-redux';
import {
  clearCompletedTransactions,
  useGetAccount,
  WindowProviderResponseEnums
} from 'lib';
import { resetHook } from 'redux/slices';
import { useReplyToDapp } from '../useReplyToDapp';

const DEBUG = false;

type ReplyWithCancelledPropsType =
  | {
      shouldResetHook?: boolean;
    }
  | undefined;

export const useReplyWithCancelled = (debugProps?: { caller: string }) => {
  const { address } = useGetAccount();
  const dispatch = useDispatch();
  const replyToDapp = useReplyToDapp();

  return (props: ReplyWithCancelledPropsType = { shouldResetHook: true }) => {
    if (DEBUG) {
      console.log('-----------REPLY WITH CANCELLED----------', {
        caller: debugProps?.caller
      });
    }

    if (props.shouldResetHook) {
      dispatch(resetHook({ wasCancelled: true }));
      clearCompletedTransactions();
    }

    replyToDapp({
      type: WindowProviderResponseEnums.cancelResponse,
      payload: {
        data: {
          address
        }
      }
    });

    if (window.opener) {
      window.close();
    }
  };
};
