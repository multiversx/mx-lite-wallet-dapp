import { IPlainTransactionObject } from '@multiversx/sdk-core/out';
import { useSelector } from 'react-redux';
import { replyToDapp } from 'lib';
import { hookSelector } from 'redux/selectors';
import { CrossWindowProviderResponseEnums } from 'types';

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
        type: CrossWindowProviderResponseEnums.signTransactionsResponse,
        payload: {
          data: transactions
        }
      }
    });
  };
};
