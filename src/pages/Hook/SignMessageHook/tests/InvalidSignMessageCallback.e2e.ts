import { WALLET_SOURCE_ORIGIN } from '__mocks__/data';
import { loginWithKeystore } from 'utils/testUtils/puppeteer';

describe('Invalid sign message tests', () => {
  it('should navigate to /dashboard route without signing when callbackUrl is missing', async () => {
    await page.goto(`${WALLET_SOURCE_ORIGIN}/hook/sign-message?message=test`, {
      waitUntil: 'domcontentloaded'
    });

    await loginWithKeystore();
    expect(page.url()).toMatch(`${WALLET_SOURCE_ORIGIN}/dashboard`);
  });
});
