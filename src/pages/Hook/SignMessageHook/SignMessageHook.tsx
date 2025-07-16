import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useReplyToDapp } from 'hooks';
import {
  Address,
  Message,
  getAccountProvider,
  getSignMessageHookData,
  parseQueryParams,
  useGetAccount
} from 'lib';
import { WindowProviderResponseEnums } from 'lib';
import { SignMessageStatusEnum } from 'lib';
import { HooksEnum, HooksPageEnum } from 'localConstants';
import { hookSelector } from 'redux/selectors';
import { resetHook, setHook } from 'redux/slices';
import { HookValidationOutcome } from '../HookValidationOutcome';
import { HookStateEnum } from '../types';

export const SignMessageHook = () => {
  const dispatch = useDispatch();
  const { pathname, search } = useLocation();
  const { address } = useGetAccount();
  const provider = getAccountProvider();
  const replyToDapp = useReplyToDapp();
  const { hookUrl } = useSelector(hookSelector);

  const data = useMemo(() => {
    return pathname.includes(HooksPageEnum.signMessage)
      ? getSignMessageHookData(search)
      : getSignMessageHookData(hookUrl);
  }, [pathname]);

  const [validUrl, setValidUrl] = useState<HookStateEnum>(
    HookStateEnum.pending
  );

  const signMessageDirectly = async () => {
    try {
      // Extract message from the URL params
      const hookParams = parseQueryParams(hookUrl) as { message: string };

      if (!hookParams.message) {
        throw new Error('Message not found in parameters');
      }

      // Create message object to sign
      const messageToSign = new Message({
        address: new Address(address),
        data: new TextEncoder().encode(hookParams.message)
      });

      // Sign the message
      const signedMessageResult = await provider.signMessage(messageToSign);

      console.log('signedMessageResult', signedMessageResult);

      if (!signedMessageResult?.signature) {
        throw new Error('Failed to sign message');
      }

      // Format the signature for reply
      const signature = Buffer.from(signedMessageResult.signature).toString(
        'hex'
      );

      // Reply to dapp with signed message
      replyToDapp({
        type: WindowProviderResponseEnums.signMessageResponse,
        payload: {
          data: {
            signature,
            status: SignMessageStatusEnum.signed
          }
        }
      });

      // Clean up
      dispatch(resetHook());
    } catch (error) {
      console.error('Error signing message:', error);
      // Reply with error
      replyToDapp({
        type: WindowProviderResponseEnums.signMessageResponse,
        payload: {
          data: {
            status: SignMessageStatusEnum.failed
          }
        }
      });

      dispatch(resetHook());
    }
  };

  useEffect(() => {
    if (data == null) {
      return setValidUrl(HookStateEnum.invalid);
    }

    if (data.hookUrl === hookUrl) {
      return;
    }

    dispatch(
      setHook({
        type: HooksEnum.signMessage,
        hookUrl: data.hookUrl,
        callbackUrl: data.callbackUrl ?? ''
      })
    );

    setValidUrl(HookStateEnum.valid);
  }, []);

  useEffect(() => {
    if (validUrl === HookStateEnum.valid && data) {
      signMessageDirectly();
    }
  }, [validUrl, data]);

  return (
    <HookValidationOutcome
      hook={HooksEnum.signMessage}
      callbackUrl={data?.callbackUrl}
      validUrl={validUrl}
    />
  );
};
