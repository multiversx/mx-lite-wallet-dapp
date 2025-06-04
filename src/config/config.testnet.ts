import { NetworkType } from 'redux/slices';
import { EnvironmentsEnum } from 'types';
import { sharedNetorks } from './sharedNetworks';

export * from './sharedConfig';

const testnetNetwork = sharedNetorks.find(
  (network) => network.id === EnvironmentsEnum.testnet
);

if (!testnetNetwork) {
  throw new Error('Testnet network not found');
}

export const networks: NetworkType[] = [
  ...sharedNetorks.filter((network) => network.id !== EnvironmentsEnum.testnet),
  {
    ...testnetNetwork,
    default: true
  }
];
