import { pemAccount } from '__mocks__';
import { DataTestIdsEnum } from 'localConstants/dataTestIds.enum';
import { expectElementToContainText } from './expectElementToContainText';
import { getByDataTestId } from './getByDataTestId';
import { uploadFile } from './uploadFile';

export const loginWithPem = async () => {
  const filePath = 'src/__mocks__/data/testPemWallet/account.pem';

  // Click the Connect button to open the unlock panel
  const connectBtn = await page.waitForSelector(
    getByDataTestId(DataTestIdsEnum.connectBtn)
  );

  await connectBtn.click();

  // Click the pemProvider button in the unlock panel
  const pemProviderBtn = await page.waitForSelector(
    getByDataTestId(DataTestIdsEnum.pemProvider)
  );

  await pemProviderBtn.click();

  // Wait for the PEM login panel to appear
  await page.waitForSelector(getByDataTestId(DataTestIdsEnum.pemLoginPanel));

  // Upload the PEM file
  await uploadFile({ dataTestId: DataTestIdsEnum.walletFile, filePath });
  await page.click(getByDataTestId(DataTestIdsEnum.submitButton));

  await expectElementToContainText({
    dataTestId: DataTestIdsEnum.userAddress,
    text: pemAccount.address
  });
};
