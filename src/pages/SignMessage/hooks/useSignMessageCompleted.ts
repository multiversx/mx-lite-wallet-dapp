import { useCallback } from 'react';
import { SignedSessionType } from '@multiversx/sdk-dapp/reduxStore/slices';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useReplyToDapp } from 'hooks';
import { resetHook } from 'redux/slices';
import { routeNames } from 'routes';
import {
  WindowProviderResponseEnums,
  SignMessageStatusEnum,
  ExtendedReplyWithPostMessageType
} from 'types';

interface GetReplyDataPropsType {
  isSuccess: boolean;
  signedMessageInfo: SignedSessionType;
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
          status: SignMessageStatusEnum[signedMessageInfo.status]
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
