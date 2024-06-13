import { ReplyWithPostMessageType } from '@multiversx/sdk-dapp-utils/out/types';
import { replyToDapp } from '@multiversx/sdk-js-web-wallet-io/out/replyToDapp/replyToDapp';
import { useSelector } from 'react-redux';
import { hookSelector } from 'redux/selectors/hook';

export const useReplyToDapp = () => {
  const { callbackUrl } = useSelector(hookSelector);

  return (props: ReplyWithPostMessageType) =>
    replyToDapp({
      callbackUrl,
      postMessageData: props
    });
};
