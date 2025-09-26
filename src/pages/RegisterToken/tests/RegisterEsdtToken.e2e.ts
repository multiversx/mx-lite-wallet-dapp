import { keystoreAccount } from '__mocks__/data';
import { DataTestIdsEnum } from 'localConstants/dataTestIds.enum';

import {
  changeInputText,
  expectAndSignTransaction,
  expectInputToHaveValue,
  expectToBeChecked,
  getByDataTestId
} from 'utils/testUtils/puppeteer';
import { navigateToRegisterTokenPage } from './helpers';

const contractAddress =
  'erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzllls8a5w6u';

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

    await page.type('#react-select-2-input', 'MEX');
    await page.keyboard.press('Enter');
    await page.click(getByDataTestId(DataTestIdsEnum.sendBtn));

    const mainTx = {
      amount: '0.0500',
      receiverAddress: keystoreAccount.address,
      signerAddress: '@webteam',
      gasPrice: '0.000000001',
      gasLimit: '100.000.000',
      data: 'DatarawtextdecimalsmartMultiESDTNFTTransfer@000000000000000000010000000000000000000000000000000000000002ffff@01@45474c442d303030303030@@b1a2bc2ec50000@7265676973746572546f6b656e@45474c444d4558464c2d326564373833@01@45474c444d45584c505374616b65644c4b@326564373833@12'
    };

    await expectAndSignTransaction([
      {
        ...mainTx,
        dataHighlight: '45474c442d303030303030@@b1a2bc2ec50000'
      },
      {
        ...mainTx,
        amount: '0',
        amountLabel: 'Amount',
        receiverLabel: 'App',
        dataHighlight:
          '7265676973746572546f6b656e@45474c444d4558464c2d326564373833@01@45474c444d45584c505374616b65644c4b@326564373833@12'
      }
    ]);
  });
});
