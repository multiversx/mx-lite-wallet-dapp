import { useState, useEffect } from 'react';
import { CopyButton } from 'components';
import { Label } from 'components/Label';
import { useGetAccountInfo, useGetLastSignedMessageSession } from 'lib';
import { decodeMessage } from '../helpers';

export const SignSuccess = ({ messageToSign }: { messageToSign: string }) => {
  const { address } = useGetAccountInfo();
  const signedMessageInfo = useGetLastSignedMessageSession();

  const [encodedMessage, setEncodedMessage] = useState('');
  const [decodedMessage, setDecodedMessage] = useState('');

  const fetchDecodedMessage = async () => {
    if (!signedMessageInfo?.signature) {
      return;
    }

    const { signature } = signedMessageInfo;
    const result = await decodeMessage({
      address,
      message: messageToSign,
      signature
    });

    setEncodedMessage(result.encodedMessage);
    setDecodedMessage(result.decodedMessage);
  };

  useEffect(() => {
    fetchDecodedMessage();
  }, [signedMessageInfo]);

  if (!signedMessageInfo?.signature) {
    return null;
  }

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col w-[calc(100%-50px)]'>
        <div className='flex flex-row w-full gap-2'>
          <Label>Signature:</Label>

          <textarea
            readOnly
            className='w-full resize-none outline-none bg-transparent'
            rows={2}
            defaultValue={signedMessageInfo.signature}
          />
          <CopyButton text={signedMessageInfo.signature} />
        </div>

        <div className='flex flex-row w-full gap-2'>
          <Label>Encoded message:</Label>
          <p>{encodedMessage}</p>
        </div>

        <div className='flex flex-row w-full gap-2'>
          <Label>Decoded message:</Label>
          <textarea
            readOnly
            className='resize-none outline-none text-green-700 bg-transparent'
            rows={1}
            value={decodedMessage}
            placeholder='Decoded message'
          />
        </div>
      </div>
    </div>
  );
};
