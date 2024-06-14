import { replyToDapp } from '@multiversx/sdk-js-web-wallet-io/out/replyToDapp/replyToDapp';
import { useSelector } from 'react-redux';
import { hookSelector } from 'redux/selectors/hook';
import { ReplyWithPostMessageType } from 'types';

export const useReplyToDapp = () => {
  const { callbackUrl } = useSelector(hookSelector);

  return (props: ReplyWithPostMessageType) =>
    replyToDapp({
      callbackUrl,
      postMessageData: props
    });
};
