import { WALLET_SOURCE_ORIGIN } from '__mocks__/data/constants';
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

    for (const word of mnemonicWords) {
      await page.type(getByDataTestId(DataTestIdsEnum.mnemonicInput), word, {
        delay: 10
      });

      // https://pptr.dev/api/puppeteer.keyinput
      await page.keyboard.press('Enter');
    }

    await page.click(getByDataTestId(DataTestIdsEnum.submitButton));

    await changeInputText({
      dataTestId: DataTestIdsEnum.password,
      text: 'juxbit-7dusku-miskIs'
    });

    await changeInputText({
      dataTestId: DataTestIdsEnum.passwordRepeat,
      text: 'juxbit-7dusku-miskIs'
    });

    await page.click(getByDataTestId(DataTestIdsEnum.submitButton));

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.modalTitle,
      text: 'Keystore created!'
    });
  });
});
