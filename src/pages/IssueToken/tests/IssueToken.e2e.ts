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

    await expectAndSignTransaction([
      {
        amount: '0.050000000000000000',
        usdAmount: '0.00',
        receiverAddress:
          'vibe1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzllls2szsw0',
        signerAddress: 'webteam',
        gasPrice: '0.0000001 VIBE',
        gasLimit: '60.423.500',
        data: 'issue@54455354544f4b454e@544f4b454e@3635c9adc5dea00000@12@63616e467265657a65@74727565@63616e57697065@74727565@63616e5061757365@74727565@63616e4368616e67654f776e6572@74727565@63616e55706772616465@74727565@63616e4164645370656369616c526f6c6573@74727565'
      }
    ]);
  });
});
