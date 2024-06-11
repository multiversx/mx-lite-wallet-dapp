import { FormikHelpers } from 'formik';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetAccountInfo, usePrivateKeyCheckRedirectRoute } from 'hooks';
import { WALLET_FILE, WALLET_FILE_NAME } from 'localConstants/misc';
import { useOnFileLogin } from 'pages/Unlock/helpers';
import { accountSelector } from 'redux/selectors';
import {
  setKeystoreLogin,
  setPrivateKeyCheckRedirectRoute
} from 'redux/slices';
import { accessWallet } from './accessWallet';
import { useRedirectPathname } from './useRedirectPathname';

export interface KeystoreValuesType {
  accessPass: string;
  [WALLET_FILE]: any;
  [WALLET_FILE_NAME]: string;
}

export const useOnKeystoreSubmit = () => {
  const { t } = useTranslation(['unlock']);
  const onFileLogin = useOnFileLogin();
  const dispatch = useDispatch();
  const { token, addressIndex } = useSelector(accountSelector);
  const { address: loggedInAddress } = useGetAccountInfo();
  const navigate = useNavigate();
  const privateKeyCheckRedirectRoute = usePrivateKeyCheckRedirectRoute();
  const redirectPathName = useRedirectPathname();

  return (
    { accessPass, walletFile, fileName }: KeystoreValuesType,
    helpers?: FormikHelpers<KeystoreValuesType>
  ) => {
    const { success, error, privateKey, accountAddress } = accessWallet({
      kdContent: walletFile,
      accessPassVal: accessPass,
      t,
      index: addressIndex ?? 0
    });

    if (!success) {
      return helpers?.setErrors({ accessPass: error });
    }

    if (!loggedInAddress) {
      dispatch(
        setKeystoreLogin({
          keystoreFile: JSON.stringify({
            [WALLET_FILE]: walletFile,
            [WALLET_FILE_NAME]: fileName
          }),
          privateKey
        })
      );

      return onFileLogin({
        address: accountAddress,
        privateKey,
        token: String(token)
      });
    }

    if (accountAddress !== loggedInAddress) {
      return helpers?.setErrors({
        [WALLET_FILE]: t(
          'This is not the wallet you initiated the transaction with.'
        )
      });
    }

    dispatch(
      setKeystoreLogin({
        keystoreFile: JSON.stringify({
          [WALLET_FILE]: walletFile,
          [WALLET_FILE_NAME]: fileName
        }),
        privateKey
      })
    );

    dispatch(setPrivateKeyCheckRedirectRoute(''));

    navigate(privateKeyCheckRedirectRoute || redirectPathName, {
      replace: true
    });
  };
};
