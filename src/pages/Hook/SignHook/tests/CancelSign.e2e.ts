import { keystoreAccount, WALLET_SOURCE_ORIGIN } from '__mocks__';
import { DataTestIdsEnum } from 'localConstants/dataTestIds.enum';
import {
  expectElementToContainText,
  getByDataTestId,
  loginWithKeystore
} from 'utils/testUtils/puppeteer';

describe('Cancel sign transaction test', () => {
  it('should cancel sign MultiESDTNFTTransfer transactions successfully', async () => {
    await page.goto(
      `${WALLET_SOURCE_ORIGIN}/hook/sign?nonce%5B0%5D=786&value%5B0%5D=0&receiver%5B0%5D=${keystoreAccount.address}&sender%5B0%5D=${keystoreAccount.address}&gasPrice%5B0%5D=1000000000&gasLimit%5B0%5D=7000000&data%5B0%5D=MultiESDTNFTTransfer%40000000000000000005006704c51b25a956ddbc643189ba7945b413890d4f0fd6%4002%40444d452d626465326238%4001%4001%40444d452d626465326238%4001%4001%406e6674446973747269627574696f6e%40ee62513ef30aede25b3366b6e3219ee18084026f36d6105299ee9963b1338f09%40ee62513ef30aede25b3366b6e3219ee18084026f36d6105299ee9963b1338f09&chainID%5B0%5D=S&version%5B0%5D=1&callbackUrl=https://devnet.xexchange.com`,
      {
        waitUntil: 'domcontentloaded'
      }
    );

    await loginWithKeystore({ skipLoggedInCheck: true });
    await page.waitForSelector(getByDataTestId(DataTestIdsEnum.dappModal));
    expect(page.url()).toMatch(`${WALLET_SOURCE_ORIGIN}/sign`);

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.signStepTitle,
      text: 'Signing Transaction 1 of 3'
    });

    await page.click(getByDataTestId(DataTestIdsEnum.closeButton));

    expect(page.url()).toMatch(
      `https://devnet.xexchange.com/?address=${keystoreAccount.address}&status=cancelled`
    );
  });
});
