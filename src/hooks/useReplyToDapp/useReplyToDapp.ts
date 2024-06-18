import { useSelector } from 'react-redux';
import { replyToDapp } from 'lib';
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
