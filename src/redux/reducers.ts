import { combineReducers } from '@reduxjs/toolkit';
import reduxSessionStorage from 'redux-persist/lib/storage/session';
import { persistReducer } from 'redux-persist';
import { accountReducer } from './slices';
import { RootApi } from './rootApi';

const accountPersisted = {
  key: 'account',
  storage: reduxSessionStorage,
  blacklist: ['tokenLogin', 'token']
};

export const rootReducer = combineReducers({
  [RootApi.reducerPath]: RootApi.reducer,
  account: persistReducer(accountPersisted, accountReducer)
});
