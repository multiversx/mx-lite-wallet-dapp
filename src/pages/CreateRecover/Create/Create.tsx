import { ModalContainer, ProgressBar } from 'components';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { DataTestIdsEnum } from 'localConstants';
import { useCreateRecoverState } from '../hooks/useCreateRecoverState';
import {
  CreateDisclaimer,
  CreateDownload,
  CreateMnemonics,
  CreatePassword,
  CreateQuiz
} from './components';
import { useNavigate } from 'react-router-dom';
import { routeNames } from 'routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Create = () => {
  const {
    createdAddress,
    keystoreString,
    currentStep,
    currentTitle,
    mnemonic,
    showBackButton,
    steps,
    onBack,
    onNext,
    setCreatedAddress,
    setKeystoreString,
    setMnemonic
  } = useCreateRecoverState();
  const navigate = useNavigate();
  const progressBarPercentageFill = Math.round((currentStep * 100) / steps);

  const handleOnClose = () => {
    navigate(routeNames.unlock);
  };

  const createStepComponents = [
    <CreateDisclaimer onNext={onNext} setMnemonic={setMnemonic} />,
    <CreateMnemonics onNext={onNext} mnemonic={mnemonic} />,
    <CreateQuiz mnemonic={mnemonic} onBack={onBack} onNext={onNext} />,
    <CreatePassword
      mnemonic={mnemonic}
      onNext={onNext}
      setCreatedAddress={setCreatedAddress}
      setKeystoreString={setKeystoreString}
    />,
    <CreateDownload
      createdAddress={createdAddress}
      keystoreString={keystoreString}
    />
  ];

  return (
    <ModalContainer
      className='login-modal'
      data-testid={DataTestIdsEnum.createWalletModal}
      onClose={handleOnClose}
      visible
    >
      {showBackButton && (
        <button
          onClick={onBack}
          className='absolute top-0 p-3 left-0 m-0 hover:bg-slate-100 rounded duration-150'
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      )}
      <div className='flex flex-col items-center justify-center p-6'>
        <div className='flex flex-col items-center justify-center gap-4 max-w-full w-1/2 mb-4'>
          <ProgressBar progress={progressBarPercentageFill} />
          <h1 className='text-2xl whitespace-nowrap mt-2'>{currentTitle}</h1>
        </div>

        {createStepComponents[currentStep]}
      </div>
    </ModalContainer>
  );
};
