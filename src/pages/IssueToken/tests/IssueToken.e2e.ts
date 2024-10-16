import { WALLET_SOURCE_ORIGIN } from '__mocks__/data';
import { DataTestIdsEnum } from 'localConstants/dataTestIds.enum';

import {
  changeInputText,
  expectElementToContainText,
  expectInputToHaveValue,
  getByDataTestId,
  loginWithKeystore
} from 'utils/testUtils/puppeteer';

describe('Issue Token test', () => {
  it('should create a new token with all settings checked successfully', async () => {
    await page.goto(`${WALLET_SOURCE_ORIGIN}/logout`, {
      waitUntil: 'domcontentloaded'
    });

    await loginWithKeystore();
    await page.click(getByDataTestId(DataTestIdsEnum.issueTokenBtn));
    await expect(page.url()).toEqual(`${WALLET_SOURCE_ORIGIN}/issue-token`);

    await changeInputText({
      dataTestId: DataTestIdsEnum.tokenNameInput,
      shouldOverride: true,
      text: 'TESTTOKEN'
    });

    await expectInputToHaveValue({
      dataTestId: DataTestIdsEnum.tokenNameInput,
      value: 'TESTTOKEN'
    });

    await changeInputText({
      dataTestId: DataTestIdsEnum.tokenTickerInput,
      shouldOverride: true,
      text: 'TOKEN'
    });

    await expectInputToHaveValue({
      dataTestId: DataTestIdsEnum.tokenTickerInput,
      value: 'TOKEN'
    });

    await changeInputText({
      dataTestId: DataTestIdsEnum.mintedValueInput,
      shouldOverride: true,
      text: '1000'
    });

    await expectInputToHaveValue({
      dataTestId: DataTestIdsEnum.mintedValueInput,
      value: '1000'
    });

    await changeInputText({
      dataTestId: DataTestIdsEnum.numDecimalsInput,
      shouldOverride: true,
      text: '18'
    });

    await expectInputToHaveValue({
      dataTestId: DataTestIdsEnum.numDecimalsInput,
      value: '18'
    });

    await page.click(getByDataTestId(DataTestIdsEnum.issueTokenBtn));

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.transactionToastTitle,
      text: 'Processing transaction'
    });
  });
});
