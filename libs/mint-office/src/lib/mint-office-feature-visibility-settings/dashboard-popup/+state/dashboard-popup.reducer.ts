import { createReducer, on } from '@ngrx/store';
import * as DashboardPopupActions from './dashboard-popup.actions';
import { DashboardPopupUpload } from '../../../../lib/core/models/dashboard-popup.model';

export const DashboardPopupTransactionFeatureKey = 'DashboardPopupTransaction';

export interface DashboardPopupState {
  data: DashboardPopupUpload[];
  loading: boolean;
  error: any;
}

export const initialState: DashboardPopupState = {
  data: [],
  loading: false,
  error: null,
};

export const dashboardPopupReducer = createReducer(
  initialState,
  on(DashboardPopupActions.loadDashboardPopup, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(DashboardPopupActions.loadDashboardPopupSuccess, (state, { data }) => ({
    ...state,
    data,
    loading: false
  })),
  on(DashboardPopupActions.loadDashboardPopupFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);


