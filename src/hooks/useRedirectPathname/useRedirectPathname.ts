import { useSelector } from 'react-redux';
import { useGetAccount } from 'lib';
import { HooksEnum } from 'localConstants';
import { hookSelector } from 'redux/selectors';
import { routeNames } from 'routes';

export interface UseRedirectPathnameProps {
  impersonateConfirmed?: boolean;
  canImpersonate?: boolean;
}

export const useRedirectPathname = () => {
  const { type: hook } = useSelector(hookSelector);

  const { address } = useGetAccount();
  const isLoggedIn = Boolean(address);
  const defaultRedirect = routeNames.dashboard;

  const getRedirectPathname = () => {
    switch (hook) {
      case HooksEnum.sign:
        return routeNames.sign;
      case HooksEnum.signMessage:
        return routeNames.signMessage;
      case HooksEnum.login: {
        if (!isLoggedIn) {
          return routeNames.unlock;
        }

        return defaultRedirect;
      }
      case HooksEnum.logout:
        return routeNames.unlock;
      default:
        return defaultRedirect;
    }
  };

  return {
    pathname: getRedirectPathname(),
    getRedirectPathname
  };
};
