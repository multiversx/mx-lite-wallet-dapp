import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { getAccount, getToken, loginWithExternalProvider } from 'helpers';
import { useLoginService } from 'hooks';
import {
  sdkDappSetAccount,
  sdkDappSetAddress,
  sdkDappStore
} from 'redux/sdkDapp.store';
import { hookSelector } from 'redux/selectors';

import {
  setAccountAddress,
  setExternalNativeAuthToken,
  setTokenLogin
} from 'redux/slices';
import { routeNames } from 'routes';
import { signMessage } from '../helpers';

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
  const loginService = useLoginService();
  const navigate = useNavigate();

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

    if (usedToken) {
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

    navigate(routeNames.dashboard, {
      replace: true
    });
  };
};
