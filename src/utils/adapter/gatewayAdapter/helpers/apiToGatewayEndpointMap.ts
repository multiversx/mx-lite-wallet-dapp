import { ACCOUNTS_ENDPOINT, NETWORK_CONFIG_ENDPOINT } from 'localConstants';

export const gatewayEndpoints = {
  address: 'address',
  [NETWORK_CONFIG_ENDPOINT]: NETWORK_CONFIG_ENDPOINT
};

export const endpointMap = {
  [ACCOUNTS_ENDPOINT]: gatewayEndpoints.address,
  [NETWORK_CONFIG_ENDPOINT]: gatewayEndpoints[NETWORK_CONFIG_ENDPOINT]
};
