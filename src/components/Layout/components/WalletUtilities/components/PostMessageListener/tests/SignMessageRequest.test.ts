import {
  DEFAULT_DELAY_MS,
  MAIN_REFERRER,
  mockWindowLocationHref,
  sleep,
  WALLET_SOURCE_ORIGIN,
  WALLET_TARGET_ORIGIN
} from '__mocks__';
import { replyToDapp } from 'helpers';
import { DataTestIdsEnum } from 'localConstants';
import { CrossWindowProviderRequestEnums } from 'types';
import {
  clickButton,
  expectToContainText,
  expectUnlockRoute,
  keystoreCheatLogin,
  renderWithProviders,
  waitFor
} from 'utils/testUtils';
import { initiateHandshake } from './helpers';

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

describe('PostMessageListener SIGN_MESSAGE_REQUEST tests', () => {
  const callbackUrl = `${MAIN_REFERRER}sign-message`;

  beforeEach(() => {
    mockWindowLocationHref(callbackUrl);
  });

  it('should respond to SIGN_MESSAGE_REQUEST with sign and redirect to dapp successfully', async () => {
    const postMessageSpy = jest.spyOn(window, 'postMessage');
    const render = await renderWithProviders();
    await initiateHandshake(postMessageSpy);

    window.postMessage(
      {
        type: CrossWindowProviderRequestEnums.signMessageRequest,
        payload: {
          message: 'test'
        }
      },
      WALLET_TARGET_ORIGIN
    );

    await sleep(DEFAULT_DELAY_MS);

    expect(postMessageSpy).toHaveBeenCalledWith(
      {
        type: CrossWindowProviderRequestEnums.signMessageRequest,
        payload: {
          message: 'test'
        }
      },
      WALLET_TARGET_ORIGIN
    );

    await expectUnlockRoute(render);
    await keystoreCheatLogin({ render });
    await expectToContainText({
      id: DataTestIdsEnum.modalTitle,
      render,
      text: 'Message Signing'
    });

    await clickButton({
      id: DataTestIdsEnum.signButton,
      render
    });

    await waitFor(() => {
      expect(replyToDapp).toHaveBeenCalledWith(
        {
          callbackUrl: WALLET_SOURCE_ORIGIN,
          postMessageData: {
            payload: {
              data: {
                signature:
                  '1f0e1b40b1d83dcde5a62271c676f0d541adf4fbfa55daac4885911ae59c435d313179fab5ba5dc50918dae31909f1d4bf28bd2b68f47a1301c0745c6e039506',
                status: 'signed'
              }
            },
            type: 'SIGN_MESSAGE_RESPONSE'
          },
          webwiewApp: null
        },
        undefined
      );
    });
  });
});
