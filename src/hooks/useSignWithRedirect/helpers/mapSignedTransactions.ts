import omit from 'lodash/omit';
import {
  TransactionOptions,
  TransactionVersion,
  Transaction,
  IPlainTransactionObject
} from 'lib/sdkCore';
import { GAS_LIMIT, GAS_PRICE } from 'lib/sdkDapp';
import { ZERO } from 'lib/sdkDappUtils';

export interface MapSignedTransactionsParamsType {
  signedTransactions: Transaction[];
  address: string;
  isLedgerWithHashSign: boolean;
}

export const mapSignedTransactions = ({
  address,
  isLedgerWithHashSign,
  signedTransactions
}: MapSignedTransactionsParamsType): IPlainTransactionObject[] =>
  signedTransactions.map((tx) => {
    const plainTx = tx.toPlainObject();
    const parsedTx = omit(plainTx, 'token');

    return {
      ...parsedTx,
      value: tx.value.toString() || ZERO,
      gasLimit: Number(tx.gasLimit || String(GAS_LIMIT)),
      gasPrice: Number(tx.gasPrice || GAS_PRICE),
      receiver: tx.receiver.toBech32() || address,
      data: window.opener
        ? plainTx.data
        : encodeURIComponent(plainTx.data ?? ''),
      sender: tx.sender.toBech32() || address,
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
