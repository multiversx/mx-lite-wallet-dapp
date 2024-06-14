import { IPlainTransactionObject } from '@multiversx/sdk-core/out';
import { processBase64Fields } from '@multiversx/sdk-js-web-wallet-io/out/helpers';
import qs from 'qs';

export const plainTransactionsToSearchString = (
  transactions: IPlainTransactionObject[]
) => {
  const txWithClearData = transactions.map((tx) =>
    processBase64Fields(tx).decode()
  );

  const jsonToConvert: any = {};

  txWithClearData.map((clearTx: any) => {
    for (const txProp in clearTx) {
      if (
        clearTx.hasOwnProperty(txProp) &&
        !jsonToConvert.hasOwnProperty(txProp)
      ) {
        jsonToConvert[txProp] = [];
      }

      jsonToConvert[txProp].push(clearTx[txProp]);
    }
  });

  return `?${qs.stringify(jsonToConvert || {})}`;
};
