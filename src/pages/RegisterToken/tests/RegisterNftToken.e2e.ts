import { DEFAULT_PAGE_LOAD_DELAY_MS } from '__mocks__/data';
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

const contractAddress =
  'vibe1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzllls2szsw0';

describe('Register NFT Token test', () => {
  it('should register an NFT token from sovereign to testnet successfully', async () => {
    await navigateToRegisterTokenPage();

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
      text: contractAddress
    });

    await expectInputToHaveValue({
      dataTestId: DataTestIdsEnum.contractInput,
      value: contractAddress
    });

    await page.type('#react-select-3-input', 'SFT');
    await page.keyboard.press('Enter');
    await page.click(getByDataTestId(DataTestIdsEnum.sendBtn));

    await sleep(2 * DEFAULT_PAGE_LOAD_DELAY_MS);

    await expectAndSignTransaction([
      {
        amount: '0.050000000000000000',
        receiverAddress: contractAddress,
        signerAddress: '@webteam',
        gasPrice: '0.000000001',
        gasLimit: '100.000.000',
        data: 'registerToken@736f762d5346542d333834313038@3@534654@534654@0'
      }
    ]);

    await sleep(2 * DEFAULT_PAGE_LOAD_DELAY_MS);
    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.activeNetwork,
      text: 'Testnet'
    });
  });
});
