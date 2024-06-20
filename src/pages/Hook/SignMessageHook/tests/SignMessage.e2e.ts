import { WALLET_SOURCE_ORIGIN } from '__mocks__/data';
import { DataTestIdsEnum } from 'localConstants/dataTestIds.enum';
import { getByDataTestId, loginWithKeystore } from 'utils/testUtils/puppeteer';

describe('Cancel sign message tests', () => {
  it('should cancel sign message and redirect to callbackUrl with status cancelled', async () => {
    await page.goto(
      `${WALLET_SOURCE_ORIGIN}/hook/sign-message?message=test&callbackUrl=https://devnet.xexchange.com`,
      {
        waitUntil: 'domcontentloaded'
      }
    );

    await loginWithKeystore({ skipLoggedInCheck: true });
    await page.waitForSelector(
      getByDataTestId(DataTestIdsEnum.signMessagePage)
    );

    expect(page.url()).toMatch(`${WALLET_SOURCE_ORIGIN}/sign-message`);
    await page.click(getByDataTestId(DataTestIdsEnum.signMessageBtn));

    expect(page.url()).toMatch(
      'https://devnet.xexchange.com/?status=signed&signature=1f0e1b40b1d83dcde5a62271c676f0d541adf4fbfa55daac4885911ae59c435d313179fab5ba5dc50918dae31909f1d4bf28bd2b68f47a1301c0745c6e039506'
    );
  });
});
