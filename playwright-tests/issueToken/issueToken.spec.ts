import { test } from '@playwright/test';
import { createToken } from './actions.ts';
import { DataTestIdsEnum } from '../../src/localConstants/dataTestIds.enum.ts';
import { login, handlePopup } from '../utils/actions.ts';
import { AccountStatesEnum, LoginFilesEnum } from '../utils/enums.ts';

test('Create Token', async ({ page }) => {
  await page.goto('/unlock');
  await login({
    page,
    file: LoginFilesEnum.keystorePath2,
    user: AccountStatesEnum.readyToGuardAccount
  });
  await page.getByTestId(DataTestIdsEnum.issueTokenBtn).click();
  await createToken({ page });
  await page.waitForTimeout(5000);
  await handlePopup(page, () =>
    page
      .getByTestId('transactionDetailsToastBody')
      .getByRole('link')
      .nth(1)
      .click()
  );
  await page.close();
});
