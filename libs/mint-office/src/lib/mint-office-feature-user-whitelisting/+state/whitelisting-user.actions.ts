import { createAction, props } from '@ngrx/store';
import { WhitelistingTable } from '../../core/models/user-whitelisting.models';

export const loadWhitelistingList = createAction(
  '[Whitelisting User] Load List',
  props<{ search: string; pageIndex?: number }>()
);

export const loadWhitelistingListSuccess = createAction(
  '[Whitelisting User] Load List Success',
  props<{ whitelistingTable: WhitelistingTable }>()
);

export const loadWhitelistingListFailure = createAction(
  '[Whitelisting User] Load List Failure',
  props<{ error: any }>()
);

export const deleteWhitelistingUser = createAction(
  '[Whitelisting User] Delete User',
  props<{ id: number }>()
);

export const deleteWhitelistingUserSuccess = createAction(
  '[Whitelisting User] Delete User Success'
);

export const deleteWhitelistingUserFailure = createAction(
  '[Whitelisting User] Delete User Failure',
  props<{ error: any }>()
);
