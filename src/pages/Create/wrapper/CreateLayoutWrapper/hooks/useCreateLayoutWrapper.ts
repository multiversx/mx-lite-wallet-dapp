import { MouseEvent } from 'react';
import { useNavigate } from 'hooks';

import { useGetCurrentStep } from 'hooks';
import { useGetCreateTitle } from 'pages/Create/helpers';
import { CreateRoutesEnum } from 'routes/routeTypes';

export const useCreateLayoutWrapper = () => {
  const routesArray = Object.values(CreateRoutesEnum);
  const currentStep = useGetCurrentStep(routesArray);
  const title = useGetCreateTitle();
  const navigate = useNavigate({ from: 'useCreateLayoutWrapper' });

  const stepWithBackButton = 3;
  const stepHasBackButton = currentStep === stepWithBackButton;

  const onBack = (event: MouseEvent) => {
    event.preventDefault();
    navigate(routesArray[stepWithBackButton - 2]);
  };

  return { onBack, stepHasBackButton, title, currentStep, routesArray };
};
