import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromActivityLog from './activity-log.reducer';

export const selectActivityLogState = createFeatureSelector<fromActivityLog.State>(
  fromActivityLog.activityLogFeatureKey
);

export const selectActivityLogRecords = createSelector(
  selectActivityLogState,
  state => {
    return state.entities;
  }
);

export const selectLoadActivityLogLoading = createSelector(
  selectActivityLogState,
  state => {
    return state.status;
  }
);

export const selectActivityLogHasSearched = createSelector(
  selectActivityLogState,
  state => {
    return state.hasSearched;
  }
);

export const selectActivityLogSearchQuery = createSelector(
  selectActivityLogState,
  state => {
    return state.searchQuery;
  }
);

export const selectActivityLogModules = createSelector(
  selectActivityLogState,
  state => {
    return state.modules;
  }
);

export const selectActivityLogChannels = createSelector(
  selectActivityLogState,
  state => {
    return state.channels;
  }
);