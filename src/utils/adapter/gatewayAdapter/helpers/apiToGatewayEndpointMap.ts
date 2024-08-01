import { ACCOUNTS_ENDPOINT } from 'localConstants';

export enum GatewayEndpointsEnum {
  address = 'address'
}

export const endpointMap = {
  [ACCOUNTS_ENDPOINT]: GatewayEndpointsEnum.address
};
