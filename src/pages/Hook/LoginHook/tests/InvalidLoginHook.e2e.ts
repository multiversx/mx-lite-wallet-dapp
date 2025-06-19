import { WALLET_SOURCE_ORIGIN } from '__mocks__';
import { loginWithKeystore } from 'utils/testUtils/puppeteer';

describe('Invalid login hook tests', () => {
  it('should navigate to /dashboard route when callbackUrl is missing', async () => {
    await page.goto(
      `${WALLET_SOURCE_ORIGIN}/hook/login?token=aHR0cHM6Ly9kZXZuZXQueGV4Y2hhbmdlLmNvbQ.7017ab853e814a821f815244ad71944d6aef9d0d335db41f727e0a488cc73ba8.86400.eyJ0aW1lc3RhbXAiOjE2ODU0NDI2ODR9`,
      {
        waitUntil: 'domcontentloaded'
      }
    );

    await loginWithKeystore();
    expect(page.url()).toMatch(`${WALLET_SOURCE_ORIGIN}/dashboard`);
  });
});
