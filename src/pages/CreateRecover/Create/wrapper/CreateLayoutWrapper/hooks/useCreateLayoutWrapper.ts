import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateRecoverRoutesEnum } from '../../../../routes';
import { useGetCurrentStep } from '../../../../hooks';
import { useGetCreateTitle } from '../../../helpers';

export const useCreateLayoutWrapper = () => {
  const routesArray = Object.values(CreateRecoverRoutesEnum);
  const currentStep = useGetCurrentStep(routesArray);
  const title = useGetCreateTitle();
  const navigate = useNavigate();

  const stepWithBackButton = 3;
  const stepHasBackButton = currentStep === stepWithBackButton;

  const onBack = (event: MouseEvent) => {
    event.preventDefault();
    navigate(routesArray[stepWithBackButton - 2]);
  };

  return { onBack, stepHasBackButton, title, currentStep, routesArray };
};
