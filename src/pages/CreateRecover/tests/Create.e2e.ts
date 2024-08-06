import { WALLET_SOURCE_ORIGIN, emptyWalletPassword } from '__mocks__/data';
import { DataTestIdsEnum } from 'localConstants/dataTestIds.enum';
import {
  changeInputText,
  getByDataTestId,
  getElementTextContent,
  expectElementToContainText
} from 'utils/testUtils/puppeteer';

describe('Create test', () => {
  it('should create a new wallet successfully', async () => {
    await page.goto(WALLET_SOURCE_ORIGIN, {
      waitUntil: 'domcontentloaded'
    });

    await page.waitForSelector(getByDataTestId(DataTestIdsEnum.connectBtn));
    await page.click(getByDataTestId(DataTestIdsEnum.connectBtn));
    expect(page.url()).toEqual(`${WALLET_SOURCE_ORIGIN}/unlock`);
    await page.waitForSelector(
      getByDataTestId(DataTestIdsEnum.createWalletBtn)
    );

    await page.click(getByDataTestId(DataTestIdsEnum.createWalletBtn));
    expect(page.url()).toEqual(`${WALLET_SOURCE_ORIGIN}/create`);
    await page.click(getByDataTestId(DataTestIdsEnum.check));
    await page.click(getByDataTestId(DataTestIdsEnum.checkNetwork));
    await page.click(getByDataTestId(DataTestIdsEnum.submitButton));
    await page.click(getByDataTestId(DataTestIdsEnum.check));

    const mnemonicWordsElements = await page.$$(
      getByDataTestId(DataTestIdsEnum.mnemonicWord)
    );

    // Get all mnemonic text content
    const mnemonicWords = await Promise.all(
      mnemonicWordsElements.map(async (element) => {
        const elementTextContent = await element.getProperty('textContent');

        return (await elementTextContent.jsonValue()) as Promise<string>;
      })
    );

    await page.click(getByDataTestId(DataTestIdsEnum.goToCheckMnemonic));

    for (const id of ['first', 'second', 'third']) {
      // Get the first input mnemonic word index
      const label = await getElementTextContent({ dataTestId: `${id}Label` });
      const wordIndex = parseInt(label, 10);
      const mnemonicWord = mnemonicWords[wordIndex - 1].replace(/[0-9]/g, '');
      await page.type(`#${id}`, mnemonicWord);

      // https://pptr.dev/api/puppeteer.keyinput
      await page.keyboard.press('Enter');
    }

    await page.click(getByDataTestId(DataTestIdsEnum.goToDownloadButton));

    await changeInputText({
      dataTestId: DataTestIdsEnum.password,
      text: emptyWalletPassword
    });

    await changeInputText({
      dataTestId: DataTestIdsEnum.passwordRepeat,
      text: emptyWalletPassword
    });

    await page.click(getByDataTestId(DataTestIdsEnum.submitButton));

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.modalTitle,
      text: 'Wallet created!'
    });
  });
});
