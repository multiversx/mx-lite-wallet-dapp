import { WALLET_SOURCE_ORIGIN } from '__mocks__/data';
import { DataTestIdsEnum } from 'localConstants/dataTestIds.enum';
import { expectElementToContainTextDeep } from './expectElementToContainText';
import { getByTestIdDeep } from './getByDataTestIdDeep';

interface ISignTransactionInfo {
  amount: string;
  amountLabel?: string;
  receiverLabel?: string;
  requestOrigin?: string;
  receiverAddress: string;
  signerAddress: string;
  gasPrice: string;
  gasLimit: string;
  data: string;
  dataHighlight?: string;
  action?: string;
}
export const expectAndSignTransaction = async (
  transactionsInfo: ISignTransactionInfo[],
  isHook?: boolean
) => {
  for (const [index, info] of transactionsInfo.entries()) {
    if (transactionsInfo.length > 1) {
      await expectElementToContainTextDeep({
        dataTestId: DataTestIdsEnum.signTransactionsHeaderPagerText,
        text: `Transaction${index + 1}of${transactionsInfo.length}`
      });
    }

    const {
      amount,
      amountLabel = 'Send',
      receiverLabel = 'To',
      requestOrigin = WALLET_SOURCE_ORIGIN,
      receiverAddress,
      signerAddress,
      gasPrice,
      gasLimit,
      data,
      dataHighlight,
      action
    } = info;

    const signTransactionsOverviewTab = await getByTestIdDeep(
      page,
      `${DataTestIdsEnum.signTransactionsTab}-overview`
    );

    await signTransactionsOverviewTab.click();

    await expectElementToContainTextDeep({
      dataTestId: DataTestIdsEnum.signTransactionsHeaderOrigin,
      text: `Request from${requestOrigin}`
    });

    await expectElementToContainTextDeep({
      dataTestId: DataTestIdsEnum.signTransactionsOverviewAmountRow,
      text: `${amountLabel}${amount} VIBE`
    });

    await expectElementToContainTextDeep({
      dataTestId: DataTestIdsEnum.signTransactionsOverviewInteractorRow,
      text: `${receiverLabel}${receiverAddress}`
    });

    if (action) {
      await expectElementToContainTextDeep({
        dataTestId: DataTestIdsEnum.signTransactionsOverviewActionRow,
        text: action
      });
    }

    await expectElementToContainTextDeep({
      dataTestId: DataTestIdsEnum.signTransactionsFooterIdentity,
      text: `Sign with${signerAddress}`
    });

    const signTransactionsAdvancedTab = await getByTestIdDeep(
      page,
      `${DataTestIdsEnum.signTransactionsTab}-advanced`
    );

    await signTransactionsAdvancedTab.click();

    await expectElementToContainTextDeep({
      dataTestId: DataTestIdsEnum.signTransactionsAdvancedGasPrice,
      text: `Gas Price${gasPrice} VIBE`
    });

    await expectElementToContainTextDeep({
      dataTestId: DataTestIdsEnum.signTransactionsAdvancedGasLimit,
      text: `Gas Limit${gasLimit}`
    });

    await expectElementToContainTextDeep({
      dataTestId: DataTestIdsEnum.signTransactionsAdvancedData,
      text: data
    });

    if (dataHighlight) {
      await expectElementToContainTextDeep({
        dataTestId: DataTestIdsEnum.signTransactionsAdvancedDataHighlight,
        text: dataHighlight
      });
    }

    const signNextTransactionBtn = await getByTestIdDeep(
      page,
      DataTestIdsEnum.signNextTransactionBtn
    );

    await signNextTransactionBtn.click();
  }

  if (isHook) {
    return;
  }

  await expectElementToContainTextDeep({
    dataTestId: DataTestIdsEnum.transactionToastContent,
    text: 'Sent VIBE'
  });
};
