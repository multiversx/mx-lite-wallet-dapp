import { MouseEvent, useState } from 'react';
import { CreateRecoverProviderTypeEnum } from '../contexts/createRecover/reducer';

interface CreateRecoverState {
  titles: string[];
}

const createRecoverDetails: Record<
  CreateRecoverProviderTypeEnum,
  CreateRecoverState
> = {
  [CreateRecoverProviderTypeEnum.create]: {
    titles: [
      'Create wallet',
      'Create wallet',
      'Surprise quiz',
      'Awesome, now create a password',
      'Wallet created'
    ]
  },
  [CreateRecoverProviderTypeEnum.recover]: {
    titles: [
      'Create wallet',
      'Create wallet',
      'Surprise quiz',
      'Awesome, now create a password',
      'Wallet created'
    ]
  }
};

export const useCreateRecoverState = () => {
  const [mnemonic, setMnemonic] = useState('');
  const [createdAddress, setCreatedAddress] = useState('');
  const [keystoreString, setKeystoreString] = useState('');
  const [providerType, setProviderType] = useState(
    CreateRecoverProviderTypeEnum.create
  );

  const [currentStep, setCurrentStep] = useState(0);
  const steps = createRecoverDetails[providerType].titles.length - 1;
  const showBackButton = false;

  const onBack = (event: MouseEvent) => {
    event.preventDefault();

    if (currentStep === 0) {
      return;
    }

    setCurrentStep(currentStep - 1);
  };

  const onNext = () => {
    if (currentStep === steps) {
      return;
    }

    setCurrentStep(currentStep + 1);
  };

  return {
    createdAddress,
    currentStep,
    currentTitle: createRecoverDetails[providerType].titles[currentStep],
    keystoreString,
    mnemonic,
    providerType,
    showBackButton,
    steps,
    onBack,
    onNext,
    setMnemonic,
    setCreatedAddress,
    setKeystoreString,
    setProviderType,
    setCurrentStep
  };
};
