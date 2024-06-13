import React, { useEffect, useMemo, useState } from 'react';
import { getLoginHookData } from '@multiversx/sdk-js-web-wallet-io/out/hooks/loginHook/getLoginHookData';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { logout } from 'helpers';
import { useGetAccount } from 'hooks';
import { HooksEnum } from 'localConstants';
import { setHook } from 'redux/slices';
import { HookValidationOutcome } from '../HookValidationOutcome';
import { HookStateEnum } from '../types';

export const LoginHook = () => {
  const { address } = useGetAccount();
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
      logout();
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
