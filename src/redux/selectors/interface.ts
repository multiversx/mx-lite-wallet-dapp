import { createSelector } from 'reselect';
import { RootState } from '../store';

const stateSelector = (state: RootState) => {
  return state.interface;
};

export const interfaceSelector = createSelector(
  stateSelector,
  (state) => state
);

export const walletOriginSelector = createSelector(
  stateSelector,
  (state) => state.walletOrigin
);

export const accessTokenRedirectRouteSelector = createSelector(
  stateSelector,
  (state) => state.accessTokenRedirectRoute
);

export const activeThemeSelector = createSelector(
  stateSelector,
  (state) => state.activeTheme
);

export const activeTransactionIdentifiersSelector = createSelector(
  stateSelector,
  (state) => state.activeTransactionIdentifiers
);

export const onboardingModalsDaysViewedSelector = createSelector(
  stateSelector,
  (state) => state.onboardingModalsDaysViewed
);

export const privateKeyCheckRedirectRouteSelector = createSelector(
  stateSelector,
  (state) => state.privateKeyCheckRedirectRoute
);

export const sendModalRouteStateSelector = createSelector(
  stateSelector,
  (state) => state.sendModalRouteState
);

export const modalStateSelector = createSelector(
  stateSelector,
  (state) => state.modalState
);

export const pendingRequestsSelector = createSelector(
  stateSelector,
  (state) => state.pendingRequests
);
