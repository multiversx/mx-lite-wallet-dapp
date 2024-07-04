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

  await parent.waitForSelector(getByDataTestId(DataTestIdsEnum.keystoreBtn));
  await parent.click(getByDataTestId(DataTestIdsEnum.keystoreBtn));
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
  const dataTestId = `check_${address}`;
  await parent.waitForSelector(getByDataTestId(dataTestId));
  await parent.click(getByDataTestId(dataTestId));

  await expectToBeChecked({
    dataTestId,
    isChecked: true,
    parent
  });

  await parent.click(getByDataTestId(DataTestIdsEnum.confirmBtn));

  if (props?.skipLoggedInCheck) {
    return;
  }

  await expectElementToContainText({
    dataTestId: DataTestIdsEnum.userAddress,
    parent,
    text: address
  });
};
