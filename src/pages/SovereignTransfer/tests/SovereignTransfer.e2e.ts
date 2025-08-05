import {
  emptyWalletAccount,
  keystoreAccount,
  WALLET_SOURCE_ORIGIN
} from '__mocks__/data';
import { DataTestIdsEnum } from 'localConstants/dataTestIds.enum';

import {
  changeInputText,
  expectAndSignTransaction,
  expectElementToBeDisabled,
  expectElementToContainText,
  expectInputToHaveValue,
  expectToBeChecked,
  getByDataTestId,
  loginWithKeystore
} from 'utils/testUtils/puppeteer';

const contractAddress =
  'vibe1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzllls2szsw0';

describe('Sovereign transfer test', () => {
  it('should transfer ESDT and NFT tokens on sovereign successfully', async () => {
    await page.goto(`${WALLET_SOURCE_ORIGIN}/logout`, {
      waitUntil: 'domcontentloaded'
    });

    await loginWithKeystore();
    const sovereignTransferBtn = await page.waitForSelector(
      getByDataTestId(DataTestIdsEnum.sovereignTransferBtn)
    );

    expect(sovereignTransferBtn).toBeDefined();
    await sovereignTransferBtn.click();

    const sendBtn = await page.waitForSelector(
      getByDataTestId(DataTestIdsEnum.sendBtn)
    );

    expect(sendBtn).toBeDefined();
    await sendBtn.click();

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.contractError,
      text: 'Contract is required'
    });

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.receiverError,
      text: 'Receiver is required'
    });

    await expectElementToContainText({
      dataTestId: `${DataTestIdsEnum.amountError}0`,
      text: 'Amount is required'
    });

    await expectToBeChecked({
      dataTestId: `${DataTestIdsEnum.sendEsdtTypeInput}0`,
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

    await changeInputText({
      dataTestId: DataTestIdsEnum.receiverInput,
      shouldOverride: true,
      text: emptyWalletAccount.address
    });

    await expectInputToHaveValue({
      dataTestId: DataTestIdsEnum.receiverInput,
      value: emptyWalletAccount.address
    });

    await page.type('#react-select-2-input', 'BurnTest');
    await page.keyboard.press('Enter');
    await changeInputText({
      dataTestId: `${DataTestIdsEnum.amountInput}0`,
      shouldOverride: true,
      text: '1'
    });

    await expectInputToHaveValue({
      dataTestId: `${DataTestIdsEnum.amountInput}0`,
      value: '1'
    });

    await page.click(getByDataTestId(DataTestIdsEnum.addTokenBtn));
    await expectToBeChecked({
      dataTestId: `${DataTestIdsEnum.sendEsdtTypeInput}1`,
      isChecked: true
    });

    await page.type('#react-select-3-input', 'BurnTest');
    await page.keyboard.press('Enter');
    await changeInputText({
      dataTestId: `${DataTestIdsEnum.amountInput}1`,
      shouldOverride: true,
      text: '2'
    });

    await expectInputToHaveValue({
      dataTestId: `${DataTestIdsEnum.amountInput}1`,
      value: '2'
    });

    await page.click(getByDataTestId(`${DataTestIdsEnum.removeTokenBtn}1`));
    const amountInput1 = await page.$(
      getByDataTestId(`${DataTestIdsEnum.amountInput}1`)
    );

    const removeTokenBtn1 = await page.$(
      getByDataTestId(`${DataTestIdsEnum.removeTokenBtn}1`)
    );

    expect(amountInput1).toEqual(null);
    expect(removeTokenBtn1).toEqual(null);
    await page.click(getByDataTestId(DataTestIdsEnum.addTokenBtn));
    await page.type('#react-select-4-input', 'ASH');
    await page.keyboard.press('Enter');
    await changeInputText({
      dataTestId: `${DataTestIdsEnum.amountInput}1`,
      shouldOverride: true,
      text: '2'
    });

    await expectInputToHaveValue({
      dataTestId: `${DataTestIdsEnum.amountInput}1`,
      value: '2'
    });

    await page.click(getByDataTestId(DataTestIdsEnum.addTokenBtn));
    await expectToBeChecked({
      dataTestId: `${DataTestIdsEnum.sendEsdtTypeInput}2`,
      isChecked: true
    });

    await page.click(getByDataTestId(`${DataTestIdsEnum.sendNFtTypeInput}2`));
    await expectToBeChecked({
      dataTestId: `${DataTestIdsEnum.sendNFtTypeInput}2`,
      isChecked: true
    });

    await page.type('#react-select-5-input', 'NFT');
    await page.keyboard.press('Enter');
    await expectElementToBeDisabled({
      dataTestId: `${DataTestIdsEnum.amountInput}2`,
      isDisabled: true
    });

    await expectInputToHaveValue({
      dataTestId: `${DataTestIdsEnum.amountInput}2`,
      value: '1'
    });

    await page.click(getByDataTestId(DataTestIdsEnum.addTokenBtn));
    await expectToBeChecked({
      dataTestId: `${DataTestIdsEnum.sendEsdtTypeInput}3`,
      isChecked: true
    });

    await page.click(getByDataTestId(`${DataTestIdsEnum.sendNFtTypeInput}3`));
    await expectToBeChecked({
      dataTestId: `${DataTestIdsEnum.sendNFtTypeInput}3`,
      isChecked: true
    });

    await page.type('#react-select-6-input', 'Day');
    await page.keyboard.press('Enter');
    await expectElementToBeDisabled({
      dataTestId: `${DataTestIdsEnum.amountInput}3`,
      isDisabled: false
    });

    await changeInputText({
      dataTestId: `${DataTestIdsEnum.amountInput}3`,
      shouldOverride: true,
      text: '5'
    });

    await expectInputToHaveValue({
      dataTestId: `${DataTestIdsEnum.amountInput}3`,
      value: '5'
    });

    await page.click(getByDataTestId(DataTestIdsEnum.sendBtn));

    const mainTx = {
      amount: '0.000000000000000001',
      receiverAddress: keystoreAccount.address,
      signerAddress: '@webteam',
      gasPrice: '0.000000001',
      gasLimit: '100.000.000',
      data: 'MultiESDTNFTTransfer@000000000000000000010000000000000000000000000000000000000002ffff@04@425453542d313135346332@@01@4153482d653364316237@@1bc16d674ec80000@4e46542d663765636164@01@01@4348524953544d41532d323764336532@01@05@6465706f736974@df8d569c7ab4ab179d41cb8f89519705dd142eda414a37d6ada80c079e410691'
    };

    await expectAndSignTransaction([
      {
        ...mainTx,
        dataHighlight: '425453542d313135346332@@01'
      },
      {
        ...mainTx,
        amount: '2',
        dataHighlight: '4153482d653364316237@@1bc16d674ec80000'
      },
      {
        ...mainTx,
        dataHighlight: '4e46542d663765636164@01@01'
      },
      {
        ...mainTx,
        amount: '0.000000000000000005',
        dataHighlight: '4348524953544d41532d323764336532@01@05'
      },
      {
        ...mainTx,
        amount: '0',
        amountLabel: 'Amount',
        action: 'deposit',
        receiverLabel: 'App',
        dataHighlight:
          '465706f736974@05579ce6988a9aed36ca7229746071a6b8f603f97025f15ed16c71758b6adcd9'
      }
    ]);
  });
});
