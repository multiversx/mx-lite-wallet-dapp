import { testAccount, WALLET_SOURCE_ORIGIN } from '__mocks__/data';
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

    await loginWithKeystore();
    await page.waitForSelector(
      getByDataTestId(DataTestIdsEnum.signMessageModal)
    );

    expect(page.url()).toMatch(`${WALLET_SOURCE_ORIGIN}/sign-message`);
    await page.click(getByDataTestId(DataTestIdsEnum.closeBtn));

    expect(page.url()).toMatch(
      `https://devnet.xexchange.com/?address=${testAccount.address}&status=cancelled`
    );
  });
});
