import { useSelector } from 'react-redux';
import { logout, useReplyToDapp } from 'helpers';
import { useGetAccountProvider } from 'hooks';
import { useGetKeystoreData } from 'pages/Unlock/Keystore/helpers/useKeystoreManager/methods';
import { LogoutType } from 'redux/commonActions';
import {
  accountSelector,
  activeNetworkSelector,
  hookSelector
} from 'redux/selectors';
import { HooksEnum, routeNames } from 'routes';
import { CrossWindowProviderResponseEnums, LoginMethodsEnum } from 'types';
import { useNavigate } from './navigation/useNavigate';

const LOGOUT_DEBUGGER = false;

export const useLogout = (caller: string) => {
  const { providerType } = useGetAccountProvider();
  const { type: hook } = useSelector(hookSelector);
  const { keystoreSessionKey } = useGetKeystoreData();
  const navigate = useNavigate({
    from: 'useLogout'
  });

  const isExternalProvider = providerType === LoginMethodsEnum.extra;
  const replyToDapp = useReplyToDapp();
  const { id, apiAddress } = useSelector(activeNetworkSelector);

  const goToUnlock = (noRedirect?: boolean) => {
    if (noRedirect) {
      return;
    }

    navigate(routeNames.unlock);
  };

  const options = {
    shouldBroadcastLogoutAcrossTabs: hook !== HooksEnum.logout,
    hasConsentPopup: false
  };

  return (logoutProps?: LogoutType) => {
    const onRedirect = () => {
      if (LOGOUT_DEBUGGER) {
        console.log('-----------LOGOUT----------', { caller });
      }

      const keepCurrentExtensionState = logoutProps?.keepCurrentExtensionState;

      const shouldReplyToDapp = window.opener && !keepCurrentExtensionState;

      if (!shouldReplyToDapp) {
        return goToUnlock(logoutProps?.noRedirect);
      }

      replyToDapp({
        type: CrossWindowProviderResponseEnums.disconnectResponse,
        payload: {
          data: true
        }
      });

      if (logoutProps?.skipCloseWindowOnRelogin) {
        return;
      }

      window.close();
    };

    return logout(
      routeNames.unlock,
      onRedirect,
      false, // willReLoginWithXPortal
      options
    );
  };
};
