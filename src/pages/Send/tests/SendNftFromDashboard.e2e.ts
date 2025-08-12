import { keystoreAccount, pemAccount, WALLET_SOURCE_ORIGIN } from '__mocks__';
import { DataTestIdsEnum } from 'localConstants/dataTestIds.enum';
import {
  changeInputText,
  expectAndSignTransaction,
  expectElementToBeDisabled,
  expectElementToContainText,
  expectInputToHaveValue,
  expectToBeChecked,
  getByDataTestId,
  loginWithKeystore
} from 'utils/testUtils/puppeteer';

describe('Send NFT tests', () => {
  it('should send NFT successfully', async () => {
    await page.goto(`${WALLET_SOURCE_ORIGIN}/logout`, {
      waitUntil: 'domcontentloaded'
    });

    const tokenId = 'CHRISTMAS-27d3e2-01';
    const testId = `send-${tokenId}`;
    await loginWithKeystore();
    const sendBtn = await page.waitForSelector(getByDataTestId(testId));
    await sendBtn.click();

    await expectToBeChecked({
      dataTestId: DataTestIdsEnum.sendNFtTypeInput,
      isChecked: true
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

    await changeInputText({
      dataTestId: DataTestIdsEnum.receiverInput,
      text: pemAccount.address
    });

    await changeInputText({
      dataTestId: DataTestIdsEnum.amountInput,
      shouldOverride: true,
      text: '1'
    });

    await expectInputToHaveValue({
      dataTestId: DataTestIdsEnum.dataInput,
      value:
        'ESDTNFTTransfer@4348524953544d41532d323764336532@01@01@6e224118d9068ae626878a1cfbebcb6a95a4715db86d1b51e06a04226cf30fd6'
    });

    await page.click(getByDataTestId(DataTestIdsEnum.sendBtn));

    await expectAndSignTransaction([
      {
        amount: '0.000000000000000001',
        receiverAddress: keystoreAccount.address,
        signerAddress: '@webteam',
        gasPrice: '0.000000001',
        gasLimit: '1.000.000',
        data: 'ESDTNFTTransfer@4348524953544d41532d323764336532@01@01@6e224118d9068ae626878a1cfbebcb6a95a4715db86d1b51e06a04226cf30fd6'
      }
    ]);
  });
});
