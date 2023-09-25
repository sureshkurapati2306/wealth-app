import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WHITELISTING_USER_FEATURE_KEY, State } from './whitelisting-user.reducer'


export const selectWhitelistingUserState = createFeatureSelector<State>(WHITELISTING_USER_FEATURE_KEY);


export const selectWhitelistingTable = createSelector(
  selectWhitelistingUserState,
  (state: State) => state?.whitelistingTable
);

export const selectLoading = createSelector(selectWhitelistingUserState, (state: State) => state?.loading);

export const selectError = createSelector(selectWhitelistingUserState, (state: State) => state?.error);
