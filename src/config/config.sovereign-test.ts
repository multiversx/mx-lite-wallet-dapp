import { LibraryConfig } from '@multiversx/sdk-core/out';
import { NetworkType } from 'redux/slices';
import { sharedNetworks } from './sharedNetworks';

LibraryConfig.DefaultAddressHrp = 'vibe';

export * from './sharedConfig';

// This config is used for puppeteer tests

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
    default: true,
    walletAddress: 'https://vibeox-wallet.multiversx.com',
    id: 'vibechain',
    name: 'VibeChain',
    apiAddress: 'https://vibeox-api.multiversx.com',
    extrasApi: 'https://vibeox-extras-api.multiversx.com',
    hrp: 'vibe',
    faucet: true,
    hasRegisterToken: true,
    hasSovereignTransfer: true
  }
];
