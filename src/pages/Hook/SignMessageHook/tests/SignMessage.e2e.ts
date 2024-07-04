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
      'https://devnet.xexchange.com/?status=signed&signature=87ff670447448bdd1fa93c70b04627514b2ea220c8f98d0cc8e5be6113b47cef922fb6339b67aba7c292ab3ac73edc019aeb8da74880250390d7f9eb4f1d5f09'
    );
  });
});
