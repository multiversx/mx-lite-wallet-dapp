import { useLocation } from 'react-router-dom';

export const useGetCurrentStep = (routesArray: string[]) => {
  const { pathname } = useLocation();
  const activeRouteIndex = routesArray.findIndex(
    (entry) => entry && pathname.includes(entry)
  );
  if (activeRouteIndex > 0) {
    return activeRouteIndex + 1;
  }
  return 1;
};
