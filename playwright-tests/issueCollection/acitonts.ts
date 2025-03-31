import { DataTestIdsEnum } from '../../src/localConstants/dataTestIds.enum';

export const issueCollection = async ({
  page,
  colectionName = 'NFTCOL',
  ticker = 'NFT'
}) => {
  await page.getByTestId(DataTestIdsEnum.tokenNameInput).fill(colectionName);
  await page.getByTestId(DataTestIdsEnum.tokenTickerInput).fill(ticker);
  await page.getByTestId(DataTestIdsEnum.issueCollectionBtn).click();
};
