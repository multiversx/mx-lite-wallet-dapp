import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAccountProvider } from 'lib/sdkDapp';
import { WindowProviderResponseEnums } from 'lib/sdkDappWebWalletCrossWindowProvider';
import { HooksEnum, RouteNamesEnum } from 'localConstants';
import { logoutAction } from 'redux/commonActions';
import { hookSelector } from 'redux/selectors';
import { useReplyToDapp } from '../useReplyToDapp';

const options = {
  /*
   * @param {boolean} [shouldBroadcastLogoutAcrossTabs=true]
   * @description If your dApp supports multiple accounts on multiple tabs,
   * this param will broadcast the logout event across all tabs.
   */
  shouldBroadcastLogoutAcrossTabs: true,
  /*
   * @param {boolean} [hasConsentPopup=false]
   * @description Set it to true if you want to perform async calls before logging out on Safari.
   * It will open a consent popup for the user to confirm the action before leaving the page.
   */
  hasConsentPopup: false
};

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { type: hook } = useSelector(hookSelector);
  const replyToDapp = useReplyToDapp();
  const provider = getAccountProvider();

  const onRedirect = () => {
    dispatch(logoutAction());
    localStorage.clear();
    sessionStorage.clear();

    const shouldReplyToDapp = window.opener;

    if (!shouldReplyToDapp) {
      return navigate(RouteNamesEnum.unlock);
    }

    replyToDapp({
      type: WindowProviderResponseEnums.disconnectResponse,
      payload: {
        data: true
      }
    });

    window.close();
  };

  options.shouldBroadcastLogoutAcrossTabs = hook !== HooksEnum.logout;

  return async () => {
    await provider.logout(options);
    onRedirect();
  };
};
