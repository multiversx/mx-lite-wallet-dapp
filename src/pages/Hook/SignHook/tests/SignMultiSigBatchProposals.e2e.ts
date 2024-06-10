import { WALLET_SOURCE_ORIGIN } from '__mocks__/data/constants';
import { DataTestIdsEnum } from 'localConstants/dataTestIds.enum';
import {
  expectElementToContainText,
  getByDataTestId,
  loginWithKeystore
} from 'utils/testUtils/puppeteer';

describe('Sign hook with guardian of sender test', () => {
  it('should sign ping transaction with the guardian address account of sender successfully', async () => {
    await page.goto(
      `${WALLET_SOURCE_ORIGIN}/hook/sign?nonce[0]=0&nonce[1]=1&nonce[2]=2&nonce[3]=3&value[0]=1000000000000000000&value[1]=0&value[2]=0&value[3]=0&receiver[0]=erd1qqqqqqqqqqqqqpgqpv09kfzry5y4sj05udcngesat07umyj70n4sa2c0rp&receiver[1]=erd1qqqqqqqqqqqqqpgqtqfhy99su9xzjjrq59kpzpp25udtc9eq0n4sr90ax6&receiver[2]=erd1qqqqqqqqqqqqqpgqzw0d0tj25qme9e4ukverjjjqle6xamay0n4s5r0v9g&receiver[3]=erd1qqqqqqqqqqqqqpgq2l97gw2j4wnlem4y2rx7dudqlssjtwpu0n4sd0u3w2&sender[0]=erd1qqqqqqqqqqqqqpgqf738mcf8f08kuwhn8dvtka5veyad2fqwu00sqnjgln&sender[1]=erd1qqqqqqqqqqqqqpgqf738mcf8f08kuwhn8dvtka5veyad2fqwu00sqnjgln&sender[2]=erd1qqqqqqqqqqqqqpgqf738mcf8f08kuwhn8dvtka5veyad2fqwu00sqnjgln&sender[3]=erd1qqqqqqqqqqqqqpgqf738mcf8f08kuwhn8dvtka5veyad2fqwu00sqnjgln&gasPrice[0]=1000000000&gasPrice[1]=1000000000&gasPrice[2]=1000000000&gasPrice[3]=1000000000&gasLimit[0]=4200000&gasLimit[1]=25500000&gasLimit[2]=25500000&gasLimit[3]=10000000&data[0]=wrapEgld&data[1]=ESDTTransfer%405745474C442D613238633539%4006f05b59d3b20000%4073776170546f6b656e734669786564496e707574%40555344432D333530633465%4001&data[2]=ESDTTransfer%405745474C442D613238633539%4006f05b59d3b20000%4073776170546f6b656e734669786564496e707574%404D45582D613635396430%4001&data[3]=ESDTTransfer%404D45582D613635396430%400de0b6b3a7640000%406c6f636b546f6b656e73%4005a0&chainID[0]=D&chainID[1]=D&chainID[2]=D&chainID[3]=D&version[0]=1&version[1]=1&version[2]=1&version[3]=1&callbackUrl=https://devnet.xexchange.com`,
      {
        waitUntil: 'domcontentloaded'
      }
    );

    await loginWithKeystore();
    await page.waitForSelector(getByDataTestId(DataTestIdsEnum.dappModal));
    expect(page.url()).toMatch(`${WALLET_SOURCE_ORIGIN}/sign`);

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.confirmReceiver,
      text: 'erd1qqqqqqqqqqqqqpgqf738mcf8f08kuwhn8dvtka5veyad2fqwu00sqnjgln'
    });

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.confirmAmount,
      text: '0 xEGLD'
    });

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.confirmFee,
      text: '0.00211127 xEGLD'
    });

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.confirmData,
      text: 'proposeBatch@05000000000000000005000b1e5b244325095849f4e37134661d5bfdcd925e7ceb000000080de0b6b3a7640000010000000000401640000000087772617045676c6400000000@060000000000000000050058137214b0e14c294860a16c11042aa71abc17207ceb000000010000000c5745474c442d61323863353900000000000000000000000806f05b59d3b200000100000000018519600000001473776170546f6b656e734669786564496e707574000000020000000b555344432d3335306334650000000101@0600000000000000000500139ed7ae4aa03792e6bcb332394a40fe746eefa47ceb000000010000000c5745474c442d61323863353900000000000000000000000806f05b59d3b200000100000000018519600000001473776170546f6b656e734669786564496e707574000000020000000a4d45582d6136353964300000000101@060000000000000000050057cbe43952aba7fceea450cde6f1a0fc2125b83c7ceb000000010000000a4d45582d6136353964300000000000000000000000080de0b6b3a76400000100000000009896800000000a6c6f636b546f6b656e73000000010000000205a0'
    });

    await page.click(getByDataTestId(DataTestIdsEnum.signBtn));

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.transactionToastTitle,
      text: 'Processing transaction'
    });
  });
});
