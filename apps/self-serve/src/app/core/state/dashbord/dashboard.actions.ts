import { Action } from '@ngrx/store';

import { Dashboard } from '../../model/dashboard.model';
import { FundLlist } from '../../model/fund_list.model';

export const GET_DASHBOARD_DATA = '[Dashboard] Get Dashboard Data';
export const CALL_DASHBOARD_API = '[Dashboard] Call Dashboard Api';
export const STORE_DASHBOARD_API_RESPONSE =
  '[Dashboard] Store Dashboard Api Response';
export const STORE_DASHBOARD_DATA_DISPLAY_FLAG =
  '[Dashboard] Store Dashboard Data display Api Response';
export const UPDATE_CART_ITEM_IN_FUND = '[Dashboard] Update cart Item in Fund';
//Transaction history
export const GET_PURCHASE_DETAIL = '[Dashboard] Get Purchase Detail';
export const STORE_PURCHASE_DETAIL_RESPONSE = '[Dashboard] Store Purchase Detail Response'
export const UPDATE_CART_UT_ACCOUNT = '[Dashboard] Cart UT Account';

export class GetDashboardApi implements Action {
  readonly type = GET_DASHBOARD_DATA;

  constructor(public payload: string) {}
}

export class CallDashboardApi implements Action {
  readonly type = CALL_DASHBOARD_API;

  constructor(public payload: string) {}
}

export class StoreDashboardApiResponse implements Action {
  readonly type = STORE_DASHBOARD_API_RESPONSE;
  displayFlag: any;

  constructor(public payload: Dashboard) {}
}

export class AddDisplayFlagDashboardApiResponse implements Action {
  readonly type = STORE_DASHBOARD_DATA_DISPLAY_FLAG;

  constructor(
    public payload: Dashboard,
    public displayFlag: boolean) {}
}

export class UpdateCartItemInFund implements Action {
  readonly type = UPDATE_CART_ITEM_IN_FUND;

  constructor(public payload: FundLlist, public flow, public value, public indicativeAmount) {}
}

//Transaction history
export class GetPurchaseDetail implements Action {
  readonly type = GET_PURCHASE_DETAIL;

  constructor(public payload: string) {}
}

export class StorePurchaseDetailResponse implements Action {
  readonly type = STORE_PURCHASE_DETAIL_RESPONSE;

  constructor(public payload: any) {}

}
export class UpdateCartUTAccount implements Action {
  readonly type = UPDATE_CART_UT_ACCOUNT;

  constructor(public payload: any) {}

}

export type Actions = GetDashboardApi
| CallDashboardApi
| StoreDashboardApiResponse
| AddDisplayFlagDashboardApiResponse
| UpdateCartItemInFund
| GetPurchaseDetail
| StorePurchaseDetailResponse
| UpdateCartUTAccount;
