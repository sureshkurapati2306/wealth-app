import { Action } from '@ngrx/store';

import { User } from '../../model/user.model';
import { UTAccount } from '../../model/ut_account.model';

export const ADD_USER = '[User] Add User';
export const ADD_CIF_NUMBER = '[Customer] Add Cif Number';
export const UPDATE_USER = '[User] Update User';
export const GET_DASHBOARD_DATA = '[User] Get Dashboard Data';
export const STORE_DASHBOARD_DATA = '[User] Store Dashboard Data';
export const STORE_DASHBOARD_DATA_SUCCESS = '[User] Store Dashboard Data Success';
export const CLEAR_DASHBOARD_DATA = '[User] Clear Dashboard Data';
export const STORE_DASHBOARD_SCREEN_DATA = '[User] Store Dashboard Screen Data';
export const UPDATE_SELECTED_UNIT_TRUST_ACCOUNT = '[User] Update Selected Unit Trust Account';
export const UPDATE_UNIT_TRUST_ACCOUNT_LIST = '[User] Update Unit Trust Account List';
export const UPDATE_GEOLOCATION = '[User] update geolocation';
export const UPDATE_USER_NAME = '[User] Update User Name';
export const GET_USER_TYPE = '[User] Get User Type';
export const STORE_USER_TYPE_RESPONSE = '[User] Store User Type Response';
export const UPDATE_USER_TYPE = '[User] Update User Type';
export const STORE_RISK_PROFILE_STATUS = '[User] Store Risk Profile Status';
export const UPDATE_USER_MOBILE_NUMBER = '[User] Update User Mobile Number';
export const STORE_SESSION_RESPONSE = '[User] Store Session Response';
export const STORE_SESSION_DATA = '[User] Store Session Data';
export const UPDATE_RISK_PROFILE = '[User] Update Risk Profile';
export const UPDATE_CUSTOMER_ID_TYPE = '[User] Update Customer ID Type';
export const UPDATE_CIMB_STAFF_INDICATOR = '[User] Update Cimb Staff Indicator';
export const UPDATE_SOLE_PROP_INDICATOR = '[User] Update Sole Prop Indicator';
export const GET_USER_UTACCOUNT_INFO = '[User] Get User UT Account Info';
export const STORE_USER_LOGINTIME = '[User] Store User Login Time';
export const STORE_FOREIGNER_IND = '[User] Store Foreigner Ind';
export const STORE_OCCUPATION_IND = '[User] Store Occupation Ind';

export class AddUser implements Action {
    readonly type = ADD_USER;

    constructor(public payload: User) {}
}
export class UpdateUser implements Action {
    readonly type = UPDATE_USER;

    constructor(public payload: User) {}
}
export class GetDashboard implements Action {
    readonly type = GET_DASHBOARD_DATA;

    constructor(public payload: string) {}
}

export class StoreDashboardData implements Action {
    readonly type = STORE_DASHBOARD_DATA;

    constructor(public payload: string) {}
}

export class StoreDashboardDataSuccess implements Action {
    readonly type = STORE_DASHBOARD_DATA_SUCCESS;
}

export class ClearDashboardData implements Action {
    readonly type = CLEAR_DASHBOARD_DATA;

    constructor(public payload: string) {}
}
export class StoreDashboardScreenData implements Action {
    readonly type = STORE_DASHBOARD_SCREEN_DATA;

    constructor(public payload: string) {}
}

export class StoreUnitTrustAccountList implements Action {
    readonly type = UPDATE_UNIT_TRUST_ACCOUNT_LIST;

    constructor(public payload: UTAccount[]) {}
}

export class SelectedUnitTrustAccount implements Action {
    readonly type = UPDATE_SELECTED_UNIT_TRUST_ACCOUNT;

    constructor(public payload: string) {}
}

export class UpdateUserName implements Action {
    readonly type = UPDATE_USER_NAME;

    constructor(public payload: string) {}
}
export class GetUserType implements Action {
    readonly type = GET_USER_TYPE;

    constructor(public payload: string) {}
}
export class StoreUserTypeResponse implements Action {
    readonly type = STORE_USER_TYPE_RESPONSE;

    constructor(public payload: any) {}
}

export class UpdateUserDetails implements Action {
    readonly type = UPDATE_USER_TYPE;

    constructor(
        public customerIdType: string,
    ) {}
}

export class StoreRiskProfileStatus implements Action {
    readonly type = STORE_RISK_PROFILE_STATUS;

    constructor(public payload: string) {}
}

export class UpdateUserMobileNumber implements Action {
    readonly type = UPDATE_USER_MOBILE_NUMBER;

    constructor(public payload: string) {}
}

export class StoreSessionResponse implements Action {
    readonly type = STORE_SESSION_RESPONSE;

    constructor(public payload: any) {}
}

export class GetSessionIDResponse implements Action {
    readonly type = STORE_SESSION_DATA;

    constructor(public payload: any) {}
}

export class UpdateRiskProfile implements Action {
    readonly type = UPDATE_RISK_PROFILE;

    constructor(public payload: any) {}
}

export class UpdateCustomerIdType implements Action {
    readonly type = UPDATE_CUSTOMER_ID_TYPE;

    constructor(public payload: any) {}
}

export class UpdateCIMBStaffIndicator implements Action {
    readonly type = UPDATE_CIMB_STAFF_INDICATOR;

    constructor(public payload: any) {}
}

export class UpdateUserSoleProp implements Action {
    readonly type = UPDATE_SOLE_PROP_INDICATOR;

    constructor(public payload: any) {}
}

export class GetUserUTAccountInfo implements Action {
    readonly type = GET_USER_UTACCOUNT_INFO;

    constructor(public customerIDNumber: string) {}
}

export class StoreUserLoginTime implements Action {
    readonly type = STORE_USER_LOGINTIME;

    constructor(public loginTime: number) {}
}

export class StoreForeignerInd implements Action {
    readonly type = STORE_FOREIGNER_IND;

    constructor(public foreignerInd: string) {}
}

export class StoreOccupationInd implements Action {
    readonly type = STORE_OCCUPATION_IND;

    constructor(public occupationInd: string) {}
}

export type Actions =
    | AddUser
    | UpdateUser
    | GetDashboard
    | StoreDashboardData
    | StoreDashboardDataSuccess
    | ClearDashboardData
    | StoreDashboardScreenData
    | StoreUnitTrustAccountList
    | SelectedUnitTrustAccount
    | UpdateUserName
    | GetUserType
    | StoreUserTypeResponse
    | UpdateUserDetails
    | StoreRiskProfileStatus
    | UpdateUserMobileNumber
    | StoreSessionResponse
    | GetSessionIDResponse
    | UpdateRiskProfile
    | UpdateCustomerIdType
    | UpdateCIMBStaffIndicator
    | UpdateUserSoleProp
    | GetUserUTAccountInfo
    | StoreUserLoginTime
    | StoreForeignerInd
    | StoreOccupationInd;
