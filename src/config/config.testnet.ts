import { EnvironmentsEnum } from 'lib';
import { NetworkType } from 'redux/slices';
import { sharedNetworks } from './sharedNetworks';

export * from './sharedConfig';

const testnetNetwork = sharedNetworks.find(
  (network) => network.id === EnvironmentsEnum.testnet
);

if (!testnetNetwork) {
  throw new Error('Testnet network not found');
}

export const networks: NetworkType[] = [
  ...sharedNetworks.filter(
    (network) => network.id !== EnvironmentsEnum.testnet
  ),
  {
    ...testnetNetwork,
    default: true
  }
];
