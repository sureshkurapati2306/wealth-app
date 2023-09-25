import { Action } from '@ngrx/store';

export const GET_ACCOUNT_OPENING_API = '[ACCOUNTOPENING] Get Account Opening API';
export const GET_ACCOUNT_OPENING_API_RESPONSE = '[ACCOUNTOPENING] Get Account Opening API Response';
export const GET_USER_DETAILS_API = '[ACCOUNTOPENINGUSERDETAILS] Get User Details API';
export const GET_USER_DETAILS_API_RESPONSE =
    '[ACCOUNTOPENINGUSERDETAILS] Get UserDetails API Response';
export const GET_USER_DETAILS_SESSION_DATA =
    '[ACCOUNTOPENINGUSERDETAILS] Get UserDetails Session Data';
export const GET_USER_DETAIL_FIELD_OPTIONS_API =
    '[ACCOUNTOPENINGUSERDETAILFIELDS] Get User Details Field Options API';
export const GET_USER_DETAIL_FIELD_OPTIONS_API_RESPONSE =
    '[ACCOUNTOPENINGUSERDETAILFIELDS] Get UserDetails Field Options API Response';
export const POST_UTACCOUNT_AUDIT = '[ACCOUNTOPENING] Post UTAccount Audit';
export const POST_UTACCOUNT_AUDIT_RESPONSE = '[ACCOUNTOPENING] Post UTAccount Audit Response';

export class GetAccountOpeningApi implements Action {
    readonly type = GET_ACCOUNT_OPENING_API;

    constructor(public payload: string) {}
}

export class PostAccountOpeningAuditApi implements Action {
    readonly type = POST_UTACCOUNT_AUDIT;

    constructor(public payload: any) {}
}

export class PostAccountOpeningAuditApiResponse implements Action {
    readonly type = POST_UTACCOUNT_AUDIT_RESPONSE;

    constructor(public payload: any) {}
}

export class GetAccountOpeningApiResponse implements Action {
    readonly type = GET_ACCOUNT_OPENING_API_RESPONSE;

    constructor(public payload: any) {}
}
export class GetUserDetailsApi implements Action {
    readonly type = GET_USER_DETAILS_API;

    constructor(public payload: string) {}
}

export class GetUserDetailsApiResponse implements Action {
    readonly type = GET_USER_DETAILS_API_RESPONSE;

    constructor(public payload: any) {}
}
export class GetUserDetailsSessionData implements Action {
    readonly type = GET_USER_DETAILS_SESSION_DATA;

    constructor(public payload: any) {}
}
export class GetUserDetailFieldOptionsApi implements Action {
    readonly type = GET_USER_DETAIL_FIELD_OPTIONS_API;

    constructor(public payload: string) {}
}

export class GetUserDetailFieldOptionsApiResponse implements Action {
    readonly type = GET_USER_DETAIL_FIELD_OPTIONS_API_RESPONSE;

    constructor(public payload: any) {}
}

export type Actions =
    | GetAccountOpeningApi
    | GetAccountOpeningApiResponse
    | GetUserDetailsApi
    | GetUserDetailsApiResponse
    | GetUserDetailFieldOptionsApi
    | GetUserDetailFieldOptionsApiResponse
    | GetUserDetailsSessionData
    | PostAccountOpeningAuditApi
    | PostAccountOpeningAuditApiResponse
