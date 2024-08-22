import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import reduxLocalStorage from 'redux-persist/lib/storage';
import reduxSessionStorage from 'redux-persist/lib/storage/session';
import { RootApi } from './rootApi';
import { hookReducer, accountReducer, networkReducer } from './slices';

export const storageIgnoredSlices = ['hook'];

const accountPersisted = {
  key: 'account',
  storage:
    import.meta.env.VITE_APP_PERSIST === 'localStorage'
      ? reduxLocalStorage
      : reduxSessionStorage,
  blacklist: ['tokenLogin', 'token']
};

const networkPersisted = {
  key: 'network',
  storage: reduxSessionStorage
};

export const rootReducer = combineReducers({
  hook: hookReducer,
  account: persistReducer(accountPersisted, accountReducer),
  network: persistReducer(networkPersisted, networkReducer),
  [RootApi.reducerPath]: RootApi.reducer
});
