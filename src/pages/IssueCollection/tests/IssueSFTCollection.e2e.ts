import { WALLET_SOURCE_ORIGIN } from '__mocks__/data';
import { DataTestIdsEnum } from 'localConstants/dataTestIds.enum';
import {
  changeInputText,
  expectElementToContainText,
  getByDataTestId
} from 'utils/testUtils/puppeteer';
import { navigateToIssueCollectionPage } from './helpers';

describe('Issue SFT Collection test', () => {
  it('should create a new SFT collection successfully', async () => {
    await navigateToIssueCollectionPage();
    expect(page.url()).toEqual(`${WALLET_SOURCE_ORIGIN}/issue-collection`);
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
