import { WALLET_SOURCE_ORIGIN } from '__mocks__/data';
import { DataTestIdsEnum } from 'localConstants/dataTestIds.enum';
import {
  changeInputText,
  expectElementToContainText,
  getByDataTestId,
  loginWithKeystore
} from 'utils/testUtils/puppeteer';

describe('Issue NFT Collection test', () => {
  it('should create a new NFT collection successfully', async () => {
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
    await changeInputText({
      dataTestId: DataTestIdsEnum.tokenNameInput,
      shouldOverride: true,
      text: 'TESTCOLLECTION'
    });

    await changeInputText({
      dataTestId: DataTestIdsEnum.tokenTickerInput,
      shouldOverride: true,
      text: 'TEST'
    });

    await page.click(getByDataTestId(DataTestIdsEnum.issueCollectionBtn));
    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.transactionToastTitle,
      text: 'Processing transaction'
    });
  });
});
