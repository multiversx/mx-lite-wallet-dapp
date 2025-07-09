import { MouseEventHandler, useEffect } from 'react';
import uniq from 'lodash/uniq';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useReplyWithCancelled } from 'hooks';
import {
  useGetAccountInfo,
  ProviderTypeEnum,
  getAccountFromApi,
  getAccountProvider,
  checkIsValidSender,
  useGetNetworkConfig,
  clearCompletedTransactions
} from 'lib';
import { hookSelector } from 'redux/selectors';
import { resetHook } from 'redux/slices';
import { routeNames } from 'routes';
import { useValidateAndSignTxs } from './hooks';

/*
  The Sign page does not render any UI elements except for the error messages.
  The signing process takes place in sdk-dapp and sdk-dapp opens the necessary modals.
*/
export const Sign = () => {
  const { hookUrl } = useSelector(hookSelector);
  const provider = getAccountProvider();
  const providerType = provider.getType();
  const replyWithCancelled = useReplyWithCancelled({
    caller: 'Sign'
  });

  const { address } = useGetAccountInfo();
  const { network } = useGetNetworkConfig();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // The useValidateAndSignTxs hook is used to validate, sign, and reply with signed transactions
  // but, since we only need to show errors in this page, if any, we just use the rawTxs and txErrors objects
  const { rawTxs, txErrors } = useValidateAndSignTxs();

  const hasErrors = Object.keys(txErrors).length > 0;

  const senderAddresses = uniq(
    rawTxs.map((tx) => tx.sender).filter((sender) => sender)
  );

  const sender = senderAddresses?.[0];

  // Skip account fetching if the sender is missing or same as current account

  const validateHook = async () => {
    const hasNoTransactions = rawTxs.length === 0;
    const senderAddress = !sender || sender === address ? undefined : sender;

    if (hasNoTransactions) {
      return;
    }

    const senderAccount = await getAccountFromApi({
      address: senderAddress,
      baseURL: network.apiAddress
    });

    const redirectPathname = routeNames.dashboard;
    const invalidHook = !hookUrl || hasErrors;
    const isValidSender = checkIsValidSender(senderAccount, [address]);

    if (invalidHook) {
      console.error('Invalid hook');
    }

    if (senderAddresses.length > 1) {
      console.error('Multiple senders are not allowed');
    }

    if (!isValidSender) {
      console.error(`Sender not allowed: ${sender}`);
    }

    if (invalidHook || senderAddresses.length > 1 || !isValidSender) {
      clearCompletedTransactions();
      dispatch(resetHook());
      navigate(redirectPathname);
    }
  };

  useEffect(() => {
    if (!hookUrl) {
      navigate(routeNames.dashboard);
      return;
    }

    validateHook();
  }, [rawTxs, sender, address, network.apiAddress]);

  const handleClose: MouseEventHandler<HTMLElement> = (event) => {
    event.preventDefault();
    replyWithCancelled();
  };

  if (hasErrors) {
    // TODO: Add a modal container
    return (
      <div className='sign w-100 px-4 pb-4 d-flex align-items-center flex-column gap-4 justify-content-center'>
        <>
          {Object.entries(txErrors).map(([field, value], i) => (
            <div
              key={i}
              className='text-danger h4'
              data-testid={`${field}-error`}
            >
              {value}
            </div>
          ))}
        </>

        <button
          onClick={handleClose}
          className='btn btn-primary m-0 align-self-center w-auto px-4'
        >
          Close
        </button>
      </div>
    );
  }

  if (
    providerType === ProviderTypeEnum.extension ||
    providerType === ProviderTypeEnum.walletConnect
  ) {
    return null;
  }

  return null;
};
