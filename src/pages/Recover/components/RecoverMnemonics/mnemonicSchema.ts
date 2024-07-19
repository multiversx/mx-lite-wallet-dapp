import { Mnemonic } from '@multiversx/sdk-wallet/out';
import { TFunction } from 'i18next';
import { string } from 'yup';

export function mnemonicSchema({ t, c }: { t: TFunction; c: TFunction }) {
  const schema = string()
    .required(c('Required'))
    .test('len', t('Valid secret phrases contain 24, 18 or 12 words'), (val) =>
      Boolean(val && [12, 18, 24].includes(val?.split(' ').length))
    )
    .test('valid', t('Invalid mnemonic'), (val) => {
      try {
        const mnemonic = Mnemonic.fromString(String(val));
        const mnemonicLength = mnemonic.getWords().length;
        return [12, 18, 24].includes(mnemonicLength);
      } catch {
        return false;
      }
    });
  return schema;
}
