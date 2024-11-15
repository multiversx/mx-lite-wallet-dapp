import { DEFAULT_DELAY_MS, WALLET_SOURCE_ORIGIN } from '__mocks__/data';
import { DataTestIdsEnum } from 'localConstants/dataTestIds.enum';
import {
  expectElementToContainText,
  getByDataTestId,
  loginWithPem,
  sleep
} from 'utils/testUtils/puppeteer';

describe('Request funds tests', () => {
  it('should receive 40 WEGLD successfully', async () => {
    await page.goto(`${WALLET_SOURCE_ORIGIN}/logout`, {
      waitUntil: 'domcontentloaded'
    });

    await loginWithPem();
    const requestFundsButton = await page.waitForSelector(
      getByDataTestId(DataTestIdsEnum.faucetBtn)
    );

    await requestFundsButton.click();
    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.modalSubtitle,
      text: 'You can request 40 WEGLD every 24 hours'
    });

    await page.click(getByDataTestId(DataTestIdsEnum.requestFundsButton));
    await sleep(DEFAULT_DELAY_MS);
    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.modalSubtitle,
      text: '40 WEGLD have been sent to your address.'
    });
  });
});
