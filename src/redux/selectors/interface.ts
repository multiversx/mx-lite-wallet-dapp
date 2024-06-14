import { createSelector } from 'reselect';
import { RootState } from '../store';

const stateSelector = (state: RootState) => {
  return state.interface;
};

export const privateKeyCheckRedirectRouteSelector = createSelector(
  stateSelector,
  (state) => state.privateKeyCheckRedirectRoute
);
