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
  {
    ...sovereignNetwork,
    default: true
  },
  ...sharedNetorks
];
