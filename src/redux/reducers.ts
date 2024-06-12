import { combineReducers } from '@reduxjs/toolkit';
import { RootApi } from './rootApi';
import { hookReducer } from './slices';
import { accountReducer } from './slices/account';

// TODO: check sessionStorage
export const rootReducer = combineReducers({
  hook: hookReducer,
  account: accountReducer,
  [RootApi.reducerPath]: RootApi.reducer
});
