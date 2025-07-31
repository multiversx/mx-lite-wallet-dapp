import { WALLET_SOURCE_ORIGIN, keystoreAccount } from '__mocks__';
import {
  loginWithKeystore,
  waitForUrlToMatch
} from 'utils/testUtils/puppeteer';
import { pingSC } from './data/pingSC';

describe('Invalid sign hook - Missing callbackUrl', () => {
  it('should navigate to /unlock page without signing when callbackUrl is missing', async () => {
    await page.goto(
      `${WALLET_SOURCE_ORIGIN}/hook/sign?nonce%5B0%5D=3041&value%5B0%5D=0&receiver%5B0%5D=${pingSC.address}&sender%5B0%5D=${keystoreAccount.address}&gasPrice%5B0%5D=1000000000&gasLimit%5B0%5D=60000000&data%5B0%5D=pong&chainID%5B0%5D=V&version%5B0%5D=1`,
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