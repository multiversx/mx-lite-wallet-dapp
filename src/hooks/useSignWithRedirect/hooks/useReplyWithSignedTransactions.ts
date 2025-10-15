import { useSelector } from 'react-redux';
import { IPlainTransactionObject } from 'lib/sdkCore';
import { WindowProviderResponseEnums } from 'lib/sdkDappWebWalletCrossWindowProvider';
import { replyToDapp } from 'lib/sdkJsWebWalletIo';
import { hookSelector } from 'redux/selectors';

interface ReplyWithSignedTransactionsType {
  callbackUrl?: string;
}

export const useReplyWithSignedTransactions = (
  props?: ReplyWithSignedTransactionsType
) => {
  const hook = useSelector(hookSelector);
  const callbackUrl = props?.callbackUrl ?? hook.callbackUrl;

  return (transactions: IPlainTransactionObject[]) => {
    replyToDapp({
      callbackUrl,
      postMessageData: {
        type: WindowProviderResponseEnums.signTransactionsResponse,
        payload: {
          data: transactions
        }
      }
    });
  };
};
