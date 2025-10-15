import { DEFAULT_PAGE_LOAD_DELAY_MS, pemAccount } from '__mocks__/data';
import { DataTestIdsEnum } from 'localConstants/dataTestIds.enum';
import { expectElementToContainText } from './expectElementToContainText';
import { getByDataTestId } from './getByDataTestId';
import { getByTestIdDeep } from './getByDataTestIdDeep';
import { sleep } from './sleep';
import { uploadFile } from './uploadFile';

export const loginWithPem = async (props?: {
  address?: string;
  filePath?: string;
  parent?: any;
}) => {
  const address = props?.address ?? pemAccount.address;
  const parent = props?.parent ?? page;
  const filePath =
    props?.filePath ?? 'src/__mocks__/data/testPemWallet/account.pem';

  // Click the pemProvider button in the unlock panel
  const pemProviderBtn = await getByTestIdDeep(
    parent,
    DataTestIdsEnum.pemProvider
  );

  expect(pemProviderBtn).toBeDefined();
  await pemProviderBtn.click();

  // Wait for the PEM login panel to appear
  const pemLoginPanel = await getByTestIdDeep(
    parent,
    DataTestIdsEnum.pemLoginPanel
  );

  expect(pemLoginPanel).toBeDefined();

  // Upload the PEM file
  await uploadFile({
    dataTestId: DataTestIdsEnum.walletFile,
    filePath,
    parent
  });

  const submitBtn = await getByTestIdDeep(parent, DataTestIdsEnum.submitButton);
  expect(submitBtn).toBeDefined();
  await submitBtn.click();
  await sleep(DEFAULT_PAGE_LOAD_DELAY_MS * 2);

  await expectElementToContainText({
    dataTestId: DataTestIdsEnum.userAddress,
    parent,
    text: address
  });

  await page.click(getByDataTestId(DataTestIdsEnum.userAddress));
};
