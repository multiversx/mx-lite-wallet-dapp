import { EnvironmentsEnum } from 'lib';
import { NetworkType } from 'redux/slices';
import { sharedNetworks } from './sharedNetworks';

export * from './sharedConfig';

const devnetNetwork = sharedNetworks.find(
  (network) => network.id === EnvironmentsEnum.devnet
);

if (!devnetNetwork) {
  throw new Error('Devnet network not found');
}

export const networks: NetworkType[] = [
  ...sharedNetworks.filter((network) => network.id !== EnvironmentsEnum.devnet),
  {
    ...devnetNetwork,
    default: true
  }
];
