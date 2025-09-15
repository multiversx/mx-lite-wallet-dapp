import { EnvironmentsEnum } from 'lib';
import { NetworkType } from 'redux/slices';
import { sharedNetworks } from './sharedNetworks';

export * from './sharedConfig';

const mainnetNetwork = sharedNetworks.find(
  (network) => network.id === EnvironmentsEnum.mainnet
);

if (!mainnetNetwork) {
  throw new Error('Mainnet network not found');
}

export const ID_API_URL = 'https://id-api.multiversx.com';
export const USERS_API_URL = '/users/api/v1/users/';

export const networks: NetworkType[] = [
  ...sharedNetworks.filter(
    (network) => network.id !== EnvironmentsEnum.mainnet
  ),
  {
    ...mainnetNetwork,
    default: true
  }
];
