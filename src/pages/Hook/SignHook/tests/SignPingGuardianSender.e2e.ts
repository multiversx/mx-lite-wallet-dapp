import { WALLET_SOURCE_ORIGIN } from '__mocks__/data/constants';
import { guardedAccount } from '__mocks__/data/guardedWallet';
import { pingSC } from '__mocks__/data/pingSC';
import { DataTestIdsEnum } from 'localConstants/dataTestIds.enum';
import {
  expectElementToContainText,
  getByDataTestId,
  loginWithKeystore
} from 'utils/testUtils/puppeteer';

describe('Sign hook with guardian of sender test', () => {
  it('should sign ping transaction with the guardian address account of sender successfully', async () => {
    await page.goto(
      `${WALLET_SOURCE_ORIGIN}/hook/sign?nonce%5B0%5D=3041&value%5B0%5D=0&receiver%5B0%5D=${pingSC.address}&sender%5B0%5D=${guardedAccount.address}&gasPrice%5B0%5D=1000000000&gasLimit%5B0%5D=60000000&data%5B0%5D=ping&chainID%5B0%5D=D&version%5B0%5D=1&callbackUrl=https://devnet.xexchange.com`,
      {
        waitUntil: 'domcontentloaded'
      }
    );

    await loginWithKeystore();
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

    expect(page.url()).toMatch(
      `https://devnet.xexchange.com/?nonce[0]=3041&value[0]=0&receiver[0]=${pingSC.address}&sender[0]=${guardedAccount.address}&gasPrice[0]=1000000000&gasLimit[0]=60000000&data[0]=ping&chainID[0]=D&version[0]=1&signature[0]=900ad5f4387b2b4435aad9556816b3633e328090c552362f0d796baf0c1bc1ba8153be7606d8ca469cbcd706833ea90c982d62ef6fc2aedeb63ef7e499a63d0d&walletProviderStatus=transactionsSigned`
    );
  });
});
