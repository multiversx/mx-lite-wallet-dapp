import { MouseEvent, useState } from 'react';
import {
  faArrowsRotate,
  faBroom,
  faPaste,
  faPenNib
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MvxButton } from '@multiversx/sdk-dapp-ui/react';

import { OutputContainer } from 'components';
import { Address, getAccountProvider, Message, useGetAccount } from 'lib';
import { ItemsIdentifiersEnum } from 'pages/Dashboard/dashboard.types';

import { SignFailure, SignSuccess } from './components';
import { styles } from './signMessage.styles';

export const SignMessage = () => {
  const [message, setMessage] = useState('');
  const [signedMessage, setSignedMessage] = useState<Message | null>(null);
  const [state, setState] = useState<'pending' | 'success' | 'error'>(
    'pending'
  );

  const [signatrue, setSignatrue] = useState('');
  const { address } = useGetAccount();
  const provider = getAccountProvider();

  const handleSubmit = async () => {
    try {
      const messageToSign = new Message({
        address: new Address(address),
        data: new Uint8Array(Buffer.from(message))
      });

      const signedMessageResult = await provider.signMessage(messageToSign);

      if (!signedMessageResult?.signature) {
        setState('error');
        return;
      }

      setState('success');
      setSignatrue(Buffer.from(signedMessageResult?.signature).toString('hex'));
      setSignedMessage(signedMessageResult);
      setMessage('');
    } catch (error) {
      console.error(error);
      setState('error');
    }
  };

  const handleClear = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSignatrue('');
    setState('pending');
  };

  const handlePasteClick = async () => {
    const message = await navigator.clipboard.readText();

    setMessage(message);
  };

  return (
    <div
      id={ItemsIdentifiersEnum.signMessage}
      className={styles.signMessageContainer}
    >
      <div className={styles.signMessage}>
        <label className={styles.signMessageLabel}>Message</label>
        <OutputContainer>
          {!['success', 'error'].includes(state) && (
            <textarea
              placeholder='Write message here'
              className={styles.signMessageText}
              value={message}
              onChange={(event) => {
                setMessage(event.currentTarget.value);
              }}
              onKeyUp={(event) => {
                setMessage(event.currentTarget.value);
              }}
            />
          )}

          {state === 'success' && signedMessage != null && (
            <SignSuccess
              message={signedMessage}
              signature={signatrue}
              address={address}
            />
          )}

          <div className={styles.signMessagePasteButtonContainer}>
            <button
              onClick={handlePasteClick}
              className={styles.signMessagePasteButton}
            >
              <span className={styles.signMessagePasteButtonText}>Paste</span>

              <FontAwesomeIcon
                icon={faPaste}
                className={styles.signMessagePasteButtonText}
              />
            </button>
          </div>

          {state === 'error' && <SignFailure />}
        </OutputContainer>
      </div>

      <div className={styles.signMessageButton}>
        {['success', 'error'].includes(state) ? (
          <MvxButton
            data-testid='closeTransactionSuccessBtn'
            id='closeButton'
            onClick={handleClear}
          >
            <FontAwesomeIcon
              icon={state === 'success' ? faBroom : faArrowsRotate}
              className={styles.signButtonContent}
            />

            <span className={styles.signButtonContent}>
              {state === 'error' ? 'Try again' : 'Clear'}
            </span>
          </MvxButton>
        ) : (
          <MvxButton data-testid='signMsgBtn' onClick={handleSubmit}>
            <FontAwesomeIcon
              icon={faPenNib}
              className={styles.signButtonContent}
            />

            <span className={styles.signButtonContent}>Sign</span>
          </MvxButton>
        )}
      </div>
    </div>
  );
};
