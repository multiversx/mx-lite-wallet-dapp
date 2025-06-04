import { EnvironmentsEnum } from 'types';
import { NetworkType } from '../redux/slices';

export const sharedNetorks: NetworkType[] = [
  {
    default: false,
    id: EnvironmentsEnum.devnet,
    name: 'Devnet',
    apiAddress: 'https://devnet-api.multiversx.com',
    gatewayUrl: '',
    extrasApi: 'https://devnet-extras-api.multiversx.com',
    sampleAuthenticatedDomains: ['https://devnet-api.multiversx.com'],
    sovereignContractAddress: '',
    walletAddress: 'https://devnet-wallet.multiversx.com'
  },
  {
    default: false,
    id: EnvironmentsEnum.mainnet,
    name: 'Mainnet',
    apiAddress: 'https://api.multiversx.com',
    gatewayUrl: '',
    extrasApi: 'https://extras-api.multiversx.com',
    sampleAuthenticatedDomains: ['https://api.multiversx.com'],
    sovereignContractAddress: '',
    walletAddress: 'https://wallet.multiversx.com'
  },
  {
    default: false,
    id: EnvironmentsEnum.testnet,
    name: 'Testnet',
    apiAddress: 'https://testnet-api.multiversx.com',
    gatewayUrl: '',
    extrasApi: 'https://testnet-extras-api.multiversx.com',
    sampleAuthenticatedDomains: ['https://testnet-api.multiversx.com'],
    sovereignContractAddress: '',
    walletAddress: 'https://testnet-wallet.multiversx.com'
  },
  {
    default: false,
    id: 'sovereign',
    name: 'Sovereign',
    apiAddress: 'https://api-sovereign-test.elrond.ro',
    gatewayUrl: '',
    extrasApi: 'https://extras-api-sovereign-test.elrond.ro',
    sampleAuthenticatedDomains: ['https://api-sovereign-test.elrond.ro'],
    sovereignContractAddress: '',
    walletAddress: 'https://wallet.voyager1.dev',
    WEGLDid: 'WEGLD-bd4d79',
    faucet: true,
    hasRegisterToken: true,
    hasSovereignTransfer: true
  }
];
