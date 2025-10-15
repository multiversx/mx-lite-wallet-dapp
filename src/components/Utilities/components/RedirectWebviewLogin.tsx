import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { decodeNativeAuthToken, useGetIsLoggedIn } from 'lib/sdkDapp';
import { ACCESS_TOKEN_KEY } from 'localConstants/misc';
import { RouteNamesEnum } from 'localConstants/routes';
import { accessTokenRedirectRouteSelector } from 'redux/selectors';
import { setAccessTokenRedirectRoute } from 'redux/slices';

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
    const isDoneLoggingIn = isLoggedIn && pathname === RouteNamesEnum.dashboard;

    if (
      isDoneLoggingIn &&
      accessTokenRedirectRoute &&
      accessTokenRedirectRoute !== RouteNamesEnum.dashboard
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
    const isValidRoute = Object.values(RouteNamesEnum).includes(
      pathname as RouteNamesEnum
    );
    const shouldSetRedirectPathname =
      isNativeAuthToken &&
      isValidRoute &&
      ![RouteNamesEnum.unlock, RouteNamesEnum.logout].includes(
        pathname as RouteNamesEnum
      );

    if (shouldSetRedirectPathname) {
      const redirectPathname =
        !pathname || pathname === RouteNamesEnum.home
          ? RouteNamesEnum.dashboard
          : pathname;

      dispatch(setAccessTokenRedirectRoute(redirectPathname));
    }
  }, [isLoggedIn, accessTokenRedirectRoute, pathname]);

  return null;
};
