import { WALLET_SOURCE_ORIGIN, keystoreAccount } from '__mocks__';
import { DataTestIdsEnum } from 'localConstants/dataTestIds.enum';
import {
  expectElementToContainText,
  getByDataTestId,
  loginWithKeystore
} from 'utils/testUtils/puppeteer';

describe('Sign hook test', () => {
  it('should sign MultiESDTNFTTransfer transactions successfully', async () => {
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

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.confirmReceiver,
      text: 'erd1qqqqqqqqqqqqqpgqvuzv2xe949tdm0ryxxym5729ksfcjr20pltqlxgr8p'
    });

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.confirmFee,
      text: '0.000569455 WEGLD'
    });

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.confirmData,
      text: 'MultiESDTNFTTransfer@000000000000000005006704c51b25a956ddbc643189ba7945b413890d4f0fd6@02@444d452d626465326238@01@01@444d452d626465326238@01@01@6e6674446973747269627574696f6e@ee62513ef30aede25b3366b6e3219ee18084026f36d6105299ee9963b1338f09@ee62513ef30aede25b3366b6e3219ee18084026f36d6105299ee9963b1338f09'
    });

    await page.click(getByDataTestId(DataTestIdsEnum.signBtn));

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.signStepTitle,
      text: 'Signing Transaction 2 of 3'
    });

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.confirmReceiver,
      text: 'erd1qqqqqqqqqqqqqpgqvuzv2xe949tdm0ryxxym5729ksfcjr20pltqlxgr8p'
    });

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.confirmFee,
      text: '0.000569455 WEGLD'
    });

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.confirmData,
      text: 'MultiESDTNFTTransfer@000000000000000005006704c51b25a956ddbc643189ba7945b413890d4f0fd6@02@444d452d626465326238@01@01@444d452d626465326238@01@01@6e6674446973747269627574696f6e@ee62513ef30aede25b3366b6e3219ee18084026f36d6105299ee9963b1338f09@ee62513ef30aede25b3366b6e3219ee18084026f36d6105299ee9963b1338f09'
    });

    await page.click(getByDataTestId(DataTestIdsEnum.signBtn));

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.signStepTitle,
      text: 'Signing Transaction 3 of 3'
    });

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.confirmReceiver,
      text: 'erd1qqqqqqqqqqqqqpgqvuzv2xe949tdm0ryxxym5729ksfcjr20pltqlxgr8p'
    });

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.confirmFee,
      text: '0.000569455 WEGLD'
    });

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.confirmData,
      text: 'MultiESDTNFTTransfer@000000000000000005006704c51b25a956ddbc643189ba7945b413890d4f0fd6@02@444d452d626465326238@01@01@444d452d626465326238@01@01@6e6674446973747269627574696f6e@ee62513ef30aede25b3366b6e3219ee18084026f36d6105299ee9963b1338f09@ee62513ef30aede25b3366b6e3219ee18084026f36d6105299ee9963b1338f09'
    });

    await page.click(getByDataTestId(DataTestIdsEnum.signBtn));

    expect(page.url()).toMatch(
      `https://devnet.xexchange.com/?nonce[0]=786&value[0]=0&receiver[0]=${keystoreAccount.address}&sender[0]=${keystoreAccount.address}&gasPrice[0]=1000000000&gasLimit[0]=7000000&data[0]=MultiESDTNFTTransfer@000000000000000005006704c51b25a956ddbc643189ba7945b413890d4f0fd6@02@444d452d626465326238@01@01@444d452d626465326238@01@01@6e6674446973747269627574696f6e@ee62513ef30aede25b3366b6e3219ee18084026f36d6105299ee9963b1338f09@ee62513ef30aede25b3366b6e3219ee18084026f36d6105299ee9963b1338f09&chainID[0]=S&version[0]=1&signature[0]=d55db9d86615793cc9b8eda80beff789ef1212f1869d4d7ae104b3688cc488559fb9071d357a9772b451b19d25bf8facbcc83a65df895490aeb8e115a37b5700&walletProviderStatus=transactionsSigned`
    );
  });
});
