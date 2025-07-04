import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ProgressBar } from 'components';
import { DataTestIdsEnum } from 'localConstants';
import {
  CreateDisclaimer,
  CreateMnemonics,
  CreateRecoverDownload,
  CreateRecoverPassword,
  CreateQuiz,
  RecoverMnemonics
} from './components';
import { useCreateRecoverState } from './hooks';

export const CreateRecover = () => {
  const {
    createdAddress,
    keystoreString,
    currentStep,
    currentTitle,
    isCreateRoute,
    mnemonic,
    showBackButton,
    steps,
    onBack,
    onNext,
    setCreatedAddress,
    setKeystoreString,
    setMnemonic
  } = useCreateRecoverState();
  const progressBarPercentageFill = Math.round((currentStep * 100) / steps);

  const stepComponents = [
    ...(isCreateRoute
      ? [
          <CreateDisclaimer onNext={onNext} setMnemonic={setMnemonic} />,
          <CreateMnemonics onNext={onNext} mnemonic={mnemonic} />,
          <CreateQuiz mnemonic={mnemonic} onBack={onBack} onNext={onNext} />
        ]
      : [<RecoverMnemonics onNext={onNext} setMnemonic={setMnemonic} />]),
    <CreateRecoverPassword
      mnemonic={mnemonic}
      onNext={onNext}
      setCreatedAddress={setCreatedAddress}
      setKeystoreString={setKeystoreString}
    />,
    <CreateRecoverDownload
      createdAddress={createdAddress}
      keystoreString={keystoreString}
    />
  ];

  return (
    <div
      className='login-panel'
      data-testid={DataTestIdsEnum.createWalletPanel}
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
          <h1
            className='text-2xl whitespace-nowrap mt-2'
            data-testid={DataTestIdsEnum.panelTitle}
          >
            {currentTitle}
          </h1>
        </div>

        {stepComponents[currentStep]}
      </div>
    </div>
  );
};
