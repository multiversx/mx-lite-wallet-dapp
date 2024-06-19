import {
  useSignTransactionsCommonData,
  removeAllSignedTransactions,
  removeAllTransactionsToSign
} from 'lib';

export const useAbortAndRemoveAllTxs = () => {
  const { onAbort, transactionsToSign } = useSignTransactionsCommonData();

  return () => {
    removeAllTransactionsToSign();
    removeAllSignedTransactions();
    onAbort(transactionsToSign?.sessionId);
  };
};
