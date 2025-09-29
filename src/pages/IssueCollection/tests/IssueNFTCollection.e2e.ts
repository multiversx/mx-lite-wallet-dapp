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
    await expectAndSignTransaction([
      {
        amount: '0.0500',
        receiverAddress:
          'erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzllls8a5w6u',
        signerAddress: '@webteam',
        gasPrice: '0.000000001',
        gasLimit: '60.152.000',
        data: 'registerAndSetAllRoles@54455354434f4c4c454354494f4e@54455354@4e4654@'
      }
    ]);
  });
});
