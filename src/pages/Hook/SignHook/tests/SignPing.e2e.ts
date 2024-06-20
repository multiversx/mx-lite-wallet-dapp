import { WALLET_SOURCE_ORIGIN, keystoreAccount } from '__mocks__';
import { DataTestIdsEnum } from 'localConstants/dataTestIds.enum';
import {
  expectElementToContainText,
  getByDataTestId,
  loginWithKeystore
} from 'utils/testUtils/puppeteer';
import { pingSC } from './data/pingSC';

describe('Sign ping tests', () => {
  it('should sign ping transaction and redirect to callbackUrl with status signed', async () => {
    await page.goto(
      `${WALLET_SOURCE_ORIGIN}/hook/sign?nonce%5B0%5D=3041&value%5B0%5D=0&receiver%5B0%5D=${pingSC.address}&sender%5B0%5D=${keystoreAccount.address}&gasPrice%5B0%5D=1000000000&gasLimit%5B0%5D=60000000&data%5B0%5D=ping&chainID%5B0%5D=D&version%5B0%5D=1&callbackUrl=https://devnet.xexchange.com`,
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
      `https://devnet.xexchange.com/?nonce[0]=3041&value[0]=0&receiver[0]=${pingSC.address}&sender[0]=${keystoreAccount.address}&gasPrice[0]=1000000000&gasLimit[0]=60000000&data[0]=ping&chainID[0]=D&version[0]=1&signature[0]=2363a64f12bcbfab09b322481fb71388a37475f14734d18210059bf24379ae54e84274396eb57f783c2607ce881e7c09ea517c37cffa3338c970d5de4a635a0e&walletProviderStatus=transactionsSigned`
    );
  });
});
