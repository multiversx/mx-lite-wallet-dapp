import { useSelector } from 'react-redux';
import { useGetAccount } from 'lib/sdkDapp';
import { HooksEnum, RouteNamesEnum } from 'localConstants';
import {
  accessTokenRedirectRouteSelector,
  hookSelector
} from 'redux/selectors';

export interface IUseRedirectPathnameProps {
  impersonateConfirmed?: boolean;
  canImpersonate?: boolean;
  isHook?: boolean;
}

export const useRedirectPathname = () => {
  const { type: hook } = useSelector(hookSelector);
  const accessTokenRedirectRoute = useSelector(
    accessTokenRedirectRouteSelector
  );
  const { address } = useGetAccount();
  const isLoggedIn = Boolean(address);
  const defaultRedirect = accessTokenRedirectRoute || RouteNamesEnum.dashboard;

  const getRedirectPathname = () => {
    switch (hook) {
      case HooksEnum.signMessage:
        return RouteNamesEnum.signMessage;
      case HooksEnum.login: {
        if (!isLoggedIn) {
          return RouteNamesEnum.unlock;
        }

        return defaultRedirect;
      }
      case HooksEnum.logout:
        return RouteNamesEnum.unlock;
      default:
        return defaultRedirect;
    }
  };

  return {
    pathname: getRedirectPathname(),
    getRedirectPathname
  };
};
