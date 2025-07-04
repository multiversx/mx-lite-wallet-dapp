import { mixed, object, string } from 'yup';
import { WALLET_FILE } from 'localConstants/misc';

export const keystoreValidationSchema = object().shape({
  accessPass: string().required('Keystore password is required'),
  [WALLET_FILE]: mixed()
    .required('Keystore file is required')
    .test('isFile', 'Invalid keystore file', (value) => Boolean(value))
});
