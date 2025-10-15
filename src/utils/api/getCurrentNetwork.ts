import { networkSelector } from 'redux/selectors';
import { RootState, store } from 'redux/store';

export function getCurrentNetwork() {
  const state: RootState = store.getState();
  const { activeNetwork } = networkSelector(state);

  return activeNetwork;
}
