import {
  DEFAULT_DELAY_MS,
  sleep,
  WALLET_SOURCE_ORIGIN,
  WALLET_TARGET_ORIGIN
} from '__mocks__';
import { CrossWindowProviderRequestEnums } from 'types';
import { expectUnlockRoute } from 'utils/testUtils';
import { initiateHandshake, ledgerLoginAndExpectDashboard } from './helpers';

jest.mock('helpers/sdkDapp/sdkJsWebWalletIo', () => {
  const originalModule = jest.requireActual('helpers/sdkDapp/sdkJsWebWalletIo');

  return {
    ...originalModule,
    getLoginHookData: jest
      .fn()
      .mockImplementation(originalModule.getLoginHookData)
  };
});

jest.mock(
  'components/Layout/components/WalletUtilities/components/PostMessageListener/helpers/getEventOrigin',
  () => ({
    getEventOrigin: jest.fn().mockReturnValue(WALLET_SOURCE_ORIGIN)
  })
);

jest.mock('helpers/sdkDapp/replyToDapp', () => ({
  replyToDapp: jest.fn()
}));

describe('PostMessageListener LOGOUT_REQUEST tests', () => {
  it('should respond to LOGOUT_REQUEST with logout and redirect to unlock successfully', async () => {
    const postMessageSpy = jest.spyOn(window, 'postMessage');
    const render = await ledgerLoginAndExpectDashboard();
    await initiateHandshake(postMessageSpy);

    window.postMessage(
      {
        type: CrossWindowProviderRequestEnums.logoutRequest
      },
      WALLET_TARGET_ORIGIN
    );

    await sleep(DEFAULT_DELAY_MS);

    expect(postMessageSpy).toHaveBeenCalledWith(
      {
        type: CrossWindowProviderRequestEnums.logoutRequest
      },
      WALLET_TARGET_ORIGIN
    );

    await expectUnlockRoute(render);
  });
});
