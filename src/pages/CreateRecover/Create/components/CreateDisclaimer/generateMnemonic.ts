import { Mnemonic } from '@multiversx/sdk-wallet/out';

export function generateMnemonic() {
  const mnemonic = Mnemonic.generate().getWords();
  return mnemonic;
}
