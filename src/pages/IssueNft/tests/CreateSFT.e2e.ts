import { WALLET_SOURCE_ORIGIN } from '__mocks__/data';
import { DataTestIdsEnum } from 'localConstants/dataTestIds.enum';
import {
  changeInputText,
  expectElementToContainText,
  expectInputToHaveValue,
  getByDataTestId,
  loginWithKeystore
} from 'utils/testUtils/puppeteer';

describe('Issue SFT test', () => {
  it('should create a new SFT successfully', async () => {
    await page.goto(`${WALLET_SOURCE_ORIGIN}/logout`, {
      waitUntil: 'domcontentloaded'
    });

    await loginWithKeystore();
    await page.click(getByDataTestId(DataTestIdsEnum.issueNftBtn));
    await expect(page.url()).toEqual(`${WALLET_SOURCE_ORIGIN}/create-nft`);
    await page.waitForSelector(getByDataTestId(DataTestIdsEnum.issueNftBtn));
    await page.keyboard.press('Tab');
    await page.type('#react-select-2-input', 'SFT');
    await page.keyboard.press('Enter');
    await page.click(getByDataTestId(DataTestIdsEnum.issueNftBtn));
    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.nameError,
      text: 'Required'
    });

    await expectInputToHaveValue({
      dataTestId: DataTestIdsEnum.quantityInput,
      value: '1'
    });

    await expectInputToHaveValue({
      dataTestId: DataTestIdsEnum.royaltiesInput,
      value: '1'
    });

    await changeInputText({
      dataTestId: DataTestIdsEnum.nameInput,
      shouldOverride: true,
      text: 'SFTTOKEN'
    });

    await expectInputToHaveValue({
      dataTestId: DataTestIdsEnum.nameInput,
      value: 'SFTTOKEN'
    });

    await changeInputText({
      dataTestId: DataTestIdsEnum.quantityInput,
      shouldOverride: true,
      text: '100'
    });

    await expectInputToHaveValue({
      dataTestId: DataTestIdsEnum.quantityInput,
      value: '100'
    });

    await changeInputText({
      dataTestId: DataTestIdsEnum.royaltiesInput,
      shouldOverride: true,
      text: '10'
    });

    await expectInputToHaveValue({
      dataTestId: DataTestIdsEnum.royaltiesInput,
      value: '10'
    });

    await page.click(getByDataTestId(DataTestIdsEnum.issueNftBtn));
    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.transactionToastTitle,
      text: 'Processing transaction'
    });
  });
});
