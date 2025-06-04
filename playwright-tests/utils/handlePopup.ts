import { expect, Page } from '@playwright/test';

export const handlePopup = async (
  page: Page,
  triggerPopupAction: () => Promise<void>
) => {
  await page.waitForTimeout(3000);
  const [newPage] = await Promise.all([
    page.waitForEvent('popup'),
    triggerPopupAction()
  ]);
  await newPage.waitForLoadState();
  await expect(newPage.getByText('Succes')).toBeVisible({ timeout: 90000 });
  await newPage.close();
};
