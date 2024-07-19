import { useGetCurrentStep } from 'hooks';
import { useGetRecoverTitle } from 'pages/Recover/helpers';
import { RecoverRoutesEnum } from 'routes/routeTypes';

const routesArray = Object.values(RecoverRoutesEnum);
export const useRecoverLayoutWrapper = () => {
  const currentStep = useGetCurrentStep(routesArray);
  const title = useGetRecoverTitle();

  return { title, currentStep, routesArray };
};
