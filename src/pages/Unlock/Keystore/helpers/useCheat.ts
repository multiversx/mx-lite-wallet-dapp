import { useDispatch, useSelector } from 'react-redux';
import { WALLET_FILE, WALLET_FILE_NAME } from 'localConstants/misc';
import { accountSelector } from 'redux/selectors';
import { setKeystoreLogin } from 'redux/slices';
import { accessWallet } from './accessWallet';
import { useOnFileLogin } from 'pages/Unlock/hooks';

const FILE = process.env.REACT_APP_KEYSTORE || '';
const PASSWORD = process.env.REACT_APP_PASSWORD || '';

export const useCheat = () => {
  const onFileLogin = useOnFileLogin();
  const dispatch = useDispatch();
  const { token } = useSelector(accountSelector);

  return () => {
    const { success, privateKey, accountAddress } = accessWallet({
      kdContent: JSON.parse(FILE),
      accessPassVal: PASSWORD,
      index: 0
    });

    if (!success) {
      return;
    }

    dispatch(
      setKeystoreLogin({
        keystoreFile: JSON.stringify({
          [WALLET_FILE]: FILE,
          [WALLET_FILE_NAME]: 'P@ssw0rd123.json'
        }),
        privateKey
      })
    );

    onFileLogin({
      address: accountAddress,
      privateKey,
      token: String(token)
    });
  };
};
