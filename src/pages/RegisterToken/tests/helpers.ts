import { WALLET_SOURCE_ORIGIN } from '__mocks__/data';
import { DataTestIdsEnum } from 'localConstants/dataTestIds.enum';
import { getByDataTestId, loginWithKeystore } from 'utils/testUtils/puppeteer';

export const navigateToRegisterTokenPage = async () => {
  await page.goto(`${WALLET_SOURCE_ORIGIN}/logout`, {
    waitUntil: 'domcontentloaded'
  });

  await loginWithKeystore();

  const registerTokenBtn = await page.waitForSelector(
    getByDataTestId(DataTestIdsEnum.registerTokenBtn)
  );

  expect(registerTokenBtn).toBeDefined();
  await registerTokenBtn.click();

  const sendBtn = await page.waitForSelector(
    getByDataTestId(DataTestIdsEnum.sendBtn)
  );

  expect(sendBtn).toBeDefined();
};
