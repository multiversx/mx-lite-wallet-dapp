import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useReplyToDapp } from 'hooks';
import {
  WindowProviderResponseEnums,
  SignMessageStatusEnum,
  ReplyWithPostMessageType
} from 'lib/sdkDappWebWalletCrossWindowProvider';
import { RouteNamesEnum } from 'localConstants/routes';
import { resetHook } from 'redux/slices';

interface GetReplyDataPropsType {
  isSuccess: boolean;
  signedMessageInfo: { signature?: string; status: string };
}

export const useSignMessageCompleted = () => {
  const dispatch = useDispatch();
  const replyToDapp = useReplyToDapp();
  const navigate = useNavigate();

  const signMessageCompleted = useCallback(
    ({ isSuccess, signedMessageInfo }: GetReplyDataPropsType) => {
      try {
        const data = {
          ...(isSuccess
            ? { signature: signedMessageInfo.signature ?? '' }
            : {}),
          status:
            SignMessageStatusEnum[
              signedMessageInfo.status as keyof typeof SignMessageStatusEnum
            ]
        };

        const replyData: ReplyWithPostMessageType = {
          type: WindowProviderResponseEnums.signMessageResponse,
          payload: {
            data
          }
        };

        replyToDapp(replyData);
        dispatch(resetHook());
        navigate(RouteNamesEnum.dashboard);
      } catch (e) {
        console.error('Something went wrong: ', e);
      }
    },
    []
  );

  return signMessageCompleted;
};
