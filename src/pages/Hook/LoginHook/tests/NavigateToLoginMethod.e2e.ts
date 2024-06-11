import {
  DEFAULT_PAGE_LOAD_DELAY_MS,
  WALLET_SOURCE_ORIGIN
} from '__mocks__/data/constants';
import { sleep } from '__mocks__/lib';

describe('Login hook with keystore test', () => {
  it('should navigate to keystore page when keystore search param is set', async () => {
    await page.goto(
      `${WALLET_SOURCE_ORIGIN}/hook/login?token=aHR0cHM6Ly9kZXZuZXQueGV4Y2hhbmdlLmNvbQ.9a6667745c5179d69300f59a7a7b6970904588ec65710a0f79827b116963df2b.86400.eyJ0aW1lc3RhbXAiOjE3MTI4MTc3NzN9&callbackUrl=https://devnet.xexchange.com/dashboard&method=keystore`,
      {
        waitUntil: 'domcontentloaded'
      }
    );

    await sleep(DEFAULT_PAGE_LOAD_DELAY_MS);
    expect(page.url()).toMatch(`${WALLET_SOURCE_ORIGIN}/unlock/keystore`);
  });

  it('should navigate to pem page when pem search param is set', async () => {
    await page.goto(
      `${WALLET_SOURCE_ORIGIN}/hook/login?token=aHR0cHM6Ly9kZXZuZXQueGV4Y2hhbmdlLmNvbQ.9a6667745c5179d69300f59a7a7b6970904588ec65710a0f79827b116963df2b.86400.eyJ0aW1lc3RhbXAiOjE3MTI4MTc3NzN9&callbackUrl=https://devnet.xexchange.com/dashboard&method=pem`,
      {
        waitUntil: 'domcontentloaded'
      }
    );

    await sleep(DEFAULT_PAGE_LOAD_DELAY_MS);
    expect(page.url()).toMatch(`${WALLET_SOURCE_ORIGIN}/unlock/pem`);
  });

  it('should navigate to ledger page when ledger search param is set', async () => {
    await page.goto(
      `${WALLET_SOURCE_ORIGIN}/hook/login?token=aHR0cHM6Ly9kZXZuZXQueGV4Y2hhbmdlLmNvbQ.9a6667745c5179d69300f59a7a7b6970904588ec65710a0f79827b116963df2b.86400.eyJ0aW1lc3RhbXAiOjE3MTI4MTc3NzN9&callbackUrl=https://devnet.xexchange.com/dashboard&method=ledger`,
      {
        waitUntil: 'domcontentloaded'
      }
    );

    await sleep(DEFAULT_PAGE_LOAD_DELAY_MS);
    expect(page.url()).toMatch(`${WALLET_SOURCE_ORIGIN}/unlock/ledger`);
  });

  it('should navigate to walletconnect page when walletconnect search param is set', async () => {
    await page.goto(
      `${WALLET_SOURCE_ORIGIN}/hook/login?token=aHR0cHM6Ly9kZXZuZXQueGV4Y2hhbmdlLmNvbQ.9a6667745c5179d69300f59a7a7b6970904588ec65710a0f79827b116963df2b.86400.eyJ0aW1lc3RhbXAiOjE3MTI4MTc3NzN9&callbackUrl=https://devnet.xexchange.com/dashboard&method=walletconnect`,
      {
        waitUntil: 'domcontentloaded'
      }
    );

    await sleep(DEFAULT_PAGE_LOAD_DELAY_MS);
    expect(page.url()).toMatch(`${WALLET_SOURCE_ORIGIN}/unlock/walletconnect`);
  });
});
