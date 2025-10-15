import { WALLET_SOURCE_ORIGIN } from '__mocks__/data';
import { waitForUrlToMatch } from 'utils/testUtils/puppeteer';

describe('Valid logout hook tests', () => {
  it('should logout and navigate to callbackURl', async () => {
    await page.goto(
      `${WALLET_SOURCE_ORIGIN}/hook/logout?callbackUrl=https://devnet.xexchange.com/logout`,
      {
        waitUntil: 'domcontentloaded'
      }
    );

    await waitForUrlToMatch({
      expectedUrl: 'https://devnet.xexchange.com/logout'
    });
  });
});
