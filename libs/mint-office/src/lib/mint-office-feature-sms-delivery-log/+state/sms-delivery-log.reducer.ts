import { createReducer, on } from '@ngrx/store';
import { UnitTrustSearchFields } from '../../core/models/unit-trust-transactions.model';
import * as SmsDeliveryLogActions from './sms-delivery-log.actions';

export const smsDeliveryFeatureKey = 'smsLogTransactions';

export interface State {
  entities: any[];  
  currentEntity: number;    
  hasSearched: boolean;     
  searchQuery: UnitTrustSearchFields;      
  status: 'pending' | 'loading' | 'success' | 'error';  
  error: string;  
  selectedEntity: any;
}

export const initialState: State = {
  entities: [],
  currentEntity: null,
  hasSearched: false,
  searchQuery: {
    status: ''
  },
  status: 'pending',
  error: '', 
  selectedEntity: null
};

export const reducer = createReducer(
  initialState,


  on(SmsDeliveryLogActions.loadSmsTransactions, (state, action) => {

    return {
      ...state,
      status: 'loading',
      searchQuery: action.searchParams,
      error: ''
    }

  }),
  on(SmsDeliveryLogActions.loadSmsTransactionsSuccess, (state, action) => {
    
    return {
      ...state,
      status: 'success',
      hasSearched: true,
      error: '',
      entities: action.data,
      currentEntity: null
    }
  }),
  on(SmsDeliveryLogActions.loadSmsTransactionsFailure, (state, action) => {

    return {
      ...state,
      status: 'error',
      error: action.error
    }
  }),


  on(SmsDeliveryLogActions.resetSmsDelivery, () => {
    return initialState;
  }),

  on(SmsDeliveryLogActions.updateSelectedEntity, (state, action) => {
      return {
        ...state,
        selectedEntity: action.selectedEntity
    }
  }),
);

