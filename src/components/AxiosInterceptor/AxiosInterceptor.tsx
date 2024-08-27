import React, { useEffect } from 'react';
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
  const { setResponseInterceptors, axiosErrorUrl } =
    useSetResponseInterceptors();

  useEffect(() => {
    handleError(axiosErrorUrl);
  }, [axiosErrorUrl]);

  useEffect(() => {
    if (nativeAuthToken) {
      setNativeAuthTokenInterceptors(nativeAuthToken);
      setResponseInterceptors();
    }
  }, [nativeAuthToken, isLoggedIn]);

  return <>{children}</>;
};
