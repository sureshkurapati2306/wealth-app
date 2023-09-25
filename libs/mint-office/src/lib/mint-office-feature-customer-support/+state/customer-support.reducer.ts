import { createReducer, on } from '@ngrx/store';
import { Customer, CustomerSearchFields } from '../../core/models/customer.model';
import * as CustomerSupportActions from './customer-support.actions';

export const customerSupportFeatureKey = 'customerSupport';

export interface State {
  entities: Customer[];   // List of Customer records returned by the API
  currentEntity: Customer;    // The current Customer record ID being viewed in the Customer detail page
  hasSearched: boolean;     // This flag will become true when the Customer search form has been submitted first time
  searchQuery: CustomerSearchFields;      // The search values submitted in the Customer search form
  status: 'pending' | 'loading' | 'success' | 'error';  // Series of states for Customer listing
  error: string;  // For any error messages
}

export const initialState: State = {
  entities: [],
  currentEntity: null,
  hasSearched: false,
  searchQuery: {
    fullName: '',
    idNumber: '',
    cifNumber: ''
  },
  status: 'pending',
  error: ''
};


export const reducer = createReducer(
  initialState,

  /** Load Customer Listing **/
  on(CustomerSupportActions.loadCustomerSupports, (state, action) => {
    return {
      ...state,
      status: 'loading',
      searchQuery: action.searchParams
    }
  }),
  on(CustomerSupportActions.loadCustomerSupportsSuccess, (state, action) => {
    return {
      ...state,
      status: 'success',
      hasSearched: true,
      error: '',
      entities: action.data,
      currentEntity: null
    }
  }),
  on(CustomerSupportActions.loadCustomerSupportsFailure, (state, action) => {
    return {
      ...state,
      status: 'error',
      error: action.error,
    }
  }),

  /** Load Customer Detail **/
  on(CustomerSupportActions.loadCustomerDetail, (state, action) => {
    return {
      ...state,
      currentEntity: action.data,
      error: '',
    }
  }),

  /** Reset Customer Support state **/
  on(CustomerSupportActions.resetCustomerSupportState, () => {
    return initialState
  }),

);

