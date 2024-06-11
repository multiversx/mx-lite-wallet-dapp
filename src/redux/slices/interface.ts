import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WalletOriginType } from 'types';

export interface ModalStateType {
  from: string;
  metadata?: Record<string, string>;
  redirectRoute?: string;
  sessionId?: string | null;
  title?: string;
}

export type InterfaceSliceType = {
  walletOrigin: WalletOriginType;
  accessTokenRedirectRoute: string;
  /**
   * holds a reference to NFTs or SC actions performed in current transactions
   */
  activeTransactionIdentifiers: string[];
  /**
   * Holds the protected route of `PrivateKeyCheckWrapper`.
   * It will navigate to this route after re-login with keystore or PEM
   */
  privateKeyCheckRedirectRoute: string;
  pendingRequests: number;
};

export function getInitialInterfaceState(): InterfaceSliceType {
  return {
    activeTransactionIdentifiers: [],
    walletOrigin: {
      pathname: '/',
      search: ''
    },
    accessTokenRedirectRoute: '',
    privateKeyCheckRedirectRoute: '',
    pendingRequests: 0
  };
}

export const interfaceSlice = createSlice({
  name: 'interfaceSlice',
  initialState: getInitialInterfaceState(),
  reducers: {
    setWalletOrigin: (
      state: InterfaceSliceType,
      action: PayloadAction<InterfaceSliceType['walletOrigin']>
    ) => {
      state.walletOrigin = action.payload;
    },
    setAccessTokenRedirectRoute: (
      state: InterfaceSliceType,
      action: PayloadAction<string>
    ) => {
      state.accessTokenRedirectRoute = action.payload;
    },
    clearAccessTokenRedirectRoute: (state: InterfaceSliceType) => {
      state.accessTokenRedirectRoute = '';
    },
    setActiveTransactionIdentifiers: (
      state: InterfaceSliceType,
      action: PayloadAction<InterfaceSliceType['activeTransactionIdentifiers']>
    ) => {
      state.activeTransactionIdentifiers = action.payload;
    },

    setPrivateKeyCheckRedirectRoute: (
      state: InterfaceSliceType,
      action: PayloadAction<string>
    ) => {
      state.privateKeyCheckRedirectRoute = action.payload;
    },
    clearPrivateKeyCheckRedirectRoute: (state: InterfaceSliceType) => {
      state.privateKeyCheckRedirectRoute = '';
    },

    increasePendingRequests: (state: InterfaceSliceType) => {
      if (state.pendingRequests >= 0) {
        state.pendingRequests++;
      } else {
        state.pendingRequests = 1;
      }
    },
    decreasePendingRequests: (state: InterfaceSliceType) => {
      if (state.pendingRequests > 0) {
        state.pendingRequests--;
      } else {
        state.pendingRequests = 0;
      }
    }
  }
});

export const {
  clearAccessTokenRedirectRoute,
  clearPrivateKeyCheckRedirectRoute,
  decreasePendingRequests,
  increasePendingRequests,
  setAccessTokenRedirectRoute,
  setActiveTransactionIdentifiers,
  setPrivateKeyCheckRedirectRoute,
  setWalletOrigin
} = interfaceSlice.actions;

export const interfaceReducer = interfaceSlice.reducer;
