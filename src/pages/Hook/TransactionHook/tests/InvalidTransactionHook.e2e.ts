import { WALLET_SOURCE_ORIGIN } from '__mocks__/data/constants';
import { DataTestIdsEnum } from 'localConstants/dataTestIds.enum';
import { expectElementToContainText } from 'utils/testUtils/puppeteer';

describe('Invalid transaction hook tests', () => {
  it('should navigate to /dashboard route without signing when callbackUrl is missing', async () => {
    await page.goto(
      `${WALLET_SOURCE_ORIGIN}/hook/transaction?receiver=erd1qqqqqqqqqqqqqpgqxwakt2g7u9atsnr03gqcgmhcv38pt7mkd94q6shuwt&value=0&gasLimit=350000000&data=unStake@021e0c0013070adc0000`,
      {
        waitUntil: 'domcontentloaded'
      }
    );

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.unlockTitle,
      text: 'Connect your wallet'
    });

    expect(page.url()).toMatch(`${WALLET_SOURCE_ORIGIN}/unlock`);
  });

  it('should navigate to /dashboard route without signing when receiver is missing', async () => {
    await page.goto(
      `${WALLET_SOURCE_ORIGIN}/hook/transaction?value=0&gasLimit=350000000&data=unStake@021e0c0013070adc0000&callbackUrl=https://devnet.xexchange.com`,
      {
        waitUntil: 'domcontentloaded'
      }
    );

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.unlockTitle,
      text: 'Connect your wallet'
    });

    expect(page.url()).toMatch(`${WALLET_SOURCE_ORIGIN}/unlock`);
  });
});
