import { NetworkType } from '../redux/slices';

export * from './sharedConfig';

export const networks: NetworkType[] = [
  {
    default: true,
    id: 'START_NETWORK_ID_STOP',
    name: 'START_NETWORK_NAME_STOP',
    apiAddress: 'START_API_ADDRESS_STOP',
    gatewayUrl: 'START_GATEWAY_URL_STOP',
    extrasApi: 'START_EXTRAS_API_URL_STOP',
    sampleAuthenticatedDomains: ['START_SAMPLE_AUTHENTICATED_DOMAINS_STOP'],
    sovereignContractAddress: 'START_SOVEREIGN_CONTRACT_ADDR_STOP',
    walletAddress: 'START_WALLET_ADDRESS_STOP',
    WEGLDid: 'START_WEGLD_ID_STOP'
  },
  {
    default: false,
    id: 'START2_NETWORK_ID_STOP2',
    name: 'START2_NETWORK_NAME_STOP2',
    apiAddress: 'START2_API_ADDRESS_STOP2',
    gatewayUrl: 'START2_GATEWAY_URL_STOP2',
    extrasApi: 'START2_EXTRAS_API_URL_STOP2',
    sampleAuthenticatedDomains: ['START2_SAMPLE_AUTHENTICATED_DOMAINS_STOP2'],
    sovereignContractAddress: 'START2_SOVEREIGN_CONTRACT_ADDR_STOP2',
    walletAddress: 'START2_WALLET_ADDRESS_STOP2',
    WEGLDid: 'START2_WEGLD_ID_STOP2'
  }
];
