import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  useAbortAndRemoveAllTxs,
  useAppCleanup,
  useGetLoginInfo,
  useNavigate
} from 'hooks';
import { multiSigTransactionsSelector } from 'modules/MultiSig/redux/selectors';
import { sdkDappLogoutAction, sdkDappStore } from 'redux/sdkDapp.store';
import { hookSelector } from 'redux/selectors';
import { resetHook } from 'redux/slices';
import { HooksEnum, routeNames } from 'routes';

const STORAGE_ACCOUNT_KEY = 'persist:account';
let shouldLogout = false;

const onload = () => {
  if (!window.opener) {
    return;
  }

  const existingAccount = sessionStorage.getItem(STORAGE_ACCOUNT_KEY);

  try {
    const address = existingAccount
      ? JSON.parse(existingAccount).address
      : null;

    if (!address) {
      return;
    }

    sessionStorage.clear();
    shouldLogout = true;
  } catch {}
};

onload();

export const UnauthenticatedLoginGuard = () => {
  const { isLoggedIn, tokenLogin } = useGetLoginInfo();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const nativeAuthToken = tokenLogin?.nativeAuthToken;
  const { type: hook } = useSelector(hookSelector);
  const appCleanup = useAppCleanup();
  const navigate = useNavigate({ from: 'UnauthenticatedLoginGuard' });
  const isUnloadingRef = useRef(false);
  const removeAllTransactions = useAbortAndRemoveAllTxs();
  const [wasLoginHook, setWasLoginHook] = useState(false);
  const multiSigTransactions = useSelector(multiSigTransactionsSelector);
  const isPartialLogin = isLoggedIn && !nativeAuthToken && !window.opener;
  const directUrlLogin = !hook && isPartialLogin;

  const handleOnLoad = () => {
    if (!window.localStorage.unloadTime) {
      return;
    }

    const loadTime = new Date();
    const unloadTime = new Date(JSON.parse(window.localStorage.unloadTime));
    const refreshTime = loadTime.getTime() - unloadTime.getTime();

    // if the user re-enters the site after 3 seconds, he is logged out
    if (refreshTime > 3000 && isLoggedIn) {
      navigate(routeNames.logout, {
        state: { caller: 'UnauthenticatedLoginGuard windw.onLoad' }
      });
    }
  };

  const handleBeforeUnload = () => {
    isUnloadingRef.current = true;
    window.localStorage.unloadTime = JSON.stringify(new Date());
    removeAllTransactions();
    dispatch(resetHook());
  };

  const preventSessionRestoreOnBrowserReopen = () => {
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('onload', handleOnLoad);
  };

  useEffect(() => {
    if (shouldLogout) {
      shouldLogout = false;
      appCleanup({
        keepCurrentExtensionState: true
      });

      sdkDappStore.dispatch(sdkDappLogoutAction());
    }

    return () => {
      window.removeEventListener('onload', handleOnLoad);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    const flowStartedWithLoginHook = hook === HooksEnum.login;

    if (flowStartedWithLoginHook) {
      setWasLoginHook(true);
    }
  }, [wasLoginHook]);

  useEffect(() => {
    if (pathname.includes('/hook')) {
      return;
    }

    preventSessionRestoreOnBrowserReopen();
  }, [isLoggedIn]);

  useEffect(() => {
    if (pathname.includes('/hook') || wasLoginHook) {
      return;
    }

    // Prevent logout after signing proposals from dapp
    const isMultiSig = multiSigTransactions.length > 0;

    if (
      isLoggedIn &&
      directUrlLogin &&
      !isUnloadingRef.current &&
      !isMultiSig
    ) {
      navigate(routeNames.logout, {
        state: { caller: 'UnauthenticatedLoginGuard' }
      });
    }
  }, [directUrlLogin, isLoggedIn, pathname, hook]);

  return null;
};
