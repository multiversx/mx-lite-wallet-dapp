import {
  DEFAULT_PAGE_LOAD_DELAY_MS,
  DEFAULT_PASSWORD,
  keystoreAccount,
  WALLET_SOURCE_ORIGIN
} from '__mocks__';
import { DataTestIdsEnum } from 'localConstants/dataTestIds.enum';
import {
  changeInputText,
  expectAndSignTransaction,
  expectInputToHaveValue,
  getByDataTestId,
  getByTestIdDeep,
  loginWithKeystore,
  sleep,
  waitForUrlToMatch
} from 'utils/testUtils/puppeteer';

describe('Send NFT tests', () => {
  it('should send NFT successfully', async () => {
    await page.goto(`${WALLET_SOURCE_ORIGIN}/logout`, {
      waitUntil: 'domcontentloaded'
    });

    await loginWithKeystore();

    const sendBtn = await page.waitForSelector(
      getByDataTestId(DataTestIdsEnum.sendBtn)
    );

    await sendBtn.click();
    await sleep(DEFAULT_PAGE_LOAD_DELAY_MS);
    await page.reload({
      waitUntil: 'domcontentloaded'
    });

    await sleep(DEFAULT_PAGE_LOAD_DELAY_MS);

    await changeInputText({
      dataTestId: DataTestIdsEnum.amountInput,
      shouldOverride: true,
      text: '0'
    });

    await changeInputText({
      dataTestId: DataTestIdsEnum.dataInput,
      text: 'Sending empty transaction'
    });

    await changeInputText({
      dataTestId: DataTestIdsEnum.receiverInput,
      text: keystoreAccount.address
    });

    await expectInputToHaveValue({
      dataTestId: DataTestIdsEnum.gasLimitInput,
      value: '87500'
    });

    await page.click(getByDataTestId(DataTestIdsEnum.sendBtn));
    await sleep(DEFAULT_PAGE_LOAD_DELAY_MS);
    // Wait for the keystore login panel to appear
    const keystoreLoginPanel = await getByTestIdDeep(
      page,
      DataTestIdsEnum.keystoreLoginPanel
    );

    expect(keystoreLoginPanel).toBeDefined();

    const passwordInput = await getByTestIdDeep(
      page,
      DataTestIdsEnum.accessPass
    );

    await passwordInput.type(DEFAULT_PASSWORD);
    const submitBtn = await getByTestIdDeep(page, DataTestIdsEnum.submitButton);
    expect(submitBtn).toBeDefined();
    await submitBtn.click();

    await sleep(DEFAULT_PAGE_LOAD_DELAY_MS);

    await waitForUrlToMatch({
      expectedUrl: `${WALLET_SOURCE_ORIGIN}/send`
    });

    await expectAndSignTransaction([
      {
        amount: '0',
        receiverAddress: keystoreAccount.address,
        signerAddress: keystoreAccount.address,
        gasPrice: '0.000000001',
        gasLimit: '87.500',
        data: 'Sending empty transaction'
      }
    ]);
  });
});
