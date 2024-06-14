import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { RootApi } from './rootApi';
import { hookReducer, interfaceReducer } from './slices';
import { accountReducer } from './slices/account';

export const rootReducer = combineReducers({
  hook: hookReducer,
  account: accountReducer,
  interface: persistReducer(
    {
      key: 'interface',
      storage: localStorage,
      blacklist: ['privateKeyCheckRedirectRoute']
    },
    interfaceReducer
  ),
  [RootApi.reducerPath]: RootApi.reducer
});
