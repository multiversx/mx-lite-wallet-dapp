import React from 'react';
import { ErrorState, LargeLoader } from 'components';
import { GUARDIAN_INPUT_FIELD_NAME } from 'localConstants';
import { GuardianScreenType, WithClassnameType } from 'types';

import { useGuardianScreen } from './hooks';
import { useGuardianProvider } from '../../hooks';
import { GuardianForm } from '../GuardianForm';

export interface GuardianScreenPropsType
  extends GuardianScreenType,
    WithClassnameType {
  address: string;
  backButtonText?: string;
}

export const GuardianScreen = ({
  onSignTransaction,
  onPrev,
  signedTransactions,
  address,
  setSignedTransactions,
  backButtonText,
  guardianFormDescription,
  className
}: GuardianScreenPropsType) => {
  const { guardianProvider, guardianProviderError } =
    useGuardianProvider(address);

  const { onGuardianSubmit, setGuardianError, guardianError, isDisabled } =
    useGuardianScreen({
      onSignTransaction,
      signedTransactions,
      setSignedTransactions,
      address
    });

  if (guardianProvider === null) {
    return (
      <ErrorState
        buttonLabel='Back'
        className='info-card error-state'
        message={guardianProviderError}
        onButtonClick={onPrev}
        title='Guardian unavailable'
      />
    );
  }

  if (!signedTransactions || !guardianProvider) {
    return <LargeLoader />;
  }

  return (
    <GuardianForm
      onGuardianSubmit={onGuardianSubmit}
      setGuardianError={setGuardianError}
      guardianError={guardianError}
      onPrev={onPrev}
      backButtonText={backButtonText}
      fieldName={GUARDIAN_INPUT_FIELD_NAME}
      address={address}
      isDisabled={isDisabled}
      guardianProvider={guardianProvider}
      guardianFormDescription={guardianFormDescription}
      className={className}
    />
  );
};
