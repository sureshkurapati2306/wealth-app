import { Action } from '@ngrx/store';

export const ADD_AUTH_DATA = '[Auth] Add Auth Data';
export const UPDATE_DOWNTIME = '[Auth] Update Downtime';
export const CALL_AUTHENTICATE_API = '[Auth] Call Auth Service';
export const AUTHENTICATE_SUCCESS = '[Auth] Login Success';
export const AUTHENTICATE_FAIL = '[Auth] Login Fail';
// export const STORE_CLICKS_CODE = '[Auth] Store Clicks Code';

export class AddAuthData implements Action {
  readonly type = ADD_AUTH_DATA;

  constructor(public token: string, public clicksCode: string, public downtime: any) {}
}

export class UpdateDowntime implements Action {
  readonly type = UPDATE_DOWNTIME;

  constructor(public downtime: any) {}
}

export class CallAuthenticateApi implements Action {
  readonly type = CALL_AUTHENTICATE_API;

  constructor(public username: string, public password: string) {}
}

export class AuthenticateSuccess implements Action {
  readonly type = AUTHENTICATE_SUCCESS;

  constructor(public payload: string) {}
}

export class AuthenticateFail implements Action {
  readonly type = AUTHENTICATE_FAIL;

  constructor(public payload: string) {}
}

// export class StoreClicksCode implements Action {
//     readonly type = STORE_CLICKS_CODE;

//     constructor(public payload: string) {}
// }

export type Actions = AddAuthData
  | UpdateDowntime
  | CallAuthenticateApi
  | AuthenticateSuccess
  | AuthenticateFail
  // | StoreClicksCode;
