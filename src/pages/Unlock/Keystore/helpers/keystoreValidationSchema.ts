import { mixed, object, string } from 'yup';
import { WALLET_FILE } from 'localConstants/misc';

export const keystoreValidationSchema = object().shape({
  accessPass: string().required('Required'),
  [WALLET_FILE]: mixed()
    .required('Required')
    .test(
      'hasKeys',
      'Invalid keystore file',
      (value) =>
        value &&
        typeof value === 'object' &&
        value !== null &&
        Object.keys(value).length > 0
    )
});
