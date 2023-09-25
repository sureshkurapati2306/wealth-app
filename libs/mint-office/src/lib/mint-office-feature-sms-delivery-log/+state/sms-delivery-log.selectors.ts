import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSmsDeliveryLog from './sms-delivery-log.reducer';

export const selectSmsTransactionsState = createFeatureSelector<fromSmsDeliveryLog.State>(
  fromSmsDeliveryLog.smsDeliveryFeatureKey
);

export const selectSmsPurchasingTransactions = createSelector(
  selectSmsTransactionsState,
  state => {
    return state.entities.filter(item => item.category == '01');
  }
);

export const selectSmsRedemptionTransactions = createSelector(
  selectSmsTransactionsState,
  state => {
    return state.entities.filter(item => item.category == '02');
  }
);

export const selectSmsSwitchingTransactions = createSelector(
  selectSmsTransactionsState,
  state => {
    return state.entities.filter(item => item.category == '03');
  }
);


export const selectSelectedData = createSelector(
  selectSmsTransactionsState,
  state => {
    return state.selectedEntity;
  }

);

export const selectUTHasSearched = createSelector(
  selectSmsTransactionsState,
  state => {
    return state.hasSearched;
  }
);

export const selectLoadSmsLoading = createSelector(
  selectSmsTransactionsState,
  state => {
    return state.status;
  }
);
