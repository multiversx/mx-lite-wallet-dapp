import { WALLET_SOURCE_ORIGIN } from '__mocks__/data';
import { DataTestIdsEnum } from 'localConstants/dataTestIds.enum';
import {
  changeInputText,
  expectElementToContainText,
  expectInputToHaveValue,
  getByDataTestId,
  loginWithKeystore
} from 'utils/testUtils/puppeteer';

describe('Issue Token form validation test', () => {
  it('should show errors and not create token when data is invalid', async () => {
    await page.goto(`${WALLET_SOURCE_ORIGIN}/logout`, {
      waitUntil: 'domcontentloaded'
    });

    await loginWithKeystore();
    await page.click(getByDataTestId(DataTestIdsEnum.issueTokenBtn));
    await expect(page.url()).toEqual(`${WALLET_SOURCE_ORIGIN}/issue-token`);
    await page.click(getByDataTestId(DataTestIdsEnum.issueTokenBtn));
    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.tokenNameError,
      text: 'Required'
    });

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.tokenTickerError,
      text: 'Required'
    });

    await changeInputText({
      dataTestId: DataTestIdsEnum.tokenNameInput,
      shouldOverride: true,
      text: 'TEST-TOKEN'
    });

    await changeInputText({
      dataTestId: DataTestIdsEnum.tokenTickerInput,
      shouldOverride: true,
      text: 'tk'
    });

    await changeInputText({
      dataTestId: DataTestIdsEnum.mintedValueInput,
      shouldOverride: true,
      text: 'a'
    });

    await changeInputText({
      dataTestId: DataTestIdsEnum.numDecimalsInput,
      shouldOverride: true,
      text: 'b'
    });

    await expectInputToHaveValue({
      dataTestId: DataTestIdsEnum.tokenNameInput,
      value: 'TEST-TOKEN'
    });

    await expectInputToHaveValue({
      dataTestId: DataTestIdsEnum.tokenTickerInput,
      value: 'tk'
    });

    await expectInputToHaveValue({
      dataTestId: DataTestIdsEnum.mintedValueInput,
      value: ''
    });

    await expectInputToHaveValue({
      dataTestId: DataTestIdsEnum.numDecimalsInput,
      value: ''
    });

    await page.click(getByDataTestId(DataTestIdsEnum.issueTokenBtn));
    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.tokenNameError,
      text: 'Alphanumeric characters only'
    });

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.tokenTickerError,
      text: 'Alphanumeric uppercase characters only'
    });

    await changeInputText({
      dataTestId: DataTestIdsEnum.tokenNameInput,
      shouldOverride: true,
      text: 'a'
    });

    await changeInputText({
      dataTestId: DataTestIdsEnum.tokenTickerInput,
      shouldOverride: true,
      text: 'TK'
    });

    await changeInputText({
      dataTestId: DataTestIdsEnum.mintedValueInput,
      shouldOverride: true,
      text: '-1'
    });

    await changeInputText({
      dataTestId: DataTestIdsEnum.numDecimalsInput,
      shouldOverride: true,
      text: '-1'
    });

    await expectInputToHaveValue({
      dataTestId: DataTestIdsEnum.tokenNameInput,
      value: 'a'
    });

    await expectInputToHaveValue({
      dataTestId: DataTestIdsEnum.tokenTickerInput,
      value: 'TK'
    });

    await expectInputToHaveValue({
      dataTestId: DataTestIdsEnum.mintedValueInput,
      value: '-1'
    });

    await expectInputToHaveValue({
      dataTestId: DataTestIdsEnum.numDecimalsInput,
      value: '-1'
    });

    await page.click(getByDataTestId(DataTestIdsEnum.issueTokenBtn));
    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.tokenNameError,
      text: 'Must be between 3 - 50 characters long'
    });

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.tokenTickerError,
      text: 'Must be between 3 - 10 characters long'
    });

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.mintedValueError,
      text: 'Invalid number'
    });

    await changeInputText({
      dataTestId: DataTestIdsEnum.tokenNameInput,
      shouldOverride: true,
      text: 'TESTTOKEN'
    });

    await changeInputText({
      dataTestId: DataTestIdsEnum.tokenTickerInput,
      shouldOverride: true,
      text: 'TOKEN'
    });

    await changeInputText({
      dataTestId: DataTestIdsEnum.mintedValueInput,
      shouldOverride: true,
      text: '1000'
    });

    await changeInputText({
      dataTestId: DataTestIdsEnum.numDecimalsInput,
      shouldOverride: true,
      text: '20'
    });

    await expectInputToHaveValue({
      dataTestId: DataTestIdsEnum.tokenNameInput,
      value: 'TESTTOKEN'
    });

    await expectInputToHaveValue({
      dataTestId: DataTestIdsEnum.tokenTickerInput,
      value: 'TOKEN'
    });

    await expectInputToHaveValue({
      dataTestId: DataTestIdsEnum.mintedValueInput,
      value: '1000'
    });

    await expectInputToHaveValue({
      dataTestId: DataTestIdsEnum.numDecimalsInput,
      value: '20'
    });

    await page.click(getByDataTestId(DataTestIdsEnum.issueTokenBtn));
    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.numDecimalsError,
      text: 'Must be between 0 - 18'
    });

    const tokenNameError = await page.$(
      getByDataTestId(DataTestIdsEnum.tokenNameError)
    );

    const tokenTickerError = await page.$(
      getByDataTestId(DataTestIdsEnum.tokenTickerError)
    );

    const mintedValueError = await page.$(
      getByDataTestId(DataTestIdsEnum.mintedValueError)
    );

    expect(tokenNameError).toEqual(null);
    expect(tokenTickerError).toEqual(null);
    expect(mintedValueError).toEqual(null);
  });
});
