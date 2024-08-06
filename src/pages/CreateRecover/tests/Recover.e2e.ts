import { WALLET_SOURCE_ORIGIN, emptyWalletPassword } from '__mocks__/data';
import { DataTestIdsEnum } from 'localConstants/dataTestIds.enum';
import {
  changeInputText,
  expectElementToContainText,
  getByDataTestId
} from 'utils/testUtils/puppeteer';

const mnemonicWords: string[] = [
  'decade',
  'valid',
  'essence',
  'receive',
  'emotion',
  'damp',
  'palm',
  'try',
  'rain',
  'stomach',
  'invite',
  'token',
  'basket',
  'cool',
  'use',
  'surprise',
  'allow',
  'lunar',
  'mechanic',
  'loyal',
  'shoe',
  'knee',
  'reopen',
  'swamp'
];

describe('Recover page tests', () => {
  it('should recover wallet successfully', async () => {
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      if (request.url().endsWith('.zip') || request.url().endsWith('.json')) {
        return request.abort();
      }

      request.continue();
    });

    await page.goto(`${WALLET_SOURCE_ORIGIN}/logout`, {
      waitUntil: 'domcontentloaded'
    });

    await page.waitForSelector(
      getByDataTestId(DataTestIdsEnum.recoverWalletBtn)
    );

    await page.click(getByDataTestId(DataTestIdsEnum.recoverWalletBtn));
    expect(page.url()).toEqual(`${WALLET_SOURCE_ORIGIN}/recover`);

    // Paste from clipboard required permission
    // const mnemonics = mnemonicWords
    //   .map((word, index) => `${index + 1} ${word}`)
    //   .join(' ');

    // await page.evaluate((textToCopy) => {
    //   navigator.clipboard.writeText(textToCopy);
    // }, mnemonics);
    //
    // await page.click(getByDataTestId(DataTestIdsEnum.pasteMenemonicBtn));
    // await page.keyboard.press('Enter');

    for (const word of mnemonicWords) {
      await page.type(`#${DataTestIdsEnum.mnemonicInput}`, word, {
        delay: 10
      });

      if (word === 'rain') {
        // There are multiple words that contain "rain"
        for (let i = 1; i <= 2; i++) {
          await page.keyboard.press('ArrowDown');
        }
      }

      if (word === 'try') {
        // There are multiple words that contain "try"
        for (let i = 1; i <= 3; i++) {
          await page.keyboard.press('ArrowDown');
        }
      }

      if (word === 'use') {
        // There are multiple words that contain "use"
        for (let i = 1; i <= 11; i++) {
          await page.keyboard.press('ArrowDown');
        }
      }

      await page.keyboard.press('Enter');
    }

    await page.click(getByDataTestId(DataTestIdsEnum.submitButton));

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
