import { createAction, props } from '@ngrx/store';

export const loadRefConfig= createAction(
  '[API] Load RefConfig',
);

export const loadRefConfigSuccess = createAction(
  '[API] Load RefConfig Success',
  props<{ data: any[] }>()
);

export const loadUnitTrustTransactionsFailure = createAction(
  '[API] Load UnitTrustTransactions Failure',
  props<{ error: string }>()
);

export const loadUnitTrustTransactionDetail = createAction(
  '[UT Listing] Load UnitTrustTransaction Detail',
  props<{ transId: number }>()
);


export const openRefConfig = createAction(
  '[UT Listing] open Ref config',
  props<{ editItem: any }>()
);

export const deleteRefConfig = createAction(
  '[UT Listing] Delelte Ref config',
  props<{ deleteItem: any }>()
);

export const editRefConfig = createAction(
  '[UT Listing] edit Ref config',
  props<{ editItem: any }>()
);

export const addRefConfig = createAction(
  '[UT Listing] add Ref config',
  props<{ addItem: any }>()
);