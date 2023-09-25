import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCustomerSupport from './customer-support.reducer';

export const selectCustomerSupportState = createFeatureSelector<fromCustomerSupport.State>(
  fromCustomerSupport.customerSupportFeatureKey
);

export const selectCSRecords = createSelector(
  selectCustomerSupportState,
  state => {
    return state.entities;
  }
);

export const selectLoadCSLoading = createSelector(
  selectCustomerSupportState,
  state => {
    return state.status;
  }
);

export const selectCSHasSearched = createSelector(
  selectCustomerSupportState,
  state => {
    return state.hasSearched;
  }
);

export const selectCSSearchQuery = createSelector(
  selectCustomerSupportState,
  state => {
    return state.searchQuery;
  }
);

export const selectCustomerDetail = createSelector(
  selectCustomerSupportState,
  state => {
    return state.currentEntity;
  }
);