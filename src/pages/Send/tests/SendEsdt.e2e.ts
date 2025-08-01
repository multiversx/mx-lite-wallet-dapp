import {
  DEFAULT_DELAY_MS,
  keystoreAccount,
  pemAccount,
  WALLET_SOURCE_ORIGIN
} from '__mocks__';
import { DataTestIdsEnum } from 'localConstants/dataTestIds.enum';
import {
  changeInputText,
  expectAndSignTransaction,
  expectElementToBeDisabled,
  expectElementToContainText,
  expectInputToHaveValue,
  getByDataTestId,
  loginWithPem,
  sleep
} from 'utils/testUtils/puppeteer';

describe('Send ESDT tests', () => {
  it('should send ESDT successfully', async () => {
    await page.goto(`${WALLET_SOURCE_ORIGIN}/logout`, {
      waitUntil: 'domcontentloaded'
    });

    await loginWithPem();
    const sendBtn = await page.waitForSelector(
      getByDataTestId(DataTestIdsEnum.sendBtn)
    );
    await sendBtn.click();

    await changeInputText({
      dataTestId: DataTestIdsEnum.receiverInput,
      text: keystoreAccount.address
    });

    await changeInputText({
      dataTestId: DataTestIdsEnum.amountInput,
      shouldOverride: true,
      text: '1'
    });

    await page.keyboard.press('Tab');
    await page.keyboard.type('ASH');
    await page.keyboard.press('Enter');
    await page.keyboard.press('Tab');

    await sleep(DEFAULT_DELAY_MS);

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.availableAmount,
      text: 'Available: 431.835489492912187639 ASH'
    });

    await expectInputToHaveValue({
      dataTestId: DataTestIdsEnum.gasLimitInput,
      value: '1000000'
    });

    await expectElementToBeDisabled({
      dataTestId: DataTestIdsEnum.gasLimitInput,
      isDisabled: true
    });

    await expectInputToHaveValue({
      dataTestId: DataTestIdsEnum.dataInput,
      value: 'ESDTTransfer@4153482d653364316237@0de0b6b3a7640000'
    });

    await expectElementToBeDisabled({
      dataTestId: DataTestIdsEnum.dataInput,
      isDisabled: true
    });

    await page.click(getByDataTestId(DataTestIdsEnum.sendBtn));

    await expectAndSignTransaction([
      {
        amount: '1',
        usdAmount: '0.00',
        receiverAddress: keystoreAccount.address,
        signerAddress: pemAccount.address,
        gasPrice: '0.0000001 VIBE',
        gasLimit: '60.137.000',
        data: 'ESDTTransfer@4153482d653364316237@0de0b6b3a7640000'
      }
    ]);
  });
});
