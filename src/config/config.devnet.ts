import { NetworkType } from 'redux/slices';
import { EnvironmentsEnum } from 'types';
import { sharedNetorks } from './sharedNetworks';

export * from './sharedConfig';

const devnetNetwork = sharedNetorks.find(
  (network) => network.id === EnvironmentsEnum.devnet
);

if (!devnetNetwork) {
  throw new Error('Devnet network not found');
}

export const networks: NetworkType[] = [
  ...sharedNetorks.filter((network) => network.id !== EnvironmentsEnum.devnet),
  {
    ...devnetNetwork,
    default: true
  }
];
