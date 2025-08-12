import { WALLET_SOURCE_ORIGIN } from '__mocks__';
import { waitForUrlToMatch } from 'utils/testUtils/puppeteer';

describe('Invalid logout hook tests', () => {
  it('should logout and navigate to unlock page when callbackUrl is missing', async () => {
    await page.goto(`${WALLET_SOURCE_ORIGIN}/hook/logout`, {
      waitUntil: 'domcontentloaded'
    });

    await waitForUrlToMatch({
      expectedUrl: `${WALLET_SOURCE_ORIGIN}/unlock`
    });
  });
});
