import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetAccount } from 'lib';
import { networkSelector } from 'redux/selectors';
import {
  handleError,
  useSetNativeAuthInterceptors,
  useSetResponseInterceptors
} from './helpers';

export const AxiosInterceptor = ({ children }: React.PropsWithChildren) => {
  const { accessToken: hasAccessToken } = useSelector(networkSelector);
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
