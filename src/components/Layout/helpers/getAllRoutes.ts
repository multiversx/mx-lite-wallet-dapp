import { routes } from 'routes/index';

export function getAllRoutes() {
  const routesAndNestedRoutesArrays = routes.map((route) => {
    if (route.nestedRoutes) {
      const { nestedRoutes, ...rest } = route;
      const nestedRoutesWithParentRoute = nestedRoutes.map((nestedRoute) => ({
        ...nestedRoute,
        path: `${rest.path}/${nestedRoute.path}`
      }));
      return [rest, ...nestedRoutesWithParentRoute];
    }
    return [route];
  });

  return [...routesAndNestedRoutesArrays];
}
