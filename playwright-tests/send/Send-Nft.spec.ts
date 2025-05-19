import { test } from '@playwright/test';
import { sendAction } from './actions.ts';
import { sendNftData } from './data.ts';
import { DataTestIdsEnum } from '../../src/localConstants/dataTestIds.enum.ts';
import { LoginFilesEnum } from '../utils/enums.ts';
import { handlePopup } from '../utils/handlePopup.ts';
import { login } from '../utils/login.ts';

test('Positive Send Nft', async ({ page }) => {
  await page.goto('/unlock');
  await login({ page, file: LoginFilesEnum.keystorePath2 });
  await page.getByTestId(DataTestIdsEnum.sendBtn).click();
  await page.getByTestId(DataTestIdsEnum.sendNFtTypeInput).click();
  await sendAction(page, sendNftData);
  await handlePopup(page, () =>
    page
      .getByTestId(DataTestIdsEnum.transactionDetailsToastBody)
      .getByRole('link')
      .nth(1)
      .click()
  );
  await page.close();
});
