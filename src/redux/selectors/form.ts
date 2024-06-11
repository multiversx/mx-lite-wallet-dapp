import { createSelector } from 'reselect';
import { RootState } from '../store';

const stateSelector = (state: RootState) => state.form;

export const formSelector = createSelector(stateSelector, (state) => state);
