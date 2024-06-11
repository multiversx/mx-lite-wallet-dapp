import { WALLET_SOURCE_ORIGIN } from '__mocks__/data/constants';
import { nft } from '__mocks__/data/nfts';
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
      `${WALLET_SOURCE_ORIGIN}/hook/transaction?receiver=${receiverAccount.address}&value=0&gasLimit=8000000&nonce=778&data=ESDTNFTTransfer@4e465430312d383235613339@08@01@b728b3e2a0ad1105b38c35ebab2b01f5890cff4287c54084c1669428f2941cd8&callbackUrl=https://devnet.xexchange.com`,
      {
        waitUntil: 'domcontentloaded'
      }
    );

    await loginWithKeystore();
    await page.waitForSelector(getByDataTestId(DataTestIdsEnum.sendModal));
    expect(page.url()).toMatch(`${WALLET_SOURCE_ORIGIN}/send`);

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.confirmReceiver,
      text: 'test123123'
    });

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.tokenPreview,
      text: nft.identifier
    });

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.confirmData,
      text: 'ESDTNFTTransfer@4e465430312d383235613339@08@01@b728b3e2a0ad1105b38c35ebab2b01f5890cff4287c54084c1669428f2941cd8'
    });

    await page.click(getByDataTestId(DataTestIdsEnum.sendTrxBtn));

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.transactionToastTitle,
      text: 'Processing transaction'
    });
  });
});
