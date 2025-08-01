import { DEFAULT_PAGE_LOAD_DELAY_MS, keystoreAccount } from '__mocks__/data';
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
  'vibe1qqqqqqqqqqqqqpgqfcm6l6rd42hwhskmk4thlp9kz58npfq50gfqdrthqa';

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
      text: contractAddress
    });

    await expectInputToHaveValue({
      dataTestId: DataTestIdsEnum.contractInput,
      value: contractAddress
    });

    await page.type('#react-select-3-input', 'MEX');
    await page.keyboard.press('Enter');
    await page.click(getByDataTestId(DataTestIdsEnum.sendBtn));
    await expectAndSignTransaction([
      {
        amount: '0.050000000000000000',
        receiverAddress: keystoreAccount.address,
        signerAddress: '@webteam',
        gasPrice: '0.0000001',
        gasLimit: '60.137.000',
        data: 'registerAndSetAllRoles@53465454455354434f4c@534654@534654@'
      }
    ]);

    await sleep(2 * DEFAULT_PAGE_LOAD_DELAY_MS);
    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.activeNetwork,
      text: 'Testnet'
    });
  });
});
