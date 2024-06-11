import { pingSC, testAccount } from '__mocks__/data';
import { WALLET_SOURCE_ORIGIN } from '__mocks__/data/constants';
import { guardedAccount } from '__mocks__/data/guardedWallet';
import { DataTestIdsEnum } from 'localConstants/dataTestIds.enum';
import { expectElementToContainText } from 'utils/testUtils/puppeteer';

describe('Invalid sign hook tests', () => {
  it('should navigate to /unlock page without signing when callbackUrl is missing', async () => {
    await page.goto(
      `${WALLET_SOURCE_ORIGIN}/hook/sign?nonce%5B0%5D=3041&value%5B0%5D=0&receiver%5B0%5D=${pingSC.address}&sender%5B0%5D=${testAccount.address}&gasPrice%5B0%5D=1000000000&gasLimit%5B0%5D=60000000&data%5B0%5D=pong&chainID%5B0%5D=D&version%5B0%5D=1`,
      {
        waitUntil: 'domcontentloaded'
      }
    );

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.unlockTitle,
      text: 'Connect your wallet'
    });

    expect(page.url()).toMatch(`${WALLET_SOURCE_ORIGIN}/unlock`);
  });

  it('should navigate to /unlock page without signing when gas is missing', async () => {
    await page.goto(
      `${WALLET_SOURCE_ORIGIN}/hook/sign?nonce%5B0%5D=3041&value%5B0%5D=0&receiver%5B0%5D=${pingSC.address}&sender%5B0%5D=${testAccount.address}&data%5B0%5D=pong&chainID%5B0%5D=D&version%5B0%5D=1&callbackUrl=https://devnet.xexchange.com`,
      {
        waitUntil: 'domcontentloaded'
      }
    );

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.unlockTitle,
      text: 'Connect your wallet'
    });

    expect(page.url()).toMatch(`${WALLET_SOURCE_ORIGIN}/unlock`);
  });

  it('should navigate to /unlock page without signing when nonce is missing', async () => {
    await page.goto(
      `${WALLET_SOURCE_ORIGIN}/hook/sign?value%5B0%5D=0&receiver%5B0%5D=${pingSC.address}&sender%5B0%5D=${testAccount.address}&gasPrice%5B0%5D=1000000000&gasLimit%5B0%5D=60000000&data%5B0%5D=ping&chainID%5B0%5D=D&version%5B0%5D=1&callbackUrl=https://devnet.xexchange.com`,
      {
        waitUntil: 'domcontentloaded'
      }
    );

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.unlockTitle,
      text: 'Connect your wallet'
    });

    expect(page.url()).toMatch(`${WALLET_SOURCE_ORIGIN}/unlock`);
  });

  it('should navigate to /unlock page without signing when receiver is missing', async () => {
    await page.goto(
      `${WALLET_SOURCE_ORIGIN}/hook/sign?nonce%5B0%5D=3041&value%5B0%5D=0&sender%5B0%5D=${testAccount.address}&gasPrice%5B0%5D=1000000000&gasLimit%5B0%5D=60000000&data%5B0%5D=pong&chainID%5B0%5D=D&version%5B0%5D=1&callbackUrl=https://devnet.xexchange.com`,
      {
        waitUntil: 'domcontentloaded'
      }
    );

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.unlockTitle,
      text: 'Connect your wallet'
    });

    expect(page.url()).toMatch(`${WALLET_SOURCE_ORIGIN}/unlock`);
  });

  it('should navigate to /unlock page without signing when sender is missing', async () => {
    await page.goto(
      `${WALLET_SOURCE_ORIGIN}/hook/sign?nonce%5B0%5D=3041&value%5B0%5D=0&receiver%5B0%5D=${pingSC.address}&sender%5B0%5D=${guardedAccount.address}&gasPrice%5B0%5D=1000000000&gasLimit%5B0%5D=60000000&data%5B0%5D=ping&chainID%5B0%5D=D&version%5B0%5D=1&callbackUrl=https://devnet.xexchange.com`,
      {
        waitUntil: 'domcontentloaded'
      }
    );

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.unlockTitle,
      text: 'Connect your wallet'
    });

    expect(page.url()).toMatch(`${WALLET_SOURCE_ORIGIN}/unlock`);
  });
});
