import { createAction, props } from '@ngrx/store';
import { UnitTrustRejectionFields, UnitTrustSearchFields, UnitTrustTransaction } from '../../core/models/unit-trust-transactions.model';

export const loadUnitTrustTransactions = createAction(
  '[API] Load UnitTrustTransactions',
  props<{ searchParams: UnitTrustSearchFields }>()
);

export const loadUnitTrustTransactionsSuccess = createAction(
  '[API] Load UnitTrustTransactions Success',
  props<{ data: UnitTrustTransaction[] }>()
);

export const loadUnitTrustTransactionsFailure = createAction(
  '[API] Load UnitTrustTransactions Failure',
  props<{ error: string }>()
);

export const loadUnitTrustTransactionDetail = createAction(
  '[UT Listing] Load UnitTrustTransaction Detail',
  props<{ transId: number }>()
);

/** Cancel Unit Trust Transaction(s) **/
export const cancelUnitTrustTransactions = createAction(
  '[API] Cancel Unit Trust Transaction(s)',
  props<{ payload: UnitTrustRejectionFields[] }>()
);

export const cancelUnitTrustTransactionsSuccess = createAction(
  '[API] Cancel Unit Trust Transaction(s) Success',
  props<{ data: UnitTrustTransaction[] }>()
);

export const cancelUnitTrustTransactionsFailure = createAction(
  '[API] Cancel Unit Trust Transaction(s) Failure',
  props<{ error: string }>()
);

export const resetUnitTrustTransactions = createAction(
  '[UT Listing] Reset UnitTrustTransactions State'
);