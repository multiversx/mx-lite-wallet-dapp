import { WALLET_SOURCE_ORIGIN } from '__mocks__/data';
import { DataTestIdsEnum } from 'localConstants/dataTestIds.enum';
import {
  changeInputText,
  expectAndSignTransaction,
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
    await expectAndSignTransaction([
      {
        amount: '0.050000000000000000',
        receiverAddress:
          'vibe1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzllls2szsw0',
        signerAddress: '@webteam',
        gasPrice: '0.000000001',
        gasLimit: '60.137.000',
        data: 'registerAndSetAllRoles@53465454455354434f4c@534654@534654@'
      }
    ]);
  });
});
