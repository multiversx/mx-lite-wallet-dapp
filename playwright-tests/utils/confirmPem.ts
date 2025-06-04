import { Page } from '@playwright/test';
import { DataTestIdsEnum } from '../../src/localConstants/dataTestIds.enum';
import { LoginFilesEnum } from '../utils/enums.ts';

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
