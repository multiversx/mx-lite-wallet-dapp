import { keystoreAccount } from '__mocks__/data';
import { DataTestIdsEnum } from 'localConstants/dataTestIds.enum';
import {
  changeInputText,
  expectAndSignTransaction,
  expectElementToContainText,
  expectInputToHaveValue,
  getByDataTestId
} from 'utils/testUtils/puppeteer';
import { navigateToIssueNftPage } from './helpers';

describe('Issue SFT test', () => {
  it('should create a new SFT successfully', async () => {
    await navigateToIssueNftPage();
    await page.keyboard.press('Tab');
    await page.type('#react-select-2-input', 'SFT');
    await page.keyboard.press('Enter');
    await page.click(getByDataTestId(DataTestIdsEnum.issueNftBtn));
    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.nameError,
      text: 'Required'
    });

    await expectInputToHaveValue({
      dataTestId: DataTestIdsEnum.quantityInput,
      value: '1'
    });

    await expectInputToHaveValue({
      dataTestId: DataTestIdsEnum.royaltiesInput,
      value: '1'
    });

    await changeInputText({
      dataTestId: DataTestIdsEnum.nameInput,
      shouldOverride: true,
      text: 'SFTTOKEN'
    });

    await expectInputToHaveValue({
      dataTestId: DataTestIdsEnum.nameInput,
      value: 'SFTTOKEN'
    });

    await changeInputText({
      dataTestId: DataTestIdsEnum.quantityInput,
      shouldOverride: true,
      text: '100'
    });

    await expectInputToHaveValue({
      dataTestId: DataTestIdsEnum.quantityInput,
      value: '100'
    });

    await changeInputText({
      dataTestId: DataTestIdsEnum.royaltiesInput,
      shouldOverride: true,
      text: '10'
    });

    await expectInputToHaveValue({
      dataTestId: DataTestIdsEnum.royaltiesInput,
      value: '10'
    });

    await page.click(getByDataTestId(DataTestIdsEnum.issueNftBtn));
    await expectAndSignTransaction([
      {
        amount: '0',
        receiverAddress: keystoreAccount.address,
        signerAddress: '@webteam',
        gasPrice: '0.000000001',
        gasLimit: '3.153.008',
        data: 'ESDTNFTCreate@5346542d333834313038@64@534654544f4b454e@03e8@@@'
      }
    ]);
  });
});
