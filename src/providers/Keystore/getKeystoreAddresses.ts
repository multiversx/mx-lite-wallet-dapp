import range from 'lodash/range';
import { Mnemonic, UserSecretKey, UserWallet } from 'lib/sdkCore';
import { AccessWalletType } from './accessWallet';

const getAddressAndPrivateKeyForIndex = (mnemonic: Mnemonic, index: number) => {
  const deriveKey = mnemonic.deriveKey(index);
  const secretKeyHex = deriveKey.hex();
  const secretKey = UserSecretKey.fromString(secretKeyHex);
  const address = secretKey.generatePublicKey().toAddress().toBech32();
  const privateKey = secretKey.hex();
  return {
    address,
    privateKey
  };
};

export const getKeystoreAddresses = ({
  kdContent,
  accessPassVal,
  index,
  count
}: AccessWalletType & {
  index: number;
  count: number;
}) => {
  const mnemonicObj = UserWallet.decryptMnemonic(kdContent, accessPassVal);
  const startIndex = index * count;
  const endIndex = startIndex + count;
  return range(startIndex, endIndex).map((currentIndex) => {
    return getAddressAndPrivateKeyForIndex(mnemonicObj, currentIndex);
  });
};
