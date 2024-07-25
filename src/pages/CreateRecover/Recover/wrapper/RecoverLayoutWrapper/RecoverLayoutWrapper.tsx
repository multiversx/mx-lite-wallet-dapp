import { PropsWithChildren } from 'react';
import { ModalContainer, ProgressBar } from 'components';
import { DataTestIdsEnum } from 'localConstants';
import { useRecoverLayoutWrapper } from './hooks';

export const RecoverLayoutWrapper = ({ children }: PropsWithChildren) => {
  const { currentStep, routesArray, title } = useRecoverLayoutWrapper();
  const progressBarPercentageFill = Math.round(
    (currentStep * 100) / routesArray.length
  );

  return (
    <ModalContainer
      className='login-modal rounded shadow-lg p-6'
      visible
      data-testid={DataTestIdsEnum.recoverKeystoreModal}
    >
      <div className='flex'>
        <ProgressBar progress={progressBarPercentageFill} />
        {title}
        {children}
      </div>
    </ModalContainer>
  );
};
