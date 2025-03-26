import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setProviderPrivateKey } from 'helpers/app/provider';
import { logoutAction } from 'redux/commonActions';
import { TokenLoginType } from 'types';

export enum FileLoginEnum {
  pem = 'pem',
  keystore = 'keystore'
}

interface AccountSliceType {
  fileLogin: FileLoginEnum | null;
  keystoreFile: string;
  tokenLogin: TokenLoginType | null;
  token?: string;
  address?: string;
  /**
   * computed from login hook tokenLogin
   */
  externalNativeAuthToken?: string;
  addressIndex: number | null;
  accessTokenRedirectRoute?: string;
  isWebview?: boolean;
}

const initialState: AccountSliceType = {
  fileLogin: null,
  keystoreFile: '',
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
        keystoreFile: string;
        privateKey: string;
      }>
    ) => {
      setProviderPrivateKey(action.payload.privateKey);
      state.keystoreFile = action.payload.keystoreFile;
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
    setExternalNativeAuthToken: (
      state: AccountSliceType,
      action: PayloadAction<AccountSliceType['externalNativeAuthToken']>
    ) => {
      state.externalNativeAuthToken = action.payload;
    },
    setAccountAddress: (
      state: AccountSliceType,
      action: PayloadAction<AccountSliceType['address']>
    ) => {
      state.address = action.payload;
    },
    setAccessTokenRedirectRoute: (
      state: AccountSliceType,
      action: PayloadAction<string>
    ) => {
      state.accessTokenRedirectRoute = action.payload;
    },
    clearAccessTokenRedirectRoute: (state: AccountSliceType) => {
      state.accessTokenRedirectRoute = '';
    },
    setIsWebview: (state: AccountSliceType, action: PayloadAction<boolean>) => {
      state.isWebview = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(logoutAction, () => {
      setProviderPrivateKey(null);
      const newState = { ...initialState };
      return newState;
    });
  }
});

export const {
  setPemLogin,
  setKeystoreLogin,
  setTokenLogin,
  setToken,
  setExternalNativeAuthToken,
  setAddressIndex,
  setAccountAddress,
  setAccessTokenRedirectRoute,
  clearAccessTokenRedirectRoute,
  setIsWebview
} = accountSlice.actions;

export const accountReducer = accountSlice.reducer;
