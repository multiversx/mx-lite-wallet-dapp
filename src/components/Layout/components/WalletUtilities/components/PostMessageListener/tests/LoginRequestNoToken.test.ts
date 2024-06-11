import {
  DEFAULT_DELAY_MS,
  MAIN_REFERRER,
  mockWindowLocationHref,
  sleep,
  testAccount,
  WALLET_SOURCE_ORIGIN,
  WALLET_TARGET_ORIGIN
} from '__mocks__';
import { getLoginHookData, replyToDapp } from 'helpers';
import { DataTestIdsEnum } from 'localConstants';
import { CrossWindowProviderRequestEnums } from 'types';
import {
  clickButton,
  expectPageTitle,
  expectToContainText,
  keystoreCheatLogin,
  renderWithProviders,
  waitFor
} from 'utils/testUtils';
import { initiateHandshake } from './helpers';

jest.mock('helpers/sdkDapp/sdkJsWebWalletIo', () => {
  const originalModule = jest.requireActual('helpers/sdkDapp/sdkJsWebWalletIo');

  return {
    ...originalModule,
    getLoginHookData: jest
      .fn()
      .mockImplementation(originalModule.getLoginHookData)
  };
});

jest.mock('helpers/sdkDapp/replyToDapp', () => ({
  replyToDapp: jest.fn()
}));

jest.mock(
  'components/Layout/components/WalletUtilities/components/PostMessageListener/helpers/getEventOrigin',
  () => {
    return {
      getEventOrigin: jest.fn().mockReturnValue(WALLET_SOURCE_ORIGIN)
    };
  }
);

describe('PostMessageListener LOGIN_REQUEST tests', () => {
  const callbackUrl = `${MAIN_REFERRER}dashboard`;

  beforeEach(() => {
    mockWindowLocationHref(callbackUrl);
  });

  it('should respond to LOGIN_REQUEST with login and  redirect to dapp successfully', async () => {
    const postMessageSpy = jest.spyOn(window, 'postMessage');
    const token = '';

    const render = await renderWithProviders();
    await initiateHandshake(postMessageSpy);

    window.postMessage(
      {
        type: CrossWindowProviderRequestEnums.loginRequest,
        payload: {
          token
        }
      },
      WALLET_TARGET_ORIGIN
    );

    await sleep(DEFAULT_DELAY_MS);

    expect(postMessageSpy).toHaveBeenCalledWith(
      {
        type: CrossWindowProviderRequestEnums.loginRequest,
        payload: {
          token
        }
      },
      WALLET_TARGET_ORIGIN
    );

    expect(getLoginHookData).toHaveBeenCalledWith(
      `?callbackUrl=${WALLET_SOURCE_ORIGIN}`
    );

    expect(getLoginHookData).toHaveReturnedWith({
      callbackUrl: WALLET_SOURCE_ORIGIN,
      hookUrl: `?callbackUrl=${WALLET_SOURCE_ORIGIN}`
    });

    await keystoreCheatLogin({ render, skipLoginVerification: true });

    await expectPageTitle('Impersonate');

    await expectToContainText({
      id: DataTestIdsEnum.impersonateModal,
      render,
      text: testAccount.address
    });

    await clickButton({
      render,
      id: DataTestIdsEnum.continueBtn
    });

    await expectPageTitle('Dashboard');

    await waitFor(() => {
      expect(replyToDapp).toHaveBeenCalledWith(
        {
          callbackUrl: WALLET_SOURCE_ORIGIN,
          postMessageData: {
            payload: {
              data: {
                address: testAccount.address,
                signature: undefined
              }
            },
            type: 'LOGIN_RESPONSE'
          },
          webwiewApp: null
        },
        undefined
      );
    });
  });
});
