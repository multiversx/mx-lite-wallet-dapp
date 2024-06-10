import { createSelector } from 'reselect';
import { RootState } from '../store';

const stateSelector = (state: RootState) => state.login;

export const loginSelector = createSelector(stateSelector, (state) => state);
