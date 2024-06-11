import { WALLET_SOURCE_ORIGIN } from '__mocks__/data/constants';
import { multisigContractAccount } from '__mocks__/data/multisigContractAccount';
import { pemAccount } from '__mocks__/data/pemAccount';
import { DataTestIdsEnum } from 'localConstants/dataTestIds.enum';
import {
  expectElementToContainText,
  expectToBeChecked,
  getByDataTestId
} from 'utils/testUtils/puppeteer';
import { loginWithPem } from 'utils/testUtils/puppeteer/loginWithPem';

describe('Multisig PEM login hook test', () => {
  it('should login with PEM and multisig and redirect to the callbackUrl', async () => {
    await page.goto(
      `${WALLET_SOURCE_ORIGIN}/hook/login?token=aHR0cHM6Ly9kZXZuZXQueGV4Y2hhbmdlLmNvbQ.9a6667745c5179d69300f59a7a7b6970904588ec65710a0f79827b116963df2b.86400.eyJ0aW1lc3RhbXAiOjE3MTI4MTc3NzN9&callbackUrl=https://devnet.xexchange.com/dashboard`,
      {
        waitUntil: 'domcontentloaded'
      }
    );

    await loginWithPem();

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.modalTitle,
      text: 'Choose account'
    });

    expect(page.url()).toMatch(
      `${WALLET_SOURCE_ORIGIN}/multisig/choose-account`
    );

    await expectToBeChecked({
      dataTestId: `check_${pemAccount.address}`,
      isChecked: true
    });

    await page.click(
      getByDataTestId(`check_${multisigContractAccount.address}`)
    );

    await expectToBeChecked({
      dataTestId: `check_${pemAccount.address}`,
      isChecked: false
    });

    await expectToBeChecked({
      dataTestId: `check_${multisigContractAccount.address}`,
      isChecked: true
    });

    await page.click(getByDataTestId(DataTestIdsEnum.confirmBtn));
    expect(page.url()).toMatch(`${WALLET_SOURCE_ORIGIN}/sign-message`);

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.modalTitle,
      text: 'Confirm logging in'
    });

    await expectElementToContainText({
      dataTestId: DataTestIdsEnum.modalSubtitle,
      text: `By signing this message, you will connect with${multisigContractAccount.address}`
    });

    await page.click(getByDataTestId(DataTestIdsEnum.signButton));

    expect(page.url()).toMatch(
      `https://devnet.xexchange.com/dashboard?address=${pemAccount.address}&multisig=${multisigContractAccount.address}&signature=3538060385ffb89c4531d47cbc9b40a235ee490df1373cde18b4635e2bbca0dc07ecd68f633a20faaa464223d5d87ef237744d5f92f1e9da30028799cba76c05`
    );
  });
});
