import { Address, SignableMessage, UserSecretKey, UserSigner } from 'lib';

interface SignMessageParams {
  message: string;
  address?: string;
  privateKey: string;
}

export const signMessage = async ({
  message,
  address,
  privateKey
}: SignMessageParams): Promise<SignableMessage> => {
  const signer = new UserSigner(UserSecretKey.fromString(privateKey));

  const messageToSign = new SignableMessage({
    ...(address ? { address: new Address(address) } : {}),
    message: Buffer.from(message)
  });
  const serializedMessage = messageToSign.serializeForSigning();
  const signature = await signer.sign(serializedMessage);
  messageToSign.applySignature(signature);

  return messageToSign;
};
