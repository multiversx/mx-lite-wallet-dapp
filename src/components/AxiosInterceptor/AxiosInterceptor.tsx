import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useGetAccount } from 'lib';
import { networkSelector } from 'redux/selectors';
import {
  handleError,
  parseJwt,
  useAuthToken,
  useSetNativeAuthInterceptors,
  useSetResponseInterceptors
} from './helpers';

export const AxiosInterceptor = ({ children }: React.PropsWithChildren) => {
  const { setNativeAuthTokenInterceptors, nativeAuthToken } =
    useSetNativeAuthInterceptors();
  const { address } = useGetAccount();
  const isLoggedIn = Boolean(address);
  const { token, fetchToken } = useAuthToken();
  const {
    activeNetwork: { accessToken: hasAccessToken }
  } = useSelector(networkSelector);
  const [interceptorsReady, setInterceptorsReady] = useState(false);
  const { setResponseInterceptors, responseId, axiosErrorUrl } =
    useSetResponseInterceptors();
  const timeoutRef = useRef<any>();

  useEffect(() => {
    handleError(axiosErrorUrl);
  }, [axiosErrorUrl]);

  const setReady = () => {
    setResponseInterceptors();
    setInterceptorsReady(true);
  };

  const configureAxios = async () => {
    if (!hasAccessToken) {
      return setReady();
    }

    if (!token) {
      const newToken = await fetchToken();
      setNativeAuthTokenInterceptors(newToken);
      return setReady();
    }

    const { exp: tokenTimestamp } = parseJwt(token);
    const hasTimestamp = tokenTimestamp !== undefined;

    if (!hasTimestamp) {
      const newToken = await fetchToken();
      setNativeAuthTokenInterceptors(newToken);
      return setReady();
    }

    const now = Math.floor(Date.now() / 1000);
    const fetchNextTokenSec = tokenTimestamp - now - 60;

    if (fetchNextTokenSec > 0 && !interceptorsReady) {
      setNativeAuthTokenInterceptors(token);
      return setReady();
    }

    timeoutRef.current = setTimeout(async () => {
      axios.interceptors.request.eject(responseId);
      const newToken = await fetchToken();
      setNativeAuthTokenInterceptors(newToken);
    }, fetchNextTokenSec * 1000);

    return () => {
      clearTimeout(timeoutRef.current);
    };
  };

  useEffect(() => {
    configureAxios();
  }, [token]);

  useEffect(() => {
    const accessToken = token || nativeAuthToken;
    setNativeAuthTokenInterceptors(accessToken);
  }, [nativeAuthToken, token, isLoggedIn]);

  return interceptorsReady ? <>{children}</> : null;
};
