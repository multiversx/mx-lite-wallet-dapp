import { WALLET_SOURCE_ORIGIN } from '__mocks__';
import { getLoginSessionKey } from 'pages/Unlock/Keystore/helpers/useKeystoreManager/methods';
import { initiateHandshake, ledgerLoginAndExpectDashboard } from './helpers';

jest.mock(
  'pages/Unlock/Keystore/helpers/useKeystoreManager/methods/getLoginSessionKey',
  () => {
    const originalModule = jest.requireActual(
      'pages/Unlock/Keystore/helpers/useKeystoreManager/methods/getLoginSessionKey'
    );

    return {
      ...originalModule,
      getLoginSessionKey: jest
        .fn()
        .mockImplementation(originalModule.getLoginSessionKey)
    };
  }
);

jest.mock(
  'components/Layout/components/WalletUtilities/components/PostMessageListener/helpers/getEventOrigin',
  () => {
    return {
      getEventOrigin: jest.fn().mockReturnValue(WALLET_SOURCE_ORIGIN)
    };
  }
);

describe('PostMessageListener FINALIZE_HANDSHAKE_REQUEST tests', () => {
  it('should respond to FINALIZE_HANDSHAKE_REQUEST successfully', async () => {
    const postMessageSpy = jest.spyOn(window, 'postMessage');
    await ledgerLoginAndExpectDashboard();
    await initiateHandshake(postMessageSpy);
    expect(getLoginSessionKey).toHaveBeenCalledWith(WALLET_SOURCE_ORIGIN);
    expect(getLoginSessionKey).toReturnWith(
      'fbf0b6c6a5af224e7f314466f6efdb02175d186c10a345582116bb49fdea7820'
    );
  });
});
