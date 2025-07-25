import { WALLET_SOURCE_ORIGIN } from '__mocks__/data/constants';
import {
  emptyWalletAccount,
  emptyWalletPassword
} from '__mocks__/data/emptyWallet';
import { DataTestIdsEnum } from 'localConstants/dataTestIds.enum';
import {
  expectElementToContainText,
  getByTestIdDeep,
  uploadFile
} from 'utils/testUtils/puppeteer';

describe('New wallet login with keystore test', () => {
  it('should select address and login new wallet with keystore file', async () => {
    await page.goto(`${WALLET_SOURCE_ORIGIN}/logout`, {
      waitUntil: 'domcontentloaded'
    });

    const keystoreProviderBtn = await getByTestIdDeep(
      page,
      DataTestIdsEnum.keystoreProvider
    );

    expect(keystoreProviderBtn).toBeDefined();
    await keystoreProviderBtn.click();

    const keystoreLoginPanel = await getByTestIdDeep(
      page,
      DataTestIdsEnum.keystoreLoginPanel
    );

    expect(keystoreLoginPanel).toBeDefined();

    await uploadFile({
      dataTestId: DataTestIdsEnum.walletFile,
      filePath: 'src/__mocks__/data/emptyWallet/emptyWalletKeystore.json'
    });

    const passwordInput = await getByTestIdDeep(
      page,
      DataTestIdsEnum.accessPass
    );

    await passwordInput.type(emptyWalletPassword);
    const submitBtn = await getByTestIdDeep(page, DataTestIdsEnum.submitButton);
    expect(submitBtn).toBeDefined();
    await submitBtn.click();

    const addressTableItem = await getByTestIdDeep(
      page,
      `addressTableItem-${emptyWalletAccount.address}`
    );
    expect(addressTableItem).toBeDefined();
    await addressTableItem.click();

    const confirmBtn = await getByTestIdDeep(page, DataTestIdsEnum.confirmBtn);
    await confirmBtn.click();

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.userAddress,
      parent: page,
      text: emptyWalletAccount.address
    });

    expect(page.url()).toMatch(`${WALLET_SOURCE_ORIGIN}/dashboard`);
  });
});
