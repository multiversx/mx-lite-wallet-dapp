import { WALLET_SOURCE_ORIGIN } from '__mocks__/data';
import { DataTestIdsEnum } from 'localConstants/dataTestIds.enum';
import {
  changeInputText,
  expectAndSignTransaction,
  getByDataTestId
} from 'utils/testUtils/puppeteer';
import { navigateToIssueCollectionPage } from './helpers';

describe('Issue NFT Collection test', () => {
  it('should create a new NFT collection successfully', async () => {
    await navigateToIssueCollectionPage();
    await expect(page.url()).toEqual(
      `${WALLET_SOURCE_ORIGIN}/issue-collection`
    );
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
    await expectAndSignTransaction();
  });
});
