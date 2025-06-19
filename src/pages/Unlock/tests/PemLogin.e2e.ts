import { WALLET_SOURCE_ORIGIN } from '__mocks__/data/constants';
import { loginWithPem } from 'utils/testUtils/puppeteer';

describe('Pem login test', () => {
  it('should login with pem file successfully', async () => {
    await page.goto(`${WALLET_SOURCE_ORIGIN}/logout`, {
      waitUntil: 'domcontentloaded'
    });

    await loginWithPem();
    expect(page.url()).toMatch(`${WALLET_SOURCE_ORIGIN}/dashboard`);
  });
});
