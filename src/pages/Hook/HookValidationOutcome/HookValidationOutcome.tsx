import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Navigate } from 'components';
import { PendingConnection } from 'components/Layout/components/WalletUtilities/components/PostMessageListener/components';
import { useReplyToDapp } from 'helpers';
import {
  useGetAccount,
  useGetIsWalletConnectV2Initialized,
  useGetLoginInfo
} from 'hooks';
import { useRedirectPathname } from 'pages/Unlock/providers/Keystore/helpers';
import { hookSelector } from 'redux/selectors';
import { HooksEnum, routeNames } from 'routes';
import { CrossWindowProviderResponseEnums, LoginMethodsEnum } from 'types';
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
    return <PendingConnection />;
  }

  if (isPending) {
    return null;
  }

  if (isInvalid) {
    // login hook is invalid, meaning user cannot see dashboard
    if ([HooksEnum.login, HooksEnum.sign].includes(hook)) {
      return (
        <Navigate to={routeNames.unlock} replace from='HookValidationOutcome' />
      );
    }

    // The hook URL is invalid and are returning to the previous route
    // or home if we have no callbackURL specified in hook URL
    return (
      <Navigate to={redirectPathname} replace from='HookValidationOutcome' />
    );
  }

  if (
    isValid &&
    registeredHook &&
    [
      HooksEnum.sign,
      HooksEnum.signMessage,
      HooksEnum.transaction,
      HooksEnum.login
    ].includes(registeredHook)
  ) {
    switch (loginMethod) {
      case LoginMethodsEnum.none: {
        // The user must login before we can sign
        return (
          <Navigate
            to={routeNames.unlock}
            replace
            from='HookValidationOutcome'
          />
        );
      }

      default: {
        if (hook === HooksEnum.login && callbackUrl) {
          // The user is logged in and must return to the dapp if the callbackURL is provided
          replyToDapp({
            type: CrossWindowProviderResponseEnums.loginResponse,
            payload: {
              data: {
                address
              }
            }
          });
          return null;
        }

        // The user is logged in and can sign
        return (
          <Navigate
            to={`${redirectPathname}${search}`}
            replace
            from='HookValidationOutcome'
          />
        );
      }
    }
  }

  // Display nothing while in 'pending' status
  return <div className='flex-fill'>&nbsp;</div>;
};
