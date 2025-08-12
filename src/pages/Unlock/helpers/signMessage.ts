import { Message, UserSecretKey, UserSigner, MessageComputer } from 'lib';

interface SignMessageParams {
  message: Message;
  privateKey: string;
}

export const signMessage = async ({
  message,
  privateKey
}: SignMessageParams): Promise<Message> => {
  const signer = new UserSigner(UserSecretKey.fromString(privateKey));
  const messageComputer = new MessageComputer();

  const messageToSign = new Uint8Array(
    messageComputer.computeBytesForSigning(message)
  );

  const signature = await signer.sign(new Uint8Array(messageToSign));
  message.signature = new Uint8Array(signature);

  return message;
};
