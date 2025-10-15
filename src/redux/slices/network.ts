import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { networks } from 'config';
import { NetworkType, emptyNetwork } from 'types';

interface NetworkSliceType {
  defaultNetwork: NetworkType;
  activeNetwork: NetworkType;
}

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
