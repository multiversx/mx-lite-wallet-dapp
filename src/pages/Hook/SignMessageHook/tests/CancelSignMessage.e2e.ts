import { keystoreAccount, WALLET_SOURCE_ORIGIN } from '__mocks__/data';
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

    const cancelSignMessageBtn = await page.waitForSelector(
      getByDataTestId(DataTestIdsEnum.cancelSignMessageBtn)
    );

    await cancelSignMessageBtn.click();

    await waitForUrlToMatch({
      expectedUrl: `https://devnet.xexchange.com/?address=${keystoreAccount.address}&status=cancelled`
    });
  });
});
