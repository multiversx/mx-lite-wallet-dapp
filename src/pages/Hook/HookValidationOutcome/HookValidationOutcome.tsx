import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { Loader } from 'components';
import { useReplyToDapp, useRedirectPathname } from 'hooks';
import {
  useGetAccount,
  useGetIsWalletConnectV2Initialized,
  useGetLoginInfo
} from 'lib';
import { HooksEnum } from 'localConstants';
import { hookSelector } from 'redux/selectors';
import { routeNames } from 'routes';
import { WindowProviderResponseEnums } from 'types';
import { LoginMethodsEnum } from 'types';
import { HookStateEnum } from '../types';

interface HookValidationOutcomePropsType {
  callbackUrl?: string;
  hook: HooksEnum;
  validUrl: HookStateEnum;
}

export const HookValidationOutcome = ({
  callbackUrl,
  hook,
  validUrl
}: HookValidationOutcomePropsType) => {
  const { search } = useLocation();
  const { loginMethod } = useGetLoginInfo();
  const isWalletConnectV2Initializing = useGetIsWalletConnectV2Initialized();
  const { type: registeredHook } = useSelector(hookSelector);
  const { pathname: redirectPathname } = useRedirectPathname();
  const { address } = useGetAccount();
  const replyToDapp = useReplyToDapp();

  const isValid = validUrl === HookStateEnum.valid;
  const isInvalid = validUrl === HookStateEnum.invalid;
  const isPending = validUrl === HookStateEnum.pending;

  if (isWalletConnectV2Initializing) {
    return <Loader />;
  }

  if (isPending) {
    return null;
  }

  if (isInvalid) {
    // login hook is invalid, meaning user cannot see dashboard
    if (
      [HooksEnum.login, HooksEnum.sign, HooksEnum.signMessage].includes(hook)
    ) {
      return <Navigate to={routeNames.unlock} replace />;
    }

    // The hook URL is invalid and are returning to the previous route
    // or home if we have no callbackURL specified in hook URL
    return <Navigate to={redirectPathname} replace />;
  }

  if (
    isValid &&
    registeredHook &&
    [HooksEnum.login, HooksEnum.sign, HooksEnum.signMessage].includes(
      registeredHook
    )
  ) {
    switch (loginMethod) {
      case LoginMethodsEnum.none: {
        // The user must login before we can sign
        return <Navigate to={routeNames.unlock} replace />;
      }

      default: {
        if (hook === HooksEnum.login && callbackUrl) {
          // The user is logged in and must return to the dapp if the callbackURL is provided
          replyToDapp({
            type: WindowProviderResponseEnums.loginResponse,
            payload: {
              data: {
                address
              }
            }
          });
          return null;
        }

        // The user is logged in and can sign
        return <Navigate to={`${redirectPathname}${search}`} replace />;
      }
    }
  }

  // Display nothing while in 'pending' status
  return <div className='flex-fill'>&nbsp;</div>;
};
