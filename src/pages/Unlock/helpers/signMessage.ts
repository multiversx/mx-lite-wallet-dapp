import {
  Address,
  Message,
  UserSecretKey,
  UserSigner,
  MessageComputer
} from 'lib';

interface SignMessageParams {
  message: string;
  address?: string;
  privateKey: string;
}

export const signMessage = async ({
  message,
  address,
  privateKey
}: SignMessageParams): Promise<Message> => {
  const signer = new UserSigner(UserSecretKey.fromString(privateKey));

  const msg = new Message({
    ...(address ? { address: new Address(address) } : {}),
    data: new Uint8Array(Buffer.from(message))
  });

  const messageComputer = new MessageComputer();

  const messageToSign = new Uint8Array(
    messageComputer.computeBytesForSigning(msg)
  );

  const signature = await signer.sign(Buffer.from(messageToSign));

  msg.signature = new Uint8Array(signature);

  return msg;
};
