import {
  DEFAULT_PAGE_LOAD_DELAY_MS,
  keystoreAccount,
  WALLET_SOURCE_ORIGIN
} from '__mocks__';
import { loginWithKeystore, sleep } from 'utils/testUtils/puppeteer';

describe('Login hook without token test', () => {
  it('should login without token and redirect to the callbackUrl', async () => {
    await page.goto(
      `${WALLET_SOURCE_ORIGIN}/hook/login?callbackUrl=https://devnet.xexchange.com/dashboard`,
      {
        waitUntil: 'domcontentloaded'
      }
    );

    await loginWithKeystore({ skipLoggedInCheck: true });
    await sleep(DEFAULT_PAGE_LOAD_DELAY_MS);

    expect(page.url()).toMatch(
      `https://devnet.xexchange.com/dashboard?address=${keystoreAccount.address}`
    );
  });
});
