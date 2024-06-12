import { createSelector } from 'reselect';
import { RootState } from '../store';

const stateSelector = (state: RootState) => state.hook;

export const hookSelector = createSelector(stateSelector, (state) => state);

export const hookTypeSelector = createSelector(
  stateSelector,
  (state) => state.type
);

export const hookCallbackUrlSelector = createSelector(
  stateSelector,
  (state) => state.callbackUrl
);

export const hookUrlSelector = createSelector(
  stateSelector,
  (state) => state.hookUrl
);
