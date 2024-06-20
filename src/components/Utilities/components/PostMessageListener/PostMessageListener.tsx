import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
  Transaction,
  useGetLoginInfo
} from 'lib';
import { HooksEnum } from 'localConstants';
import { setHook } from 'redux/slices';
import { routeNames } from 'routes';
import {
  CrossWindowProviderRequestEnums,
  CrossWindowProviderResponseEnums,
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

  const messageListener = async (event: MessageEvent<RequestMessageType>) => {
    const callbackUrl = getEventOrigin(event);
    const isFromSelf = callbackUrl === window.location.origin;

    if (isFromSelf) {
      return;
    }

    const { type, payload } = event.data;

    const isHandshakeEstablished =
      type === CrossWindowProviderRequestEnums.finalizeHandshakeRequest ||
      // handshake must be established for all other requests
      handshakeEstablished;

    if (!isHandshakeEstablished) {
      console.error('Handshake could not be established.');
      return;
    }

    switch (type) {
      case CrossWindowProviderRequestEnums.loginRequest: {
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

      case CrossWindowProviderRequestEnums.signTransactionsRequest: {
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

      case CrossWindowProviderRequestEnums.signMessageRequest: {
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

      case CrossWindowProviderRequestEnums.finalizeHandshakeRequest: {
        handshakeEstablished = true;
        break;
      }

      case CrossWindowProviderRequestEnums.logoutRequest: {
        navigate(routeNames.logout);
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

  return null;
};
