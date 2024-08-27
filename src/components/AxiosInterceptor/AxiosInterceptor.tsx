import React, { useEffect, useState } from 'react';
import { useGetAccount } from 'lib';
import {
  handleError,
  useSetNativeAuthInterceptors,
  useSetResponseInterceptors
} from './helpers';

export const AxiosInterceptor = ({ children }: React.PropsWithChildren) => {
  const { setNativeAuthTokenInterceptors, nativeAuthToken } =
    useSetNativeAuthInterceptors();
  const { address } = useGetAccount();
  const isLoggedIn = Boolean(address);
  const [interceptorsReady, setInterceptorsReady] = useState(false);
  const { setResponseInterceptors, axiosErrorUrl } =
    useSetResponseInterceptors();

  useEffect(() => {
    handleError(axiosErrorUrl);
  }, [axiosErrorUrl]);

  const setReady = () => {
    setResponseInterceptors();
    setInterceptorsReady(true);
  };

  useEffect(() => {
    if (nativeAuthToken) {
      setNativeAuthTokenInterceptors(nativeAuthToken);
      setReady();
    }
  }, [nativeAuthToken, isLoggedIn]);

  return interceptorsReady ? <>{children}</> : null;
};
