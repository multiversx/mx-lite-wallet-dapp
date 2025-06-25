import {
  Transaction,
  TransactionManager,
  TransactionsDisplayInfoType,
  getAccountProvider
} from 'lib';

export type SendAndTrackTransactionsType = {
  transactions: Transaction[] | Transaction[][];
  options?: {
    disableToasts?: boolean;
    transactionsDisplayInfo?: TransactionsDisplayInfoType;
  };
};

export const sendAndTrackTransactions = async ({
  transactions,
  options
}: SendAndTrackTransactionsType) => {
  const txManager = TransactionManager.getInstance();
  const provider = getAccountProvider();

  // Support both single and batch transactions
  const signTxs = async (txs: Transaction[] | Transaction[][]) => {
    if (Array.isArray(txs[0])) {
      // Batch of batches
      return Promise.all(
        (txs as Transaction[][]).map((batch) =>
          provider.signTransactions(batch)
        )
      );
    } else {
      // Single batch
      return provider.signTransactions(txs as Transaction[]);
    }
  };

  const signedTransactions = await signTxs(transactions);
  const sentTransactions = await txManager.send(signedTransactions);
  const sessionId = await txManager.track(sentTransactions, options);

  return sessionId;
};
