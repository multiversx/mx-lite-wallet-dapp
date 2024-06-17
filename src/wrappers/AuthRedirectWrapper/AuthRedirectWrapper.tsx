import type { PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useGetIsLoggedIn } from 'hooks';
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
  const { type } = useSelector(hookSelector);

  if (isLoggedIn && !requireAuth && !type) {
    return <Navigate to={routeNames.dashboard} />;
  }

  if (!isLoggedIn && requireAuth) {
    return <Navigate to={routeNames.unlock} />;
  }

  return <>{children}</>;
};
