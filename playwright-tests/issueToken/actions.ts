import { DataTestIdsEnum } from '../../src/localConstants/dataTestIds.enum';

export const createToken = async ({
  page,
  tokenName = 'TestTok',
  ticker = 'ABC',
  mintedValue = '123'
}) => {
  await page.getByTestId(DataTestIdsEnum.tokenNameInput).fill(tokenName);
  await page.getByTestId(DataTestIdsEnum.tokenTickerInput).fill(ticker);
  await page.getByTestId(DataTestIdsEnum.mintedValueInput).fill(mintedValue);
  await page.getByTestId(DataTestIdsEnum.issueTokenBtn).click();
};
