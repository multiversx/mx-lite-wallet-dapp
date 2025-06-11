import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { networks } from 'config';

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

interface NetworkSliceType {
  defaultNetwork: NetworkType;
  activeNetwork: NetworkType;
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

export const getInitialState = (): NetworkSliceType => {
  const defaultNetwork =
    networks.find(({ default: active }) => Boolean(active)) ?? emptyNetwork;

  return {
    defaultNetwork,
    activeNetwork: defaultNetwork
  };
};

export const networkSlice = createSlice({
  name: 'networkSlice',
  initialState: getInitialState(),
  reducers: {
    changeNetwork: (
      state: NetworkSliceType,
      action: PayloadAction<NetworkType>
    ) => {
      state.activeNetwork = {
        ...action.payload
      };
    }
  }
});

export const { changeNetwork } = networkSlice.actions;

export const networkReducer = networkSlice.reducer;
