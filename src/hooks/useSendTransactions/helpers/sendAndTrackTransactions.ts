import { Transaction } from 'lib/sdkCore';
import {
  TransactionManager,
  TransactionsDisplayInfoType,
  getAccountProvider
} from 'lib/sdkDapp';

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
}: SendAndTrackTransactionsType): Promise<string | null> => {
  const txManager = TransactionManager.getInstance();
  const provider = getAccountProvider();

  // Support both single and batch transactions
  const signTxs = async (
    txs: Transaction[] | Transaction[][]
  ): Promise<Transaction[] | Transaction[][]> => {
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

  try {
    const signedTransactions = await signTxs(transactions);
    const sentTransactions = await txManager.send(signedTransactions);
    const sessionId = await txManager.track(sentTransactions, options);

    return sessionId;
  } catch (error) {
    console.error(error);

    return null;
  }
};
