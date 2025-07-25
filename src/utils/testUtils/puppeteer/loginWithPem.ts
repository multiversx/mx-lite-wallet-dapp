import { pemAccount } from '__mocks__';
import { DataTestIdsEnum } from 'localConstants/dataTestIds.enum';
import { expectElementToContainText } from './expectElementToContainText';
import { getByTestIdDeep } from './getByDataTestIdDeep';
import { uploadFile } from './uploadFile';

export const loginWithPem = async (props?: {
  address?: string;
  filePath?: string;
  parent?: any;
  skipLoggedInCheck?: boolean;
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

  if (props?.skipLoggedInCheck) {
    return;
  }

  await expectElementToContainText({
    dataTestId: DataTestIdsEnum.userAddress,
    parent,
    text: address
  });
};
