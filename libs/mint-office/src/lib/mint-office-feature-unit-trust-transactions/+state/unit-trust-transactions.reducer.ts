import { createReducer, on } from '@ngrx/store';
import { UnitTrustSearchFields, UnitTrustTransaction } from '../../core/models/unit-trust-transactions.model';
import * as UnitTrustTransactionsActions from './unit-trust-transactions.actions';

export const unitTrustTransactionsFeatureKey = 'unitTrustTransactions';

export interface State {
  entities: UnitTrustTransaction[];   // List of UT records returned by the API
  currentEntity: number;    // The current UT record ID being viewed in the UT detail page
  hasSearched: boolean;     // This flag will become true when the UT search form has been submitted first time
  searchQuery: UnitTrustSearchFields;      // The search values submitted in the UT search form
  status: 'pending' | 'loading' | 'success' | 'error';  // Series of states for UT listing
  error: string;  // For any error messages
}

export const initialState: State = {
  entities: [],
  currentEntity: null,
  hasSearched: false,
  searchQuery: {
    status: ''
  },
  status: 'pending',
  error: ''
};

export const reducer = createReducer(
  initialState,

  /** Load Unit Trust Transactions **/
  on(UnitTrustTransactionsActions.loadUnitTrustTransactions, (state, action) => {

    return {
      ...state,
      status: 'loading',
      searchQuery: action.searchParams,
      error: ''
    }

  }),
  on(UnitTrustTransactionsActions.loadUnitTrustTransactionsSuccess, (state, action) => {

    return {
      ...state,
      status: 'success',
      hasSearched: true,
      error: '',
      entities: action.data,
      currentEntity: null
    }
  }),
  on(UnitTrustTransactionsActions.loadUnitTrustTransactionsFailure, (state, action) => {

    return {
      ...state,
      status: 'error',
      error: action.error
    }
  }),

  /** Load a single Unit Trust Transaction **/
  on(UnitTrustTransactionsActions.loadUnitTrustTransactionDetail, (state, action) => {

    return {
      ...state,
      currentEntity: action.transId,
      error: ''
    }
  }),

  /** Cancel Unit Trust Transaction(s) **/
  on(UnitTrustTransactionsActions.cancelUnitTrustTransactions, (state) => {

    return {
      ...state,
      error: ''
    }
  }),
  on(UnitTrustTransactionsActions.cancelUnitTrustTransactionsSuccess, (state, action) => {

    const updatedEntities = state.entities.map(item => {
      
      const rejectedEntity = action.data.find(item2 => item2.transId === item.transId);

      if(rejectedEntity) {
        return rejectedEntity;
      } else {
        return item;
      }

    });

    return {
      ...state,
      entities: updatedEntities,
      error: ''
    }
  }),
  on(UnitTrustTransactionsActions.cancelUnitTrustTransactionsFailure, (state, action) => {

    return {
      ...state,
      error: action.error
    }
  }),

  /* Reset UnitTrustTransactions state */
  on(UnitTrustTransactionsActions.resetUnitTrustTransactions, () => {
    return initialState;
  }),

);

