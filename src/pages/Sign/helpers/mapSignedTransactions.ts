import omit from 'lodash/omit';
import {
  IPlainTransactionObject,
  TransactionOptions,
  TransactionVersion
} from 'lib';
import { GAS_LIMIT, GAS_PRICE, ZERO } from 'localConstants';
import { TransactionSignatureDataType } from 'types';

export interface MapSignedTransactionsParamsType {
  txs: IPlainTransactionObject[];
  signatureData: TransactionSignatureDataType[];
  address: string;
  isLedgerWithHashSign: boolean;
}

export const mapSignedTransactions = ({
  address,
  isLedgerWithHashSign,
  signatureData,
  txs
}: MapSignedTransactionsParamsType) =>
  txs.map((tx, i) => {
    const parsedTx = omit(tx, 'token');

    const { signature } = signatureData[i];

    return {
      ...parsedTx,
      value: tx.value || ZERO,
      gasLimit: Number(tx.gasLimit || String(GAS_LIMIT)),
      gasPrice: Number(tx.gasPrice || GAS_PRICE),
      receiver: tx.receiver || address,
      data: window.opener ? tx.data : encodeURIComponent(tx.data ?? ''),
      sender: tx.sender || address,
      signature,
      ...(isLedgerWithHashSign
        ? {
            version: TransactionVersion.withTxOptions().valueOf(),
            options: TransactionOptions.withOptions({
              hashSign: true
              // guarded: isGuarded
            }).valueOf()
          }
        : {})
    };
  });
