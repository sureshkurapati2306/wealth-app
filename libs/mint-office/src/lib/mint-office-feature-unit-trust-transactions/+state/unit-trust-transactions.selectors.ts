import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUnitTrustTransactions from './unit-trust-transactions.reducer';

export const selectUnitTrustTransactionsState = createFeatureSelector<fromUnitTrustTransactions.State>(
  fromUnitTrustTransactions.unitTrustTransactionsFeatureKey
);

export const selectUTPurchasingTransactions = createSelector(
  selectUnitTrustTransactionsState,
  state => {
    return state.entities.filter(item => item.transactionType == '01');
  }
);

export const selectUTRedemptionTransactions = createSelector(
  selectUnitTrustTransactionsState,
  state => {
    return state.entities.filter(item => item.transactionType == '02');
  }
);

export const selectUTSwitchingTransactions = createSelector(
  selectUnitTrustTransactionsState,
  state => {
    return state.entities.filter(item => item.transactionType == '03');
  }
);

export const selectLoadUTLoading = createSelector(
  selectUnitTrustTransactionsState,
  state => {
    return state.status;
  }
);

export const selectUTHasSearched = createSelector(
  selectUnitTrustTransactionsState,
  state => {
    return state.hasSearched;
  }
);

export const selectUTSearchQuery = createSelector(
  selectUnitTrustTransactionsState,
  state => {
    return state.searchQuery;
  }
);

export const selectUnitTrustDetail = createSelector(
  selectUnitTrustTransactionsState,
  state => {
    return state.entities.find(item => item.transId === state.currentEntity);
  }
);