import { useDispatch, useSelector } from 'react-redux';
import {
  getAccount,
  getToken,
  loginWithExternalProvider,
  useLoginService
} from 'helpers';

import { useNavigate, usePrivateKeyCheckRedirectRoute } from 'hooks';
import {
  sdkDappSetAccount,
  sdkDappSetAddress,
  sdkDappStore
} from 'redux/sdkDapp.store';
import { hookSelector } from 'redux/selectors';
import {
  clearPrivateKeyCheckRedirectRoute,
  setAccountAddress,
  setExternalNativeAuthToken,
  setTokenLogin,
  setWalletOrigin
} from 'redux/slices';

import { routeNames } from 'routes';
import { useGetNativeAuthConfig } from './useGetNativeAuthConfig';
import { signMessage } from '../helpers';
import { useRedirectPathname } from '../Keystore/helpers/useRedirectPathname';

interface UseOnLoginType {
  address: string;
  loginToken?: string;
  privateKey: string;
}

interface UseOnFileLoginType {
  shouldFetchAccount: boolean;
}

export const generateTokenSignature = ({
  address,
  loginToken,
  privateKey
}: UseOnLoginType) => {
  const message = `${address}${loginToken}{}`;
  return signMessage({ message, privateKey });
};

export const useOnFileLogin = (props?: UseOnFileLoginType) => {
  const dispatch = useDispatch();
  const { loginToken, hasNativeAuthToken } = useSelector(hookSelector);
  const nativeAuthConfig = useGetNativeAuthConfig();
  const loginService = useLoginService(nativeAuthConfig);
  const navigate = useNavigate({ from: 'useOnFileLogin' });
  const privateKeyCheckRedirectRoute = usePrivateKeyCheckRedirectRoute();
  const redirectPathName = useRedirectPathname();

  return async ({
    address,
    noRedirect,
    privateKey,
    token
  }: UseOnLoginType & {
    noRedirect?: boolean;
    token?: string;
  }) => {
    const usedToken = loginToken || token;
    let signature = '';

    if (!privateKeyCheckRedirectRoute && usedToken) {
      signature = (
        await generateTokenSignature({
          address,
          loginToken: usedToken,
          privateKey
        })
      ).signature.toString('hex');
    }

    if (loginToken && hasNativeAuthToken) {
      const externalNativeAuthToken = getToken({
        address,
        token: loginToken,
        signature
      });

      dispatch(setExternalNativeAuthToken(externalNativeAuthToken));
    } else if (token) {
      dispatch(setTokenLogin({ loginToken: token, signature }));

      if (signature) {
        loginService.setLoginToken(token);
        loginService.setTokenLoginInfo({
          signature,
          address
        });
      }
    }

    if (props?.shouldFetchAccount) {
      const account = await getAccount(address);

      if (account) {
        sdkDappStore.dispatch(sdkDappSetAddress(address));
        sdkDappStore.dispatch(
          sdkDappSetAccount({
            ...account,
            address,
            nonce: account.nonce.valueOf()
          })
        );
      }
    }

    loginWithExternalProvider(address);
    dispatch(setAccountAddress(address));

    if (noRedirect) {
      return;
    }

    // Clear redirect route after navigation was initiated
    setTimeout(() => {
      dispatch(clearPrivateKeyCheckRedirectRoute());
    });

    const navigateRoute = privateKeyCheckRedirectRoute || redirectPathName;

    if ([routeNames['sign-message'], routeNames.sign].includes(navigateRoute)) {
      dispatch(
        setWalletOrigin({
          pathname: routeNames.dashboard,
          search: ''
        })
      );
    }

    navigate(navigateRoute, {
      replace: true
    });
  };
};
