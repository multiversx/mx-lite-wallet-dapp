import { test } from '@playwright/test';
import { issueCollection } from './actions.ts';
import { DataTestIdsEnum } from '../../src/localConstants/dataTestIds.enum.ts';
import { AccountStatesEnum, LoginFilesEnum } from '../utils/enums.ts';
import { handlePopup } from '../utils/handlePopup.ts';
import { login } from '../utils/login.ts';

test('Create Collection', async ({ page }) => {
  await page.goto('/unlock');
  await login({
    page,
    file: LoginFilesEnum.keystorePath2,
    user: AccountStatesEnum.unGuardedAccount6
  });
  await page.getByTestId(DataTestIdsEnum.issueCollectionBtn).click();
  await issueCollection({ page });
  await page.waitForTimeout(5000);
  await handlePopup(page, () =>
    page
      .getByTestId(DataTestIdsEnum.transactionDetailsToastBody)
      .getByRole('link')
      .nth(1)
      .click()
  );
  await page.close();
});
