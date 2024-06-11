import React, { PropsWithChildren, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import {
  AuthenticatedRoutesWrapper,
  AxiosInterceptorContext
} from 'components';
import { useMatchPath, useNavigate } from 'hooks';
import {
  modalRouteNames,
  modalRoutes,
  ModalRoutesType,
  routeNames
} from 'routes';

import { BackgroundPage } from './components';
import { getAllRoutes, getLayoutMap } from './helpers';
import { useSetBrowserScrollbar } from './hooks';
import { ModalLayout } from './ModalLayout';
import { LayoutsEnum } from './types/layouts.enum';

export const Layout = ({ children }: PropsWithChildren) => {
  const { search } = useLocation();
  const navigate = useNavigate({ from: 'Layout' });
  const layoutMap = getLayoutMap();
  const unlockRoute = `${routeNames.unlock}${search}`;
  const matchPath = useMatchPath();

  const onRedirect = () => {
    navigate(unlockRoute);
  };

  useSetBrowserScrollbar();

  const routesAndNestedRoutes = useMemo(() => getAllRoutes(), []);

  let childElement = <>{children}</>;

  const modalRoute = Object.entries(modalRouteNames).find(([, path]) =>
    matchPath(path)
  );

  if (modalRoute) {
    const [routeName] = modalRoute;
    const modalLayout = modalRoutes[routeName as ModalRoutesType].layout;
    const RouteLayout = layoutMap[modalLayout as LayoutsEnum] ?? ModalLayout;
    const route = modalRoutes[routeName as ModalRoutesType];
    childElement = <RouteLayout {...route}>{children}</RouteLayout>;
  }

  return (
    <AuthenticatedRoutesWrapper
      routes={routesAndNestedRoutes}
      unlockRoute={unlockRoute}
      onRedirect={onRedirect}
    >
      <AxiosInterceptorContext.Listener />
      <BackgroundPage />
      {childElement}
    </AuthenticatedRoutesWrapper>
  );
};
