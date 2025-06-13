import { useSelector } from 'react-redux';
import { replyToDapp, ExtendedReplyWithPostMessageType } from 'lib';
import { hookSelector } from 'redux/selectors/hook';

export const useReplyToDapp = () => {
  const { callbackUrl } = useSelector(hookSelector);

  return (props: ExtendedReplyWithPostMessageType) =>
    replyToDapp({
      callbackUrl,
      postMessageData: props
    });
};
