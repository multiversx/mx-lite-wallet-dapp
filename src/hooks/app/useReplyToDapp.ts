import { useSelector } from 'react-redux';
import {
  ReplyWithPostMessageType,
  replyToDapp
} from 'helpers/sdkDapp/sdkJsWebWalletIo';
import { hookSelector } from 'redux/selectors/hook';

export const useReplyToDapp = () => {
  const { callbackUrl } = useSelector(hookSelector);

  return (props: ReplyWithPostMessageType) =>
    replyToDapp({
      callbackUrl,
      postMessageData: props
    });
};
