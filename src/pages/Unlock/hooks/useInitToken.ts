import { useDispatch, useSelector } from 'react-redux';

import { useGetLoginInfo, useLoginService } from 'hooks';
import { hookSelector } from 'redux/selectors';
import { setToken } from 'redux/slices';
import { HooksEnum } from 'routes';

import { useGetNativeAuthConfig } from './useGetNativeAuthConfig';

interface InitTokenType {
  renewToken?: boolean;
}

export const useInitToken = () => {
  const { type: hook, loginToken } = useSelector(hookSelector);
  const { isLoggedIn } = useGetLoginInfo();

  const dispatch = useDispatch();
  const nativeAuthConfig = useGetNativeAuthConfig();
  const loginService = useLoginService(nativeAuthConfig);

  const getInitToken = async (props?: InitTokenType) => {
    if (hook === HooksEnum.login) {
      dispatch(setToken(loginToken ?? ''));
      return loginToken;
    }

    if (!isLoggedIn || props?.renewToken) {
      try {
        const newToken = await loginService.getNativeAuthLoginToken();
        dispatch(setToken(newToken));
        return newToken;
      } catch (error) {
        console.error('Unable to fetch login token', error);
      }
    }

    dispatch(setToken(''));
    return '';
  };

  return getInitToken;
};
