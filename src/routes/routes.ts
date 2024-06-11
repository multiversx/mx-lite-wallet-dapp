import { LayoutsEnum } from 'components/Layout/types/layouts.enum';
import { backgroundRouteNames, backgroundRoutes } from './backgroundRoutes';
import { hookRouteNames, hookRoutes } from './hookRoutes';
import { modalRouteNames, modalRoutes, ModalRoutesType } from './modalRoutes';
import { BackgroundRoutesType, HooksPageEnum, RouteType } from './routeTypes';
import { withPageTitle } from 'hooks/withPageTitle';
export * from './backgroundRoutes';
export * from './modalRoutes';
export * from './hookRoutes';
export * from './routeTypes';

export const foregroundRouteNames = {
  doesNotExist: '/not-found'
};

export const routeNames = {
  ...backgroundRouteNames,
  ...modalRouteNames,
  ...hookRouteNames,
  ...foregroundRouteNames
};

export const unlockRouteNames = {
  keystore: `${routeNames.unlock}/keystore`,
  pem: `${routeNames.unlock}/pem`
};

const mainRoutes: RouteType[] = [
  ...Object.keys(modalRoutes).map((route) => {
    const modalRoute = modalRoutes[route as ModalRoutesType];
    return modalRoute;
  }),

  ...Object.keys(backgroundRoutes).map((route) => {
    const {
      path,
      title,
      authenticatedRoute,
      nestedRoutes,
      layout,
      closeOnBackdropClick,
      hideHeaderCloseBtn,
      closeOnEscape
    } = backgroundRoutes[route as BackgroundRoutesType];

    return {
      path,
      title,
      nestedRoutes,
      authenticatedRoute,
      layout,
      closeOnBackdropClick,
      hideHeaderCloseBtn,
      closeOnEscape,
      component: () => null
    };
  }),

  ...Object.keys(hookRoutes).map((route) => {
    const hookRoute = hookRoutes[route as HooksPageEnum];
    return hookRoute;
  })
];

export const routes: RouteType[] = mainRoutes.map((route) => {
  const title = route.title
    ? `${route.title} • MultiversX Wallet`
    : 'MultiversX Wallet';

  const requiresAuth = Boolean(route.authenticatedRoute);
  const wrappedComponent = withPageTitle(title, route.component);

  return {
    authenticatedRoute: requiresAuth,
    'data-testid': route['data-testid'],
    component: wrappedComponent,
    layout: requiresAuth ? route.layout ?? LayoutsEnum.empty : route.layout,
    nestedRoutes: route.nestedRoutes,
    path: route.path,
    title,
    closeOnBackdropClick: route.closeOnBackdropClick,
    hideHeaderCloseBtn: route.hideHeaderCloseBtn,
    closeOnEscape: route.closeOnEscape
  };
});
