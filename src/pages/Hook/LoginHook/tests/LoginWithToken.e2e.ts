import {
  WALLET_SOURCE_ORIGIN,
  keystoreAccount,
  DEFAULT_PAGE_LOAD_DELAY_MS
} from '__mocks__';
import { loginWithKeystore, sleep } from 'utils/testUtils/puppeteer';

describe('Login hook with token test', () => {
  it('should login with token and redirect to the callbackUrl', async () => {
    await page.goto(
      `${WALLET_SOURCE_ORIGIN}/hook/login?token=aHR0cHM6Ly9kZXZuZXQueGV4Y2hhbmdlLmNvbQ.9a6667745c5179d69300f59a7a7b6970904588ec65710a0f79827b116963df2b.86400.eyJ0aW1lc3RhbXAiOjE3MTI4MTc3NzN9&callbackUrl=https://devnet.xexchange.com/dashboard`,
      {
        waitUntil: 'domcontentloaded'
      }
    );

    await loginWithKeystore({ skipLoggedInCheck: true });
    await sleep(DEFAULT_PAGE_LOAD_DELAY_MS);

    expect(page.url()).toMatch(
      `https://devnet.xexchange.com/dashboard?address=${keystoreAccount.address}&signature=80f88acd3326b54d69613a56a50cd1aa74ad6485d4031d92ec2e661253491fc1d933da672251333b2a88f0a18cb486a97764816459953e84dc72700048da0c05`
    );
  });
});
