import { emptyWalletAccount, WALLET_SOURCE_ORIGIN } from '__mocks__/data';
import { DataTestIdsEnum } from 'localConstants/dataTestIds.enum';

import {
  changeInputText,
  expectElementToBeDisabled,
  expectElementToContainText,
  expectInputToHaveValue,
  expectToBeChecked,
  getByDataTestId,
  loginWithKeystore
} from 'utils/testUtils/puppeteer';

describe('Sovereign transfer test', () => {
  it('should transfer ESDT and NFT tokens on sovereign successfully', async () => {
    await page.goto(`${WALLET_SOURCE_ORIGIN}/logout`, {
      waitUntil: 'domcontentloaded'
    });

    await loginWithKeystore();
    await page.click(getByDataTestId(DataTestIdsEnum.sovereignTransferBtn));
    await expect(page.url()).toEqual(
      `${WALLET_SOURCE_ORIGIN}/sovereign-transfer`
    );

    await page.click(getByDataTestId(DataTestIdsEnum.sendBtn));

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.contractError,
      text: 'Contract is required'
    });

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.receiverError,
      text: 'Receiver is required'
    });

    await expectElementToContainText({
      dataTestId: `${DataTestIdsEnum.amountError}0`,
      text: 'Amount is required'
    });

    await expectToBeChecked({
      dataTestId: `${DataTestIdsEnum.sendEsdtTypeInput}0`,
      isChecked: true
    });

    await changeInputText({
      dataTestId: DataTestIdsEnum.contractInput,
      shouldOverride: true,
      text: 'erd1qqqqqqqqqqqqqpgqfcm6l6rd42hwhskmk4thlp9kz58npfq50gfqdrthqa'
    });

    await expectInputToHaveValue({
      dataTestId: DataTestIdsEnum.contractInput,
      value: 'erd1qqqqqqqqqqqqqpgqfcm6l6rd42hwhskmk4thlp9kz58npfq50gfqdrthqa'
    });

    await changeInputText({
      dataTestId: DataTestIdsEnum.receiverInput,
      shouldOverride: true,
      text: emptyWalletAccount.address
    });

    await expectInputToHaveValue({
      dataTestId: DataTestIdsEnum.receiverInput,
      value: emptyWalletAccount.address
    });

    await page.type('#react-select-2-input', 'BurnTest');
    await page.keyboard.press('Enter');
    await changeInputText({
      dataTestId: `${DataTestIdsEnum.amountInput}0`,
      shouldOverride: true,
      text: '1'
    });

    await expectInputToHaveValue({
      dataTestId: `${DataTestIdsEnum.amountInput}0`,
      value: '1'
    });

    await page.click(getByDataTestId(DataTestIdsEnum.addTokenBtn));
    await expectToBeChecked({
      dataTestId: `${DataTestIdsEnum.sendEsdtTypeInput}1`,
      isChecked: true
    });

    await page.type('#react-select-3-input', 'BurnTest');
    await page.keyboard.press('Enter');
    await changeInputText({
      dataTestId: `${DataTestIdsEnum.amountInput}1`,
      shouldOverride: true,
      text: '2'
    });

    await expectInputToHaveValue({
      dataTestId: `${DataTestIdsEnum.amountInput}1`,
      value: '2'
    });

    await page.click(getByDataTestId(`${DataTestIdsEnum.removeTokenBtn}1`));
    const amountInput1 = await page.$(
      getByDataTestId(`${DataTestIdsEnum.amountInput}1`)
    );

    const removeTokenBtn1 = await page.$(
      getByDataTestId(`${DataTestIdsEnum.removeTokenBtn}1`)
    );

    expect(amountInput1).toEqual(null);
    expect(removeTokenBtn1).toEqual(null);
    await page.click(getByDataTestId(DataTestIdsEnum.addTokenBtn));
    await page.type('#react-select-4-input', 'ASH');
    await page.keyboard.press('Enter');
    await changeInputText({
      dataTestId: `${DataTestIdsEnum.amountInput}1`,
      shouldOverride: true,
      text: '2'
    });

    await expectInputToHaveValue({
      dataTestId: `${DataTestIdsEnum.amountInput}1`,
      value: '2'
    });

    await page.click(getByDataTestId(DataTestIdsEnum.addTokenBtn));
    await expectToBeChecked({
      dataTestId: `${DataTestIdsEnum.sendEsdtTypeInput}2`,
      isChecked: true
    });

    await page.click(getByDataTestId(`${DataTestIdsEnum.sendNFtTypeInput}2`));
    await expectToBeChecked({
      dataTestId: `${DataTestIdsEnum.sendNFtTypeInput}2`,
      isChecked: true
    });

    await page.type('#react-select-5-input', 'NFT');
    await page.keyboard.press('Enter');
    await expectElementToBeDisabled({
      dataTestId: `${DataTestIdsEnum.amountInput}2`,
      isDisabled: true
    });

    await expectInputToHaveValue({
      dataTestId: `${DataTestIdsEnum.amountInput}2`,
      value: '1'
    });

    await page.click(getByDataTestId(DataTestIdsEnum.addTokenBtn));
    await expectToBeChecked({
      dataTestId: `${DataTestIdsEnum.sendEsdtTypeInput}3`,
      isChecked: true
    });

    await page.click(getByDataTestId(`${DataTestIdsEnum.sendNFtTypeInput}3`));
    await expectToBeChecked({
      dataTestId: `${DataTestIdsEnum.sendNFtTypeInput}3`,
      isChecked: true
    });

    await page.type('#react-select-6-input', 'Day');
    await page.keyboard.press('Enter');
    await expectElementToBeDisabled({
      dataTestId: `${DataTestIdsEnum.amountInput}3`,
      isDisabled: false
    });

    await changeInputText({
      dataTestId: `${DataTestIdsEnum.amountInput}3`,
      shouldOverride: true,
      text: '5'
    });

    await expectInputToHaveValue({
      dataTestId: `${DataTestIdsEnum.amountInput}3`,
      value: '5'
    });

    await page.click(getByDataTestId(DataTestIdsEnum.sendBtn));
    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.transactionToastTitle,
      text: 'Processing transaction'
    });
  });
});
