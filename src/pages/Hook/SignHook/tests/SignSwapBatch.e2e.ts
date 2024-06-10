import {
  exchangeSwapSC,
  exchangeWrapEGLDSC,
  testAccount
} from '__mocks__/data';
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
      `${WALLET_SOURCE_ORIGIN}/hook/sign?nonce%5B0%5D=7436&nonce%5B1%5D=7437&value%5B0%5D=100000000000000000&value%5B1%5D=0&receiver%5B0%5D=${exchangeWrapEGLDSC.address}&receiver%5B1%5D=${exchangeSwapSC.address}&sender%5B0%5D=${testAccount.address}&sender%5B1%5D=${testAccount.address}&gasPrice%5B0%5D=1000000000&gasPrice%5B1%5D=1000000000&gasLimit%5B0%5D=4200000&gasLimit%5B1%5D=70000000&data%5B0%5D=wrapEgld&data%5B1%5D=ESDTTransfer%405745474c442d643763366262%40016345785d8a0000%406d756c74695061697253776170%4000000000000000000500778530aaebdcbc0945e6d10e4e4272b4a04c09b07ceb%4073776170546f6b656e734669786564496e707574%4050524f54454f2d643165663339%407fbd583ed8fe3769%40000000000000000005005e203c6d28ea29918f38e59dbd85909784a879827ceb%4073776170546f6b656e734669786564496e707574%40555344432d386434303638%4031987b&chainID%5B0%5D=D&chainID%5B1%5D=D&version%5B0%5D=1&version%5B1%5D=1&callbackUrl=https://devnet.xexchange.com`,
      {
        waitUntil: 'domcontentloaded'
      }
    );

    await loginWithKeystore();
    await page.waitForSelector(getByDataTestId(DataTestIdsEnum.dappModal));
    expect(page.url()).toMatch(`${WALLET_SOURCE_ORIGIN}/sign`);

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.signStepTitle,
      text: 'Signing Transaction 1 of 2'
    });

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.confirmReceiver,
      text: exchangeWrapEGLDSC.address
    });

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.confirmAmount,
      text: '0.1 xEGLD'
    });

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.confirmFee,
      text: '0.00010338 xEGLD'
    });

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.confirmData,
      text: 'wrapEgld'
    });

    await page.click(getByDataTestId(DataTestIdsEnum.signBtn));

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.signStepTitle,
      text: 'Signing Transaction 2 of 2'
    });

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.confirmReceiver,
      text: exchangeSwapSC.address
    });

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.confirmAmount,
      text: '0.1 WEGLD-d7c6bb'
    });

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.confirmFee,
      text: '0.001294495 xEGLD'
    });

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.confirmData,
      text: 'ESDTTransfer@5745474c442d643763366262@016345785d8a0000@6d756c74695061697253776170@00000000000000000500778530aaebdcbc0945e6d10e4e4272b4a04c09b07ceb@73776170546f6b656e734669786564496e707574@50524f54454f2d643165663339@7fbd583ed8fe3769@000000000000000005005e203c6d28ea29918f38e59dbd85909784a879827ceb@73776170546f6b656e734669786564496e707574@555344432d386434303638@31987b'
    });

    await page.click(getByDataTestId(DataTestIdsEnum.signBtn));

    expect(page.url()).toMatch(
      `https://devnet.xexchange.com/?nonce[0]=7436&nonce[1]=7437&value[0]=100000000000000000&value[1]=0&receiver[0]=${exchangeWrapEGLDSC.address}&receiver[1]=${exchangeSwapSC.address}&sender[0]=${testAccount.address}&sender[1]=${testAccount.address}&gasPrice[0]=1000000000&gasPrice[1]=1000000000&gasLimit[0]=4200000&gasLimit[1]=70000000&data[0]=wrapEgld&data[1]=ESDTTransfer@5745474c442d643763366262@016345785d8a0000@6d756c74695061697253776170@00000000000000000500778530aaebdcbc0945e6d10e4e4272b4a04c09b07ceb@73776170546f6b656e734669786564496e707574@50524f54454f2d643165663339@7fbd583ed8fe3769@000000000000000005005e203c6d28ea29918f38e59dbd85909784a879827ceb@73776170546f6b656e734669786564496e707574@555344432d386434303638@31987b&chainID[0]=D&chainID[1]=D&version[0]=1&version[1]=1&signature[0]=099ef0281dc1d9611ba1520c6909591a72477de6a771e28d667f137ffa353c91d7b7fea7867f0e05d28fc91c5a028703dd66c3ec4a2612b7e6f5f7cdc609180d&signature[1]=d966d2819451a4a578ea487e75d831babdca42c3d2f2f6fc409dda751c4d3d4026b999b82373acc91fcb7ed3e36ef091807e57508fb8ea44f38d125b1ba4bc0d&walletProviderStatus=transactionsSigned`
    );
  });
});
