import { UserSecretKey, UserWallet } from 'lib';

export interface AccessWalletType {
  kdContent: { [key: string]: any };
  accessPassVal: string;
}

export const accessWallet = ({
  kdContent,
  accessPassVal,
  index
}: { index: number } & AccessWalletType): {
  privateKey: string;
  address: string;
} | null => {
  try {
    let privateKey = '';
    let accountAddress = '';

    if (kdContent.kind === 'mnemonic') {
      const mnemonicObj = UserWallet.decryptMnemonic(kdContent, accessPassVal);
      const deriveKey = mnemonicObj.deriveKey(index);
      const secretKeyHex = deriveKey.hex();
      const secretKey = UserSecretKey.fromString(secretKeyHex);
      accountAddress = secretKey.generatePublicKey().toAddress().bech32();
      privateKey = secretKey.hex();
    } else {
      const decryptedSecretKey = UserWallet.decryptSecretKey(
        kdContent,
        accessPassVal
      );
      // will be improved once issue is fixed https://github.com/multiversx/mx-sdk-js-wallet/issues/31
      const secretKeyUint8Array = new Uint8Array(
        Buffer.from(decryptedSecretKey.hex(), 'hex')
      );
      // cast was needed because of the issue above and Jest Uint8Array issue
      // https://github.com/jestjs/jest/issues/4422
      const secretKey = new UserSecretKey(secretKeyUint8Array as Buffer);
      const address = secretKey.generatePublicKey().toAddress();
      privateKey = secretKey.hex();
      accountAddress = address.bech32();
    }

    return {
      privateKey,
      address: accountAddress
    };
  } catch (e) {
    return null;
  }
};
