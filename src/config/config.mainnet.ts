import { NetworkType } from 'redux/slices';
import { EnvironmentsEnum } from 'types';
import { sharedNetorks } from './sharedNetworks';

export * from './sharedConfig';

const mainnetNetwork = sharedNetorks.find(
  (network) => network.id === EnvironmentsEnum.mainnet
);

if (!mainnetNetwork) {
  throw new Error('Mainnet network not found');
}

export const networks: NetworkType[] = [
  ...sharedNetorks.filter((network) => network.id !== EnvironmentsEnum.mainnet),
  {
    ...mainnetNetwork,
    default: true
  }
];
