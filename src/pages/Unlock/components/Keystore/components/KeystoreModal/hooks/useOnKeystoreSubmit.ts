import { FormikHelpers } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useRedirectPathname } from 'hooks';
import { useGetAccountInfo } from 'lib';
import { WALLET_FILE, WALLET_FILE_NAME } from 'localConstants/misc';
import { useOnFileLogin } from 'pages/Unlock/hooks';
import { accountSelector } from 'redux/selectors';
import { setKeystoreLogin } from 'redux/slices';
import { accessWallet } from '../helpers';

export interface KeystoreValuesType {
  accessPass: string;
  [WALLET_FILE]: any;
  [WALLET_FILE_NAME]: string;
}

export const useOnKeystoreSubmit = () => {
  const onFileLogin = useOnFileLogin();
  const dispatch = useDispatch();
  const { token, addressIndex } = useSelector(accountSelector);
  const { address: loggedInAddress } = useGetAccountInfo();
  const navigate = useNavigate();
  const { pathname: redirectPathName } = useRedirectPathname();

  return (
    { accessPass, walletFile, fileName }: KeystoreValuesType,
    helpers?: FormikHelpers<KeystoreValuesType>
  ) => {
    const data = accessWallet({
      kdContent: walletFile,
      accessPassVal: accessPass,
      index: addressIndex ?? 0
    });

    if (!data) {
      return helpers?.setErrors({
        accessPass: 'Please check your uploaded file or your password'
      });
    }

    const { privateKey, address: accountAddress } = data;

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
        [WALLET_FILE]:
          'This is not the wallet you initiated the transaction with.'
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

    if (!loggedInAddress) {
      navigate(redirectPathName, {
        replace: true
      });
    }
  };
};
