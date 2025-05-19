import { Page } from '@playwright/test';
import { confirmPem } from './confirmPem';
import { DataTestIdsEnum } from '../../src/localConstants/dataTestIds.enum';
import { LoginFilesEnum } from '../utils/enums.ts';

interface Login {
  page: Page;
  file?: string;
  user?: string;
}

export const login = async ({
  page,
  file = LoginFilesEnum.pem,
  user = ''
}: Login) => {
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
