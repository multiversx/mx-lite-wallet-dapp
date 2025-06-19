import { WALLET_SOURCE_ORIGIN } from '__mocks__';
import { DataTestIdsEnum } from 'localConstants/dataTestIds.enum';
import { expectElementToContainText } from 'utils/testUtils/puppeteer';

describe('Invalid logout hook tests', () => {
  it('should logout and navigate to unlock page when callbackUrl is missing', async () => {
    await page.goto(`${WALLET_SOURCE_ORIGIN}/hook/logout`, {
      waitUntil: 'domcontentloaded'
    });

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.unlockPage,
      text: 'Login'
    });

    expect(page.url()).toMatch(`${WALLET_SOURCE_ORIGIN}/unlock`);
  });
});
