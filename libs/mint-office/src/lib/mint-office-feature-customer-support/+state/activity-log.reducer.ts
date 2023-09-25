import { createReducer, on } from '@ngrx/store';
import { CustomerActivityLog, CustomerActivityLogChannel, CustomerActivityLogModules, CustomerActivityLogSearchFields } from '../../core/models/customer-activity.model';
import * as ActivityLogActions from './activity-log.actions';

export const activityLogFeatureKey = 'activityLog';

export interface State {
  entities: CustomerActivityLog[];   // List of Customer Activity Log records returned by the API
  hasSearched: boolean;     // This flag will become true when the Customer Activity Log search form has been submitted first time
  searchQuery: CustomerActivityLogSearchFields;      // The search values submitted in the Customer Activity Log search form
  status: 'pending' | 'loading' | 'success' | 'error';  // Series of states for Customer Activity Log listing
  error: string;  // For any error messages
  modules: CustomerActivityLogModules[] // List drop down of modules return by API
  channels: CustomerActivityLogChannel[] // List drop down of channels return by API
}

export const initialState: State = {
  entities: [],
  hasSearched: false,
  searchQuery: {
    startDate: null,
    endDate: null,
    modules: [],
    channels: []
  },
  status: 'pending',
  error: '',
  modules: [],
  channels: []
};


export const reducer = createReducer(
  initialState,

  /** Load Customer Activity Logs **/
  on(ActivityLogActions.loadActivityLogs, (state, action) => {
    
    return {
      ...state,
      status: 'loading',
      searchQuery: action.searchParams,
      error: ''
    }

  }),
  on(ActivityLogActions.loadActivityLogsSuccess, (state, action) => {
    
    return {
      ...state,
      status: 'success',
      hasSearched: true,
      error: '',
      entities: action.data,
    }

  }),
  on(ActivityLogActions.loadActivityLogsFailure, (state, action) => activityLogError(state, action)),

  /* Reset Activity Log state when user leaves the Customer Detail Shell page */
  on(ActivityLogActions.resetActivityLogs, () => {
    return initialState
  }),

  /** Load Customer Activity Log Modules**/
  on(ActivityLogActions.loadActivityLogModules, (state) => loadingError(state)),
  on(ActivityLogActions.loadActivityLogModulesSuccess, (state, action) => {
    
    return {
      ...state,
      status: 'success',
      error: '',
      modules: action.data,
    }

  }),
  on(ActivityLogActions.loadActivityLogModulesFailure, (state, action) => activityLogError(state, action)),

  /** Load Customer Activity Log Channels**/
  on(ActivityLogActions.loadActivityLogChannel, (state) => loadingError(state)),
  on(ActivityLogActions.loadActivityLogChannelSuccess, (state, action) => {
    
    return {
      ...state,
      status: 'success',
      error: '',
      channels: action.data,
    }

  }),
  on(ActivityLogActions.loadActivityLogChannelFailure, (state, action) => activityLogError(state, action)),

);

export function activityLogError(state, action) {
  return {
    ...state,
    status: 'error',
    error: action.error
  }
}

export function loadingError(state) {
  return {
    ...state,
    status: 'loading',
    error: ''
  }
}