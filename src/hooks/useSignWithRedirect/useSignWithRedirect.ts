import { useEffect } from 'react';
import uniq from 'lodash/uniq';
import { useDispatch, useSelector } from 'react-redux';
import {
  useGetAccountInfo,
  useGetNetworkConfig,
  checkIsValidSender,
  getAccountFromApi
} from 'lib/sdkDapp';
import { hookSelector } from 'redux/selectors/hook';
import { resetHook } from 'redux/slices/hook';
import { useValidateAndSignTxs } from './hooks/useValidateAndSignTxs';
import { useReplyWithCancelled } from '../useReplyWithCancelled/useReplyWithCancelled';

export const useSignWithRedirect = () => {
  const { hookUrl } = useSelector(hookSelector);
  const replyWithCancelled = useReplyWithCancelled({
    caller: 'useSignWithRedirect'
  });

  const { address } = useGetAccountInfo();
  const { network } = useGetNetworkConfig();
  const dispatch = useDispatch();

  const { signedTransactions, txErrors } = useValidateAndSignTxs();
  const hasErrors = Object.keys(txErrors).length > 0;

  const senderAddresses = uniq(
    signedTransactions?.map((tx) => tx.sender).filter((sender) => sender) ?? []
  );

  const sender = senderAddresses?.[0];

  const validateHook = async () => {
    const hasNoTransactions = signedTransactions?.length === 0;
    const senderAddress =
      !sender || sender.toBech32() === address ? undefined : sender.toBech32();

    if (hasNoTransactions) {
      return;
    }

    const senderAccount = await getAccountFromApi({
      address: senderAddress,
      baseURL: network.apiAddress
    });

    const invalidHook = !hookUrl || hasErrors;
    const isValidSender = checkIsValidSender(senderAccount, [address]);

    if (invalidHook) {
      console.error('Invalid hook');
    }

    const hasMultipleSenders = senderAddresses.length > 1;

    if (hasMultipleSenders) {
      console.error('Multiple senders are not allowed');
    }

    if (!isValidSender) {
      console.error(`Sender not allowed: ${sender}`);
    }

    if (invalidHook || hasMultipleSenders || !isValidSender) {
      dispatch(resetHook());
    }
  };

  useEffect(() => {
    if (!hookUrl) {
      return;
    }

    validateHook();
  }, [signedTransactions, sender, address, network.apiAddress]);

  useEffect(() => {
    if (hasErrors) {
      replyWithCancelled();
    }
  }, [hasErrors]);
};
