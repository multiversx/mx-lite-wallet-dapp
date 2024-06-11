import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getSignHookData } from 'helpers/sdkDapp/sdkJsWebWalletIo';
import { setHook } from 'redux/slices';
import { HooksEnum } from 'routes';
import { useSignTxSchema } from '../helpers';
import { HookValidationOutcome } from '../HookValidationOutcome';
import { HookStateEnum } from '../types';

export const SignHook = () => {
  const dispatch = useDispatch();
  const schema = useSignTxSchema();
  const getData = getSignHookData(schema);
  const { pathname, search } = useLocation();

  const data = useMemo(() => {
    return pathname.includes(HooksEnum.sign) ? getData(search) : null;
  }, [pathname]);

  const [validUrl, setValidUrl] = useState<HookStateEnum>(
    HookStateEnum.pending
  );

  useEffect(() => {
    if (data == null) {
      return setValidUrl(HookStateEnum.invalid);
    }

    dispatch(
      setHook({
        type: HooksEnum.sign,
        hookUrl: data.hookUrl,
        callbackUrl: data.callbackUrl ?? ''
      })
    );

    setValidUrl(HookStateEnum.valid);
  }, []);

  return (
    <HookValidationOutcome
      hook={HooksEnum.sign}
      callbackUrl={data?.callbackUrl}
      validUrl={validUrl}
    />
  );
};
