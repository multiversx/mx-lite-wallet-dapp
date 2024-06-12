import { combineReducers } from '@reduxjs/toolkit';
import { RootApi } from './rootApi';

export const rootReducer = combineReducers({
  [RootApi.reducerPath]: RootApi.reducer
});
