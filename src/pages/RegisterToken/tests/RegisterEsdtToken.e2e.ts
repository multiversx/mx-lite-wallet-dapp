import {
  DEFAULT_PAGE_LOAD_DELAY_MS
} from '__mocks__/data';
import { DataTestIdsEnum } from 'localConstants/dataTestIds.enum';

import {
  changeInputText,
  expectAndSignTransaction,
  expectElementToContainText,
  expectInputToHaveValue,
  expectToBeChecked,
  getByDataTestId,
  sleep
} from 'utils/testUtils/puppeteer';
import { navigateToRegisterTokenPage } from './helpers';

describe('Register ESDT Token test', () => {
  it('should register an ESDT token from sovereign to testnet successfully', async () => {
    await navigateToRegisterTokenPage();

    await expectToBeChecked({
      dataTestId: DataTestIdsEnum.sendEsdtTypeInput,
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

    await page.type('#react-select-3-input', 'MEX');
    await page.keyboard.press('Enter');
    await page.click(getByDataTestId(DataTestIdsEnum.sendBtn));
    await expectAndSignTransaction();

    await sleep(2 * DEFAULT_PAGE_LOAD_DELAY_MS);
    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.activeNetwork,
      text: 'Testnet'
    });
  });
});
