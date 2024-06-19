import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import reduxLocalStorage from 'redux-persist/lib/storage';
import reduxSessionStorage from 'redux-persist/lib/storage/session';
import { RootApi } from './rootApi';
import { hookReducer, accountReducer } from './slices';

export const storageIgnoredSlices = ['hook'];

const accountPersisted = {
  key: 'account',
  storage:
    import.meta.env.VITE_APP_PERSIST === 'localStorage'
      ? reduxLocalStorage
      : reduxSessionStorage,
  blacklist: ['tokenLogin', 'token']
};

export const rootReducer = combineReducers({
  hook: hookReducer,
  account: persistReducer(accountPersisted, accountReducer),
  [RootApi.reducerPath]: RootApi.reducer
});
