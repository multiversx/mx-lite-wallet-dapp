import type {
  OperaWalletLoginButtonPropsType,
  LedgerLoginButtonPropsType,
  WalletConnectLoginButtonPropsType
} from '@multiversx/sdk-dapp/UI';
import { useDispatch, useSelector } from 'react-redux';
import {
  ExtensionLoginButton,
  LedgerLoginButton,
  OperaWalletLoginButton,
  WalletConnectLoginButton,
  XaliasLoginButton
} from 'components/sdkDappComponents';
import { nativeAuth } from 'config';
import { RouteNamesEnum } from 'localConstants';
import { useNavigate } from 'react-router-dom';
import { AuthRedirectWrapper } from 'wrappers';
import { WebWalletLoginWrapper, WebWalletLoginConfigEnum } from './components';
import { networkSelector } from '@multiversx/sdk-dapp/reduxStore/selectors/networkConfigSelectors';
import { sdkDappStore } from 'redux/sdkDapp.store';
import { useInitToken } from './helpers';
import { useRedirectPathname } from './Keystore/helpers/useRedirectPathname';
import { walletOriginSelector } from 'redux/selectors';
import { useGetLoginInfo } from 'hooks/sdkDappHooks';

type CommonPropsType =
  | OperaWalletLoginButtonPropsType
  | LedgerLoginButtonPropsType
  | WalletConnectLoginButtonPropsType;

export const Unlock = () => {
  const activeNetwork = networkSelector(sdkDappStore.getState());
  const dispatch = useDispatch();
  const getInitToken = useInitToken();
  const redirectPathName = useRedirectPathname();
  const navigate = useNavigate();
  const walletOrigin = useSelector(walletOriginSelector);
  const { tokenLogin, isLoggedIn } = useGetLoginInfo();
  const { token: initToken } = useSelector(accountSelector);
  const onLoginHookRedirect = useOnLoginHookRedirect();
  const { type: hook, loginToken: hookLoginToken } = useSelector(hookSelector);
  const token = hook ? hookLoginToken : initToken;
  const disabledConnectButton = getIsNativeAuthSingingForbidden(token);

  useEffect(() => {
    if (!hookLoginToken) {
      getInitToken();
    }
  }, [hook, activeNetwork.id]);

  const onLoginRedirect = () => {
    if (!isLoggedIn) {
      return;
    }

    const shouldSetDashboardBgPage =
      walletOrigin.pathname !== routeNames.dashboard;

    if (shouldSetDashboardBgPage) {
      dispatch(
        setWalletOrigin({
          pathname: routeNames.dashboard,
          search: ''
        })
      );
      navigate(routeNames.dashboard);
    }

    if (hook === HooksEnum.login) {
      onLoginHookRedirect();
    }

    return navigate(redirectPathName, { replace: true });
  };

  useEffect(onLoginRedirect, [hook, tokenLogin, isLoggedIn, walletOrigin]);

  const isProxyLoginFromHook =
    decodeLoginToken(String(hookLoginToken)) != null || disabledConnectButton;

  const navigate = useNavigate();
  const commonProps: CommonPropsType = {
    callbackRoute: RouteNamesEnum.dashboard,
    nativeAuth,
    onLoginRedirect: () => {
      navigate(RouteNamesEnum.dashboard);
    }
  };

  return (
    <AuthRedirectWrapper requireAuth={false}>
      <div className='flex justify-center items-center'>
        <div
          className='flex flex-col p-6 items-center justify-center gap-4 rounded-xl bg-[#f6f8fa]'
          data-testid='unlockPage'
        >
          <div className='flex flex-col items-center gap-1'>
            <h2 className='text-2xl'>Login</h2>

            <p className='text-center text-gray-400'>Choose a login method</p>
          </div>

          <div className='flex flex-col md:flex-row'>
            <WalletConnectLoginButton
              loginButtonText='xPortal App'
              {...commonProps}
            />
            <LedgerLoginButton loginButtonText='Ledger' {...commonProps} />
            <ExtensionLoginButton
              loginButtonText='DeFi Wallet'
              {...commonProps}
            />
            <OperaWalletLoginButton
              loginButtonText='Opera Crypto Wallet - Beta'
              {...commonProps}
            />

            <XaliasLoginButton
              loginButtonText='xAlias'
              data-testid='xAliasLoginBtn'
              {...commonProps}
            />
          </div>
        </div>
      </div>
    </AuthRedirectWrapper>
  );
};
