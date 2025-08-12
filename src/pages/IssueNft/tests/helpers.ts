import { WALLET_SOURCE_ORIGIN } from '__mocks__/data';
import { DataTestIdsEnum } from 'localConstants/dataTestIds.enum';
import { getByDataTestId, loginWithKeystore } from 'utils/testUtils/puppeteer';

export const navigateToIssueNftPage = async () => {
  await page.goto(`${WALLET_SOURCE_ORIGIN}/logout`, {
    waitUntil: 'domcontentloaded'
  });

  await loginWithKeystore();

  const issueNftBtn = await page.waitForSelector(
    getByDataTestId(DataTestIdsEnum.issueNftBtn)
  );

  expect(issueNftBtn).toBeDefined();
  await issueNftBtn.click();

  const createNftBtn = await page.waitForSelector(
    getByDataTestId(DataTestIdsEnum.issueNftBtn)
  );

  expect(createNftBtn).toBeDefined();
  await createNftBtn.click();
};
