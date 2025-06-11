import { test } from '@playwright/test';
import { createNft } from './actions.ts';
import { DataTestIdsEnum } from '../../src/localConstants/dataTestIds.enum.ts';
import { LoginFilesEnum } from '../utils/enums.ts';
import { handlePopup } from '../utils/handlePopup.ts';
import { login } from '../utils/login.ts';

test('Create NFT', async ({ page }) => {
  await page.goto('/unlock');
  await login({ page, file: LoginFilesEnum.keystorePath2 });
  await page.getByTestId(DataTestIdsEnum.issueNftBtn).click();
  await createNft({ page });
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
