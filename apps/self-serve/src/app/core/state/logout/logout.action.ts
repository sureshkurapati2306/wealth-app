import { Action } from "@ngrx/store";

export const LOGOUT_TRANSACTION_API = '[Logout] Post audit and customer details';
export const LOGOUT_TRANSACTION__SUCCESS = '[Logout]Logout transaction success';
export const LOGOUT_TRANSACTION__ERROR = '[Logout]Logout transaction error';

export class LogoutTransaction implements Action {

  readonly type = LOGOUT_TRANSACTION_API;

}
export class LogoutTransactionSuccess implements Action {

  readonly type = LOGOUT_TRANSACTION__SUCCESS;

  constructor(public payload: any) {}

}
export class LogoutTransactionError implements Action {

  readonly type = LOGOUT_TRANSACTION__ERROR;

  constructor(public payload: any) {}

}


export type Actions =

| LogoutTransaction
| LogoutTransactionSuccess
| LogoutTransactionError

