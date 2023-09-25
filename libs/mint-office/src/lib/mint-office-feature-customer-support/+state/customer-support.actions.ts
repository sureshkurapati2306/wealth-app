import { createAction, props } from '@ngrx/store';
import { Customer, CustomerSearchFields } from '../../core/models/customer.model';

export const loadCustomerSupports = createAction(
  '[API] Load CustomerSupports',
  props<{ searchParams: CustomerSearchFields }>()
);

export const loadCustomerSupportsSuccess = createAction(
  '[API] Load CustomerSupports Success',
  props<{ data: Customer[] }>()
);

export const loadCustomerSupportsFailure = createAction(
  '[API] Load CustomerSupports Failure',
  props<{ error: string }>()
);

export const loadCustomerDetail = createAction(
  '[CS Listing] Load Customer Detail',
  props<{ data: Customer }>()
);

export const resetCustomerSupportState = createAction(
  '[CS Listing] Reset CustomerSupport State'
);