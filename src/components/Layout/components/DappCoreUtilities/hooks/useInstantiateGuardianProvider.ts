import { useEffect, useState } from 'react';
import GuardianProvidersResolver from '@multiversx/sdk-guardians-provider/out/guardianProvidersResolver';

import { useSelector } from 'react-redux';
import { GenericGuardianProvider, GuardianProviderFactory } from 'components';
import { guardianProviderStorage } from 'helpers/guardian';
import { useGetAccount, useGetLoginInfo, useGetNetworkConfig } from 'hooks';
import {
  useGetGuardiansEnabled,
  useGuardianNativeAuth
} from 'modules/Guardian/hooks';
import { accountSelector, hookSelector } from 'redux/selectors';
import { HooksEnum } from 'routes';

let guardianProviderInstance: GenericGuardianProvider | null;

export const useInstantiateGuardianProvider = (address: string) => {
  const { network } = useGetNetworkConfig();
  const isGuardiansEnabled = useGetGuardiansEnabled();
  const { address: loggedInAddress } = useGetAccount();
  const isLoggedIn = Boolean(loggedInAddress);
  const { type: hook } = useSelector(hookSelector);
  const { addNativeAuthToGuardianFetcher } = useGuardianNativeAuth();
  const { tokenLogin } = useGetLoginInfo();
  const { externalNativeAuthToken } = useSelector(accountSelector);

  const [guardianProvider, setGuardianProvider] = useState<
    GenericGuardianProvider | null | undefined
  >(isGuardiansEnabled ? undefined : null);
  const [guardianProviderError, setGuardianProviderError] = useState('');

  const getDefaultProvider = async () => {
    try {
      addNativeAuthToGuardianFetcher();
      const defaultGuardianProviderResponse =
        await GuardianProviderFactory.createProvider({
          address,
          apiAddress: network.apiAddress,
          networkId: network.id,
          options: { serviceId: GuardianProvidersResolver.defaultServiceId }
        });

      setGuardianProvider(defaultGuardianProviderResponse);
      guardianProviderStorage.updateObservingGuardian(
        defaultGuardianProviderResponse
      );

      guardianProviderInstance = defaultGuardianProviderResponse;
    } catch (error) {
      console.error('Unable to set guardian provider', error);
      setGuardianProviderError(String(error));
      setGuardianProvider(null);
      guardianProviderStorage.updateObservingGuardian(null);
    }
  };

  const getCurrentProvider = async () => {
    if (
      guardianProviderInstance &&
      guardianProviderInstance.address === address &&
      guardianProviderInstance.networkId === network.id
    ) {
      guardianProviderStorage.updateObservingGuardian(guardianProviderInstance);
      return setGuardianProvider(guardianProviderInstance);
    }

    if (network.guardianServiceUrl) {
      GuardianProvidersResolver.extendProviderInfoNetworkUrls({
        serviceId: GuardianProvidersResolver.defaultServiceId,
        network: {
          networkId: String(network.id),
          url: network.guardianServiceUrl
        }
      });
    }

    try {
      addNativeAuthToGuardianFetcher();
      guardianProviderInstance = await GuardianProviderFactory.createProvider({
        address,
        apiAddress: String(network.apiAddress),
        networkId: String(network.id)
      });

      setGuardianProvider(guardianProviderInstance);
      guardianProviderStorage.updateObservingGuardian(guardianProviderInstance);
    } catch {
      await getDefaultProvider();
    }
  };

  const initializeGuardian = () => {
    // nativeAuth not needed for signing guardian transactions on 2fa hook
    const isSigningHook =
      hook === HooksEnum.sign || hook === HooksEnum.transaction;

    const hasNativeAuth = isLoggedIn
      ? tokenLogin?.nativeAuthToken || externalNativeAuthToken || isSigningHook
      : true;

    if (isGuardiansEnabled && hasNativeAuth) {
      getCurrentProvider();
    }
  };

  const reinitializeGuardian = async () => {
    guardianProviderInstance = null;

    if (guardianProvider) {
      await guardianProvider.reinitialize();
    }

    initializeGuardian();
  };

  useEffect(initializeGuardian, [tokenLogin, isLoggedIn]);

  return { guardianProvider, guardianProviderError, reinitializeGuardian };
};
