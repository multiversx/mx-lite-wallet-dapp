export interface NetworkType {
  WEGLDid?: string;
  apiAddress: string;
  default: boolean;
  extrasApi: string;
  faucet?: boolean;
  hasRegisterToken?: boolean;
  hasSovereignTransfer?: boolean;
  gatewayUrl: string;
  id: string;
  name: string;
  sampleAuthenticatedDomains: string[];
  sovereignContractAddress: string;
  walletAddress: string;
  hrp?: string;
}

export const emptyNetwork: NetworkType = {
  apiAddress: '',
  default: false,
  extrasApi: '',
  gatewayUrl: '',
  id: 'not-configured',
  name: 'NOT CONFIGURED',
  sampleAuthenticatedDomains: [],
  sovereignContractAddress: '',
  walletAddress: '',
  WEGLDid: ''
};
