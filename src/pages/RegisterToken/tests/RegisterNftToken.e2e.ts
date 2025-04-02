import {
  DEFAULT_PAGE_LOAD_DELAY_MS,
  WALLET_SOURCE_ORIGIN
} from '__mocks__/data';
import { DataTestIdsEnum } from 'localConstants/dataTestIds.enum';

import {
  changeInputText,
  expectElementToContainText,
  expectInputToHaveValue,
  expectToBeChecked,
  getByDataTestId,
  loginWithKeystore,
  sleep
} from 'utils/testUtils/puppeteer';

describe('Register NFT Token test', () => {
  it('should register an NFT token from sovereign to testnet successfully', async () => {
    await page.goto(`${WALLET_SOURCE_ORIGIN}/logout`, {
      waitUntil: 'domcontentloaded'
    });

    await loginWithKeystore();
    await page.click(getByDataTestId(DataTestIdsEnum.registerTokenBtn));
    await expect(page.url()).toEqual(`${WALLET_SOURCE_ORIGIN}/register-token`);

    await expectToBeChecked({
      dataTestId: DataTestIdsEnum.sendEsdtTypeInput,
      isChecked: true
    });

    await page.click(getByDataTestId(DataTestIdsEnum.sendNFtTypeInput));
    await expectToBeChecked({
      dataTestId: DataTestIdsEnum.sendNFtTypeInput,
      isChecked: true
    });

    await changeInputText({
      dataTestId: DataTestIdsEnum.contractInput,
      shouldOverride: true,
      text: 'erd1qqqqqqqqqqqqqpgqfcm6l6rd42hwhskmk4thlp9kz58npfq50gfqdrthqa'
    });

    await expectInputToHaveValue({
      dataTestId: DataTestIdsEnum.contractInput,
      value: 'erd1qqqqqqqqqqqqqpgqfcm6l6rd42hwhskmk4thlp9kz58npfq50gfqdrthqa'
    });

    await page.type('#react-select-3-input', 'SFT');
    await page.keyboard.press('Enter');
    await page.click(getByDataTestId(DataTestIdsEnum.sendBtn));
    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.transactionToastTitle,
      text: 'Processing transaction'
    });

    await sleep(2 * DEFAULT_PAGE_LOAD_DELAY_MS);
    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.activeNetwork,
      text: 'Testnet'
    });
  });
});
