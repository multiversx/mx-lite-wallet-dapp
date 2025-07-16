import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getSignMessageHookData } from 'lib';
import { HooksEnum } from 'localConstants';
import { hookSelector } from 'redux/selectors';
import { setHook } from 'redux/slices';
import { HookValidationOutcome } from '../HookValidationOutcome';
import { HookStateEnum } from '../types';

export const SignMessageHook = () => {
  const dispatch = useDispatch();
  const { pathname, search } = useLocation();
  const { hookUrl } = useSelector(hookSelector);

  const data = useMemo(() => {
    return search.length > 0
      ? getSignMessageHookData(search)
      : getSignMessageHookData(hookUrl);
  }, [pathname]);

  const [validUrl, setValidUrl] = useState<HookStateEnum>(
    HookStateEnum.pending
  );

  // Removed automatic sign execution; signing will be handled in SignMessage page

  useEffect(() => {
    console.log('data', data);
    console.log('hookUrl', hookUrl);
    console.log('pathname', pathname);
    console.log('search', search);

    if (data == null) {
      return setValidUrl(HookStateEnum.invalid);
    }

    if (data.hookUrl !== hookUrl) {
      dispatch(
        setHook({
          type: HooksEnum.signMessage,
          hookUrl: data.hookUrl,
          callbackUrl: data.callbackUrl ?? ''
        })
      );
    }

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
