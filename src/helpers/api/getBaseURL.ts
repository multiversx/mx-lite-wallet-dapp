import { networksSelector } from 'redux/selectors';
import { RootState } from 'redux/store';

export function getBaseURL() {
  // eslint-disable-next-line
  const { store } = require('redux/store');
  const state: RootState = store.getState();
  const {
    activeNetwork: { apiAddress }
  } = networksSelector(state);

  return apiAddress;
}
