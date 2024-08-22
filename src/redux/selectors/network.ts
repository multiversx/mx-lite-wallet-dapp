import { createSelector } from 'reselect';
import { RootState } from '../store';

const stateSelector = (state: RootState) => state.network;
export const networkSelector = createSelector(stateSelector, (state) => state);
