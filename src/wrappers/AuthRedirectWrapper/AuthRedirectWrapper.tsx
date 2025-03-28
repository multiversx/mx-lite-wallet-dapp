import type { PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { useGetIsLoggedIn } from 'lib';
import { hookSelector } from 'redux/selectors';
import { routeNames } from 'routes';

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
    isLoggedIn && pathname !== routeNames.dashboard && !requireAuth && !hook;

  if (shouldGoToDashboard) {
    return <Navigate to={`${routeNames.dashboard}${search}`} />;
  }

  const shouldGoToUnlock =
    !isLoggedIn && pathname !== routeNames.unlock && (requireAuth || hook);

  if (shouldGoToUnlock) {
    return <Navigate to={`${routeNames.unlock}${search}`} />;
  }

  return <>{children}</>;
};
