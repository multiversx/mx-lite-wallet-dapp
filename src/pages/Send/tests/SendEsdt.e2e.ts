import { keystoreAccount, WALLET_SOURCE_ORIGIN } from '__mocks__';
import { DataTestIdsEnum } from 'localConstants/dataTestIds.enum';
import {
  changeInputText,
  expectElementToBeDisabled,
  expectElementToContainText,
  expectInputToHaveValue,
  getByDataTestId,
  loginWithPem
} from 'utils/testUtils/puppeteer';

describe('Send ESDT tests', () => {
  it('shouldsend ESDT successfully', async () => {
    await page.goto(`${WALLET_SOURCE_ORIGIN}/logout`, {
      waitUntil: 'domcontentloaded'
    });

    await loginWithPem();
    await page.waitForSelector(getByDataTestId(DataTestIdsEnum.sendBtn));
    await page.click(getByDataTestId(DataTestIdsEnum.sendBtn));
    expect(page.url()).toMatch(`${WALLET_SOURCE_ORIGIN}/send`);

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

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.transactionToastTitle,
      text: 'Processing transaction'
    });
  });
});
