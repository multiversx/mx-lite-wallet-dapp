import { WALLET_SOURCE_ORIGIN } from '__mocks__/data';
import { DataTestIdsEnum } from 'localConstants/dataTestIds.enum';
import {
  changeInputText,
  expectElementToContainText,
  expectInputToHaveValue,
  getByDataTestId,
  loginWithKeystore
} from 'utils/testUtils/puppeteer';

describe('Issue Collection form validation test', () => {
  it('should show errors and not create collection when data is invalid', async () => {
    await page.goto(`${WALLET_SOURCE_ORIGIN}/logout`, {
      waitUntil: 'domcontentloaded'
    });

    await loginWithKeystore();
    await page.click(getByDataTestId(DataTestIdsEnum.issueCollectionBtn));
    await expect(page.url()).toEqual(
      `${WALLET_SOURCE_ORIGIN}/issue-collection`
    );

    const createCollectionBtn = await page.waitForSelector(
      getByDataTestId(DataTestIdsEnum.issueCollectionBtn)
    );

    await createCollectionBtn?.click();
    await page.click(getByDataTestId(DataTestIdsEnum.issueCollectionBtn));
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
      text: 'TEST-COLLECTION'
    });

    await changeInputText({
      dataTestId: DataTestIdsEnum.tokenTickerInput,
      shouldOverride: true,
      text: 'T'
    });

    await expectInputToHaveValue({
      dataTestId: DataTestIdsEnum.tokenNameInput,
      value: 'TEST-COLLECTION'
    });

    await expectInputToHaveValue({
      dataTestId: DataTestIdsEnum.tokenTickerInput,
      value: 'T'
    });

    await page.click(getByDataTestId(DataTestIdsEnum.issueCollectionBtn));
    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.tokenNameError,
      text: 'Alphanumeric characters only'
    });

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.tokenTickerError,
      text: 'Must be between 3 - 10 characters long'
    });

    await changeInputText({
      dataTestId: DataTestIdsEnum.tokenNameInput,
      shouldOverride: true,
      text: 'tc'
    });

    await changeInputText({
      dataTestId: DataTestIdsEnum.tokenTickerInput,
      shouldOverride: true,
      text: 'TEST-COLLECTION'
    });

    await expectInputToHaveValue({
      dataTestId: DataTestIdsEnum.tokenNameInput,
      value: 'tc'
    });

    await expectInputToHaveValue({
      dataTestId: DataTestIdsEnum.tokenTickerInput,
      value: 'TEST-COLLECTION'
    });

    await page.click(getByDataTestId(DataTestIdsEnum.issueCollectionBtn));
    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.tokenNameError,
      text: 'Must be between 3 - 50 characters long'
    });

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.tokenTickerError,
      text: 'Alphanumeric uppercase characters only'
    });

    await changeInputText({
      dataTestId: DataTestIdsEnum.tokenNameInput,
      shouldOverride: true,
      text: 'QWERTYUIOPS!'
    });

    await changeInputText({
      dataTestId: DataTestIdsEnum.tokenTickerInput,
      shouldOverride: true,
      text: 'QWERTYUIOP!'
    });

    await page.click(getByDataTestId(DataTestIdsEnum.issueCollectionBtn));
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
      text: 'quertyuiop123'
    });

    await changeInputText({
      dataTestId: DataTestIdsEnum.tokenTickerInput,
      shouldOverride: true,
      text: 'quert!'
    });

    await page.click(getByDataTestId(DataTestIdsEnum.issueCollectionBtn));
    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.tokenTickerError,
      text: 'Alphanumeric uppercase characters only'
    });

    await changeInputText({
      dataTestId: DataTestIdsEnum.tokenNameInput,
      shouldOverride: true,
      text: 'QWERTYUIOPASDFGHJKLZXCVBNMQWERTYUIOPASDFGHJKLZXCVBNM'
    });

    await changeInputText({
      dataTestId: DataTestIdsEnum.tokenTickerInput,
      shouldOverride: true,
      text: 'QWERTYUIOPASDFGHJKLZXCVBNM'
    });

    await expectInputToHaveValue({
      dataTestId: DataTestIdsEnum.tokenNameInput,
      value: 'QWERTYUIOPASDFGHJKLZXCVBNMQWERTYUIOPASDFGHJKLZXCVBNM'
    });

    await expectInputToHaveValue({
      dataTestId: DataTestIdsEnum.tokenTickerInput,
      value: 'QWERTYUIOPASDFGHJKLZXCVBNM'
    });

    await page.click(getByDataTestId(DataTestIdsEnum.issueCollectionBtn));
    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.tokenNameError,
      text: 'Must be between 3 - 50 characters long'
    });

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.tokenTickerError,
      text: 'Must be between 3 - 10 characters long'
    });

    await page.click(getByDataTestId(DataTestIdsEnum.sftTypeInput));

    await changeInputText({
      dataTestId: DataTestIdsEnum.tokenNameInput,
      shouldOverride: true,
      text: 'TESTCOLLECTION'
    });

    await changeInputText({
      dataTestId: DataTestIdsEnum.tokenTickerInput,
      shouldOverride: true,
      text: 'TEST'
    });

    await expectInputToHaveValue({
      dataTestId: DataTestIdsEnum.tokenNameInput,
      value: 'TESTCOLLECTION'
    });

    await expectInputToHaveValue({
      dataTestId: DataTestIdsEnum.tokenTickerInput,
      value: 'TEST'
    });

    await page.click(getByDataTestId(DataTestIdsEnum.issueCollectionBtn));
    const tokenNameError = await page.$(
      getByDataTestId(DataTestIdsEnum.tokenNameError)
    );

    const tokenTickerError = await page.$(
      getByDataTestId(DataTestIdsEnum.tokenTickerError)
    );

    expect(tokenNameError).toEqual(null);
    expect(tokenTickerError).toEqual(null);
  });
});
