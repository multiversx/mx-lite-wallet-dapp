import { useEffect, useState } from 'react';
import type { MouseEvent } from 'react';
import {
  faFileSignature,
  faBroom,
  faArrowsRotate
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetSignMessageSession } from '@multiversx/sdk-dapp/hooks/signMessage/useGetSignMessageSession';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MxLink } from 'components';
import { Button } from 'components/Button';
import { OutputContainer } from 'components/OutputContainer';
import { useReplyWithCancelled } from 'hooks';
import { CANCELLED, parseQueryParams, useSignMessage } from 'lib';
import { DataTestIdsEnum, HooksEnum } from 'localConstants';
import { hookSelector } from 'redux/selectors';
import { routeNames } from 'routes';
import { SignedMessageStatusesEnum } from 'types';
import { SignFailure, SignSuccess } from './components';
import { useSignMessageCompleted } from './hooks';

export const SignMessage = () => {
  const { sessionId, signMessage, onAbort, onCancel } = useSignMessage();
  const messageSession = useGetSignMessageSession(sessionId);
  const { type: hook, callbackUrl, hookUrl } = useSelector(hookSelector);
  const navigate = useNavigate();
  const replyWithCancelled = useReplyWithCancelled({
    caller: 'SignModals'
  });
  const signMessageCompleted = useSignMessageCompleted();

  const isSignMessageHook = hook === HooksEnum.signMessage;

  const [message, setMessage] = useState<string>(
    isSignMessageHook ? String(parseQueryParams(hookUrl).message) : ''
  );

  console.log('\x1b[42m%s\x1b[0m', message);

  const handleSubmit = (e: MouseEvent) => {
    e.preventDefault();

    if (messageSession) {
      onAbort();
    }

    if (!message.trim()) {
      return;
    }

    signMessage({
      message,
      callbackRoute: routeNames.signMessage
    });

    setMessage('');
  };

  const isSuccess =
    messageSession?.message &&
    messageSession?.status === SignedMessageStatusesEnum.signed;

  useEffect(() => {
    if (isSuccess) {
      signMessageCompleted({ isSuccess, signedMessageInfo: messageSession });
    }

    return () => {
      onAbort();
      setMessage('');
    };
  }, [isSuccess]);

  const handleSignMessageCloseFlow = () => {
    if (!isSignMessageHook) {
      onAbort();
      navigate(routeNames.dashboard);
      return;
    }

    onCancel({
      errorMessage: CANCELLED,
      callbackRoute: callbackUrl ?? window.location.href
    });

    replyWithCancelled();
    navigate(routeNames.dashboard);
  };

  const isError = messageSession
    ? [
        (SignedMessageStatusesEnum.cancelled, SignedMessageStatusesEnum.failed)
      ].includes(messageSession.status) && messageSession?.message
    : false;

  return (
    <div className='flex flex-col p-6 max-w-2xl w-full bg-white shadow-md rounded h-full'>
      <div className='flex flex-col gap-6'>
        <div className='flex gap-2 items-start'></div>
        <OutputContainer>
          {!isSuccess && !isError && (
            <textarea
              placeholder='Write message here'
              disabled={isSignMessageHook}
              value={message}
              className='resize-none w-full h-32 rounded-lg focus:outline-none focus:border-blue-500'
              onChange={(event) => setMessage(event.currentTarget.value)}
            />
          )}

          {isSuccess && (
            <SignSuccess messageToSign={messageSession?.message ?? ''} />
          )}

          {isError && <SignFailure />}
        </OutputContainer>
        {isSuccess || isError ? (
          <Button
            data-testid={DataTestIdsEnum.cancelSignMessageBtn}
            className='mt-4 mx-auto rounded-lg bg-blue-500 px-4 py-2 text-sm text-white'
            id='closeButton'
            onClick={handleSignMessageCloseFlow}
          >
            <FontAwesomeIcon
              icon={isSuccess ? faBroom : faArrowsRotate}
              className='mr-1'
            />
            {isError ? 'Try again' : 'Clear'}
          </Button>
        ) : (
          <Button
            className='mt-4 mx-auto rounded-lg bg-blue-500 px-4 py-2 text-sm text-white'
            dataTestId={DataTestIdsEnum.signMessageBtn}
            onClick={handleSubmit}
          >
            <FontAwesomeIcon icon={faFileSignature} className='mr-1' />
            Sign Message
          </Button>
        )}

        <MxLink
          className='block w-full mt-2 px-4 py-2 text-sm text-center text-blue-600'
          data-testid={DataTestIdsEnum.cancelBtn}
          to={routeNames.dashboard}
        >
          Cancel
        </MxLink>
      </div>
    </div>
  );
};
