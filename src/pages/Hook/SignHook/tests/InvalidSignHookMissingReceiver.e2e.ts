import { WALLET_SOURCE_ORIGIN, keystoreAccount } from '__mocks__/data';
import {
  loginWithKeystore,
  waitForUrlToMatch
} from 'utils/testUtils/puppeteer';

describe('Invalid sign hook - Missing receiver', () => {
  it('should navigate to /unlock page without signing when receiver is missing', async () => {
    await page.goto(
      `${WALLET_SOURCE_ORIGIN}/hook/sign?nonce%5B0%5D=3041&value%5B0%5D=0&sender%5B0%5D=${keystoreAccount.address}&gasPrice%5B0%5D=1000000000&gasLimit%5B0%5D=60000000&data%5B0%5D=pong&chainID%5B0%5D=S&version%5B0%5D=1&callbackUrl=https://devnet.xexchange.com`,
      {
        waitUntil: 'domcontentloaded'
      }
    );

    await loginWithKeystore({
      skipLoginCheck: true
    });

    await waitForUrlToMatch({
      expectedUrl: `${WALLET_SOURCE_ORIGIN}/dashboard`
    });
  });
});
