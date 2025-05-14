import { expect, Page } from '@playwright/test';
import { getTokensAndBalanceQueryResponse } from './mockData/getTokensAndBalanceQueryResponse.ts';
import { DataTestIdsEnum } from '../../src/localConstants/dataTestIds.enum';
import {
  AccountStatesEnum,
  ApiPathEnum,
  GlobalDataEnum,
  LoginFilesEnum
} from '../utils/enums.ts';

export const confirmPem = async ({ page, file = LoginFilesEnum.pem }) => {
  await page.getByText('Select a file').click();
  await page.setInputFiles(DataTestIdsEnum.inputFile, file);
  await page.getByTestId(DataTestIdsEnum.submitButton).click();
};
export const login = async ({ page, file = LoginFilesEnum.pem, user = '' }) => {
  // Wait for and click the access wallet button

  if (file !== LoginFilesEnum.pem) {
    await page.getByTestId(DataTestIdsEnum.keystoreBtn).click();
    await page.setInputFiles(DataTestIdsEnum.inputFile, file);
    await page.getByTestId(DataTestIdsEnum.accessPass).fill('Develop13#');
    console.log(user);
    await page.getByTestId(DataTestIdsEnum.submitButton).click();
    user ? await page.getByTestId(`check_${user}`).click() : '';
    await page.waitForTimeout(1000);
    await page.getByTestId(DataTestIdsEnum.confirmBtn).click();
    await page.waitForTimeout(2000);
  } else {
    await page.getByTestId(DataTestIdsEnum.pemBtn).click();
    await confirmPem({ page, file });
  }
};

export const handlePopup = async (page: Page, triggerPopupAction) => {
  await page.waitForTimeout(3000);
  const [newPage] = await Promise.all([
    page.waitForEvent('popup'),
    triggerPopupAction()
  ]);
  await newPage.waitForLoadState();
  await expect(newPage.getByText('Succes')).toBeVisible({ timeout: 90000 });
  await newPage.close();
};

export const sovereignTransfer = async ({
  page,
  contractInput = GlobalDataEnum.contractDevnet,
  receiver = AccountStatesEnum.unGuardAccount8
}) => {
  await page.getByTestId(DataTestIdsEnum.contractInput).fill(contractInput);
  await page.getByTestId(DataTestIdsEnum.receiverInput).fill(receiver);
  await page.getByTestId(DataTestIdsEnum.sendBtn).click();
};

export const mockGraphQlResponse = async (page: Page) => {
  await page.route(ApiPathEnum.devnetGraphXexchange, (route) => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        data: getTokensAndBalanceQueryResponse
      })
    });
  });
};
