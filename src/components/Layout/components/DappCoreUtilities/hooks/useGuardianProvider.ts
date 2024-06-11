import { useEffect, useState } from 'react';

import { guardianProviderStorage } from 'helpers/guardian';
import { useInstantiateGuardianProvider } from './useInstantiateGuardianProvider';

export const useGuardianProvider = (address: string) => {
  const { guardianProvider, guardianProviderError, reinitializeGuardian } =
    useInstantiateGuardianProvider(address);

  const [updatedGuardianProvider, setUpdatedGuardianProvider] =
    useState(guardianProvider);

  useEffect(() => {
    return guardianProviderStorage.subscribeToObservable((newGuardian) =>
      setUpdatedGuardianProvider(newGuardian)
    );
  }, []);

  return {
    guardianProvider: updatedGuardianProvider ?? guardianProvider,
    guardianProviderError,
    reinitializeGuardian
  };
};
