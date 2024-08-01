import { API_URL, GATEWAY_URL } from 'config';
import { endpointMap } from './apiToGatewayEndpointMap';

export const getGatewayUrlForCurrentRequest = (sourcelUrl: string) => {
  const needsGateway =
    sourcelUrl.startsWith(API_URL) &&
    Object.keys(endpointMap).some((key) => {
      return sourcelUrl.includes(`/${key}`);
    });
  // const isOtherUrl = sourcelUrl.startsWith('http');

  if (!needsGateway) {
    return sourcelUrl;
  }

  // API_URL is an empty string so the gateway is prepended to the URL
  let url =
    API_URL && sourcelUrl.includes(API_URL)
      ? sourcelUrl.replace(API_URL, GATEWAY_URL)
      : `${GATEWAY_URL}${sourcelUrl}`;

  Object.entries(endpointMap).forEach(([key, value]) => {
    if (url.includes(`/${key}`)) {
      url = url.replace(`/${key}`, `/${value}`);
    }
  });

  return url;
};
