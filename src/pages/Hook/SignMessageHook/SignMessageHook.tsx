import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getSignMessageHookData } from 'lib';
import { HooksEnum, HooksPageEnum } from 'localConstants';
import { setHook } from 'redux/slices';
import { HookValidationOutcome } from '../HookValidationOutcome';
import { HookStateEnum } from '../types';

export const SignMessageHook = () => {
  const dispatch = useDispatch();
  const { pathname, search } = useLocation();

  const data = useMemo(() => {
    return pathname.includes(HooksPageEnum.signMessage)
      ? getSignMessageHookData(search)
      : null;
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
        type: HooksEnum.signMessage,
        hookUrl: data.hookUrl,
        callbackUrl: data.callbackUrl ?? ''
      })
    );

    setValidUrl(HookStateEnum.valid);
  }, []);

  return (
    <HookValidationOutcome
      hook={HooksEnum.signMessage}
      callbackUrl={data?.callbackUrl}
      validUrl={validUrl}
    />
  );
};
