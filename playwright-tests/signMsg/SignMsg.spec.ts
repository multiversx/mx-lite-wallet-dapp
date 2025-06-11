import { test, expect } from '@playwright/test';
import { DataTestIdsEnum } from '../../src/localConstants/dataTestIds.enum.ts';
import { RoutesEnum, GlobalDataEnum, LoginFilesEnum } from '../utils/enums.ts';
import { login } from '../utils/login.ts';

test('Sign msg test', async ({ page }) => {
  await page.goto('/unlock');
  await login({ page, file: LoginFilesEnum.keystorePath });
  await page.getByTestId(DataTestIdsEnum.signMessageBtn).click();
  await page
    .getByRole('textbox', { name: 'Write message here' })
    .fill('Test msg');
  await page.getByTestId(DataTestIdsEnum.signMessageBtn).click();
  await expect(page.getByText(GlobalDataEnum.decodedMsg)).toBeVisible();
  await expect(page.getByText(GlobalDataEnum.encodedMsg)).toBeVisible();
  await expect(page.getByText(GlobalDataEnum.signature)).toBeVisible();
  await page.getByRole('button', { name: 'Clear' }).click();
  await expect(page).toHaveURL(RoutesEnum.dashboard);
  await page.close();
});
