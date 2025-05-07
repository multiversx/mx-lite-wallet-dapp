import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getIsInWebview } from 'helpers/app';
import {
  useLogout,
  useReplyToDapp,
  useReplyWithCancelled,
  useSignTxSchema
} from 'hooks';
import {
  getLoginHookData,
  getSignHookData,
  getSignMessageHookData,
  removeAllTransactionsToSign,
  removeAllSignedTransactions,
  Transaction,
  useGetLoginInfo
} from 'lib';
import { HooksEnum } from 'localConstants';
import { setHook } from 'redux/slices';
import { routeNames } from 'routes';
import {
  WindowProviderRequestEnums,
  WindowProviderResponseEnums,
  RequestMessageType
} from 'types';
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
  const navigate = useNavigate();
  const replyWithCancelled = useReplyWithCancelled({
    caller: 'PostMessageListener'
  });
  const { isLoggedIn, tokenLogin } = useGetLoginInfo();
  const replyToDapp = useReplyToDapp();
  const logout = useLogout();
  const schema = useSignTxSchema();
  const getData = getSignHookData(schema);
  const nativeAuthToken = tokenLogin?.nativeAuthToken;
  const isRelogin = isLoggedIn && !nativeAuthToken;
  const isInWebview = getIsInWebview();

  const messageListener = async (event: MessageEvent<RequestMessageType>) => {
    const callbackUrl = getEventOrigin(event);
    const isFromSelf = callbackUrl === window.location.origin;

    if (isFromSelf && !isInWebview) {
      return;
    }

    const { type, payload } = event.data;

    const isHandshakeEstablished =
      type === WindowProviderRequestEnums.finalizeHandshakeRequest ||
      // handshake must be established for all other requests
      handshakeEstablished;

    if (!isHandshakeEstablished && !isInWebview) {
      console.error('Handshake could not be established.');
      return;
    }

    switch (type) {
      case WindowProviderRequestEnums.loginRequest: {
        if (isRelogin) {
          logout();
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

      case WindowProviderRequestEnums.signTransactionsRequest: {
        const transactions = payload.map((plainTransactionObject) =>
          Transaction.fromPlainObject(plainTransactionObject)
        );

        const payloadQueryString = buildTransactionsQueryString({
          transactions,
          callbackUrl
        });

        const serializedPayload = `?${payloadQueryString}`;
        const data = getData(serializedPayload);

        if (data == null) {
          return;
        }

        const hookType = HooksEnum.sign;

        dispatch(
          setHook({
            type: hookType,
            hookUrl: data.hookUrl,
            callbackUrl
          })
        );

        navigate(routeNames.sign);
        break;
      }

      case WindowProviderRequestEnums.signMessageRequest: {
        const payloadString = buildWalletQueryString({
          params: { ...payload, callbackUrl }
        });

        const serializedPayload = `?${payloadString}`;

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

        navigate(routeNames.signMessage);
        break;
      }

      case WindowProviderRequestEnums.finalizeHandshakeRequest: {
        handshakeEstablished = true;
        break;
      }

      case WindowProviderRequestEnums.logoutRequest: {
        navigate(routeNames.logout);
        break;
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // Use case
      // A dApp (ex: xAlias) implements hub and becomes a parent of an iframe
      // Web-wallet is loaded in the iframe as a child
      // Web-wallet needs to listen to post message response from parent dApp when eg. signing a message
      case WindowProviderResponseEnums.cancelResponse:
      case WindowProviderRequestEnums.cancelAction: {
        if (isInWebview) {
          removeAllTransactionsToSign();
          removeAllSignedTransactions();

          return;
        }

        replyWithCancelled({ shouldResetHook: false });

        break;
      }

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
      type: WindowProviderResponseEnums.handshakeResponse,
      payload: {
        data: ''
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
      type: WindowProviderResponseEnums.handshakeResponse,
      payload: {
        data: 'true'
      }
    });

    isHandShakeSent = true;
  }, []);

  return null;
};
