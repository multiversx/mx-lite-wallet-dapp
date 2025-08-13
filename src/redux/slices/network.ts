import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { networks } from 'config';

export interface NetworkType {
  WEGLDid?: string;
  apiAddress: string;
  default: boolean;
  extrasApi: string;
  explorerAddress: string;
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
  previousNetwork?: NetworkType;
  isNetworkSwitching: boolean;
}

export const emptyNetwork: NetworkType = {
  apiAddress: '',
  default: false,
  extrasApi: '',
  gatewayUrl: '',
  id: 'not-configured',
  name: 'NOT CONFIGURED',
  explorerAddress: '',
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
    activeNetwork: defaultNetwork,
    previousNetwork: undefined,
    isNetworkSwitching: false
  };
};

export const networkSlice = createSlice({
  name: 'networkSlice',
  initialState: getInitialState(),
  reducers: {
    startNetworkSwitch: (state: NetworkSliceType) => {
      state.previousNetwork = state.activeNetwork;
      state.isNetworkSwitching = true;
    },
    changeNetwork: (
      state: NetworkSliceType,
      action: PayloadAction<NetworkType>
    ) => {
      state.activeNetwork = {
        ...action.payload
      };
      state.isNetworkSwitching = false;
    },
    revertNetworkSwitch: (state: NetworkSliceType) => {
      if (state.previousNetwork) {
        state.activeNetwork = state.previousNetwork;
      }
      state.isNetworkSwitching = false;
      state.previousNetwork = undefined;
    },
    completeNetworkSwitch: (state: NetworkSliceType) => {
      state.isNetworkSwitching = false;
      state.previousNetwork = undefined;
    }
  }
});

export const {
  changeNetwork,
  startNetworkSwitch,
  revertNetworkSwitch,
  completeNetworkSwitch
} = networkSlice.actions;

export const networkReducer = networkSlice.reducer;
