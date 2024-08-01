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
  // const isOtherUrl = sourcelUrl.startsWith('http'); TODO: restore this line when the API_URL will be missing

  const isGatewayRequest =
    needsGateway &&
    Object.keys(endpointMap).some((key) => config.url?.includes(key));

  if (!isGatewayRequest) {
    return config;
  }

  // API_URL is an empty string so the gateway is prepended to the URL
  config.baseURL = GATEWAY_URL;
  const configUrl = String(config.url);

  let url = configUrl.startsWith(API_URL)
    ? configUrl.replace(API_URL, '').toString()
    : configUrl.toString();

  Object.entries(endpointMap).forEach(([key, value]) => {
    const needsReplacement = Boolean(
      matchPath(apiRoutes[key as keyof typeof apiRoutes], url)
    );

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
      console.log('cancelling', key);
    }
  });

  return newConfig;
};
