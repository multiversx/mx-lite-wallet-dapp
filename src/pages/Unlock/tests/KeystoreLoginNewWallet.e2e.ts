import { WALLET_SOURCE_ORIGIN } from '__mocks__/data/constants';
import {
  emptyWalletAccount,
  emptyWalletPassword
} from '__mocks__/data/emptyWallet';
import { DataTestIdsEnum } from 'localConstants/dataTestIds.enum';
import {
  changeInputText,
  expectElementToContainText,
  expectToBeChecked,
  getByDataTestId,
  uploadFile
} from 'utils/testUtils/puppeteer';

describe('New wallet login with keystore test', () => {
  it('should select address and login new wallet with keystore file', async () => {
    await page.goto(`${WALLET_SOURCE_ORIGIN}/logout`, {
      waitUntil: 'domcontentloaded'
    });

    await page.waitForSelector(getByDataTestId(DataTestIdsEnum.keystoreBtn));
    expect(page.url()).toMatch(`${WALLET_SOURCE_ORIGIN}/unlock`);
    await page.click(getByDataTestId(DataTestIdsEnum.keystoreBtn));

    await uploadFile({
      dataTestId: DataTestIdsEnum.walletFile,
      filePath: 'src/__mocks__/data/emptyWallet/emptyWalletKeystore.json'
    });

    await changeInputText({
      dataTestId: DataTestIdsEnum.accessPass,
      text: emptyWalletPassword
    });

    await page.click(getByDataTestId(DataTestIdsEnum.submitButton));
    const dataTestId = `check_${emptyWalletAccount.address}`;
    await page.waitForSelector(getByDataTestId(dataTestId));

    await expectToBeChecked({
      dataTestId,
      isChecked: true
    });

    await page.click(getByDataTestId(DataTestIdsEnum.confirmBtn));
    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.userAddress,
      text: emptyWalletAccount.address
    });

    expect(page.url()).toMatch(`${WALLET_SOURCE_ORIGIN}/dashboard`);
  });
});
