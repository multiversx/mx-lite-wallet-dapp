import { test } from '@playwright/test';
import { sendAction } from './actions.ts';
import { sendData } from './data.ts';
import { DataTestIdsEnum } from '../../src/localConstants/dataTestIds.enum.ts';
import { login, handlePopup } from '../utils/actions.ts';

test('Positive w pem', async ({ page }) => {
  await page.goto('/unlock');
  await login({ page });
  await page.getByTestId(DataTestIdsEnum.sendBtn).click();
  await sendAction(page, sendData);
  await handlePopup(page, () =>
    page
      .getByTestId('transactionDetailsToastBody')
      .getByRole('link')
      .nth(1)
      .click()
  );
  await page.close();
});
