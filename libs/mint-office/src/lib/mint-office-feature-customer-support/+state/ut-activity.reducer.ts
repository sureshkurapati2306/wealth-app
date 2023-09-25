import { createReducer, on } from '@ngrx/store';
import { SmsDeliveryLog, UnitTrustActivity } from '../../core/models/customer-activity.model';
import * as UtActivityActions from './ut-activity.actions';

export const utActivityFeatureKey = 'utActivity';

export interface State {
  referenceNo: string;  //The referenceNo being viewed (expanded) at the moment
  currentEntity: UnitTrustActivity[];  // The current Unit Trust Activity record being viewed in the Activity Log page
  currentSMSDeliveryLog: SmsDeliveryLog[]; // The current SMS delivery Log record being viewed in the Activity Log page
  status: 'pending' | 'loading' | 'success' | 'error';  // Series of states for Unit Trust Activity
  error: string;  // For any error messages
}

export const initialState: State = {
  referenceNo: null,
  currentEntity: [],
  currentSMSDeliveryLog: [],
  status: 'pending',
  error: ''
};

export const reducer = createReducer(
  initialState,

  /** Load Customer Unit Trust Activity Record **/
  on(UtActivityActions.loadUtActivity, (state, action) => utActivityState(state, action)),
  on(UtActivityActions.loadUtActivitySuccess, (state, action) => {
    return {
      ...state,
      status: 'success',
      error: '',
      currentEntity: action.data
    }
  }),
  on(UtActivityActions.loadUtActivitySMSDelivery, (state, action) => utActivityState(state, action)),
  on(UtActivityActions.loadUtActivitySMSDeliverySuccess, (state, action) => {
    return {
      ...state,
      status: 'success',
      error: '',
      currentSMSDeliveryLog: action.data
    }
  }),
  on(UtActivityActions.loadUtActivityFailure, (state, action) => {
    return {
      ...state,
      status: 'error',
      error: action.error,
    }
  }),
  on(UtActivityActions.resetUtActicity, () => {
    return {
      ...initialState,
    }
  }),

);

export function utActivityState(state, action) {
  return {
    ...state,
    status: 'loading',
    referenceNo: action.referenceNo
  }
}