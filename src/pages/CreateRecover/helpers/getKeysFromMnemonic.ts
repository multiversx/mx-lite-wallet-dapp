import { UserSecretKey, UserWallet, Mnemonic } from 'lib';

interface GetKeysFromMnemonicParamsType {
  mnemonic: string;
  password: string;
}

export const getKeysFromMnemonic = ({
  mnemonic,
  password
}: GetKeysFromMnemonicParamsType) => {
  const mnemonicObj = Mnemonic.fromString(mnemonic);
  const deriveKey = mnemonicObj.deriveKey(0);
  const secretKeyHex = deriveKey.hex();
  const secretKey = UserSecretKey.fromString(secretKeyHex);
  const address = secretKey.generatePublicKey().toAddress();
  const publicKey = address.bech32();
  const privateKey = UserWallet.fromMnemonic({
    password,
    mnemonic
  });

  return { privateKey, publicKey };
};
