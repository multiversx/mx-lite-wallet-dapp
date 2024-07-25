import { useGetCurrentStep } from '../../../../hooks';
import { CreateRecoverRoutesEnum } from '../../../../routes';
import { useGetRecoverTitle } from '../../../helpers';

export const useRecoverLayoutWrapper = () => {
  const routesArray = Object.values(CreateRecoverRoutesEnum);
  const currentStep = useGetCurrentStep(routesArray);
  const title = useGetRecoverTitle();

  return { title, currentStep, routesArray };
};
