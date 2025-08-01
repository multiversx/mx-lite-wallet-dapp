import { keystoreAccount, WALLET_SOURCE_ORIGIN } from '__mocks__';
import { DataTestIdsEnum } from 'localConstants/dataTestIds.enum';
import {
  changeInputText,
  expectAndSignTransaction,
  expectElementToContainText,
  expectInputToHaveValue,
  expectToBeChecked,
  getByDataTestId,
  loginWithPem
} from 'utils/testUtils/puppeteer';

describe('Validate and send EGLD tests', () => {
  it('should validate form and send EGLD successfully', async () => {
    await page.goto(`${WALLET_SOURCE_ORIGIN}/logout`, {
      waitUntil: 'domcontentloaded'
    });

    await loginWithPem();
    const sendBtn = await page.waitForSelector(
      getByDataTestId(DataTestIdsEnum.sendBtn)
    );

    expect(sendBtn).toBeDefined();
    await sendBtn.click();

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.availableAmount,
      text: 'Available: 4.559443050404540691 VIBE'
    });

    await page.click(getByDataTestId(DataTestIdsEnum.sendBtn));

    await expectToBeChecked({
      dataTestId: DataTestIdsEnum.sendEsdtTypeInput,
      isChecked: true
    });

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.receiverError,
      text: 'Receiver is required'
    });

    await changeInputText({
      dataTestId: DataTestIdsEnum.amountInput,
      shouldOverride: true,
      text: '-1'
    });

    await expectInputToHaveValue({
      dataTestId: DataTestIdsEnum.amountInput,
      value: '-1'
    });

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.amountError,
      text: 'Amount must be greater than or equal to 0'
    });

    await changeInputText({
      dataTestId: DataTestIdsEnum.amountInput,
      shouldOverride: true,
      text: '99999'
    });

    await expectInputToHaveValue({
      dataTestId: DataTestIdsEnum.amountInput,
      value: '99999'
    });

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.amountError,
      text: 'Insufficient balance'
    });

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

    await expectAndSignTransaction([
      {
        amount: '0.050000000000000000',
        usdAmount: '0.00',
        receiverAddress: keystoreAccount.address,
        signerAddress: '@webteam',
        gasPrice: '0.000000001',
        gasLimit: '60.137.000',
        data: 'ESDTTransfer@4153482d653364316237@0de0b6b3a7640000'
      }
    ]);
  });
});
