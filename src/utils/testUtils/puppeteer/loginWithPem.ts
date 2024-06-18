import { pemAccount } from '__mocks__';
import { DataTestIdsEnum } from 'localConstants/dataTestIds.enum';
import { expectElementToContainText } from './expectElementToContainText';
import { getByDataTestId } from './getByDataTestId';
import { uploadFile } from './uploadFile';

export const loginWithPem = async () => {
  const filePath = 'src/__mocks__/data/testPemWallet/account.pem';
  await page.waitForSelector(getByDataTestId(DataTestIdsEnum.pemBtn));
  await page.click(getByDataTestId(DataTestIdsEnum.pemBtn));
  await uploadFile({ dataTestId: DataTestIdsEnum.walletFile, filePath });
  await page.click(getByDataTestId(DataTestIdsEnum.submitButton));

  await expectElementToContainText({
    dataTestId: DataTestIdsEnum.userAddress,
    text: pemAccount.address
  });
};
