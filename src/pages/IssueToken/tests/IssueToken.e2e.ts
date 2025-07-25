import { DataTestIdsEnum } from 'localConstants/dataTestIds.enum';

import {
  changeInputText,
  expectAndSignTransaction,
  expectInputToHaveValue,
  getByDataTestId
} from 'utils/testUtils/puppeteer';
import { navigateToIssueTokenPage } from './helpers';

describe('Issue Token test', () => {
  it('should create a new token with all settings checked successfully', async () => {
    await navigateToIssueTokenPage();

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

    await expectAndSignTransaction();
  });
});
