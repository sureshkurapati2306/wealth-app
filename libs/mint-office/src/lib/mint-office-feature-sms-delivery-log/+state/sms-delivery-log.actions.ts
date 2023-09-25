import { createAction, props } from '@ngrx/store';
import { UnitTrustSearchFields, UnitTrustTransaction } from '../../core/models/unit-trust-transactions.model';

export const loadSmsTransactions = createAction(
  '[API] Load smsTransactions',
  props<{ searchParams: UnitTrustSearchFields }>()
);

export const loadSmsTransactionsSuccess = createAction(
  '[API] Load smsTransactions Success',
  props<{ data: UnitTrustTransaction[] }>()
);

export const loadSmsTransactionsFailure = createAction(
  '[API] Load smsTransactions Failure',
  props<{ error: string }>()
);


export const resetSmsDelivery = createAction(
  '[Sms Listing] Reset sms State'
);

export const updateSelectedEntity = createAction(
  '[Sms Listing] Update sms Selected Entity',
  props<{ selectedEntity: any }>()

);