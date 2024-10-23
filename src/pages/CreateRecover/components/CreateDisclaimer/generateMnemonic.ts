import { Mnemonic } from 'lib';

export function generateMnemonic() {
  const mnemonic = Mnemonic.generate().getWords();
  return mnemonic;
}
