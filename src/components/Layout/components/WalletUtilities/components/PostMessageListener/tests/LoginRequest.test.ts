// file.only
import {
  DEFAULT_DELAY_MS,
  MAIN_REFERRER,
  mockWindowLocationHref,
  sleep,
  testAccount,
  WALLET_SOURCE_ORIGIN,
  WALLET_TARGET_ORIGIN
} from '__mocks__';
import { getLoginHookData } from 'helpers/sdkDapp/sdkJsWebWalletIo';
import { replyToDapp } from 'helpers/sdkDapp/sdkJsWebWalletIo';
import { DataTestIdsEnum, SdkDappDataTestIdsEnum } from 'localConstants';
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

jest.mock('helpers/sdkDapp/replyToDapp', () => ({
  replyToDapp: jest.fn()
}));

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
    const token =
      'bG9jYWxob3N0.99f29606c706a1172234826cc4ba5ea345fb37e51158cf9fccfc416f1a2df9ff.86400.eyJ0aW1lc3RhbXAiOjE2NzY5ODIzNzJ9';

    const render = await renderWithProviders();

    // allow adding PostMessageListener
    await sleep(DEFAULT_DELAY_MS);

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

    await sleep(DEFAULT_DELAY_MS);

    expect(getLoginHookData).toHaveBeenCalledWith(
      `?token=${token}&callbackUrl=${WALLET_SOURCE_ORIGIN}`
    );

    expect(getLoginHookData).toHaveReturnedWith({
      callbackUrl: WALLET_SOURCE_ORIGIN,
      hookUrl: `?token=bG9jYWxob3N0.99f29606c706a1172234826cc4ba5ea345fb37e51158cf9fccfc416f1a2df9ff.86400.eyJ0aW1lc3RhbXAiOjE2NzY5ODIzNzJ9&callbackUrl=${WALLET_SOURCE_ORIGIN}`,
      token:
        'bG9jYWxob3N0.99f29606c706a1172234826cc4ba5ea345fb37e51158cf9fccfc416f1a2df9ff.86400.eyJ0aW1lc3RhbXAiOjE2NzY5ODIzNzJ9'
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

    await expectPageTitle('Choose account');

    await clickButton({
      id: SdkDappDataTestIdsEnum.confirmBtn,
      render
    });

    await waitFor(() => {
      expect(replyToDapp).toHaveBeenCalledWith(
        {
          callbackUrl: WALLET_SOURCE_ORIGIN,
          postMessageData: {
            payload: {
              data: {
                address: testAccount.address,
                signature:
                  '4df8b31361a52d5e6ac865e60ad0ee503cb0c892700f76e3949b05d0598d9a187d13b553970582f300ae277e8b930fb15117e7b846b273b04f209fdd72290902'
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
