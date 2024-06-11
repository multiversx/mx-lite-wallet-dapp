import React, { useEffect } from 'react';
import { Transaction } from '@multiversx/sdk-core';
import { useDispatch } from 'react-redux';
import { useReplyToDapp } from 'helpers/misc/useReplyToDapp/useReplyToDapp';
import { plainTransactionsToSearchString } from 'helpers/operations/plainTransactionsToSearchString';
import {
  removeAllSignedTransactions,
  removeAllTransactionsToSign
} from 'helpers/sdkDapp/sdkDapp.services';
import {
  getLoginHookData,
  getSignHookData,
  getSignMessageHookData
} from 'helpers/sdkDapp/sdkJsWebWalletIo';
import { getWebviewApp } from 'helpers/webview/getWebviewApp';
import { getWebviewAppConfig } from 'helpers/webview/getWebviewAppConfig';
import { useLogout, useNavigate, useReplyWithCancelled } from 'hooks';
import { dashboardNextRouteBuilder } from 'modules/Dashboard/routes';
import { setAppLoaded } from 'modules/Hub/redux/slices';
import { hubRouteBuilder } from 'modules/Hub/routes';
import { usePartialLogin, useSignTxSchema } from 'pages/Hook/helpers';
import { getLoginSessionKey } from 'pages/Unlock/Keystore/helpers/useKeystoreManager/methods';

import { setHook, setKeystoreSessionKey } from 'redux/slices';
import {
  hookBackgroundRoutes,
  hookRouteNames,
  HooksEnum,
  routeNames
} from 'routes';
import {
  CrossWindowProviderRequestEnums,
  CrossWindowProviderResponseEnums,
  RequestMessageType
} from 'types';

import { IdleModal } from './components';
import {
  buildTransactionsQueryString,
  buildWalletQueryString,
  getEventOrigin,
  getIsReload
} from './helpers';

let isListenerAdded = false;
let isHandShakeSent = false;
let handshakeEstablished = false;
const isReload = getIsReload();

export const PostMessageListener = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate({ from: 'PostMessageListener' });
  const replyWithCancelled = useReplyWithCancelled({
    caller: 'PostMessageListener'
  });
  const replyToDapp = useReplyToDapp();
  const logout = useLogout('PostMessageListener');
  const { partialLogin, getKeystoreDataBySessionKey } = usePartialLogin();

  const schema = useSignTxSchema();
  const getData = getSignHookData(schema);

  const messageListener = async (event: MessageEvent<RequestMessageType>) => {
    const callbackUrl = getEventOrigin(event);
    const isFromSelf = callbackUrl === window.location.origin;

    const currentHubAppConfig = getWebviewAppConfig();
    const isFromWebview = Boolean(getWebviewApp());

    if (isFromSelf && !isFromWebview) {
      return;
    }

    const { type, payload } = event.data;

    const localKeystoreSessionKey = getLoginSessionKey(callbackUrl);
    const keystoreData = getKeystoreDataBySessionKey(localKeystoreSessionKey);
    const isRelogin = Boolean(keystoreData);
    const isHandshakeEstablished =
      type === CrossWindowProviderRequestEnums.finalizeHandshakeRequest ||
      // handshake must be established for all other requests
      handshakeEstablished;

    if (!isHandshakeEstablished && !isFromWebview) {
      console.error('Handshake could not be established.');
      return;
    }

    switch (type) {
      case CrossWindowProviderRequestEnums.loginRequest: {
        if (isFromWebview) {
          break;
        }

        if (isRelogin) {
          logout({
            skipCloseWindowOnRelogin: true
          });
        }

        const params: Record<string, string> = { callbackUrl };

        if (payload?.token) {
          params.token = payload.token;
        }

        const payloadString = buildWalletQueryString({ params });

        const data = getLoginHookData(`?${payloadString}`);

        if (data == null) {
          return;
        }

        dispatch(
          setHook({
            type: HooksEnum.login,
            hookUrl: data.hookUrl,
            loginToken: data.token,
            callbackUrl
          })
        );

        navigate(routeNames.unlock);
        break;
      }

      case CrossWindowProviderRequestEnums.signMessageRequest: {
        const payloadString = buildWalletQueryString({
          params: { ...payload, callbackUrl }
        });

        let serializedPayload = `?${payloadString}`;

        if (isFromWebview) {
          serializedPayload = `?message=${Buffer.from(
            payload?.message
          ).toString()}`;
          serializedPayload += `&callbackUrl=${window.origin}${routeNames.hub}`;
        }

        const data = getSignMessageHookData(serializedPayload);

        if (data == null) {
          return;
        }

        dispatch(
          setHook({
            type: HooksEnum.signMessage,
            hookUrl: data.hookUrl,
            callbackUrl
          })
        );

        if (isFromWebview) {
          return navigate(routeNames['sign-message']);
        }

        await partialLogin({
          callback: () => {
            navigate(dashboardNextRouteBuilder(routeNames['sign-message']));
          },
          localKeystoreSessionKey
        });
        break;
      }

      case CrossWindowProviderRequestEnums.signTransactionsRequest:
      case CrossWindowProviderRequestEnums.guardTransactionsRequest: {
        const transactions = payload.map((plainTransactionObject) =>
          Transaction.fromPlainObject(plainTransactionObject)
        );

        const payloadQueryString = buildTransactionsQueryString({
          transactions,
          callbackUrl
        });

        let serializedPayload = `?${payloadQueryString}`;

        if (isFromWebview && Array.isArray(payload)) {
          serializedPayload = plainTransactionsToSearchString(payload);
          serializedPayload += `&callbackUrl=${window.origin}${routeNames.hub}`;
        }

        const data = getData(serializedPayload);

        if (data == null) {
          return;
        }

        const isGuardHook =
          type === CrossWindowProviderRequestEnums.guardTransactionsRequest;
        const hookType = isGuardHook ? HooksEnum.twoFa : HooksEnum.sign;

        dispatch(
          setHook({
            type: hookType,
            hookUrl: data.hookUrl,
            callbackUrl: isFromWebview
              ? `${window.origin}${routeNames.hub}`
              : callbackUrl
          })
        );

        const hookRoute = isGuardHook
          ? hookBackgroundRoutes['2FaHook'].path
          : hookRouteNames.signHook;

        if (isFromWebview) {
          return navigate(routeNames.sign);
        }

        if (isGuardHook) {
          return navigate(hookRoute);
        }

        await partialLogin({
          callback: () => {
            navigate(dashboardNextRouteBuilder(routeNames.sign));
          },
          localKeystoreSessionKey
        });
        break;
      }

      case CrossWindowProviderRequestEnums.cancelAction:
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      case 'cancelAction': // TODO should be removed when the extension will use the same API
        if (isFromWebview) {
          removeAllTransactionsToSign();
          removeAllSignedTransactions();

          if (!currentHubAppConfig?.id) {
            break;
          }

          return navigate(
            hubRouteBuilder.hubApplication(currentHubAppConfig.id)
          );
        }

        replyWithCancelled();
        break;

      case CrossWindowProviderRequestEnums.finalizeHandshakeRequest: {
        handshakeEstablished = true;

        if (isFromWebview) {
          dispatch(setAppLoaded(true));
          break;
        }

        const keystoreSessionKey = getLoginSessionKey(callbackUrl);
        dispatch(setKeystoreSessionKey(keystoreSessionKey));
        break;
      }

      case CrossWindowProviderRequestEnums.logoutRequest: {
        const isHubRouteLoaded = window.location.pathname === routeNames.hub;
        if (isHubRouteLoaded) {
          return;
        }

        if (isFromWebview) {
          return navigate(routeNames.hub);
        }

        navigate(routeNames.logout, {
          state: { caller: 'PostMessageListener' }
        });
        break;
      }

      case CrossWindowProviderRequestEnums.finalizeResetStateRequest:
        if (isFromWebview) {
          return navigate(routeNames.hub);
        }
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    if (isListenerAdded) {
      return;
    }

    window.addEventListener('message', messageListener);
    isListenerAdded = true;
  }, []);

  const closeHandshake = () => {
    replyWithCancelled({ shouldResetHook: false });
    replyToDapp({
      type: CrossWindowProviderResponseEnums.handshakeResponse,
      payload: {
        data: false
      }
    });
  };

  useEffect(() => {
    if (!window.opener) {
      return;
    }

    if (isReload) {
      closeHandshake();
    }

    if (isHandShakeSent) {
      return;
    }

    window.addEventListener('beforeunload', closeHandshake);

    replyToDapp({
      type: CrossWindowProviderResponseEnums.handshakeResponse,
      payload: {
        data: true
      }
    });

    isHandShakeSent = true;
  }, []);

  return <IdleModal />;
};
