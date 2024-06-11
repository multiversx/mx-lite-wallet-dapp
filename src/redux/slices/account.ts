import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TokenLoginType } from 'types';

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
  reducers: {}
});

export const accountReducer = accountSlice.reducer;
