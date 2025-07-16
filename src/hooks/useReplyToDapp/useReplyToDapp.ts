import { useSelector } from 'react-redux';
import { replyToDapp } from 'lib';
import type { ReplyWithPostMessageType } from 'lib/sdkDappWebWalletCrossWindowProvider/sdkDappWebWalletCrossWindowProvider.types';
import { hookSelector } from 'redux/selectors/hook';

let lastReplyPayload = '';

export const useReplyToDapp = () => {
  const { callbackUrl } = useSelector(hookSelector);

  return (postMessageData: ReplyWithPostMessageType) => {
    const payload = {
      callbackUrl,
      postMessageData
    };

    const newPayload = JSON.stringify(payload);

    if (newPayload === lastReplyPayload) {
      return;
    }

    lastReplyPayload = newPayload;

    replyToDapp(payload);
  };
};
