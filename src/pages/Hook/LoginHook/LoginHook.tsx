import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getLoginHookData } from 'helpers/sdkDapp/sdkJsWebWalletIo';
import { useGetAccount, useLogout } from 'hooks';
import { setHook } from 'redux/slices';
import { HooksEnum } from 'routes';
import { HookValidationOutcome } from '../HookValidationOutcome';
import { HookStateEnum } from '../types';

export const LoginHook = () => {
  const { address } = useGetAccount();
  const logout = useLogout('LoginHook');
  const dispatch = useDispatch();
  const { pathname, search } = useLocation();

  const data = useMemo(() => {
    return pathname.includes(HooksEnum.login) ? getLoginHookData(search) : null;
  }, [pathname]);

  const [validUrl, setValidUrl] = useState<HookStateEnum>(
    HookStateEnum.pending
  );

  useEffect(() => {
    // Prevent re-login
    if (address) {
      logout({
        noRedirect: true // allow login hook to be validated without redirecting
      });
      return;
    }

    if (!data) {
      return setValidUrl(HookStateEnum.invalid);
    }

    dispatch(
      setHook({
        type: HooksEnum.login,
        hookUrl: data.hookUrl,
        callbackUrl: data.callbackUrl,
        loginToken: data.token
      })
    );

    setValidUrl(HookStateEnum.valid);
  }, [address]);

  return (
    <HookValidationOutcome
      hook={HooksEnum.login}
      callbackUrl={data?.callbackUrl}
      validUrl={validUrl}
    />
  );
};
