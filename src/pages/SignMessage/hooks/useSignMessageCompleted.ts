import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useReplyToDapp } from 'hooks';
import { SignedSessionType } from 'lib';
import {
  WindowProviderResponseEnums,
  SignMessageStatusEnum,
  ExtendedReplyWithPostMessageType
} from 'lib';
import { resetHook } from 'redux/slices';
import { routeNames } from 'routes';

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

        const replyData: ExtendedReplyWithPostMessageType = {
          type: WindowProviderResponseEnums.signMessageResponse,
          payload: {
            data
          }
        };

        replyToDapp(replyData);
        dispatch(resetHook());
        navigate(routeNames.dashboard);
      } catch (e) {
        console.error('Something went wrong: ', e);
      }
    },
    []
  );

  return signMessageCompleted;
};
