import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';

import { getUnixTimestampWithAddedSeconds } from 'helpers';
import { MultiSigApiResponseType } from 'modules/MultiSig/types';
import { logoutAction } from 'redux/commonActions';
import { LoginMethodsEnum } from 'types';

import { FileLoginEnum } from './account';

export interface KeystoreDataType {
  addressIndex: number;
  encryptedKeystoreFile: string;
  fileName: string;
  keystoreSessionSalt: string;
  multisigContracts?: MultiSigApiResponseType[];
}

export interface LedgerDataType {
  index: number;
  multisigContracts?: MultiSigApiResponseType[];
  version: string;
}

export interface LoginInfoType {
  address: string;
  expires: number;
  keystoreData?: KeystoreDataType;
  ledgerData?: LedgerDataType;
  multisigContracts?: MultiSigApiResponseType[];
  type:
    | FileLoginEnum
    | LoginMethodsEnum.ledger
    | LoginMethodsEnum.extension
    | LoginMethodsEnum.walletconnectv2
    | LoginMethodsEnum.metamask;
}

interface LoginSliceType {
  [sessionKey: string]: LoginInfoType;
}

const initialState: LoginSliceType = {};

const tenMinutes = 10 * 60;

const getIsExpired = (expires: number) => Date.now() >= expires;

export const loginSlice = createSlice({
  name: 'loginSlice',
  initialState: initialState,
  reducers: {
    setPersistedKeystoreLogin: (
      state: LoginSliceType,
      action: PayloadAction<{
        address: string;
        addressIndex: number;
        encryptedKeystoreFile: string;
        fileName: string;
        keystoreSessionSalt: string;
        loginSessionKey: string;
        multisigContracts?: MultiSigApiResponseType[];
      }>
    ) => {
      const {
        address,
        addressIndex,
        encryptedKeystoreFile,
        fileName,
        keystoreSessionSalt,
        loginSessionKey,
        multisigContracts
      } = action.payload;

      state[loginSessionKey] = {
        address,
        keystoreData: {
          fileName,
          encryptedKeystoreFile,
          addressIndex,
          keystoreSessionSalt
        },
        multisigContracts,
        type: FileLoginEnum.keystore,
        expires: getUnixTimestampWithAddedSeconds(tenMinutes)
      };
    },

    setPersistedLoginType: (
      state: LoginSliceType,
      action: PayloadAction<{
        address: string;
        loginSessionKey: string;
        multisigContracts?: MultiSigApiResponseType[];
        type:
          | FileLoginEnum.pem
          | LoginMethodsEnum.extension
          | LoginMethodsEnum.walletconnectv2
          | LoginMethodsEnum.metamask;
      }>
    ) => {
      const { address, loginSessionKey, multisigContracts, type } =
        action.payload;

      state[loginSessionKey] = {
        address,
        multisigContracts,
        type,
        expires: getUnixTimestampWithAddedSeconds(tenMinutes)
      };
    },

    setPersistedLedgerLogin: (
      state: LoginSliceType,
      action: PayloadAction<{
        address: string;
        index: number;
        loginSessionKey: string;
        multisigContracts?: MultiSigApiResponseType[];
        version: string;
      }>
    ) => {
      const { address, loginSessionKey, multisigContracts, version, index } =
        action.payload;

      state[loginSessionKey] = {
        address,
        multisigContracts,
        type: LoginMethodsEnum.ledger,
        ledgerData: {
          index,
          version
        },
        expires: getUnixTimestampWithAddedSeconds(tenMinutes)
      };
    },

    removeExipredLogins: (state: LoginSliceType) => {
      for (const [key, value] of Object.entries(state)) {
        if (getIsExpired(value.expires)) {
          delete state[key];
        }
      }
    },
    setPersistedMultisigContracts: (
      state: LoginSliceType,
      action: PayloadAction<{
        address: string;
        multisigContracts: MultiSigApiResponseType[];
        loginSessionKey: string;
      }>
    ) => {
      const { address, multisigContracts, loginSessionKey } = action.payload;

      if (state[loginSessionKey]) {
        state[loginSessionKey].multisigContracts = multisigContracts;
      } else {
        state[loginSessionKey] = {
          address,
          multisigContracts,
          type: FileLoginEnum.keystore,
          expires: getUnixTimestampWithAddedSeconds(tenMinutes)
        };
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(
      logoutAction,
      (currentState: LoginSliceType, { payload }) => {
        const state = current(currentState);
        const newState = { ...state };
        for (const [key, value] of Object.entries(newState)) {
          if (getIsExpired(value.expires)) {
            delete newState[key];
          }
        }
        if (payload?.keystoreSessionKey) {
          delete newState[payload.keystoreSessionKey];
        }
        return newState;
      }
    );
  }
});

export const {
  setPersistedKeystoreLogin,
  removeExipredLogins,
  setPersistedLoginType,
  setPersistedLedgerLogin,
  setPersistedMultisigContracts
} = loginSlice.actions;

export const loginReducer = loginSlice.reducer;
