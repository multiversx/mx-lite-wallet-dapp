import { CreateRecoverRoutesEnum } from '../../../../routes';
import { useGetRecoverTitle } from '../../../helpers';
import { useGetCurrentStep } from '../../../../hooks';

const routesArray = Object.values(CreateRecoverRoutesEnum);
export const useRecoverLayoutWrapper = () => {
  const currentStep = useGetCurrentStep(routesArray);
  const title = useGetRecoverTitle();

  return { title, currentStep, routesArray };
};
