import { EnvironmentsEnum } from 'lib/sdkDapp';
import { NetworkType } from 'types/network';
import { sharedNetworks } from './sharedNetworks';

export * from './sharedConfig';

export const networks: NetworkType[] = [
  ...sharedNetworks,
  {
    default: true,
    id: EnvironmentsEnum.devnet,
    name: 'Gateway',
    apiAddress: '',
    gatewayUrl: 'https://devnet-gateway.multiversx.com',
    extrasApi: 'https://devnet-extras-api.multiversx.com',
    sampleAuthenticatedDomains: [''],
    sovereignContractAddress: '',
    walletAddress: 'https://devnet-wallet.multiversx.com',
    WEGLDid: ''
  }
];
