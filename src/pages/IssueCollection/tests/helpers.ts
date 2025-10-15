import { WALLET_SOURCE_ORIGIN } from '__mocks__/data';
import { DataTestIdsEnum } from 'localConstants/dataTestIds.enum';
import { getByDataTestId, loginWithKeystore } from 'utils/testUtils/puppeteer';

export const navigateToIssueCollectionPage = async () => {
  await page.goto(`${WALLET_SOURCE_ORIGIN}/logout`, {
    waitUntil: 'domcontentloaded'
  });

  await loginWithKeystore();

  const issueCollectionBtn = await page.waitForSelector(
    getByDataTestId(DataTestIdsEnum.issueCollectionBtn)
  );

  expect(issueCollectionBtn).toBeDefined();
  await issueCollectionBtn.click();

  const createCollectionBtn = await page.waitForSelector(
    getByDataTestId(DataTestIdsEnum.issueCollectionBtn)
  );

  await createCollectionBtn?.click();
};
