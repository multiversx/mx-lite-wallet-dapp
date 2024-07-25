import { PropsWithChildren } from 'react';
import { DataTestIdsEnum } from 'localConstants';
import { useCreateLayoutWrapper } from './hooks';
import { ModalContainer, ProgressBar } from 'components';

export const CreateLayoutWrapper = ({ children }: PropsWithChildren) => {
  const { currentStep, routesArray, title } = useCreateLayoutWrapper();

  const progressBarPercentageFill = Math.round(
    (currentStep * 100) / routesArray.length
  );

  return (
    <ModalContainer
      className='create-modal'
      data-testid={DataTestIdsEnum.createWalletModal}
    >
      <ProgressBar progress={progressBarPercentageFill} />
      {title}
      {children}
    </ModalContainer>
  );
};
