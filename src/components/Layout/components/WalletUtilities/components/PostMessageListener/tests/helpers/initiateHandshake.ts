import { DEFAULT_DELAY_MS, sleep, WALLET_TARGET_ORIGIN } from '__mocks__';
import { CrossWindowProviderRequestEnums } from 'types';

export const initiateHandshake = async (postMessageSpy: jest.SpyInstance) => {
  window.postMessage(
    {
      type: CrossWindowProviderRequestEnums.finalizeHandshakeRequest
    },
    WALLET_TARGET_ORIGIN
  );

  await sleep(DEFAULT_DELAY_MS);

  expect(postMessageSpy).toHaveBeenCalledWith(
    {
      type: CrossWindowProviderRequestEnums.finalizeHandshakeRequest
    },
    WALLET_TARGET_ORIGIN
  );
};
