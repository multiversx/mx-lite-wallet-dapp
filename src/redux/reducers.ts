import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import reduxLocalStorage from 'redux-persist/lib/storage';
import reduxSessionStorage from 'redux-persist/lib/storage/session';
import { isExtension } from 'config';
import {
  extensionReducers,
  extensionSessionStorageIgnoredReducers
} from 'extension/popup/redux/extensionReducers';
import {
  moduleReducers,
  moduleSessionStorageIgnoredReducers
} from 'modules/moduleReducers';
import { RootApi } from './rootApi';
import {
  accountReducer,
  loginReducer,
  interfaceReducer,
  networkReducer,
  formReducer,
  hookReducer
} from './slices';

const asyncIgnoredSlices = {};

const accountPersisted = {
  key: 'account',
  storage: isExtension ? reduxLocalStorage : reduxSessionStorage,
  blacklist: ['tokenLogin', 'token']
};

const loginPersisted = {
  key: 'login',
  storage: reduxLocalStorage
};

const networkPersisted = {
  key: 'networks',
  storage: isExtension ? reduxLocalStorage : reduxSessionStorage,
  blacklist: []
};

const interfacePersisted = {
  key: 'interface',
  storage: reduxLocalStorage,
  blacklist: [
    'activeTheme',
    'isApplicationsHeaderOpened',
    'privateKeyCheckRedirectRoute',
    'sendModalRouteState',
    'modalState'
  ]
};

const simpleIgnoredSlices = [
  'form',
  'hook',
  ...moduleSessionStorageIgnoredReducers,
  ...extensionSessionStorageIgnoredReducers
];

const customIgnoredSlices = {
  account: persistReducer(accountPersisted, accountReducer),
  networks: persistReducer(networkPersisted, networkReducer),
  interface: persistReducer(interfacePersisted, interfaceReducer),
  login: persistReducer(loginPersisted, loginReducer)
};

export const ignoredSliceNames: string[] = [
  ...Object.keys(asyncIgnoredSlices).map((name) => name),
  ...Object.keys(customIgnoredSlices).map((name) => name),
  ...simpleIgnoredSlices
];

function persistedSlice(name: string) {
  return {
    key: name,
    storage: reduxLocalStorage,
    blacklist: ['status', 'error']
  };
}

function wrapReducer<
  F extends (
    persistReducerFunc: ReturnType<typeof persistedSlice>,
    sliceObject: U
  ) => any,
  U
>(persistReducerFunc: F, sliceObject: U, name: string): U {
  return persistReducerFunc(persistedSlice(name), sliceObject);
}

const ignoredSlices = Object.keys(asyncIgnoredSlices).reduce((acc, entry) => {
  const name = entry as keyof typeof asyncIgnoredSlices;
  return {
    ...acc,
    [name]: wrapReducer(persistReducer as any, asyncIgnoredSlices[name], name)
  };
}, {} as typeof asyncIgnoredSlices);

export const rootReducer = combineReducers({
  ...ignoredSlices,
  ...customIgnoredSlices,
  form: formReducer,
  hook: hookReducer,
  [RootApi.reducerPath]: RootApi.reducer,
  ...moduleReducers,
  ...extensionReducers
});
