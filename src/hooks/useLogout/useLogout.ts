import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from 'helpers';
import { logoutAction } from 'redux/commonActions';
import { routeNames } from 'routes';

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

  const onRedirect = () => {
    dispatch(logoutAction());
    navigate(routeNames.unlock);
  };

  return () => {
    localStorage.clear();
    sessionStorage.clear();
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
};
