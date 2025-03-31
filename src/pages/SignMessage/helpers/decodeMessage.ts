import { Address, Message, MessageComputer, verifyMessage } from 'lib';

export const decodeMessage = async ({
  address,
  message,
  signature
}: {
  address: string;
  message: string;
  signature: string;
}): Promise<{ encodedMessage: string; decodedMessage: string }> => {
  const messageToSign = new Message({
    ...(address ? { address: new Address(address) } : {}),
    data: new Uint8Array(Buffer.from(message))
  });

  const messageComputer = new MessageComputer();
  const packedMessage = messageComputer.packMessage(messageToSign);
  const encodedMessage = `0x${packedMessage.message}`;

  const stringifiedMessage = JSON.stringify({
    ...packedMessage,
    message: encodedMessage,
    signature: `0x${signature}`
  });

  const newMessage = await verifyMessage(stringifiedMessage);

  return {
    encodedMessage: encodedMessage,
    decodedMessage: newMessage.message ?? ''
  };
};
