import { useSelector } from 'react-redux';
import { replyToDapp } from 'lib';
import { hookSelector } from 'redux/selectors/hook';
import { ExtendedReplyWithPostMessageType } from 'types';

export const useReplyToDapp = () => {
  const { callbackUrl } = useSelector(hookSelector);

  return (props: ExtendedReplyWithPostMessageType) =>
    replyToDapp({
      callbackUrl,
      postMessageData: props
    });
};
