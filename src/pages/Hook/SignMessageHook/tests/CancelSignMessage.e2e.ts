import { keystoreAccount, WALLET_SOURCE_ORIGIN } from '__mocks__';
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
    await page.click(getByDataTestId(DataTestIdsEnum.cancelSignMessageBtn));

    expect(page.url()).toMatch(
      `https://devnet.xexchange.com/?address=${keystoreAccount.address}&status=cancelled`
    );
  });
});
