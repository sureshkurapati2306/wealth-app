import { createReducer, on } from '@ngrx/store';
import * as RefConfigActions from './ref-config.actions';

export const unitTrustTransactionsFeatureKey = 'unitTrustTransactions';

export interface State {
  entities: any[];  
  currentEntity: number;       
  error: string;  // For any error messages
  selectedItem: any
}

export const initialState: State = {
  entities: [],
  currentEntity: null,
  error: '',
  selectedItem: null
};

export const reducer = createReducer(
  initialState,

  /** Load Unit Trust Transactions **/
  on(RefConfigActions.loadRefConfig, (state) => {

    return {
      ...state,
      status: 'loading',
      error: ''
    }

  }),
  on(RefConfigActions.loadRefConfigSuccess, (state, action) => {

    return {
      ...state,
      status: 'success',
      error: '',
      entities: action.data,
    }
  }),
  on(RefConfigActions.loadUnitTrustTransactionsFailure, (state, action) => {

    return {
      ...state,
      status: 'error',
      error: action.error
    }
  }),

  /** Load a single Unit Trust Transaction **/
  on(RefConfigActions.loadUnitTrustTransactionDetail, (state, action) => {

    return {
      ...state,
      currentEntity: action.transId,
      error: ''
    }
  }),

  on(RefConfigActions.openRefConfig, (state, action) => {

    console.log(action.editItem)
    return {
      ...state,
      selectedItem: action.editItem
    }
  }),

  

);

