import { WALLET_SOURCE_ORIGIN } from '__mocks__/data/constants';
import { stakingScDisruptiveDigital } from '__mocks__/data/stakingScDisruptiveDigital';
import { testAccount } from '__mocks__/data/testAccount';
import { DataTestIdsEnum } from 'localConstants/dataTestIds.enum';
import {
  expectElementToContainText,
  getByDataTestId,
  loginWithKeystore
} from 'utils/testUtils/puppeteer';

describe('Cancel withdraw transaction hook tests', () => {
  it('should cancel withdraw transaction and navigate to callbackUrl', async () => {
    await page.goto(
      `${WALLET_SOURCE_ORIGIN}/hook/transaction?receiver=${stakingScDisruptiveDigital.address}&value=0&gasLimit=350000000&data=withdraw&callbackUrl=https://devnet.xexchange.com`,
      {
        waitUntil: 'domcontentloaded'
      }
    );

    await loginWithKeystore();
    await page.waitForSelector(getByDataTestId(DataTestIdsEnum.sendModal));
    expect(page.url()).toMatch(`${WALLET_SOURCE_ORIGIN}/send`);

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.confirmReceiver,
      text: stakingScDisruptiveDigital.address
    });

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.confirmAmount,
      text: '0'
    });

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.confirmFee,
      text: '0.0035495 xEGLD'
    });

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.confirmData,
      text: 'withdraw'
    });

    await page.click(getByDataTestId(DataTestIdsEnum.cancelTrxBtn));

    expect(page.url()).toMatch(
      `https://devnet.xexchange.com/?address=${testAccount.address}&status=cancelled`
    );
  });
});
