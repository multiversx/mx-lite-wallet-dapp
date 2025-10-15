import { keystoreAccount, WALLET_SOURCE_ORIGIN } from '__mocks__/data';
import {
  loginWithKeystore,
  waitForUrlToMatch
} from 'utils/testUtils/puppeteer';

describe('Login hook without token test', () => {
  it('should login without token and redirect to the callbackUrl', async () => {
    await page.goto(
      `${WALLET_SOURCE_ORIGIN}/hook/login?callbackUrl=https://devnet.xexchange.com/dashboard`,
      {
        waitUntil: 'domcontentloaded'
      }
    );

    await loginWithKeystore({ skipLoginCheck: true });
    const expectedUrl = `https://devnet.xexchange.com/dashboard?address=${keystoreAccount.address}`;
    await waitForUrlToMatch({ expectedUrl });
  });
});
