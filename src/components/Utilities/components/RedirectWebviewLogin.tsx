import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { decodeNativeAuthToken, useGetIsLoggedIn } from 'lib';
import { ACCESS_TOKEN_KEY } from 'localConstants/misc';
import { accessTokenRedirectRouteSelector } from 'redux/selectors';
import { setAccessTokenRedirectRoute } from 'redux/slices';
import { routeNames } from 'routes';

export const RedirectWebviewLogin = () => {
  const [searchParams] = useSearchParams();
  const isLoggedIn = useGetIsLoggedIn();
  const navigate = useNavigate();
  const accessTokenRedirectRoute = useSelector(
    accessTokenRedirectRouteSelector
  );

  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    const isDoneLoggingIn = isLoggedIn && pathname === routeNames.dashboard;

    if (
      isDoneLoggingIn &&
      accessTokenRedirectRoute &&
      accessTokenRedirectRoute !== routeNames.dashboard
    ) {
      dispatch(setAccessTokenRedirectRoute(''));
      navigate(accessTokenRedirectRoute);
      return;
    }

    const accessToken = searchParams.get(ACCESS_TOKEN_KEY);

    if (!accessToken || accessTokenRedirectRoute) {
      return;
    }

    const isNativeAuthToken = decodeNativeAuthToken(accessToken);
    const isValidRoute = Object.values(routeNames).includes(pathname);
    const shouldSetRedirectPathname =
      isNativeAuthToken &&
      isValidRoute &&
      ![routeNames.unlock, routeNames.logout].includes(pathname);

    if (shouldSetRedirectPathname) {
      const redirectPathname =
        !pathname || pathname === routeNames.home
          ? routeNames.dashboard
          : pathname;

      dispatch(setAccessTokenRedirectRoute(redirectPathname));
    }
  }, [isLoggedIn, accessTokenRedirectRoute, pathname]);

  return null;
};
