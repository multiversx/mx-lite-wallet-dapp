import {
  DEFAULT_PAGE_LOAD_DELAY_MS,
  WALLET_SOURCE_ORIGIN
} from '__mocks__/data';
import { guardedAccount } from '__mocks__/data/guardedWallet';
import { pingSC } from '__mocks__/data/pingSC';
import { sleep } from '__mocks__/lib';
import { DataTestIdsEnum } from 'localConstants/dataTestIds.enum';
import {
  expectElementToContainText,
  getByDataTestId,
  loginWithKeystore,
  submit2FACodes
} from 'utils/testUtils/puppeteer';

describe('Sign ping hook with guarded account test', () => {
  it('should sign ping transaction, add the 2FA code, and redirect to callbackUrl with status signed', async () => {
    await page.goto(
      `${WALLET_SOURCE_ORIGIN}/hook/sign?nonce%5B0%5D=3041&value%5B0%5D=0&receiver%5B0%5D=${pingSC.address}&sender%5B0%5D=${guardedAccount.address}&gasPrice%5B0%5D=1000000000&gasLimit%5B0%5D=60000000&data%5B0%5D=ping&chainID%5B0%5D=D&version%5B0%5D=1&callbackUrl=https://devnet.xexchange.com`,
      {
        waitUntil: 'domcontentloaded'
      }
    );

    await loginWithKeystore({
      address: guardedAccount.address,
      hasAddressSelection: true,
      filePath: 'src/__mocks__/data/guardedWallet/guardedWallet.json'
    });

    await page.waitForSelector(getByDataTestId(DataTestIdsEnum.dappModal));
    expect(page.url()).toMatch(`${WALLET_SOURCE_ORIGIN}/sign`);

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.confirmReceiver,
      text: pingSC.address
    });

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.confirmAmount,
      text: '0 xEGLD'
    });

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.confirmFee,
      text: '0.00065544 xEGLD'
    });

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.confirmData,
      text: 'ping'
    });

    await page.click(getByDataTestId(DataTestIdsEnum.signBtn));
    await submit2FACodes();
    await sleep(DEFAULT_PAGE_LOAD_DELAY_MS);
    expect(page.url()).toMatch(
      `https://devnet.xexchange.com/?nonce[0]=3041&value[0]=0&receiver[0]=${pingSC.address}&sender[0]=${guardedAccount.address}&gasPrice[0]=1000000000&gasLimit[0]=60000000&data[0]=ping&chainID[0]=D&version[0]=2&guardianSignature[0]=f4229e5ba0db4685b19a60ba25fb393a7532f9c08473a7f269dca8c90ba05e3c77462596ee244330b0d81a37de55c6f1edf2b0ebaedfd7747881c0fcf7f7e103&guardian[0]=${guardedAccount.activeGuardianAddress}&options[0]=2&signature[0]=ffec528e2d16441efa239d53326ec0540b7befac911e0fc4b89ae7908c8368ce5b3b492a8295bbf1a12b1db3df64f187ed80b52dc862cb9a1539f5bcf3d48506&walletProviderStatus=transactionsSigned`
    );
  });
});
