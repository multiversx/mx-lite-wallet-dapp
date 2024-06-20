import { useState } from 'react';
import type { MouseEvent } from 'react';
import {
  faFileSignature,
  faBroom,
  faArrowsRotate
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetSignMessageSession } from '@multiversx/sdk-dapp/hooks/signMessage/useGetSignMessageSession';
import { MxLink } from 'components';
import { Button } from 'components/Button';
import { OutputContainer } from 'components/OutputContainer';
import { useSignMessage } from 'lib';
import { DataTestIdsEnum } from 'localConstants';
import { routeNames } from 'routes';
import { SignedMessageStatusesEnum } from 'types';
import { SignFailure, SignSuccess } from './components';

export const SignMessage = () => {
  const { sessionId, signMessage, onAbort } = useSignMessage();
  const messageSession = useGetSignMessageSession(sessionId);

  const [message, setMessage] = useState('');

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

  const handleClear = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAbort();
  };

  const isError = messageSession
    ? [
        (SignedMessageStatusesEnum.cancelled, SignedMessageStatusesEnum.failed)
      ].includes(messageSession.status) && messageSession?.message
    : false;

  const isSuccess =
    messageSession?.message &&
    messageSession?.status === SignedMessageStatusesEnum.signed;

  return (
    <div className='flex flex-col p-6 max-w-2xl w-full bg-white shadow-md rounded h-full'>
      <div className='flex flex-col gap-6'>
        <div className='flex gap-2 items-start'></div>
        <OutputContainer>
          {!isSuccess && !isError && (
            <textarea
              placeholder='Write message here'
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
            onClick={handleClear}
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
