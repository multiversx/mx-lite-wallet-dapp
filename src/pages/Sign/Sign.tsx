import { MouseEventHandler, useEffect } from 'react';
import uniq from 'lodash/uniq';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useReplyWithCancelled } from 'hooks';
import { useAbortAndRemoveAllTxs } from 'hooks/useAbortAndRemoveAllTx';
import {
  useGetAccount,
  useGetAccountFromApi,
  useGetLoginInfo,
  checkIsValidSender
} from 'lib';
import { hookSelector } from 'redux/selectors';
import { resetHook } from 'redux/slices';
import { routeNames } from 'routes';
import { LoginMethodsEnum } from 'types';
import { useValidateAndSignTxs } from './hooks';

/*
  The Sign page does not render any UI elements except for the error messages.
  The signing process takes place in sdk-dapp and sdk-dapp opens the necessary modals.
*/
export const Sign = () => {
  const { hookUrl } = useSelector(hookSelector);
  const { loginMethod } = useGetLoginInfo();
  const replyWithCancelled = useReplyWithCancelled({
    caller: 'Sign'
  });

  const { address } = useGetAccount();
  const removeAllTransactions = useAbortAndRemoveAllTxs();
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
  const { data: senderAccount } = useGetAccountFromApi(
    !sender || sender === address ? null : sender
  );

  const validateHook = async () => {
    const hasNoTransactions = rawTxs.length === 0;

    if (hasNoTransactions) {
      return;
    }

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
      removeAllTransactions();
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
  }, [rawTxs, senderAccount]);

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

  const noSpinner = [
    LoginMethodsEnum.extension,
    LoginMethodsEnum.walletconnectv2
  ].includes(loginMethod);

  if (noSpinner) {
    return null;
  }

  return null;
};
