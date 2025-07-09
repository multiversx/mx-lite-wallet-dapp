import { DEFAULT_PASSWORD, keystoreAccount } from '__mocks__';
import { DataTestIdsEnum } from 'localConstants/dataTestIds.enum';
import { changeInputText } from './changeInputText';
import { expectElementToContainText } from './expectElementToContainText';
import { expectToBeChecked } from './expectToBeChecked';
import { getByDataTestId } from './getByDataTestId';
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

  // Click the Connect button to open the unlock panel
  const connectBtn = await parent.waitForSelector(
    getByDataTestId(DataTestIdsEnum.connectBtn)
  );

  await connectBtn.click();

  // Click the keystoreProvider button in the unlock panel
  const keystoreProviderBtn = await parent.waitForSelector(
    getByDataTestId(DataTestIdsEnum.keystoreProvider)
  );

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

  await changeInputText({
    dataTestId: DataTestIdsEnum.accessPass,
    parent,
    text: password
  });

  await parent.click(getByDataTestId(DataTestIdsEnum.submitButton));
  const dataTestId = `addressTableItem_${address}`;
  const addressTableItem = await parent.waitForSelector(
    getByDataTestId(dataTestId)
  );

  await addressTableItem.click();

  await expectToBeChecked({
    dataTestId: dataTestId,
    isChecked: true,
    parent
  });

  const confirmBtn = await parent.waitForSelector(
    getByDataTestId(DataTestIdsEnum.confirmBtn)
  );

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
