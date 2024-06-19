import { keystoreAccount, pemAccount, WALLET_SOURCE_ORIGIN } from '__mocks__';
import { DataTestIdsEnum } from 'localConstants/dataTestIds.enum';
import {
  changeInputText,
  expectElementToBeDisabled,
  expectElementToContainText,
  expectInputToHaveValue,
  getByDataTestId,
  loginWithKeystore
} from 'utils/testUtils/puppeteer';

describe('Send NFT tests', () => {
  it('should send NFT successfully', async () => {
    await page.goto(`${WALLET_SOURCE_ORIGIN}/logout`, {
      waitUntil: 'domcontentloaded'
    });

    await loginWithKeystore();
    await page.waitForSelector(getByDataTestId(DataTestIdsEnum.sendBtn));
    await page.click(getByDataTestId(DataTestIdsEnum.sendBtn));
    expect(page.url()).toMatch(`${WALLET_SOURCE_ORIGIN}/send`);
    await page.click(getByDataTestId(DataTestIdsEnum.sendNFtTypeInput));

    await changeInputText({
      dataTestId: DataTestIdsEnum.receiverInput,
      text: keystoreAccount.address
    });

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.availableAmount,
      text: 'Available: 92 Day One'
    });

    await expectInputToHaveValue({
      dataTestId: DataTestIdsEnum.amountInput,
      value: '92'
    });

    await expectElementToBeDisabled({
      dataTestId: DataTestIdsEnum.amountInput,
      isDisabled: false
    });

    await changeInputText({
      dataTestId: DataTestIdsEnum.amountInput,
      shouldOverride: true,
      text: '1'
    });

    await expectInputToHaveValue({
      dataTestId: DataTestIdsEnum.gasLimitInput,
      value: '1000000'
    });

    await expectElementToBeDisabled({
      dataTestId: DataTestIdsEnum.gasLimitInput,
      isDisabled: true
    });

    await expectElementToBeDisabled({
      dataTestId: DataTestIdsEnum.dataInput,
      isDisabled: true
    });

    await page.click(getByDataTestId(DataTestIdsEnum.sendBtn));

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.receiverError,
      text: 'Receiver should be different than current account'
    });

    await changeInputText({
      dataTestId: DataTestIdsEnum.receiverInput,
      shouldOverride: true,
      text: pemAccount.address
    });

    await expectInputToHaveValue({
      dataTestId: DataTestIdsEnum.dataInput,
      value:
        'ESDTNFTTransfer@4348524953544d41532d323764336532@01@01@6e224118d9068ae626878a1cfbebcb6a95a4715db86d1b51e06a04226cf30fd6'
    });

    await page.click(getByDataTestId(DataTestIdsEnum.sendBtn));

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.transactionToastTitle,
      text: 'Processing transaction'
    });
  });
});
