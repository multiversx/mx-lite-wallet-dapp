import { test, expect } from '@playwright/test';
import { sendAction } from './actions.ts';
import { sendData } from './data.ts';
import { DataTestIdsEnum } from '../../src/localConstants/dataTestIds.enum.ts';
import { login, handlePopup } from '../utils/actions.ts';
import { LoginFilesEnum, RoutesEnum } from '../utils/enums.ts';

test('Positive Send Estd', async ({ page }) => {
  await page.goto('/unlock');
  await login({ page, file: LoginFilesEnum.keystorePath });
  await page.getByTestId(DataTestIdsEnum.sendBtn).click();
  await sendAction(page, sendData);
  await handlePopup(page, () =>
    page
      .getByTestId(DataTestIdsEnum.transactionDetailsToastBody)
      .getByRole('link')
      .nth(1)
      .click()
  );
  await page.getByTestId(DataTestIdsEnum.logoutBtn).click();
  await expect(page).toHaveURL(RoutesEnum.unlock);
  await page.close();
});
