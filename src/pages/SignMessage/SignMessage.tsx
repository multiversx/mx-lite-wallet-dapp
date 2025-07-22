import { MouseEvent, useEffect, useState } from 'react';
import {
  faArrowsRotate,
  faBroom,
  faFileSignature
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, OutputContainer } from 'components';
import { useReplyToDapp, useReplyWithCancelled } from 'hooks';
import {
  Address,
  getAccountProvider,
  Message,
  useGetAccount,
  parseQueryParams,
  WindowProviderResponseEnums,
  SignMessageStatusEnum
} from 'lib';
import { hookSelector } from 'redux/selectors';
import { resetHook } from 'redux/slices';
import { routeNames } from 'routes';
import { SignFailure, SignSuccess } from './components';

export const SignMessage = () => {
  const { hookUrl } = useSelector(hookSelector);
  const dispatch = useDispatch();
  const replyToDapp = useReplyToDapp();
  const replyWithCancelled = useReplyWithCancelled({
    caller: 'SignMessage'
  });
  const [message, setMessage] = useState('');
  const [signedMessage, setSignedMessage] = useState<Message | null>(null);
  const [state, setState] = useState<'pending' | 'success' | 'error'>(
    'pending'
  );
  const [signature, setSignature] = useState('');
  const { address } = useGetAccount();
  const provider = getAccountProvider();
  const navigate = useNavigate();

  useEffect(() => {
    if (hookUrl) {
      const hookParams = parseQueryParams(hookUrl);
      setMessage(hookParams.message as string);
    }
  }, [hookUrl]);

  const handleSubmit = async () => {
    try {
      const messageToSign = new Message({
        address: new Address(address),
        data: new TextEncoder().encode(message)
      });

      const signedMessageResult = await provider.signMessage(messageToSign);

      if (!signedMessageResult?.signature) {
        if (message) {
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

        setState('error');
        return;
      }

      const signatureHex = Buffer.from(signedMessageResult.signature).toString(
        'hex'
      );

      if (message && hookUrl) {
        replyToDapp({
          type: WindowProviderResponseEnums.signMessageResponse,
          payload: {
            data: {
              signature: signatureHex,
              status: SignMessageStatusEnum.signed
            }
          }
        });

        dispatch(resetHook());
      }

      setState('success');
      setSignature(signatureHex);
      setSignedMessage(signedMessageResult);
      setMessage('');
    } catch (error) {
      console.error(error);

      if (message && hookUrl) {
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
      setState('error');
    }
  };

  const handleClear = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSignature('');
    setState('pending');
  };

  const handleCancel = () => {
    dispatch(resetHook());
    navigate(routeNames.dashboard);

    if (hookUrl) {
      replyWithCancelled();
    }
  };

  return (
    <div className='flex flex-col gap-6'>
      <OutputContainer className='p-0 m-0 border-none'>
        {!['success', 'error'].includes(state) && (
          <textarea
            placeholder='Write message here'
            className='resize-none w-full h-32 rounded-lg border border-gray-300 p-3 focus:outline-none focus:border-blue-500 text-gray-800'
            value={message}
            onChange={(event) => {
              setMessage(event.currentTarget.value);
            }}
          />
        )}

        {state === 'success' && signedMessage != null && (
          <SignSuccess
            message={signedMessage}
            signature={signature}
            address={address}
          />
        )}

        {state === 'error' && <SignFailure />}
      </OutputContainer>
      <div className='flex gap-2 items-center justify-center'>
        {['success', 'error'].includes(state) ? (
          <>
            <Button
              data-testid='closeTransactionSuccessBtn'
              id='closeButton'
              onClick={handleClear}
            >
              <>
                <FontAwesomeIcon
                  icon={state === 'success' ? faBroom : faArrowsRotate}
                  className='mr-1'
                />
                {state === 'error' ? 'Try again' : 'Clear'}
              </>
            </Button>
          </>
        ) : (
          <>
            <Button
              data-testid='signMsgBtn'
              onClick={handleSubmit}
              disabled={!message.trim()}
            >
              <>
                <FontAwesomeIcon icon={faFileSignature} className='mr-1' />
                Sign
              </>
            </Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </>
        )}
      </div>
    </div>
  );
};
