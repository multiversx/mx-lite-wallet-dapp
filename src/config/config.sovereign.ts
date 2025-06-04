import { NetworkType } from 'redux/slices';
import { sharedNetorks } from './sharedNetworks';

export * from './sharedConfig';

const sovereignNetwork = sharedNetorks.find(
  (network) => network.id === 'sovereign'
);

if (!sovereignNetwork) {
  throw new Error('Sovereign network not found');
}

export const networks: NetworkType[] = [
  ...sharedNetorks.filter((network) => network.id !== 'sovereign'),
  {
    ...sovereignNetwork,
    default: true
  }
];
