import {
  DEFAULT_PAGE_LOAD_DELAY_MS,
  WALLET_SOURCE_ORIGIN
} from '__mocks__/data';
import { DataTestIdsEnum } from 'localConstants/dataTestIds.enum';
import { expectElementToContainTextDeep } from './expectElementToContainText';
import { getByTestIdDeep } from './getByDataTestIdDeep';
import { sleep } from './sleep';

interface ISignTransactionInfo {
  amount: string;
  usdAmount: string;
  requestOrigin?: string;
  receiverAddress: string;
  signerAddress: string;
  gasPrice: string;
  gasLimit: string;
  data: string;
}
export const expectAndSignTransaction = async (
  transactionsInfo: ISignTransactionInfo[]
) => {
  for (const info of transactionsInfo) {
    const {
      amount,
      usdAmount,
      requestOrigin = WALLET_SOURCE_ORIGIN,
      receiverAddress,
      signerAddress,
      gasPrice,
      gasLimit,
      data
    } = info;

    // await jestPuppeteer.debug();
    await expectElementToContainTextDeep({
      dataTestId: DataTestIdsEnum.signTransactionsHeaderOrigin,
      text: `Request from${requestOrigin}`
    });

    await expectElementToContainTextDeep({
      dataTestId: DataTestIdsEnum.signTransactionsOverviewAmountRow,
      text: `Send${amount} VIBE≈ $${usdAmount}`
    });

    await expectElementToContainTextDeep({
      dataTestId: DataTestIdsEnum.signTransactionsOverviewInteractorRow,
      text: `To${receiverAddress}`
    });

    await expectElementToContainTextDeep({
      dataTestId: DataTestIdsEnum.signTransactionsFooterIdentity,
      text: `Sign with@${signerAddress}`
    });

    const signTransactionsAdvancedTab = await getByTestIdDeep(
      page,
      `${DataTestIdsEnum.signTransactionsTab}-advanced`
    );

    await signTransactionsAdvancedTab.click();

    await expectElementToContainTextDeep({
      dataTestId: DataTestIdsEnum.signTransactionsAdvancedGasPrice,
      text: `${gasPrice} EGLD`
    });

    await expectElementToContainTextDeep({
      dataTestId: DataTestIdsEnum.signTransactionsAdvancedGasLimit,
      text: `${gasLimit} EGLD`
    });

    await expectElementToContainTextDeep({
      dataTestId: DataTestIdsEnum.signTransactionsAdvancedDataHighlight,
      text: data
    });

    const signNextTransactionBtn = await getByTestIdDeep(
      page,
      DataTestIdsEnum.signNextTransactionBtn
    );

    await signNextTransactionBtn.click();
  }

  await sleep(DEFAULT_PAGE_LOAD_DELAY_MS * 2);

  await expectElementToContainTextDeep({
    dataTestId: DataTestIdsEnum.transactionToastContent,
    text: 'Transaction sent successfully'
  });
};
