import { Action } from '@ngrx/store';

import { Fund } from '../../model/fund.model';

export const ADD_TO_CART = '[Cart] Add to Cart';
export const REMOVE_TO_CART = '[Cart] Remove from Cart';
export const TOGGLE_EDIT_CART_ITEM = '[Cart] Toggle Edit Cart Item';
export const UPDATE_ITEM_IN_CART = '[Cart] Update Item in Cart';
export const CLEAR_CART = '[Cart] Clear Cart';
export const UPDATE_CART_PURCHASE_STATUS = '[Cart] Update Cart Purchase Status';
export const ADD_TO_CART_REDEEM = '[Cart] Add to Cart Redeem';
export const REMOVE_FROM_CART_REDEEM = '[Cart] Remove from Cart Redeem';
export const UPDATE_ITEM_IN_CART_REDEEM = '[Cart] Update Item in Cart Redeem';
export const REMOVE_FROM_CART_DASHBOARD_TOPUP = '[Cart] Remove from Cart Dashboard Topup';
export const REMOVE_FROM_CART_DASHBOARD_REDEEM = '[Cart] Remove from Cart Dashboard Redeem';
export const CALL_OTP_API = '[Cart] Call Otp Api';
export const CALL_OTP_SUCCESS = '[Cart] Call Otp Success';
export const CALL_OTP_FAIL = '[Cart] Call Otp Fail';
export const VERIFY_OTP_API = '[Cart] Verify Otp Api';
export const VERIFY_OTP_SUCCESS = '[Cart] Verify Otp Success';
export const VERIFY_OTP_FAIL = '[Cart] Verify Otp Fail';

export const POST_ALL_TRANSACTION_API = '[Cart] Post All Transaction Api';
export const POST_ALL_TRANSACTION_SUCCESS = '[Cart] Post All Transaction Success';
export const POST_ALL_TRANSACTION_FAIL = '[Cart] Post All Transaction Fail';

export const TOGGLE_CART_FOOTER = '[Cart] Toggle Cart Footer';
export const TOGGLE_CART_ICON_HEADER = '[Cart] Toggle Cart Icon Header';

export const CREATE_CART_API = '[Cart] Create Cart Api';
export const CREATE_CART_SUCCESS = '[Cart] Create Cart Success';
export const CREATE_CART_FAIL = '[Cart] Create Cart Fail';

export const UPDATE_CART_BY_CLIENT_ID_API = '[Cart] Update Cart By Client Id Api';
export const UPDATE_CART_BY_CLIENT_ID_SUCCESS = '[Cart] Update Cart By Client Id Success';
export const UPDATE_CART_BY_CLIENT_ID_FAIL = '[Cart] Update Cart By Client Id Fail';

export const GET_CART_BY_CLIENT_ID = '[Cart] Get Cart By Client Id';
export const GET_CART_BY_CLIENT_ID_SUCCESS = '[Cart] Get Cart By Client Id Success';
export const GET_CART_BY_CLIENT_ID_FAIL = '[Cart] Get Cart By Client Id Fail';
export const SELECTED_CASA_ACCOUNT_INDEX = '[Cart] Selected Casa Account Index';

export const SWITCH_CART_API = '[Cart] switch Cart Api';
export const SWITCH_CART_SUCCESS = '[Cart] switch Cart Success';
export const SWITCH_CART_FAIL = '[Cart] switch Cart Fail';

export const DELETE_CART_BY_CLIENT_ID_API = '[Cart] delete Cart By Client Id Api';
export const DELETE_CART_BY_CLIENT_ID_SUCCESS = '[Cart] delete Cart By Client Id Success';
export const DELETE_CART_BY_CLIENT_ID_FAIL = '[Cart] delete Cart By Client Id Fail';
export const STORE_TRANSACTION = '[Cart] Store Transaction';
export const STORE_SCHEDULER_MSG = '[Cart] Store Scheduler Msg';
export const UPDATE_CART_UTACCOUNT = '[Cart] Update Cart UT Account';
export const UPDATE_CART_UTACCOUNTNO_API = '[Cart] Update User UT Account Number for Cart';
export const UPDATE_CART_UTACCOUNTNO_API_SUCCESS =
    '[Cart] Update User UT Account Number for Cart Sucess';
export class AddtoCart implements Action {
    readonly type = ADD_TO_CART;

    constructor(
        public fund: Fund,
        public index: string,
        public amount: string,
        public flow: string,
        public existingCheck: boolean,
        public source: string,
    ) {}
}

export class RemoveFromCart implements Action {
    readonly type = REMOVE_TO_CART;

    constructor(public index: number) {}
}

export class ToggleEditCartItem implements Action {
    readonly type = TOGGLE_EDIT_CART_ITEM;

    constructor(public index: number, public editToggle: boolean) {}
}

export class UpdateItemAmount implements Action {
    readonly type = UPDATE_ITEM_IN_CART;

    constructor(public index: number, public amount: number) {}
}

export class ClearCart implements Action {
    readonly type = CLEAR_CART;
    constructor(public payload: boolean) {}
}

export class UpdateCartPurchaseStatus implements Action {
    readonly type = UPDATE_CART_PURCHASE_STATUS;
    constructor(
        public accountName: string,
        public paymentAccount: string,
        public referenceNumber: string,
        public transactionSuccessStatus: boolean,
        public transactionStatus: string,
        public transactionStatusName: string,
        public transactionStatusText: string,
        public transactionDate: string,
        public transactionWorkingDays: string,
    ) {}
}

export class AddtoCartRedeem implements Action {
    readonly type = ADD_TO_CART_REDEEM;

    constructor(
        public fund: Fund,
        public index: string,
        public unit: string,
        public amount: string,
        public flow: string,
        public existingCheck: boolean,
        public source: string,
    ) {}
}

export class RemoveFromCartRedeem implements Action {
    readonly type = REMOVE_FROM_CART_REDEEM;

    constructor(public index: number) {}
}

export class UpdateItemRedeemUnit implements Action {
    readonly type = UPDATE_ITEM_IN_CART_REDEEM;

    constructor(public index: number, public unit: number) {}
}

export class RemoveFromCartTopupDashboard implements Action {
    readonly type = REMOVE_FROM_CART_DASHBOARD_TOPUP;

    constructor(public fund_code: string, public flow: string) {}
}

export class RemoveFromCartRedeemDashboard implements Action {
    readonly type = REMOVE_FROM_CART_DASHBOARD_REDEEM;

    constructor(public fund_code: string, public flow: string) {}
}

export class VerifyOTPApi implements Action {
    readonly type = VERIFY_OTP_API;

    constructor(public payload: any) {}
}

export class VerifyOtpSuccess implements Action {
    readonly type = VERIFY_OTP_SUCCESS;

    constructor(public payload: string) {}
}

export class VerifyOtpFail implements Action {
    readonly type = VERIFY_OTP_FAIL;

    constructor(public payload: string) {}
}

export class RequestOtpApi implements Action {
    readonly type = CALL_OTP_API;

    constructor(public payload: any) {}
}

export class RequestOtpSuccess implements Action {
    readonly type = CALL_OTP_SUCCESS;

    constructor(public payload: string) {}
}

export class RequestOtpFail implements Action {
    readonly type = CALL_OTP_FAIL;

    constructor(public payload: string) {}
}

export class PostAllTransaction implements Action {
    readonly type = POST_ALL_TRANSACTION_API;

    constructor(public payload: string, public clientId: string) {}
}

export class PostAllTransactionSuccess implements Action {
    readonly type = POST_ALL_TRANSACTION_SUCCESS;

    constructor(public payload: string, public request: string) {}
}

export class PostAllTransactionFail implements Action {
    readonly type = POST_ALL_TRANSACTION_FAIL;

    constructor(public payload: string) {}
}

export class ToggleCartFooter implements Action {
    readonly type = TOGGLE_CART_FOOTER;

    constructor(public payload: boolean) {}
}

export class ToggleCartIconHeader implements Action {
    readonly type = TOGGLE_CART_ICON_HEADER;

    constructor(public payload: boolean) {}
}

export class CreateCart implements Action {
    readonly type = CREATE_CART_API;

    constructor(
        public payload: string,
        public fund: Fund,
        public index: string,
        public unit: string,
        public amount: string,
        public flow: string,
        public existingCheck: boolean,
        public source: string,
        public clientId: string,
    ) {}
}

export class CreateCartSuccess implements Action {
    readonly type = CREATE_CART_SUCCESS;

    constructor(public payload: string) {}
}

export class CreateCartFail implements Action {
    readonly type = CREATE_CART_FAIL;

    constructor(public payload: string) {}
}

export class UpdateCartByClientId implements Action {
    readonly type = UPDATE_CART_BY_CLIENT_ID_API;

    constructor(
        public clientId: string,
        public payload: string,
        public fund: Fund,
        public index: string,
        public unit: string,
        public amount: string,
        public flow: string,
        public existingCheck: boolean,
        public source: string,
    ) {}
}

export class UpdateCartByClientIdSuccess implements Action {
    readonly type = UPDATE_CART_BY_CLIENT_ID_SUCCESS;

    constructor(public payload: string) {}
}

export class UpdateCartByClientIdFail implements Action {
    readonly type = UPDATE_CART_BY_CLIENT_ID_FAIL;

    constructor(public payload: string) {}
}

export class GetCartByClientId implements Action {
    readonly type = GET_CART_BY_CLIENT_ID;

    constructor(public clientId: string) {}
}

export class GetCartByClientIdSuccess implements Action {
    readonly type = GET_CART_BY_CLIENT_ID_SUCCESS;

    constructor(public payload: string) {}
}

export class GetCartByClientIddFail implements Action {
    readonly type = GET_CART_BY_CLIENT_ID_FAIL;

    constructor(public payload: string) {}
}

export class SelectedCasaAccountIndex implements Action {
    readonly type = SELECTED_CASA_ACCOUNT_INDEX;

    constructor(public index: number) {}
}

export class SwitchCart implements Action {
    readonly type = SWITCH_CART_API;

    constructor(
        public payload: string,
        public fund: Fund,
        public index: string,
        public unit: string,
        public amount: string,
        public flow: string,
        public existingCheck: boolean,
        public source: string,
        public clientId: string,
    ) {}
}

export class SwitchCartFail implements Action {
    readonly type = SWITCH_CART_FAIL;

    constructor(public payload: string) {}
}

export class DeleteCart implements Action {
    readonly type = DELETE_CART_BY_CLIENT_ID_API;

    constructor(public clientId: string) {}
}
export class DeleteCartFail implements Action {
    readonly type = DELETE_CART_BY_CLIENT_ID_FAIL;

    constructor(public payload: string) {}
}

export class StoreTransaction implements Action {
    readonly type = STORE_TRANSACTION;

    constructor(public payload: any) {}
}
export class StoreSchedulerMsg implements Action {
    readonly type = STORE_SCHEDULER_MSG;

    constructor(public payload: string) {}
}

export class UpdateCartUTAccount implements Action {
    readonly type = UPDATE_CART_UTACCOUNT;

    constructor(public utAccount: string) {}
}

export class UpdateUTAccountNoCartAPI implements Action {
    readonly type = UPDATE_CART_UTACCOUNTNO_API;

    constructor(public clientId: string, public utAccountNo: string) {}
}

export class UpdateUTAccountNoCartAPISuccess implements Action {
    readonly type = UPDATE_CART_UTACCOUNTNO_API_SUCCESS;

    constructor(public payload: any) {}
}

export type Actions =
    | AddtoCart
    | RemoveFromCart
    | ToggleEditCartItem
    | UpdateItemAmount
    | ClearCart
    | UpdateCartPurchaseStatus
    | AddtoCartRedeem
    | RemoveFromCartRedeem
    | UpdateItemRedeemUnit
    | RemoveFromCartTopupDashboard
    | RemoveFromCartRedeemDashboard
    | VerifyOTPApi
    | VerifyOtpSuccess
    | VerifyOtpFail
    | RequestOtpSuccess
    | RequestOtpFail
    | PostAllTransaction
    | PostAllTransactionSuccess
    | PostAllTransactionFail
    | ToggleCartFooter
    | ToggleCartIconHeader
    | CreateCart
    | CreateCartSuccess
    | CreateCartFail
    | UpdateCartByClientId
    | UpdateCartByClientIdSuccess
    | UpdateCartByClientIdFail
    | GetCartByClientId
    | GetCartByClientIdSuccess
    | GetCartByClientIddFail
    | SelectedCasaAccountIndex
    | SwitchCart
    | SwitchCartFail
    | DeleteCartFail
    | StoreTransaction
    | StoreSchedulerMsg
    | UpdateCartUTAccount
    | UpdateUTAccountNoCartAPI
    | UpdateUTAccountNoCartAPISuccess;
