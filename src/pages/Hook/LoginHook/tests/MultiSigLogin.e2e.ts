import { WALLET_SOURCE_ORIGIN } from '__mocks__/data/constants';
import { multisigContractAccount } from '__mocks__/data/multisigContractAccount';
import { testAccount } from '__mocks__/data/testAccount';
import { DataTestIdsEnum } from 'localConstants/dataTestIds.enum';
import {
  expectElementToContainText,
  expectToBeChecked,
  getByDataTestId,
  loginWithKeystore,
  passImpersonateAndChooseAccount
} from 'utils/testUtils/puppeteer';

describe('Multisig login hook tests', () => {
  it('should login with token, select multisig account, and redirect to callbackUrl successfully', async () => {
    await page.goto(
      `${WALLET_SOURCE_ORIGIN}/hook/login?token=aHR0cHM6Ly9kZXZuZXQueGV4Y2hhbmdlLmNvbQ.9a6667745c5179d69300f59a7a7b6970904588ec65710a0f79827b116963df2b.86400.eyJ0aW1lc3RhbXAiOjE3MTI4MTc3NzN9&callbackUrl=https://devnet.xexchange.com/dashboard`,
      {
        waitUntil: 'domcontentloaded'
      }
    );

    await loginWithKeystore();
    await passImpersonateAndChooseAccount({ skipConfirm: true });

    await page.click(
      getByDataTestId(`check_${multisigContractAccount.address}`)
    );

    await expectToBeChecked({
      dataTestId: `check_${testAccount.address}`,
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
      `https://devnet.xexchange.com/dashboard?address=${testAccount.address}&multisig=${multisigContractAccount.address}&signature=75863db6269df4f6f2cae5be7a6a4c6053db3e3af50cd821c7e94542ead0d566947fb436c7d137145fbd2fd2ae322e2f7ec8ea2686bd0b6a02ac6a5288d20307`
    );
  });
});
