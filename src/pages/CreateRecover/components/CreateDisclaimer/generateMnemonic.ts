import { Mnemonic } from 'lib/sdkCore';

export function generateMnemonic() {
  const mnemonic = Mnemonic.generate().getWords();
  return mnemonic;
}
