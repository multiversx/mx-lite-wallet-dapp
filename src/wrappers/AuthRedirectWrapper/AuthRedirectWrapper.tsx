import type { PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { useGetIsLoggedIn } from 'lib/sdkDapp';
import { RouteNamesEnum } from 'localConstants/routes';
import { hookSelector } from 'redux/selectors';

interface AuthRedirectWrapperPropsType extends PropsWithChildren {
  requireAuth?: boolean;
}

export const AuthRedirectWrapper = ({
  children,
  requireAuth = true
}: AuthRedirectWrapperPropsType) => {
  const isLoggedIn = useGetIsLoggedIn();
  const { type: hook } = useSelector(hookSelector);
  const { pathname, search } = useLocation();

  const shouldGoToDashboard =
    isLoggedIn &&
    pathname !== RouteNamesEnum.dashboard &&
    !requireAuth &&
    !hook;

  if (shouldGoToDashboard) {
    return <Navigate to={`${RouteNamesEnum.dashboard}${search}`} />;
  }

  const shouldGoToUnlock =
    !isLoggedIn &&
    pathname !== RouteNamesEnum.unlock &&
    pathname !== RouteNamesEnum.home &&
    requireAuth &&
    !(pathname.includes('hook') || hook); // Already redirected via HookValiationOutcome

  if (shouldGoToUnlock) {
    return <Navigate to={`${RouteNamesEnum.unlock}${search}`} />;
  }

  return <>{children}</>;
};
