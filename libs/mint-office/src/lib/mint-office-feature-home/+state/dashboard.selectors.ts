import { createFeatureSelector } from '@ngrx/store';
import * as fromDashboard from './dashboard.reducer';

export const selectDashboardState = createFeatureSelector<fromDashboard.State>(
  fromDashboard.dashboardFeatureKey
);
