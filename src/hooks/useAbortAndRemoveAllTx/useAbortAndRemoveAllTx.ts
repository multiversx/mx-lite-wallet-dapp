import {
  removeAllSignedTransactions,
  removeAllTransactionsToSign
} from 'services';
import { useSignTransactionsCommonData } from '../sdkDapp.hooks';

export const useAbortAndRemoveAllTxs = () => {
  const { onAbort, transactionsToSign } = useSignTransactionsCommonData();

  return () => {
    removeAllTransactionsToSign();
    removeAllSignedTransactions();
    onAbort(transactionsToSign?.sessionId);
  };
};
