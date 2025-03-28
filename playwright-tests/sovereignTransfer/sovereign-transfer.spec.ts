import { test, expect } from '@playwright/test';
import { DataTestIdsEnum } from '../../src/localConstants/dataTestIds.enum.ts';
import { login, confirmPem, sovereignTransfer } from '../utils/actions.ts';

test('Positive sovereign transfer', async ({ page }) => {
  await page.goto('/unlock');
  await login({ page });
  await page.getByTestId(DataTestIdsEnum.activeNetwork).click();
  await page.getByTestId(DataTestIdsEnum.testnet).click();
  await page.getByTestId(DataTestIdsEnum.sovereignTransferBtn).click();
  await confirmPem({ page });
  await sovereignTransfer({ page });
  await expect(
    page.getByTestId(DataTestIdsEnum.transactionToastTitle)
  ).toBeVisible();
  await page.close();
});
