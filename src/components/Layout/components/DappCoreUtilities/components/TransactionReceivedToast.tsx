import { useEffect, useState } from 'react';
import { faArrowDownFromLine } from '@fortawesome/pro-solid-svg-icons';
import { useSelector } from 'react-redux';
import { addNewCustomToast } from 'helpers';
import { useGetAccountInfo } from 'hooks';
import { CUSTOM_TOAST_DEFAULT_DURATION } from 'localConstants';
import { transactionsEndpoints } from 'modules/Transactions/redux/endpoints';
import { ServerTransactionType } from 'types';

export const TransactionReceivedToast = () => {
  const { websocketEvent, account } = useGetAccountInfo();
  const [nonce, setNonce] = useState(account.nonce);
  const [lastTxHash, setLastTxHash] = useState('');
  const [displayedHashes, setDisplayedHashes] = useState<string[]>([]);

  const selectPost = transactionsEndpoints.endpoints.getTransactions.select({
    page: 1,
    search: ''
  });
  const { data: existingTransactions } = useSelector(selectPost);

  const [getTransactions] = transactionsEndpoints.useLazyGetTransactionsQuery();

  const getLatestTransaction = async () => {
    const { data: transactions } = await getTransactions({
      transactionSize: 1
    });

    const transaction = transactions?.[0];

    if (!transaction || displayedHashes.includes(transaction.txHash)) {
      return;
    }

    const isExisting =
      existingTransactions?.some(
        ({ txHash }) => transaction.txHash === txHash
      ) || lastTxHash === transaction.txHash;
    const senderIsCurrentAddress = transaction.sender === account.address;
    const receiverIsCurrentAddress = transaction.receiver === account.address;

    if (!senderIsCurrentAddress && receiverIsCurrentAddress && !isExisting) {
      setDisplayedHashes((existing) => [...existing, transaction.txHash]);
      addNewCustomToast({
        toastId: transaction.txHash,
        transaction: transaction as ServerTransactionType,
        duration: CUSTOM_TOAST_DEFAULT_DURATION,
        type: 'custom',
        title: 'Transaction received',
        icon: faArrowDownFromLine,
        iconClassName: 'bg-success-500'
      });
    }

    if (lastTxHash !== transaction.txHash) {
      setLastTxHash(transaction.txHash);
    }
  };

  useEffect(() => {
    const showToast =
      websocketEvent?.message === 'transactionCompleted' &&
      nonce === account.nonce;

    if (showToast) {
      getLatestTransaction();
    }

    if (nonce !== account.nonce) {
      setNonce(account.nonce);
    }
  }, [account, nonce, lastTxHash, websocketEvent, displayedHashes]);

  return null;
};
