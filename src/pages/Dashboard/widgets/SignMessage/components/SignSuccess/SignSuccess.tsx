import { Label } from 'components';
import { CopyButton, Message } from 'lib';

import { styles } from './signSuccess.styles';
import { decodeMessage } from '../../helpers';

interface VerifyMessagePropsType {
  message: Message;
  signature: string;
  address: string;
}

export const SignSuccess = (props: VerifyMessagePropsType) => {
  if (props.message == null) {
    return null;
  }

  const { encodedMessage, decodedMessage } = decodeMessage({
    message: props.message,
    signature: props.signature
  });

  return (
    <div className={styles.signSuccessContainer}>
      <div className={styles.signSuccess}>
        <div className={styles.signatureContainer}>
          <Label>Signature:</Label>

          <textarea
            readOnly
            className={styles.signatureText}
            rows={2}
            defaultValue={props.signature}
          />

          <CopyButton text={props.signature} />
        </div>

        <div className={styles.encodedMessageContainer}>
          <Label>Encoded message:</Label>

          <p>{encodedMessage}</p>
        </div>

        <div className={styles.decodedMessageContainer}>
          <Label>Decoded message:</Label>

          <textarea
            readOnly
            className={styles.decodedMessageText}
            rows={1}
            value={decodedMessage}
            placeholder='Decoded message'
          />
        </div>
      </div>
    </div>
  );
};
