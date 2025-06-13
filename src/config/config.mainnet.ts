import { NetworkType } from 'redux/slices';
import { EnvironmentsEnum } from 'types';
import { sharedNetworks } from './sharedNetworks';

export * from './sharedConfig';

const mainnetNetwork = sharedNetworks.find(
  (network) => network.id === EnvironmentsEnum.mainnet
);

if (!mainnetNetwork) {
  throw new Error('Mainnet network not found');
}

export const networks: NetworkType[] = [
  ...sharedNetworks.filter(
    (network) => network.id !== EnvironmentsEnum.mainnet
  ),
  {
    ...mainnetNetwork,
    default: true
  }
];
