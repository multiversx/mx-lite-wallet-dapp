import { string } from 'yup';
import { Mnemonic } from 'lib';

export const mnemonicSchema = () =>
  string()
    .required('Required')
    .test('len', 'Valid secret phrases contain 24, 18 or 12 words', (val) =>
      Boolean(val && [12, 18, 24].includes(val?.split(' ').length))
    )
    .test('valid', 'Invalid mnemonic', (val) => {
      try {
        const mnemonic = Mnemonic.fromString(String(val));
        const mnemonicLength = mnemonic.getWords().length;
        return [12, 18, 24].includes(mnemonicLength);
      } catch {
        return false;
      }
    });
