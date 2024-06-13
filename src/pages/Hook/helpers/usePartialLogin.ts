import { LoginMethodsEnum } from '@multiversx/sdk-dapp/types';
import { useGetKeystoreData } from 'pages/Unlock/Keystore/helpers/useKeystoreManager/methods';
import { useDispatch } from 'react-redux';
import {
  getRemoteKeystoreSessionKey,
  loginWithExternalProvider
} from 'helpers';
import { useLogout } from 'hooks';
import { useLazyRefreshSessionQuery } from 'redux/endpoints';
import {
  loginAction,
  setLedgerLogin,
  setWalletConnectLogin,
  useDappDispatch
} from 'redux/sdkDapp.store';
import {
  FileLoginEnum,
  setAccountAddress,
  setKeystoreLogin,
  setKeystoreSessionKey,
  setPemLogin,
  setIsWalletConnectV2Initializing
} from 'redux/slices';
import { routeNames } from 'routes';
import { waitForWalletConnectV2Initialization } from './waitForWalletConnectV2Initialization';

export const usePartialLogin = () => {
  const dispatch = useDispatch();
  const { getKeystoreDataBySessionKey } = useGetKeystoreData();
  const sdkDappDispatch = useDappDispatch();
  const logout = useLogout('usePartialLogin');
  const [refreshSession] = useLazyRefreshSessionQuery();

  const partialLogin = async ({
    callback,
    localKeystoreSessionKey
  }: {
    callback?: () => void;
    localKeystoreSessionKey: string;
  }) => {
    const data = getKeystoreDataBySessionKey(localKeystoreSessionKey);

    if (!data) {
      return logout({
        skipCloseWindowOnRelogin: true,
        keystoreSessionKey: localKeystoreSessionKey
      });
    }

    const { address, keystoreData, type, ledgerData } = data;

    dispatch(setKeystoreSessionKey(localKeystoreSessionKey));

    switch (type) {
      case FileLoginEnum.keystore: {
        const remoteSessionKey = getRemoteKeystoreSessionKey({
          localKeystoreSessionKey,
          keystoreSessionSalt: String(keystoreData?.keystoreSessionSalt)
        });
        const { data: refreshSessionData } =
          await refreshSession(remoteSessionKey);
        if (!refreshSessionData?.sessionActive) {
          return logout({
            skipCloseWindowOnRelogin: true,
            keystoreSessionKey: null
          });
        }

        dispatch(
          setKeystoreLogin({
            keystoreFileName: keystoreData?.fileName ?? '',
            privateKey: ''
          })
        );
        dispatch(setAccountAddress(address));
        loginWithExternalProvider(address);
        break;
      }

      case FileLoginEnum.pem: {
        dispatch(setPemLogin(''));
        dispatch(setAccountAddress(address));
        loginWithExternalProvider(address);
        break;
      }

      case LoginMethodsEnum.ledger: {
        sdkDappDispatch(
          setLedgerLogin({
            index: ledgerData?.index ?? 0,
            loginType: LoginMethodsEnum.ledger
          })
        );

        sdkDappDispatch(
          loginAction({ address, loginMethod: LoginMethodsEnum.ledger })
        );

        sdkDappDispatch(setAccountAddress(address));
        break;
      }

      case LoginMethodsEnum.extension: {
        sdkDappDispatch(
          loginAction({ address, loginMethod: LoginMethodsEnum.extension })
        );

        sdkDappDispatch(setAccountAddress(address));
        break;
      }

      case LoginMethodsEnum.walletconnectv2: {
        dispatch(setIsWalletConnectV2Initializing(true));
        sdkDappDispatch(
          setWalletConnectLogin({
            logoutRoute: routeNames.logout,
            loginType: 'walletconnectv2',
            callbackRoute: routeNames.unlock
          })
        );

        sdkDappDispatch(
          loginAction({
            address,
            loginMethod: LoginMethodsEnum.walletconnectv2
          })
        );

        sdkDappDispatch(setAccountAddress(address));

        try {
          await waitForWalletConnectV2Initialization({ maxRetries: 10 });
        } catch (error) {
          console.error(error);
        } finally {
          dispatch(setIsWalletConnectV2Initializing(false));
        }

        break;
      }
    }

    callback?.();
  };

  return {
    partialLogin,
    getKeystoreDataBySessionKey
  };
};
