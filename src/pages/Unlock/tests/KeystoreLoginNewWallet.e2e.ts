import { WALLET_SOURCE_ORIGIN } from '__mocks__/data/constants';
import {
  emptyWalletAccount,
  emptyWalletKeystoreAddresses,
  emptyWalletPassword
} from '__mocks__/data/emptyWallet';
import { DataTestIdsEnum } from 'localConstants/dataTestIds.enum';
import {
  changeInputText,
  expectElementToBeDisabled,
  expectElementToContainText,
  expectToBeChecked,
  getByDataTestId,
  uploadFile
} from 'utils/testUtils/puppeteer';

describe('New wallet login with keystore test', () => {
  it('should select address and login new wallet with keystore file', async () => {
    await page.goto(`${WALLET_SOURCE_ORIGIN}/unlock`, {
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
    await page.click(getByDataTestId(dataTestId));

    await expectToBeChecked({
      dataTestId,
      isChecked: true
    });

    await page.click(getByDataTestId(DataTestIdsEnum.nextBtn));

    // The Confirm button must be disabled when clicking next
    await expectElementToBeDisabled({
      dataTestId: DataTestIdsEnum.confirmBtn,
      isDisabled: true
    });

    const emptyAddressDataTestId = `check_${emptyWalletKeystoreAddresses[10]}`;

    // The first address in the page must not be selected when clicking next
    await expectToBeChecked({
      dataTestId: emptyAddressDataTestId,
      isChecked: false
    });

    await page.click(getByDataTestId(DataTestIdsEnum.prevBtn));

    // The initial address is still selected
    await expectToBeChecked({
      dataTestId,
      isChecked: true
    });

    await expectElementToBeDisabled({
      dataTestId: DataTestIdsEnum.confirmBtn,
      isDisabled: false
    });

    await page.click(getByDataTestId(DataTestIdsEnum.nextBtn));

    await expectToBeChecked({
      dataTestId: emptyAddressDataTestId,
      isChecked: false
    });

    // Select the first address from the second page
    await page.click(getByDataTestId(emptyAddressDataTestId));

    await expectToBeChecked({
      dataTestId: emptyAddressDataTestId,
      isChecked: true
    });

    await page.click(getByDataTestId(DataTestIdsEnum.confirmBtn));

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.userAddress,
      text: `${emptyWalletKeystoreAddresses[10]}${emptyWalletKeystoreAddresses[10]}`
    });

    expect(page.url()).toMatch(`${WALLET_SOURCE_ORIGIN}/dashboard`);
  });
});
