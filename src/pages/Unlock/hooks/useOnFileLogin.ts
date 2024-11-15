import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { useRedirectPathname } from 'hooks';
import {
  getToken,
  loginWithExternalProvider,
  useLoginService,
  useGetAccountInfo
} from 'lib';
import { hookSelector } from 'redux/selectors';

import {
  setAccountAddress,
  setExternalNativeAuthToken,
  setTokenLogin
} from 'redux/slices';
import { useGetNativeAuthConfig } from './useGetNativeAuthConfig';
import { signMessage } from '../helpers';

interface UseOnLoginType {
  address: string;
  loginToken?: string;
  privateKey: string;
}

export const generateTokenSignature = ({
  address,
  loginToken,
  privateKey
}: UseOnLoginType) => {
  const message = `${address}${loginToken}{}`;
  return signMessage({ message, privateKey });
};

export const useOnFileLogin = () => {
  const dispatch = useDispatch();
  const { loginToken, hasNativeAuthToken } = useSelector(hookSelector);
  const { address: loggedInAddress } = useGetAccountInfo();
  const nativeAuthConfig = useGetNativeAuthConfig();
  const loginService = useLoginService(nativeAuthConfig);
  const navigate = useNavigate();
  const { getRedirectPathname } = useRedirectPathname();

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
      const msg = await generateTokenSignature({
        address,
        loginToken: usedToken,
        privateKey
      });

      if (!msg.signature) {
        console.error('Token not signed');
        return;
      }

      signature = Buffer.from(msg.signature).toString('hex');
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

    loginWithExternalProvider(address);
    dispatch(setAccountAddress(address));

    if (noRedirect) {
      return;
    }

    const redirectPathName = getRedirectPathname();

    if (!loggedInAddress) {
      navigate(redirectPathName, {
        replace: true
      });
    }
  };
};
