import { DataTestIdsEnum } from '../../src/localConstants/dataTestIds.enum';
import { GlobalDataEnum } from '../utils/enums';

export const createNft = async ({
  page,
  colectionName = 'col',
  nftName = 'TestNft'
}) => {
  await page.waitForTimeout(5000);
  await page.locator('.css-19bb58m').click();
  await page.getByRole('option', { name: colectionName }).first().click();
  await page
    .getByTestId(DataTestIdsEnum.imageUrlInput)
    .fill(GlobalDataEnum.nftImg);
  await page.getByTestId(DataTestIdsEnum.nameInput).fill(nftName);
  await page.getByTestId(DataTestIdsEnum.issueNftBtn).click();
};
