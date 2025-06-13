import { NetworkType } from 'redux/slices';
import { sharedNetworks } from './sharedNetworks';

export * from './sharedConfig';

const sovereignNetwork = sharedNetworks.find(
  (network) => network.id === 'sovereign'
);

if (!sovereignNetwork) {
  throw new Error('Sovereign network not found');
}

export const networks: NetworkType[] = [
  ...sharedNetworks.filter((network) => network.id !== 'sovereign'),
  {
    ...sovereignNetwork,
    default: true
  }
];
