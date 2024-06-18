import { WALLET_SOURCE_ORIGIN } from '__mocks__/data/constants';
import { DataTestIdsEnum } from 'localConstants/dataTestIds.enum';
import { getByDataTestId, loginWithPem } from 'utils/testUtils/puppeteer';

describe('Pem login test', () => {
  it('should login with pem file successfully', async () => {
    await page.goto(`${WALLET_SOURCE_ORIGIN}/unlock`, {
      waitUntil: 'domcontentloaded'
    });

    await loginWithPem();
    expect(page.url()).toMatch(`${WALLET_SOURCE_ORIGIN}/dashboard`);
    await page.click(getByDataTestId(DataTestIdsEnum.logoutBtn));
  });
});
