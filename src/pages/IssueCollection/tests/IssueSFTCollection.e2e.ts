import { WALLET_SOURCE_ORIGIN } from '__mocks__/data';
import { DataTestIdsEnum } from 'localConstants/dataTestIds.enum';
import {
  changeInputText,
  expectElementToContainText,
  getByDataTestId,
  loginWithKeystore
} from 'utils/testUtils/puppeteer';

describe('Issue SFT Collection test', () => {
  it('should create a new SFT collection successfully', async () => {
    await page.goto(`${WALLET_SOURCE_ORIGIN}/logout`, {
      waitUntil: 'domcontentloaded'
    });

    await loginWithKeystore();
    await page.click(getByDataTestId(DataTestIdsEnum.issueCollectionBtn));
    await expect(page.url()).toEqual(
      `${WALLET_SOURCE_ORIGIN}/issue-collection`
    );

    const createCollectionBtn = await page.waitForSelector(
      getByDataTestId(DataTestIdsEnum.issueCollectionBtn)
    );

    await createCollectionBtn?.click();
    await page.click(getByDataTestId(DataTestIdsEnum.sftTypeInput));
    await changeInputText({
      dataTestId: DataTestIdsEnum.tokenNameInput,
      shouldOverride: true,
      text: 'SFTTESTCOL'
    });

    await changeInputText({
      dataTestId: DataTestIdsEnum.tokenTickerInput,
      shouldOverride: true,
      text: 'SFT'
    });

    await page.click(getByDataTestId(DataTestIdsEnum.issueCollectionBtn));
    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.transactionToastTitle,
      text: 'Processing transaction'
    });
  });
});
