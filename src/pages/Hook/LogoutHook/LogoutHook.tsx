import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLogout } from 'hooks';
import { getLogoutHookData, replyToDapp } from 'lib';
import { HooksEnum, HooksPageEnum } from 'localConstants';
import { setHook } from 'redux/slices';
import { routeNames } from 'routes';
import { WindowProviderResponseEnums } from 'types';
import { HookValidationOutcome } from '../HookValidationOutcome';
import { HookStateEnum } from '../types';

export const LogoutHook = () => {
  const { pathname, search } = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = useLogout();

  const data = useMemo(() => {
    return pathname.includes(HooksPageEnum.logout)
      ? getLogoutHookData(search)
      : null;
  }, [pathname]);

  const [validUrl, setValidUrl] = useState<HookStateEnum>(
    HookStateEnum.pending
  );

  const validateHook = async () => {
    if (!data) {
      console.error('hook data is missing');
      setValidUrl(HookStateEnum.invalid);
      return navigate(routeNames.logout, {
        state: { caller: 'LogoutHook' }
      });
    }

    setValidUrl(HookStateEnum.valid);
    logout();

    replyToDapp({
      callbackUrl: data.callbackUrl,
      postMessageData: {
        type: WindowProviderResponseEnums.disconnectResponse,
        payload: {
          data: undefined
        }
      }
    });
  };

  useEffect(() => {
    validateHook();
  }, []);

  const saveLoginCallbackUrl = () => {
    // even if callbackUrl is invalid, logout hook is always saved
    dispatch(
      setHook({
        type: HooksEnum.logout,
        hookUrl: search,
        callbackUrl: data?.callbackUrl ?? ''
      })
    );
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(saveLoginCallbackUrl, [data]);

  return <HookValidationOutcome hook={HooksEnum.logout} validUrl={validUrl} />;
};
