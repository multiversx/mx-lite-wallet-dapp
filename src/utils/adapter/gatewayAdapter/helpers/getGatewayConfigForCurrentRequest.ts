import axios, { InternalAxiosRequestConfig } from 'axios';
import { API_URL, GATEWAY_URL } from 'config';
import { matchPath } from 'types/sdkDapp.types';
import { apiRoutes, endpointMap } from './apiToGatewayEndpointMap';

export const getGatewayConfigForCurrentRequest = (
  config: InternalAxiosRequestConfig<any>
): InternalAxiosRequestConfig<any> => {
  const newConfig = config;

  const needsGateway =
    config.baseURL?.startsWith(API_URL) || config.url?.startsWith(API_URL);

  const isGatewayRequest =
    needsGateway &&
    Object.keys(endpointMap).some((key) => config.url?.includes(key));

  if (!isGatewayRequest) {
    return config;
  }

  config.baseURL = GATEWAY_URL;
  const configUrl = String(config.url);

  let url = configUrl.startsWith(API_URL)
    ? configUrl.replace(API_URL, '')
    : configUrl;

  Object.entries(endpointMap).forEach(([key, value]) => {
    const matchesPath = matchPath(
      apiRoutes[key as keyof typeof apiRoutes],
      url
    );

    const needsReplacement = Boolean(matchesPath);

    if (!needsReplacement) {
      return;
    }

    url = url.replace(`/${key}`, `/${value}`);

    newConfig.url = url;

    if (value === null) {
      const source = axios.CancelToken.source();
      newConfig.cancelToken = source.token;
      // Cancel the request
      source.cancel(
        `Request canceled: ${key} cannot be fetched from the gateway`
      );
    }
  });

  return newConfig;
};
