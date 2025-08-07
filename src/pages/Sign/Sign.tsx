import { MouseEventHandler, useEffect } from 'react';
import {
  faCheckCircle,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
  useGetNetworkConfig
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
  const { signedTransactions, txErrors } = useValidateAndSignTxs();
  const hasErrors = Object.keys(txErrors).length > 0;

  const senderAddresses = uniq(
    signedTransactions?.map((tx) => tx.sender).filter((sender) => sender) ?? []
  );

  const sender = senderAddresses?.[0];

  // Skip account fetching if the sender is missing or same as current account

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
  }, [signedTransactions, sender, address, network.apiAddress]);

  const handleClose: MouseEventHandler<HTMLElement> = (event) => {
    event.preventDefault();
    replyWithCancelled();
  };

  if (hasErrors) {
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

  // TODO: Use child route and show dashboard bg

  if (
    providerType === ProviderTypeEnum.extension ||
    providerType === ProviderTypeEnum.walletConnect
  ) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center px-4'>
        <div className='max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center'>
          <div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6'>
            <FontAwesomeIcon
              icon={faCheckCircle}
              className='text-blue-600 text-3xl'
            />
          </div>
          <h2 className='text-2xl font-bold text-gray-900 mb-4'>
            Transaction in Progress
          </h2>
          <p className='text-gray-600 mb-6'>
            Please check your wallet extension or WalletConnect to confirm the
            transaction.
          </p>
          <div className='flex items-center justify-center space-x-2 text-blue-600'>
            <div className='w-2 h-2 bg-blue-600 rounded-full animate-bounce'></div>
            <div
              className='w-2 h-2 bg-blue-600 rounded-full animate-bounce'
              style={{ animationDelay: '0.1s' }}
            ></div>
            <div
              className='w-2 h-2 bg-blue-600 rounded-full animate-bounce'
              style={{ animationDelay: '0.2s' }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen flex items-center justify-center px-4'>
      <div className='max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center'>
        <div className='w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6'>
          <FontAwesomeIcon
            icon={faExclamationTriangle}
            className='text-yellow-600 text-3xl'
          />
        </div>
        <h2 className='text-2xl font-bold text-gray-900 mb-4'>
          Processing Transaction
        </h2>
        <p className='text-gray-600'>
          Your transaction is being processed. Please wait...
        </p>
      </div>
    </div>
  );
};
