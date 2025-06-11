import { Page } from '@playwright/test';
import { DataTestIdsEnum } from '../../src/localConstants/dataTestIds.enum';

export const completeSendForm = async (page: Page, payload) => {
  await page.getByTestId(DataTestIdsEnum.receiverInput).fill(payload.adress);
  await page.waitForTimeout(500);

  if (payload.amount) {
    await page.getByTestId(DataTestIdsEnum.amountInput).fill(payload.amount);
  }

  await page.getByTestId(DataTestIdsEnum.sendBtn).click();
};

export const sendAction = async (page: Page, payload) => {
  await completeSendForm(page, payload);
};
