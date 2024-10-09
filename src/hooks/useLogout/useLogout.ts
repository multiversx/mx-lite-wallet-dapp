import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from 'lib';
import { HooksEnum } from 'localConstants';
import { logoutAction } from 'redux/commonActions';
import { hookSelector } from 'redux/selectors';
import { routeNames } from 'routes';
import { WindowProviderResponseEnums } from 'types';
import { useReplyToDapp } from '../useReplyToDapp';

const shouldAttemptReLogin = false; // use for special cases where you want to re-login after logout
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

  const onRedirect = () => {
    dispatch(logoutAction());
    localStorage.clear();
    sessionStorage.clear();

    const shouldReplyToDapp = window.opener;

    if (!shouldReplyToDapp) {
      return navigate(routeNames.unlock);
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

  return () =>
    logout(
      routeNames.unlock,
      /*
       * following are optional params. Feel free to edit them in your implementation
       */
      onRedirect,
      shouldAttemptReLogin,
      options
    );
};
