import { useSelector } from 'react-redux';
import { useGetIsLoggedIn } from 'hooks';
import {
  hookSelector,
  accessTokenRedirectRouteSelector
} from 'redux/selectors';
import { HooksEnum, routeNames } from 'routes';

export const useRedirectPathname = () => {
  const { type: hook } = useSelector(hookSelector);
  const accessTokenRedirectRoute = useSelector(
    accessTokenRedirectRouteSelector
  );

  const isLoggedIn = useGetIsLoggedIn();
  const defaultRedirect = accessTokenRedirectRoute || routeNames.dashboard;

  switch (hook) {
    case HooksEnum.sign:
      return routeNames.sign;
    case HooksEnum.transaction:
      return routeNames.send;
    case HooksEnum.signMessage:
      return routeNames['sign-message'];
    case HooksEnum.login:
      return isLoggedIn ? routeNames.dashboard : routeNames.unlock;
    case HooksEnum.logout:
      return routeNames.unlock;
    default:
      return defaultRedirect;
  }
};
