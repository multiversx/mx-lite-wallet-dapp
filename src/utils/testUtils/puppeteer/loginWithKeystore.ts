import { DEFAULT_PASSWORD, keystoreAccount } from '__mocks__';
import { DataTestIdsEnum } from 'localConstants/dataTestIds.enum';
import { expectElementToContainText } from './expectElementToContainText';
import { getByDataTestId } from './getByDataTestId';
import { getByTestIdDeep } from './getByDataTestIdDeep';
import { uploadFile } from './uploadFile';

export const loginWithKeystore = async (props?: {
  address?: string;
  filePath?: string;
  parent?: any;
  password?: string;
  skipLoggedInCheck?: boolean;
}) => {
  const address = props?.address ?? keystoreAccount.address;
  const parent = props?.parent ?? page;
  const password = props?.password ?? DEFAULT_PASSWORD;
  const filePath =
    props?.filePath ?? 'src/__mocks__/data/testKeystoreWallet/account.json';

  // Click the keystoreProvider button in the unlock panel
  const keystoreProviderBtn = await getByTestIdDeep(
    parent,
    DataTestIdsEnum.keystoreProvider
  );

  expect(keystoreProviderBtn).toBeDefined();
  await keystoreProviderBtn.click();

  // Wait for the keystore login panel to appear
  await parent.waitForSelector(
    getByDataTestId(DataTestIdsEnum.keystoreLoginPanel)
  );

  // Upload the keystore file
  await uploadFile({
    dataTestId: DataTestIdsEnum.walletFile,
    filePath,
    parent
  });

  const passwordInput = await getByTestIdDeep(
    parent,
    DataTestIdsEnum.accessPass
  );

  await passwordInput.type(password);
  const submitBtn = await getByTestIdDeep(parent, DataTestIdsEnum.submitButton);
  expect(submitBtn).toBeDefined();

  await submitBtn.click();
  const addressTableItem = await getByTestIdDeep(
    parent,
    `addressTableItem-${address}`
  );

  expect(addressTableItem).toBeDefined();
  await addressTableItem.click();

  const confirmBtn = await getByTestIdDeep(parent, DataTestIdsEnum.confirmBtn);
  await confirmBtn.click();

  if (props?.skipLoggedInCheck) {
    return;
  }

  await expectElementToContainText({
    dataTestId: DataTestIdsEnum.userAddress,
    parent,
    text: address
  });
};
