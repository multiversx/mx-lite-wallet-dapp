import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetAccountInfo } from 'lib/sdkDapp/sdkDapp.hooks';
import { RouteNamesEnum } from 'localConstants/routes/routeNames.enums';
import { useReplyWithSignedTransactions } from './useReplyWithSignedTransactions';
import {
  ValidateAndSignTxsReturnType,
  useSignHookTransactions
} from './useSignHookTransactions';
import { useReplyWithCancelled } from '../../useReplyWithCancelled/useReplyWithCancelled';
import { mapSignedTransactions } from '../helpers/mapSignedTransactions';
import { hookSelector } from '../redux/selectors/hook';
import { resetHook } from '../redux/slices/hook';

/*
  This is a hook that validates and signs transactions as a two-step process
*/
export const useValidateAndSignTxs = (): ValidateAndSignTxsReturnType => {
  const { hookUrl, callbackUrl } = useSelector(hookSelector);
  const replyWithSignedTransactions = useReplyWithSignedTransactions();
  const navigate = useNavigate();

  const replyWithCancelled = useReplyWithCancelled({
    caller: 'useSignTransactions'
  });

  const dispatch = useDispatch();

  const { address, ledgerAccount } = useGetAccountInfo();
  const [state, setState] = useState<ValidateAndSignTxsReturnType>({
    signedTransactions: null,
    txErrors: {},
    sessionId: null
  });

  const signHookTransactions = useSignHookTransactions();

  const validateAndSign = async () => {
    const { signedTransactions } = await signHookTransactions(hookUrl);

    if (!signedTransactions || signedTransactions.length === 0) {
      replyWithCancelled();
      return;
    }

    setState({ ...state, signedTransactions });
    const transactions = mapSignedTransactions({
      signedTransactions,
      address,
      isLedgerWithHashSign: Boolean(ledgerAccount?.version)
    });

    const isValidHook = Boolean(callbackUrl);

    if (isValidHook) {
      try {
        const callbackUrlObj = new URL(callbackUrl);
        const isSameOrigin = callbackUrlObj.origin === window.origin;
        const redirectPath = `${callbackUrlObj.pathname}${callbackUrlObj.search}`;

        dispatch(resetHook());

        if (isSameOrigin) {
          navigate(redirectPath);

          return;
        }

        replyWithSignedTransactions(transactions);
        return;
      } catch (err) {
        console.error('Invalid callbackUrl', err);
      }
    }

    dispatch(resetHook());
    navigate(RouteNamesEnum.dashboard);
  };

  useEffect(() => {
    if (hookUrl) {
      validateAndSign();
    }
  }, [hookUrl]);

  return state;
};
