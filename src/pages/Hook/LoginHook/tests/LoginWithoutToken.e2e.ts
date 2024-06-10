import { WALLET_SOURCE_ORIGIN } from '__mocks__/data/constants';
import { testAccount } from '__mocks__/data/testAccount';
import { loginWithKeystore, passImpersonate } from 'utils/testUtils/puppeteer';

describe('Login hook without token test', () => {
  it('should login without token and redirect to the callbackUrl', async () => {
    await page.goto(
      `${WALLET_SOURCE_ORIGIN}/hook/login?callbackUrl=https://devnet.xexchange.com/dashboard`,
      {
        waitUntil: 'domcontentloaded'
      }
    );

    await loginWithKeystore();
    await passImpersonate();

    expect(page.url()).toMatch(
      `https://devnet.xexchange.com/dashboard?address=${testAccount.address}`
    );
  });
});
