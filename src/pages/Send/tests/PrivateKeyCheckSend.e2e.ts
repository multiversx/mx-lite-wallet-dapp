import { DEFAULT_PASSWORD, WALLET_SOURCE_ORIGIN } from '__mocks__';
import { DataTestIdsEnum } from 'localConstants/dataTestIds.enum';
import {
  changeInputText,
  getByDataTestId,
  loginWithKeystore
} from 'utils/testUtils/puppeteer';

describe('Send NFT tests', () => {
  it('should send NFT successfully', async () => {
    await page.goto(`${WALLET_SOURCE_ORIGIN}/logout`, {
      waitUntil: 'domcontentloaded'
    });

    await loginWithKeystore();
    const sendBtn = await page.waitForSelector(
      getByDataTestId(DataTestIdsEnum.sendBtn)
    );

    await sendBtn.click();
    await page.reload({
      waitUntil: 'domcontentloaded'
    });

    await changeInputText({
      dataTestId: DataTestIdsEnum.accessPass,
      text: DEFAULT_PASSWORD
    });

    await page.click(getByDataTestId(DataTestIdsEnum.submitButton));
  });
});
