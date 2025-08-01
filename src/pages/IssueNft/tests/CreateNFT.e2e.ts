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

describe('Issue NFT test', () => {
  it('should create a new NFT successfully', async () => {
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
      dataTestId: DataTestIdsEnum.royaltiesInput,
      value: '1'
    });

    await changeInputText({
      dataTestId: DataTestIdsEnum.nameInput,
      shouldOverride: true,
      text: 'NFTTOKEN'
    });

    await expectInputToHaveValue({
      dataTestId: DataTestIdsEnum.nameInput,
      value: 'NFTTOKEN'
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
        usdAmount: '0.00',
        receiverAddress: keystoreAccount.address,
        signerAddress: '@webteam',
        gasPrice: '0.000000001',
        gasLimit: '3.153.008',
        data: 'ESDTNFTCreate@5346542d333834313038@01@4e4654544f4b454e@03e8@@@'
      }
    ]);
  });
});
