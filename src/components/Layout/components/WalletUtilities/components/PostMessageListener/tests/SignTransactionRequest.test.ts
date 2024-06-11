import {
  DEFAULT_DELAY_MS,
  DEFAULT_PAGE_LOAD_DELAY_MS,
  mockWindowLocationHref,
  sleep,
  testAccount,
  WALLET_SOURCE_ORIGIN,
  WALLET_TARGET_ORIGIN
} from '__mocks__';
import { newTransaction, replyToDapp } from 'helpers';
import { SdkDappDataTestIdsEnum } from 'localConstants';
import { CrossWindowProviderRequestEnums } from 'types';
import {
  clickButton,
  expectConfirmFieldsToBe,
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

describe('PostMessageListener SIGN_TRANSACTION_REQUEST tests', () => {
  beforeEach(() => {
    mockWindowLocationHref(WALLET_TARGET_ORIGIN);
  });

  it('should respond to SIGN_TRANSACTION_REQUEST with sign and redirect to dapp successfully', async () => {
    const postMessageSpy = jest.spyOn(window, 'postMessage');
    const render = await renderWithProviders();
    await sleep(DEFAULT_DELAY_MS);
    await initiateHandshake(postMessageSpy);
    const transactions = [
      {
        nonce: 7436,
        value: '100000000000000000',
        receiver:
          'erd1qqqqqqqqqqqqqpgqd77fnev2sthnczp2lnfx0y5jdycynjfhzzgq6p3rax',
        sender: testAccount.address,
        gasPrice: 1000000000,
        gasLimit: 4200000,
        data: 'wrapEgld',
        chainID: 'D',
        version: 1
      },
      {
        nonce: 7437,
        value: '0',
        receiver:
          'erd1qqqqqqqqqqqqqpgqg2esr6d6tfd250x4n3tkhfkw8cc4p2x50n4swatdz6',
        sender: testAccount.address,
        gasPrice: 1000000000,
        gasLimit: 70000000,
        data: 'ESDTTransfer@5745474c442d643763366262@016345785d8a0000@6d756c74695061697253776170@00000000000000000500778530aaebdcbc0945e6d10e4e4272b4a04c09b07ceb@73776170546f6b656e734669786564496e707574@50524f54454f2d643165663339@7fbd583ed8fe3769@000000000000000005005e203c6d28ea29918f38e59dbd85909784a879827ceb@73776170546f6b656e734669786564496e707574@555344432d386434303638@31987b',
        chainID: 'D',
        version: 1
      }
    ].map((tx) => newTransaction(tx).toPlainObject());

    window.postMessage(
      {
        type: CrossWindowProviderRequestEnums.signTransactionsRequest,
        payload: transactions
      },
      WALLET_TARGET_ORIGIN
    );

    await sleep(DEFAULT_DELAY_MS);

    expect(postMessageSpy).toHaveBeenCalledWith(
      {
        type: CrossWindowProviderRequestEnums.signTransactionsRequest,
        payload: transactions
      },
      WALLET_TARGET_ORIGIN
    );

    await expectUnlockRoute(render);
    await keystoreCheatLogin({ render });

    // Wait for the navigation to finish and the modal to appear
    await sleep(2 * DEFAULT_PAGE_LOAD_DELAY_MS);
    await expectToContainText({
      id: SdkDappDataTestIdsEnum.signStepTitle,
      render,
      text: 'Signing Transaction 1 of 2'
    });

    const modal = await render.findByTestId(SdkDappDataTestIdsEnum.dappModal);

    await expectConfirmFieldsToBe({
      modal,
      receiver:
        'erd1qqqqqqqqqqqqqpgqd77fnev2sthnczp2lnfx0y5jdycynjfhzzgq6p3rax',
      fee: '0.00010338',
      amount: '0.1 xEGLD',
      data: 'wrapEgld'
    });

    await clickButton({
      id: SdkDappDataTestIdsEnum.signBtn,
      parentContainer: modal
    });

    await expectToContainText({
      id: SdkDappDataTestIdsEnum.signStepTitle,
      text: 'Signing Transaction 2 of 2',
      parentContainer: modal
    });

    await expectConfirmFieldsToBe({
      modal,
      receiver:
        'erd1qqqqqqqqqqqqqpgqg2esr6d6tfd250x4n3tkhfkw8cc4p2x50n4swatdz6',
      amount: '0.1 WEGLD-d7c6bb',
      fee: '0.001294495',
      data: 'ESDTTransfer@5745474c442d643763366262@016345785d8a0000@6d756c74695061697253776170@00000000000000000500778530aaebdcbc0945e6d10e4e4272b4a04c09b07ceb@73776170546f6b656e734669786564496e707574@50524f54454f2d643165663339@7fbd583ed8fe3769@000000000000000005005e203c6d28ea29918f38e59dbd85909784a879827ceb@73776170546f6b656e734669786564496e707574@555344432d386434303638@31987b'
    });

    await clickButton({
      id: SdkDappDataTestIdsEnum.signBtn,
      parentContainer: modal
    });

    await waitFor(() => {
      expect(replyToDapp).toHaveBeenCalledWith({
        callbackUrl: WALLET_SOURCE_ORIGIN,
        postMessageData: {
          payload: {
            data: [
              {
                chainID: 'D',
                data: 'wrapEgld',
                gasLimit: 4200000,
                gasPrice: 1000000000,
                nonce: '7436',
                receiver:
                  'erd1qqqqqqqqqqqqqpgqd77fnev2sthnczp2lnfx0y5jdycynjfhzzgq6p3rax',
                sender: testAccount.address,
                signature:
                  '099ef0281dc1d9611ba1520c6909591a72477de6a771e28d667f137ffa353c91d7b7fea7867f0e05d28fc91c5a028703dd66c3ec4a2612b7e6f5f7cdc609180d',
                value: '100000000000000000',
                version: '1'
              },
              {
                chainID: 'D',
                data: 'ESDTTransfer%405745474c442d643763366262%40016345785d8a0000%406d756c74695061697253776170%4000000000000000000500778530aaebdcbc0945e6d10e4e4272b4a04c09b07ceb%4073776170546f6b656e734669786564496e707574%4050524f54454f2d643165663339%407fbd583ed8fe3769%40000000000000000005005e203c6d28ea29918f38e59dbd85909784a879827ceb%4073776170546f6b656e734669786564496e707574%40555344432d386434303638%4031987b',
                gasLimit: 70000000,
                gasPrice: 1000000000,
                nonce: '7437',
                receiver:
                  'erd1qqqqqqqqqqqqqpgqg2esr6d6tfd250x4n3tkhfkw8cc4p2x50n4swatdz6',
                sender: testAccount.address,
                signature:
                  'd966d2819451a4a578ea487e75d831babdca42c3d2f2f6fc409dda751c4d3d4026b999b82373acc91fcb7ed3e36ef091807e57508fb8ea44f38d125b1ba4bc0d',
                value: '0',
                version: '1'
              }
            ]
          },
          type: 'SIGN_TRANSACTIONS_RESPONSE'
        },
        webwiewApp: null
      });
    });
  });
});
