import { DataTestIdsEnum } from '../../src/localConstants/dataTestIds.enum.ts';
import { test } from '../fixtures/customFixturesNft.ts';
import { handlePopup } from '../utils/handlePopup.ts';
import { sovereignTransfer } from '../utils/sovereignTransfer.ts';

test('Positive sovereign transfer', async ({ authenticatedPage }) => {
  await authenticatedPage
    .getByTestId(DataTestIdsEnum.sovereignTransferBtn)
    .click();
  await authenticatedPage
    .getByTestId(DataTestIdsEnum.sendNFtTypeInput0)
    .click();
  await sovereignTransfer({ page: authenticatedPage });
  await handlePopup(authenticatedPage, () =>
    authenticatedPage
      .getByTestId(DataTestIdsEnum.transactionDetailsToastBody)
      .getByRole('link')
      .nth(1)
      .click()
  );
  await authenticatedPage.close();
});
