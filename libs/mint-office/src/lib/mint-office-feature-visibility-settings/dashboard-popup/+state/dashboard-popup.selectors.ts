import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as dashboardPopupTransactions from './dashboard-popup.reducer';

export const selectDashboardPopupState = createFeatureSelector<dashboardPopupTransactions.DashboardPopupState>('dashboardPopupReducer');

export const selectDashboardPopupData = createSelector(
  selectDashboardPopupState,
  (state: dashboardPopupTransactions.DashboardPopupState) => state.data
);



