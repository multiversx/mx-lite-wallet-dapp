import { WALLET_SOURCE_ORIGIN, keystoreAccount, pemAccount } from '__mocks__';
import { DataTestIdsEnum } from 'localConstants/dataTestIds.enum';
import { expectElementToContainText } from 'utils/testUtils/puppeteer';
import { pingSC } from './data/pingSC';

describe('Invalid sign hook tests', () => {
  it('should navigate to /unlock page without signing when callbackUrl is missing', async () => {
    await page.goto(
      `${WALLET_SOURCE_ORIGIN}/hook/sign?nonce%5B0%5D=3041&value%5B0%5D=0&receiver%5B0%5D=${pingSC.address}&sender%5B0%5D=${keystoreAccount.address}&gasPrice%5B0%5D=1000000000&gasLimit%5B0%5D=60000000&data%5B0%5D=pong&chainID%5B0%5D=S&version%5B0%5D=1`,
      {
        waitUntil: 'domcontentloaded'
      }
    );

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.unlockPage,
      text: 'Login'
    });

    expect(page.url()).toMatch(`${WALLET_SOURCE_ORIGIN}/unlock`);
  });

  it('should navigate to /unlock page without signing when gas is missing', async () => {
    await page.goto(
      `${WALLET_SOURCE_ORIGIN}/hook/sign?nonce%5B0%5D=3041&value%5B0%5D=0&receiver%5B0%5D=${pingSC.address}&sender%5B0%5D=${keystoreAccount.address}&data%5B0%5D=pong&chainID%5B0%5D=S&version%5B0%5D=1&callbackUrl=https://devnet.xexchange.com`,
      {
        waitUntil: 'domcontentloaded'
      }
    );

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.unlockPage,
      text: 'Login'
    });

    expect(page.url()).toMatch(`${WALLET_SOURCE_ORIGIN}/unlock`);
  });

  it('should navigate to /unlock page without signing when nonce is missing', async () => {
    await page.goto(
      `${WALLET_SOURCE_ORIGIN}/hook/sign?value%5B0%5D=0&receiver%5B0%5D=${pingSC.address}&sender%5B0%5D=${keystoreAccount.address}&gasPrice%5B0%5D=1000000000&gasLimit%5B0%5D=60000000&data%5B0%5D=ping&chainID%5B0%5D=S&version%5B0%5D=1&callbackUrl=https://devnet.xexchange.com`,
      {
        waitUntil: 'domcontentloaded'
      }
    );

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.unlockPage,
      text: 'Login'
    });

    expect(page.url()).toMatch(`${WALLET_SOURCE_ORIGIN}/unlock`);
  });

  it('should navigate to /unlock page without signing when receiver is missing', async () => {
    await page.goto(
      `${WALLET_SOURCE_ORIGIN}/hook/sign?nonce%5B0%5D=3041&value%5B0%5D=0&sender%5B0%5D=${keystoreAccount.address}&gasPrice%5B0%5D=1000000000&gasLimit%5B0%5D=60000000&data%5B0%5D=pong&chainID%5B0%5D=S&version%5B0%5D=1&callbackUrl=https://devnet.xexchange.com`,
      {
        waitUntil: 'domcontentloaded'
      }
    );

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.unlockPage,
      text: 'Login'
    });

    expect(page.url()).toMatch(`${WALLET_SOURCE_ORIGIN}/unlock`);
  });

  it('should navigate to /unlock page without signing when sender is missing', async () => {
    await page.goto(
      `${WALLET_SOURCE_ORIGIN}/hook/sign?nonce%5B0%5D=3041&value%5B0%5D=0&receiver%5B0%5D=${pingSC.address}&sender%5B0%5D=${pemAccount.address}&gasPrice%5B0%5D=1000000000&gasLimit%5B0%5D=60000000&data%5B0%5D=ping&chainID%5B0%5D=S&version%5B0%5D=1&callbackUrl=https://devnet.xexchange.com`,
      {
        waitUntil: 'domcontentloaded'
      }
    );

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.unlockPage,
      text: 'Login'
    });

    expect(page.url()).toMatch(`${WALLET_SOURCE_ORIGIN}/unlock`);
  });
});
