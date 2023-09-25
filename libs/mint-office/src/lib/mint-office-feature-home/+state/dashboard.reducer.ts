import { createReducer } from '@ngrx/store';
export const dashboardFeatureKey = 'dashboard';
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface State {

}

export const initialState: State = {

};


export const reducer = createReducer(
  initialState,

  // on(DashboardActions.loadDashboards, state => state),

);

