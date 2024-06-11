import { CrossWindowProviderResponseEnums } from 'helpers/sdkDapp/sdkJsWebWalletIo';
import { useReplyToDapp } from './useReplyToDapp';
import { useSelector } from 'react-redux';
import { accountSelector } from 'redux/selectors';

const DEBUG = false;

export const useReplyWithCancelled = (debugProps?: { caller: string }) => {
  const { address } = useSelector(accountSelector);
  const replyToDapp = useReplyToDapp();

  return () => {
    if (DEBUG) {
      console.log('-----------REPLY WITH CANCELLED----------', {
        caller: debugProps?.caller
      });
    }

    replyToDapp({
      type: CrossWindowProviderResponseEnums.cancelResponse,
      payload: {
        data: {
          address: String(address)
        }
      }
    });

    if (window.opener) {
      window.close();
    }
  };
};
