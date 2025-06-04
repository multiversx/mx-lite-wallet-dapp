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
    default: true,
    apiAddress: 'https://api-sovereign-test.elrond.ro',
    gatewayUrl: '',
    extrasApi: 'https://extras-api-sovereign-test.elrond.ro',
    sampleAuthenticatedDomains: ['https://api-sovereign-test.elrond.ro'],
    sovereignContractAddress: '',
    walletAddress: 'https://wallet-sovereign-test.elrond.ro',
    WEGLDid: 'SOV-ba2b0e',
    hrp: 'sov',
    faucet: false,
    hasRegisterToken: false,
    hasSovereignTransfer: false
  }
];
