import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUnitTrustTransactions from './ref-config.reducer';

export const selectUnitTrustTransactionsState = createFeatureSelector<fromUnitTrustTransactions.State>(
  fromUnitTrustTransactions.unitTrustTransactionsFeatureKey
);

export const selectUTPurchasingTransactions = createSelector(
  selectUnitTrustTransactionsState,
  state => {
    return state.entities;
  }
);




export const selectUnitTrustDetail = createSelector(
  selectUnitTrustTransactionsState,
  state => {
    return state.entities.find(item => item.transId === state.currentEntity);
  }
);

export const selectedItem = createSelector(
  selectUnitTrustTransactionsState,
  state => {
    return state.selectedItem;
  }
);
