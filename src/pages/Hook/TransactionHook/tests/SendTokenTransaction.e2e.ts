import { WALLET_SOURCE_ORIGIN } from '__mocks__/data/constants';
import { receiverAccount } from '__mocks__/data/receiverAccount';
import { DataTestIdsEnum } from 'localConstants/dataTestIds.enum';
import {
  expectElementToContainText,
  getByDataTestId,
  loginWithKeystore
} from 'utils/testUtils/puppeteer';

describe('Send NFT transaction hook tests', () => {
  it('should execute send NFT transaction successfully', async () => {
    await page.goto(
      `${WALLET_SOURCE_ORIGIN}/hook/transaction?receiver=${receiverAccount.address}&value=10&gasLimit=3000000&nonce=260&data=ESDTTransfer@555344432d386434303638@10&callbackUrl=https://devnet.xexchange.com`,
      {
        waitUntil: 'domcontentloaded'
      }
    );

    await loginWithKeystore();
    await page.waitForSelector(getByDataTestId(DataTestIdsEnum.sendModal));
    expect(page.url()).toMatch(`${WALLET_SOURCE_ORIGIN}/send`);

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.confirmReceiver,
      text: receiverAccount.address
    });

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.confirmAmount,
      text: '0.000016'
    });

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.confirmFee,
      text: '0.0000795 xEGLD'
    });

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.confirmData,
      text: 'SDTTransfer@555344432d386434303638@10'
    });

    await page.click(getByDataTestId(DataTestIdsEnum.sendTrxBtn));

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.transactionToastTitle,
      text: 'Processing transaction'
    });
  });
});
