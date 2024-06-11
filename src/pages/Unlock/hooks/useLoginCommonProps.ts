import { useDispatch, useSelector } from 'react-redux';
import { useGetAccount, useNavigate } from 'hooks';

import { accountSelector, hookSelector } from 'redux/selectors';
import { routeNames } from 'routes';

import { useGetNativeAuthConfig } from './useGetNativeAuthConfig';
import { useRedirectPathname } from '../Keystore/helpers/useRedirectPathname';
import { OnProviderLoginType } from 'types/sdkDapp.types';
import { setAccountAddress } from 'redux/slices';

export const useLoginCommonProps = () => {
  const { type: hook, loginToken } = useSelector(hookSelector);
  const { token: initToken } = useSelector(accountSelector);
  const { address } = useGetAccount();
  const dispatch = useDispatch();
  const pathname = useRedirectPathname();
  const navigate = useNavigate({ from: 'useLoginCommonProps' });
  const nativeAuthConfig = useGetNativeAuthConfig();
  const token = hook ? loginToken : initToken;

  const onLoginRedirect = () => {
    navigate(routeNames.unlock);
    dispatch(setAccountAddress(address));
  };

  const props: OnProviderLoginType & {
    wrapContentInsideModal: boolean;
    hideButtonWhenModalOpens: boolean;
    logoutRoute: string;
  } = {
    callbackRoute: pathname,
    onLoginRedirect,
    hideButtonWhenModalOpens: true,
    logoutRoute: routeNames.unlock,
    wrapContentInsideModal: false
  };

  if (hook) {
    props.nativeAuth = loginToken ? nativeAuthConfig : false;
  } else {
    props.nativeAuth = nativeAuthConfig;
  }

  if (token) {
    props.token = token;
  }

  return props;
};
