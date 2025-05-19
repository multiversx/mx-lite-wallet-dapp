// This fixture creates an NFT before running the Sovereign Transfer test.

import { test as base, expect, Page } from '@playwright/test';
import { DataTestIdsEnum } from '../../src/localConstants/dataTestIds.enum';
import { createNft } from '../createNft/actions';
import { login } from '../utils/login';

export const test = base.extend<{ authenticatedPage: Page }>({
  authenticatedPage: async ({ page }, use) => {
    await page.goto('/unlock');
    await login({ page });
    await page.getByTestId(DataTestIdsEnum.issueNftBtn).click();
    await createNft({ page });
    await page.waitForTimeout(5000);
    await expect(
      page.getByTestId(DataTestIdsEnum.transactionToastTitle)
    ).toBeVisible();
    await page.getByTestId(DataTestIdsEnum.cancelBtn).click();
    await page.waitForTimeout(5000);
    await use(page);
  }
});

export { expect } from '@playwright/test';
