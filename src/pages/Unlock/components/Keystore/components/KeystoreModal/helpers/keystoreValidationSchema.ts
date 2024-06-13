import { mixed, object, string } from 'yup';
import { WALLET_FILE } from 'localConstants/misc';

export const keystoreValidationSchema = object().shape({
  accessPass: string().required('Required'),
  [WALLET_FILE]: mixed()
    .required('Required')
    .test('isFile', 'Invalid keystore file', (value) => {
      const isValid = value && value !== null;
      return isValid;
    })
});
