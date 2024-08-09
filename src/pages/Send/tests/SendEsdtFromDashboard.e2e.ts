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

describe('Send ESDT from dashboard tests', () => {
  it('should autocomplete the send form and send ESDT successfully', async () => {
    await page.goto(`${WALLET_SOURCE_ORIGIN}/logout`, {
      waitUntil: 'domcontentloaded'
    });

    const tokenId = 'ASH-e3d1b7';
    const testId = `send-${tokenId}`;
    await loginWithPem();
    await page.waitForSelector(getByDataTestId(testId));
    await page.click(getByDataTestId(testId));
    expect(page.url()).toMatch(`${WALLET_SOURCE_ORIGIN}/send`);

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
      value: 'ESDTTransfer@4153482d653364316237@00'
    });

    await expectElementToBeDisabled({
      dataTestId: DataTestIdsEnum.dataInput,
      isDisabled: true
    });

    await changeInputText({
      dataTestId: DataTestIdsEnum.receiverInput,
      text: keystoreAccount.address
    });

    await changeInputText({
      dataTestId: DataTestIdsEnum.amountInput,
      shouldOverride: true,
      text: '1'
    });

    await expectInputToHaveValue({
      dataTestId: DataTestIdsEnum.dataInput,
      value: 'ESDTTransfer@4153482d653364316237@0de0b6b3a7640000'
    });

    await page.click(getByDataTestId(DataTestIdsEnum.sendBtn));

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.transactionToastTitle,
      text: 'Processing transaction'
    });
  });
});
