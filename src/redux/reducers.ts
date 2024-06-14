import { combineReducers } from '@reduxjs/toolkit';
import { RootApi } from './rootApi';
import { hookReducer, accountReducer } from './slices';

export const storageIgnoredSlices = ['hook'];

export const rootReducer = combineReducers({
  hook: hookReducer,
  account: accountReducer,
  [RootApi.reducerPath]: RootApi.reducer
});
