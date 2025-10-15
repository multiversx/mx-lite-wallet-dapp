import { WALLET_SOURCE_ORIGIN } from '__mocks__/data';
import { DataTestIdsEnum } from 'localConstants/dataTestIds.enum';
import {
  getByDataTestId,
  loginWithKeystore,
  waitForUrlToMatch
} from 'utils/testUtils/puppeteer';

describe('Cancel sign message tests', () => {
  it('should cancel sign message and redirect to callbackUrl with status cancelled', async () => {
    await page.goto(
      `${WALLET_SOURCE_ORIGIN}/hook/sign-message?message=test&callbackUrl=https://devnet.xexchange.com`,
      {
        waitUntil: 'domcontentloaded'
      }
    );

    await loginWithKeystore({ skipLoginCheck: true });

    await waitForUrlToMatch({
      expectedUrl: `${WALLET_SOURCE_ORIGIN}/sign-message`
    });

    const signMessageBtn = await page.waitForSelector(
      getByDataTestId(DataTestIdsEnum.signMessageBtn)
    );

    await signMessageBtn.click();

    await waitForUrlToMatch({
      expectedUrl:
        'https://devnet.xexchange.com/?status=signed&signature=87ff670447448bdd1fa93c70b04627514b2ea220c8f98d0cc8e5be6113b47cef922fb6339b67aba7c292ab3ac73edc019aeb8da74880250390d7f9eb4f1d5f09'
    });
  });
});
