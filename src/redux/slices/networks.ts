import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { networks, NetworkType } from 'config';
import { logoutAction } from 'redux/commonActions';

export const emptyNetwork: NetworkType = {
  accessToken: false,
  apiAddress: '',
  auctionContract: '',
  chainId: '',
  default: false,
  delegationApi: '',
  delegationContract: '',
  egldLabel: '',
  explorerAddress: '',
  faucet: false,
  graphQlAddress: '',
  id: 'not-configured',
  name: 'NOT CONFIGURED',
  stakingContract: '',
  walletAddress: '',
  extrasApi: '',
  walletConnectV2ProjectId: '',
  toolsApiUrl: '',
  WEGLDid: ''
};

type CurrentNetworkSliceType = {
  defaultNetwork: NetworkType;
  activeNetwork: NetworkType;
};

export const getInitialState = (): CurrentNetworkSliceType => {
  const defaultNetwork =
    networks.find(({ default: active }) => Boolean(active)) ?? emptyNetwork;

  return {
    defaultNetwork,
    activeNetwork: defaultNetwork
  };
};

export const networksSlice = createSlice({
  name: 'networksSlice',
  initialState: getInitialState(),
  reducers: {
    changeNetwork: (
      state: CurrentNetworkSliceType,
      action: PayloadAction<NetworkType>
    ) => {
      state.activeNetwork = {
        ...action.payload,
        accessToken: action.payload.accessToken
      };
    }
  },
  extraReducers: (builder) => {
    builder.addCase(logoutAction, (_, { payload }) => {
      if (payload?.keepCurrentExtensionState) {
        return;
      }

      return getInitialState();
    });
  }
});

export const { changeNetwork } = networksSlice.actions;

export const networkReducer = networksSlice.reducer;
