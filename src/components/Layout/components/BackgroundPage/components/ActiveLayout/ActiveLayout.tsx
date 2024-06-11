import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getLayoutMap, LayoutsEnum, Navigate } from 'components';
import { isExtension } from 'config';
import { useGetAccount } from 'hooks';

import { ACCESS_TOKEN_KEY } from 'localConstants';
import { routeNames, RouteType } from 'routes';

interface ActiveLayoutPropsType {
  route?: RouteType;
}

export const ActiveLayout = ({ route }: ActiveLayoutPropsType) => {
  const { address } = useGetAccount();
  const [searchParams] = useSearchParams();
  const layoutMap = getLayoutMap();
  const layoutName = route?.authenticatedRoute
    ? route.layout ?? LayoutsEnum.frame
    : route?.layout;
  const accessToken = searchParams.get(ACCESS_TOKEN_KEY);

  const FoundLayout = useMemo(
    () => (layoutName ? layoutMap[layoutName] : () => null),
    [layoutName]
  );

  if (!route) {
    return null;
  }

  if (!route.layout && !route.authenticatedRoute) {
    return <route.component />;
  }

  const isForbiddenRouteAccess =
    route.authenticatedRoute && !address && !isExtension && !accessToken;

  if (isForbiddenRouteAccess) {
    return <Navigate to={routeNames.unlock} from='ActiveLayout' />;
  }

  if (!layoutName) {
    return null;
  }

  return (
    <FoundLayout {...route}>
      <route.component />
    </FoundLayout>
  );
};
