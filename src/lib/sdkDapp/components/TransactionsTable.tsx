import { useEffect, useState } from 'react';
import { TransactionsTableController } from '@multiversx/sdk-dapp/out/controllers/TransactionsTableController';
import { TransactionsRowType } from '@multiversx/sdk-dapp/out/controllers/TransactionsTableController/transactionsTableController.types';
import { MvxTransactionsTable } from '@multiversx/sdk-dapp-ui/react';
import { ServerTransactionType, useGetAccount, useGetNetworkConfig } from 'lib';

interface TransactionsTablePropsType {
  transactions?: ServerTransactionType[];
}

export const TransactionsTable = ({
  transactions = []
}: TransactionsTablePropsType) => {
  const { address } = useGetAccount();
  const { network } = useGetNetworkConfig();
  const [processedTransaction, setProcessedTransactions] = useState<
    TransactionsRowType[]
  >([]);

  useEffect(() => {
    processTransactions();
  }, []);

  const processTransactions = async () => {
    const transactionsData =
      await TransactionsTableController.processTransactions({
        address,
        egldLabel: network.egldLabel,
        explorerAddress: network.explorerAddress,
        transactions
      });

    setProcessedTransactions(transactionsData);
  };

  return <MvxTransactionsTable transactions={processedTransaction} />;
};
