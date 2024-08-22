import axios, { InternalAxiosRequestConfig } from 'axios';
import { getCurrentNetwork } from 'helpers';
import { matchPath } from 'types/sdkDapp.types';
import { apiRoutes, endpointMap } from './apiToGatewayEndpointMap';

export const getGatewayConfigForCurrentRequest = (
  config: InternalAxiosRequestConfig<any>
): InternalAxiosRequestConfig<any> => {
  const newConfig = config;
  const { apiAddress, gatewayUrl } = getCurrentNetwork();

  const needsGateway =
    config.baseURL?.startsWith(apiAddress) ||
    config.url?.startsWith(apiAddress);

  const isGatewayRequest =
    needsGateway &&
    Object.keys(endpointMap).some((key) => config.url?.includes(key));

  if (!isGatewayRequest) {
    return config;
  }

  config.baseURL = gatewayUrl;
  const configUrl = String(config.url);

  let url = configUrl.startsWith(apiAddress)
    ? configUrl.replace(apiAddress, '')
    : configUrl;

  if (
    newConfig.method?.toLowerCase() === 'post' &&
    newConfig.url?.endsWith('transactions')
  ) {
    newConfig.url = '/transaction/send';
    return newConfig;
  }

  Object.entries(endpointMap).forEach(([key, value]) => {
    const matchesPath = matchPath(
      apiRoutes[key as keyof typeof apiRoutes],
      url
    );

    const needsReplacement = Boolean(matchesPath);

    if (!needsReplacement) {
      return;
    }

    if (key.includes('transactions') && url.includes('transactions')) {
      const hash = config.params?.hashes;
      url = `/transaction/${hash}`;
    } else {
      url = url.replace(`/${key}`, `/${value}`);
    }

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
