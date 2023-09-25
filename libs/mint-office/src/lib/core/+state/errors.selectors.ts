import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ERRORS_FEATURE_KEY, State } from './errors.reducer';

// Lookup the 'Errors' feature state managed by NgRx
export const getErrorsState = createFeatureSelector<State>(ERRORS_FEATURE_KEY);

export const getErrors = createSelector(getErrorsState, (state: State) => state.error);
