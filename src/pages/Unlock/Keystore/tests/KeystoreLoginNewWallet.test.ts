import { rest } from 'msw';
import {
  mockAccountRequests,
  server,
  testNetwork,
  mockResponse,
  emptyWalletAddress,
  emptyWalletAccount,
  emptyWalletKeystoreAddresses,
  emptyWalletFile,
  emptyWalletFileName,
  emptyWalletPassword
} from '__mocks__';
import {
  expectDashboardRoute,
  expectToContainText,
  fireEvent,
  clickButtonAsync,
  within,
  keystoreLogin
} from 'utils/testUtils';

describe('New wallet login with keystore test', () => {
  beforeEach(() => {
    server.use(
      rest.get(
        `${testNetwork.apiAddress}/accounts/${emptyWalletAddress}`,
        mockResponse(emptyWalletAccount)
      ),
      ...emptyWalletKeystoreAddresses.map((addr) =>
        rest.get(
          `${testNetwork.apiAddress}/accounts/${addr}`,
          mockResponse({ ...emptyWalletAccount, address: addr })
        )
      ),
      ...mockAccountRequests(emptyWalletAccount)
    );
  });

  it('should select address and login new wallet with keystore file', async () => {
    const render = await keystoreLogin({
      keystoreFile: emptyWalletFile,
      fileName: emptyWalletFileName,
      keystorePassword: emptyWalletPassword
    });

    const addressTableContainer = await render.findByTestId(
      'addressTableContainer'
    );

    await expectToContainText({
      id: 'addressTableContainerTitle',
      parentContainer: addressTableContainer,
      text: 'Access your wallet'
    });

    // The first address must always be checked
    let check = await within(addressTableContainer).findByTestId('check_0');
    expect(check).toBeChecked();

    const confirmWalletBtn = within(addressTableContainer).getByTestId(
      'confirmBtn'
    );

    expect(confirmWalletBtn).toBeEnabled();

    await clickButtonAsync({
      id: 'nextBtn',
      parentContainer: addressTableContainer
    });

    // The Confirm button must be disabled when clicking next
    expect(confirmWalletBtn).toBeDisabled();

    // The first address in the page must not be selected when clicking next
    let check10 = within(addressTableContainer).getByTestId('check_10');
    expect(check10).not.toBeChecked();

    await clickButtonAsync({
      id: 'prevBtn',
      parentContainer: addressTableContainer
    });

    // The initial address must remain selected
    check = within(addressTableContainer).getByTestId('check_0');
    expect(check).toBeChecked();
    expect(confirmWalletBtn).toBeEnabled();

    await clickButtonAsync({
      id: 'nextBtn',
      parentContainer: addressTableContainer
    });

    // Select the first address from the second page
    check10 = within(addressTableContainer).getByTestId('check_10');
    expect(check10).not.toBeChecked();
    fireEvent.click(check10);
    expect(check10).toBeChecked();
    expect(confirmWalletBtn).toBeEnabled();
    fireEvent.click(confirmWalletBtn);

    await expectDashboardRoute({ address: emptyWalletAddress, render });
  });
});
