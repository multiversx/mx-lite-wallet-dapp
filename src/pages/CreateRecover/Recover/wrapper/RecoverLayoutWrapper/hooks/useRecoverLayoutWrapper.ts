import { useGetCurrentStep } from '../../../../hooks';
import { CreateRecoverRoutesEnum } from '../../../../routes';
import { useGetRecoverTitle } from '../../../helpers';

const routesArray = Object.values(CreateRecoverRoutesEnum);
export const useRecoverLayoutWrapper = () => {
  const currentStep = useGetCurrentStep(routesArray);
  const title = useGetRecoverTitle();

  return { title, currentStep, routesArray };
};
