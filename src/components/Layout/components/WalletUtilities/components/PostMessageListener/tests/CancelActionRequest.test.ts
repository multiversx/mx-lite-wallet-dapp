import {
  DEFAULT_DELAY_MS,
  sleep,
  WALLET_SOURCE_ORIGIN,
  WALLET_TARGET_ORIGIN
} from '__mocks__';
import { CrossWindowProviderRequestEnums } from 'types';
import { waitFor } from 'utils/testUtils';
import { initiateHandshake, ledgerLoginAndExpectDashboard } from './helpers';

const mockedReplyWithCancelled = jest.fn();

jest.mock('hooks/misc/useReplyWithCancelled', () => ({
  ...jest.requireActual('hooks/misc/useReplyWithCancelled'),
  useReplyWithCancelled: () => mockedReplyWithCancelled
}));

jest.mock(
  'components/Layout/components/WalletUtilities/components/PostMessageListener/helpers/getEventOrigin',
  () => {
    return {
      getEventOrigin: jest.fn().mockReturnValue(WALLET_SOURCE_ORIGIN)
    };
  }
);

describe('PostMessageListener CANCEL_ACTION_REQUEST tests', () => {
  it('should respond to CANCEL_ACTION_REQUEST successfully', async () => {
    const postMessageSpy = jest.spyOn(window, 'postMessage');
    await ledgerLoginAndExpectDashboard();
    await initiateHandshake(postMessageSpy);

    window.postMessage(
      {
        type: CrossWindowProviderRequestEnums.cancelAction
      },
      WALLET_TARGET_ORIGIN
    );

    await sleep(DEFAULT_DELAY_MS);

    expect(postMessageSpy).toHaveBeenCalledWith(
      {
        type: CrossWindowProviderRequestEnums.cancelAction
      },
      WALLET_TARGET_ORIGIN
    );

    await waitFor(() => {
      expect(mockedReplyWithCancelled).toBeCalled();
    });
  });
});
