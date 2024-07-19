import { PropsWithChildren } from 'react';
import { t } from 'i18next';
import { ProgressBar } from 'react-bootstrap';
import { ModalLayout } from 'components';
import { DataTestIdsEnum } from 'localConstants';
import { useCreateLayoutWrapper } from './hooks';

export const CreateLayoutWrapper = ({ children }: PropsWithChildren) => {
  const { onBack, stepHasBackButton, currentStep, routesArray, title } =
    useCreateLayoutWrapper();

  const progressBarPercentageFill = Math.round(
    (currentStep * 100) / routesArray.length
  );

  return (
    <ModalLayout
      title={<Trans t={t}>{title}</Trans>}
      onBack={stepHasBackButton ? onBack : undefined}
      className='create-modal'
      data-testid={DataTestIdsEnum.createWalletModal}
      progressBar={<ProgressBar now={progressBarPercentageFill} />}
    >
      {children}
    </ModalLayout>
  );
};
