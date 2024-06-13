import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetIsLoggedIn, useRedirectPathname } from 'hooks';
import { HooksEnum } from 'localConstants';
import { hookSelector } from 'redux/selectors';
import { useOnLoginHookRedirect } from './useOnLoginHookRedirect';

export const useUnlockRedirect = () => {
  const isLoggedIn = useGetIsLoggedIn();
  const onLoginHookRedirect = useOnLoginHookRedirect();
  const navigate = useNavigate();
  const { type: hook } = useSelector(hookSelector);
  const { getRedirectPathname, pathname } = useRedirectPathname();
  // const persistCrossWindowLogin = usePersistCrossWindowLogin();
  const shouldRedirect = isLoggedIn && pathname;

  const onUnlockRedirect = () => {
    if (hook === HooksEnum.login) {
      onLoginHookRedirect();
    }

    const redirectPathName = getRedirectPathname();
    navigate(redirectPathName, { replace: true });
  };

  useEffect(() => {
    if (!shouldRedirect) {
      return;
    }

    // persistCrossWindowLogin();
    onUnlockRedirect();
  }, [hook, isLoggedIn, shouldRedirect]);

  return onUnlockRedirect;
};
