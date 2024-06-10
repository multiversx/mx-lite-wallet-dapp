import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setProviderPrivateKey } from 'helpers';
import { logoutAction } from 'redux/commonActions';
import { TokenLoginType } from 'types/sdkDapp.types';

export enum FileLoginEnum {
  pem = 'pem',
  keystore = 'keystore'
}

interface AccountSliceType {
  fileLogin: FileLoginEnum | null;
  keystoreFileName: string;
  tokenLogin: TokenLoginType | null;
  token?: string;
  address?: string;
  canImpersonate?: boolean;
  /**
   * computed from login hook tokenLogin
   */
  externalNativeAuthToken?: string;
  addressIndex: number | null;
  isWebview?: boolean;
  keystoreSessionKey?: string;
}

const initialState: AccountSliceType = {
  fileLogin: null,
  keystoreFileName: '',
  tokenLogin: null,
  addressIndex: null
};

export const accountSlice = createSlice({
  name: 'accountSlice',
  initialState: initialState,
  reducers: {
    setPemLogin: (state: AccountSliceType, action: PayloadAction<string>) => {
      setProviderPrivateKey(action.payload);
      state.fileLogin = FileLoginEnum.pem;
    },
    setKeystoreLogin: (
      state: AccountSliceType,
      action: PayloadAction<{
        keystoreFileName: string;
        privateKey: string;
      }>
    ) => {
      setProviderPrivateKey(action.payload.privateKey);
      state.keystoreFileName = action.payload.keystoreFileName;
      state.fileLogin = FileLoginEnum.keystore;
    },
    setAddressIndex: (
      state: AccountSliceType,
      action: PayloadAction<{
        addressIndex: number;
      }>
    ) => {
      state.addressIndex = action.payload.addressIndex;
    },
    setTokenLogin: (
      state: AccountSliceType,
      action: PayloadAction<TokenLoginType>
    ) => {
      state.tokenLogin = action.payload;
    },
    setToken: (
      state: AccountSliceType,
      action: PayloadAction<AccountSliceType['token']>
    ) => {
      state.token = action.payload;
    },
    setIsWebview: (
      state: AccountSliceType,
      action: PayloadAction<AccountSliceType['isWebview']>
    ) => {
      state.isWebview = action.payload;
    },
    setExternalNativeAuthToken: (
      state: AccountSliceType,
      action: PayloadAction<AccountSliceType['externalNativeAuthToken']>
    ) => {
      state.externalNativeAuthToken = action.payload;
    },
    setKeystoreSessionKey: (
      state: AccountSliceType,
      action: PayloadAction<string>
    ) => {
      state.keystoreSessionKey = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(
      logoutAction,
      ({ address }: AccountSliceType, { payload }) => {
        setProviderPrivateKey(null);

        const newState = { ...initialState };

        if (payload?.keepCurrentExtensionState) {
          newState.address = address;
        }

        if (payload?.keystoreSessionKey) {
          newState.keystoreSessionKey = payload.keystoreSessionKey;
        }

        return newState;
      }
    );
  }
});

export const {
  setPemLogin,
  setKeystoreLogin,
  setTokenLogin,
  setToken,
  setExternalNativeAuthToken,
  setAddressIndex,
  setIsWebview,
  setKeystoreSessionKey
} = accountSlice.actions;

export const accountReducer = accountSlice.reducer;
