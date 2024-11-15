import { NetworkType } from '../redux/slices';

export * from './sharedConfig';

export const networks: NetworkType[] = [
  {
    default: true,
    id: 'START_NETWORK_ID_STOP',
    name: 'START_NETWORK_NAME_STOP',
    apiAddress: 'START_API_ADDRESS_STOP',
    gatewayUrl: 'START_GATEWAY_URL_STOP',
    extrasApi: 'https://devnet-extras-api.multiversx.com',
    sampleAuthenticatedDomains: ['https://devnet-api.multiversx.com'],
    sovereignContractAddress: '',
    walletAddress: 'START_WALLET_ADDRESS_STOP',
    WEGLDid: 'START_WEGLD_ID_STOP'
  }
];
