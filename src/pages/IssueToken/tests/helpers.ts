import { WALLET_SOURCE_ORIGIN } from '__mocks__/data';
import { DataTestIdsEnum } from 'localConstants/dataTestIds.enum';
import { getByDataTestId, loginWithKeystore } from 'utils/testUtils/puppeteer';

export const navigateToIssueTokenPage = async () => {
  await page.goto(`${WALLET_SOURCE_ORIGIN}/logout`, {
    waitUntil: 'domcontentloaded'
  });

  await loginWithKeystore();

  const issueTokenBtn = await page.waitForSelector(
    getByDataTestId(DataTestIdsEnum.issueTokenBtn)
  );

  expect(issueTokenBtn).toBeDefined();
  await issueTokenBtn.click();

  const createTokenBtn = await page.waitForSelector(
    getByDataTestId(DataTestIdsEnum.issueTokenBtn)
  );

  expect(createTokenBtn).toBeDefined();
};
