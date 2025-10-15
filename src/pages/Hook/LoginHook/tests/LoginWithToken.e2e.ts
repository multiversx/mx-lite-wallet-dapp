import { WALLET_SOURCE_ORIGIN, keystoreAccount } from '__mocks__/data';
import {
  loginWithKeystore,
  waitForUrlToMatch
} from 'utils/testUtils/puppeteer';

describe('Login hook with token test', () => {
  it('should login with token and redirect to the callbackUrl', async () => {
    await page.goto(
      `${WALLET_SOURCE_ORIGIN}/hook/login?token=aHR0cHM6Ly9kZXZuZXQueGV4Y2hhbmdlLmNvbQ.9a6667745c5179d69300f59a7a7b6970904588ec65710a0f79827b116963df2b.86400.eyJ0aW1lc3RhbXAiOjE3MTI4MTc3NzN9&callbackUrl=https://devnet.xexchange.com/dashboard`,
      {
        waitUntil: 'domcontentloaded'
      }
    );

    await loginWithKeystore({ skipLoginCheck: true });
    const expectedUrl = `https://devnet.xexchange.com/dashboard?address=${keystoreAccount.address}&signature=`;
    await waitForUrlToMatch({ expectedUrl });
  });
});
