import { FormikHelpers } from 'formik';
import { accessWallet } from './accessWallet';
import { KeystoreValuesType } from './useOnKeystoreSubmit';

export const getOnKeystoreRead = () => {
  const onRead = (
    { accessPass, walletFile, fileName }: KeystoreValuesType,
    { setErrors }: FormikHelpers<KeystoreValuesType>
  ) => {
    const { success, error } = accessWallet({
      kdContent: walletFile,
      accessPassVal: accessPass,
      index: 0
    });

    if (!success) {
      return setErrors({ accessPass: error });
    }

    if (walletFile.kind === 'mnemonic') {
      return {
        kdContent: walletFile,
        accessPassVal: accessPass,
        fileName
      };
    }
    return null;
  };
  return onRead;
};
