import { Page } from '@playwright/test';
import { LoginFilesEnum } from './enums';
import { DataTestIdsEnum } from '../../src/localConstants/dataTestIds.enum';

type ConfirmPemType = {
  page: Page;
  file?: string;
};
export const confirmPem = async ({
  page,
  file = LoginFilesEnum.pem
}: ConfirmPemType) => {
  await page.getByText('Select a file').click();
  await page.setInputFiles(DataTestIdsEnum.inputFile, file);
  await page.getByTestId(DataTestIdsEnum.submitButton).click();
};
