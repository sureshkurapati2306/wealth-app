
// import { Fund } from '../../model/fund.model';
import {
  ADD_TO_CART,
  REMOVE_TO_CART,
  TOGGLE_EDIT_CART_ITEM,
  AddtoCart,
  RemoveFromCart,
  ToggleEditCartItem,
  UpdateItemAmount,
  UPDATE_ITEM_IN_CART,
  ClearCart,
  UpdateCartPurchaseStatus,
  UPDATE_CART_PURCHASE_STATUS,
  ADD_TO_CART_REDEEM,
  AddtoCartRedeem,
  REMOVE_FROM_CART_REDEEM,
  RemoveFromCartRedeem,
  UPDATE_ITEM_IN_CART_REDEEM,
  UpdateItemRedeemUnit,
  RemoveFromCartTopupDashboard,
  REMOVE_FROM_CART_DASHBOARD_TOPUP,
  RemoveFromCartRedeemDashboard,
  REMOVE_FROM_CART_DASHBOARD_REDEEM,
  VerifyOTPApi,
  VERIFY_OTP_API,
  VerifyOtpSuccess,
  VERIFY_OTP_SUCCESS,
  VerifyOtpFail,
  VERIFY_OTP_FAIL,
  RequestOtpApi,
  CALL_OTP_API,
  RequestOtpSuccess,
  CALL_OTP_SUCCESS,
  RequestOtpFail,
  CALL_OTP_FAIL,
  PostAllTransaction,
  POST_ALL_TRANSACTION_API,
  PostAllTransactionSuccess,
  POST_ALL_TRANSACTION_SUCCESS,
  PostAllTransactionFail,
  POST_ALL_TRANSACTION_FAIL,
  ToggleCartFooter,
  TOGGLE_CART_FOOTER,
  ToggleCartIconHeader,
  TOGGLE_CART_ICON_HEADER,
  STORE_SCHEDULER_MSG,

} from './cart.actions';

import * as CartAction from './cart.actions';

describe('AddUser', () => {
  it('should create an action AddtoCart', () => {
    const fund = null;
    const amount = '0.00';
    const index = '0';
    const flow = '001';
    const source = 'dashboard';
    const existingCheck = false;
    const action = new AddtoCart(
      fund,
      index,
      amount,
      flow,
      existingCheck,
      source
    );

    expect({ ...action }).toEqual({
      type: ADD_TO_CART,
      fund,
      index,
      amount,
      flow,
      existingCheck,
      source,
    });
  });

  it('should create an action RemoveFromCart', () => {
    const index = 0;
    const action = new RemoveFromCart(index);

    expect({ ...action }).toEqual({
      type: REMOVE_TO_CART,
      index,
    });
  });

  it('should create an action ToggleEditCartItem', () => {
    const index = 0;
    const editToggle = false;
    const action = new ToggleEditCartItem(index, editToggle);

    expect({ ...action }).toEqual({
      type: TOGGLE_EDIT_CART_ITEM,
      index,
      editToggle,
    });
  });

  it('should create an action UpdateItemAmount', () => {
    const index = 0;
    const amount = 0;
    const action = new UpdateItemAmount(index, amount);

    expect({ ...action }).toEqual({
      type: UPDATE_ITEM_IN_CART,
      index,
      amount,
    });
  });

  it('should create an action ClearCart', () => {
    const action = new ClearCart(true);

    expect({ ...action }).toBeTruthy();
  });

  it('should create an action UpdateCartPurchaseStatus', () => {
    const accountName = 'test';
    const paymentAccount = '111111111111111111';
    const referenceNumber = '111111';
    const transactionSuccessStatus = true;
    const transactionStatus = 'Success';
    const transactionStatusName = 'Success';
    const transactionStatusText = 'Pending Processing';
    const transactionDate = '11-Oct-21';
    const transactionWorkingDays = '3';

    const action = new UpdateCartPurchaseStatus(
      accountName,
      paymentAccount,
      referenceNumber,
      transactionSuccessStatus,
      transactionStatusName,
      transactionStatus,
      transactionStatusText,
      transactionDate,
      transactionWorkingDays
    );

    expect({ ...action }).toEqual({
      type: UPDATE_CART_PURCHASE_STATUS,
      accountName,
      paymentAccount,
      referenceNumber,
      transactionSuccessStatus,
      transactionStatusName,
      transactionStatus,
      transactionStatusText,
      transactionDate,
      transactionWorkingDays,
    });
  });

  it('should create an action AddtoCartRedeem', () => {
    const fund = null;
    const unit = '0.00';
    const amount = '0.00';
    const index = '0';
    const flow = '001';
    const existingCheck = false;
    const source = 'dashboard';
    const action = new AddtoCartRedeem(
      fund,
      index,
      unit,
      amount,
      flow,
      existingCheck,
      source
    );

    expect({ ...action }).toEqual({
      type: ADD_TO_CART_REDEEM,
      fund,
      index,
      unit,
      amount,
      flow,
      existingCheck,
      source,
    });
  });

  it('should create an action RemoveFromCartRedeem', () => {
    const index = 0;
    const action = new RemoveFromCartRedeem(index);

    expect({ ...action }).toEqual({
      type: REMOVE_FROM_CART_REDEEM,
      index,
    });
  });

  it('should create an action UpdateItemRedeemUnit', () => {
    const index = 0;
    const unit = 100000;

    const action = new UpdateItemRedeemUnit(index, unit);

    expect({ ...action }).toEqual({
      type: UPDATE_ITEM_IN_CART_REDEEM,
      index,
      unit,
    });
  });

  it('should create an action RemoveFromCartTopupDashboard', () => {
    const fund_code = '100';
    const flow = 'topup';

    const action = new RemoveFromCartTopupDashboard(fund_code, flow);

    expect({ ...action }).toEqual({
      type: REMOVE_FROM_CART_DASHBOARD_TOPUP,
      fund_code,
      flow,
    });
  });

  it('should create an action RemoveFromCartRedeemDashboard', () => {
    const fund_code = '100';
    const flow = 'topup';

    const action = new RemoveFromCartRedeemDashboard(fund_code, flow);

    expect({ ...action }).toEqual({
      type: REMOVE_FROM_CART_DASHBOARD_REDEEM,
      fund_code,
      flow,
    });
  });

  it('should create an action VerifyOTPApi', () => {
    const otp = {
      otp: {
          mobileNumber: "01128662653"
      },
      audit: {
          clientId: "124",
          moduleName: "SMS TAC",
          eventName: "Request SMS TAC",
          channelName: "Web Browser",
          browserName: "Chrome",
          osVersion: "Win10",
          ipAddress: "12.1.2.1"
      }
    }

    const action = new VerifyOTPApi(otp);

    expect({ ...action }).toEqual({
      type: VERIFY_OTP_API,
      payload: {
        otp: {
          mobileNumber: "01128662653"
        },
        audit: {
          clientId: "124",
          moduleName: "SMS TAC",
          eventName: "Request SMS TAC",
          channelName: "Web Browser",
          browserName: "Chrome",
          osVersion: "Win10",
          ipAddress: "12.1.2.1"
        }
      }
    });
  });

  it('should create an action VerifyOtpSuccess ', () => {
    const payload = 'data';

    const action = new VerifyOtpSuccess(payload);

    expect({ ...action }).toEqual({
      type: VERIFY_OTP_SUCCESS,
      payload,
    });
  });
  

  it('should create an action VerifyOtpFail ', () => {
    const payload = 'data';

    const action = new VerifyOtpFail(payload);

    expect({ ...action }).toEqual({
      type: VERIFY_OTP_FAIL,
      payload,
    });
  });

  it('should create an action RequestOtpApi  ', () => {
    const otp = {
      otp: {
          mobileNumber: "01128662653"
      },
      audit: {
          clientId: "124",
          moduleName: "SMS TAC",
          eventName: "Request SMS TAC",
          channelName: "Web Browser",
          browserName: "Chrome",
          osVersion: "Win10",
          ipAddress: "12.1.2.1"
      }
    }

    const action = new RequestOtpApi(otp);

    expect({ ...action }).toEqual({
      type: CALL_OTP_API,
      payload: {
        otp: {
          mobileNumber: "01128662653"
        },
        audit: {
          clientId: "124",
          moduleName: "SMS TAC",
          eventName: "Request SMS TAC",
          channelName: "Web Browser",
          browserName: "Chrome",
          osVersion: "Win10",
          ipAddress: "12.1.2.1"
        }
      }
    });
  });

  it('should create an action RequestOtpSuccess ', () => {
    const payload = 'data';

    const action = new RequestOtpSuccess(payload);

    expect({ ...action }).toEqual({
      type: CALL_OTP_SUCCESS,
      payload,
    });
  });

  it('should create an action RequestOtpFail ', () => {
    const payload = 'data';

    const action = new RequestOtpFail(payload);

    expect({ ...action }).toEqual({
      type: CALL_OTP_FAIL,
      payload,
    });
  });

  it('should create an action PostAllTransaction ', () => {
    const payload = 'data';
    const clientId = '001';

    const action = new PostAllTransaction(payload,clientId);

    expect({ ...action }).toEqual({
      type: POST_ALL_TRANSACTION_API,
      payload,
      clientId
    });
  });

  it('should create an action PostAllTransactionSuccess ', () => {
    const payload = 'data';
    const request = 'data';

    const action = new PostAllTransactionSuccess(payload,request);

    expect({ ...action }).toEqual({
      type: POST_ALL_TRANSACTION_SUCCESS,
      payload,
      request
    });
  });

  it('should create an action PostAllTransactionFail ', () => {
    const payload = 'data';

    const action = new PostAllTransactionFail(payload);

    expect({ ...action }).toEqual({
      type: POST_ALL_TRANSACTION_FAIL,
      payload,
    });
  });

  it('should create an action ToggleCartFooter ', () => {
    const payload = true;

    const action = new ToggleCartFooter(payload);

    expect({ ...action }).toEqual({
      type: TOGGLE_CART_FOOTER,
      payload,
    });
  });

  it('should create an action ToggleCartIconHeader ', () => {
    const payload = true;

    const action = new ToggleCartIconHeader(payload);

    expect({ ...action }).toEqual({
      type: TOGGLE_CART_ICON_HEADER,
      payload,
    });
  });

  it('should create an action CreateCart ', () => {
    const payload = '';
    const fund= null;
    const index= "0";
    const unit= "500";
    const amount= "5000";
    const flow= "001";
    const existingCheck= true;
    const source= "dash";
    const clientId= "0001";
    const action = new CartAction.CreateCart(payload,fund,index,unit, amount, flow, existingCheck, source,clientId);

    expect({ ...action }).toEqual({
      type: CartAction.CREATE_CART_API,
      payload,fund,index,unit, amount, flow, existingCheck, source,clientId
    });
  });

  it('should create an action CreateCartSuccess ', () => {
    const payload = '';

    const action = new CartAction.CreateCartSuccess(payload);

    expect({ ...action }).toEqual({
      type: CartAction.CREATE_CART_SUCCESS,
      payload,
    });
  });

  it('should create an action CreateCartFail ', () => {
    const payload = '';

    const action = new CartAction.CreateCartFail(payload);

    expect({ ...action }).toEqual({
      type: CartAction.CREATE_CART_FAIL,
      payload,
    });
  });

  // it('should create an action UpdateCartByClientId ', () => {
  //   const payload = '';
  //   const clientId = '';

  //   const action = new CartAction.UpdateCartByClientId(clientId,payload);

  //   expect({ ...action }).toEqual({
  //     type: CartAction.UPDATE_CART_BY_CLIENT_ID_API,
  //     clientId,
  //     payload,
  //   });
  // });

  it('should create an action UpdateCartByClientIdSuccess ', () => {
    const payload = '';

    const action = new CartAction.UpdateCartByClientIdSuccess(payload);

    expect({ ...action }).toEqual({
      type: CartAction.UPDATE_CART_BY_CLIENT_ID_SUCCESS,
      payload,
    });
  });

  it('should create an action UpdateCartByClientIdFail ', () => {
    const payload = '';

    const action = new CartAction.UpdateCartByClientIdFail(payload);

    expect({ ...action }).toEqual({
      type: CartAction.UPDATE_CART_BY_CLIENT_ID_FAIL,
      payload,
    });
  });

  it('should create an action GetCartByClientId ', () => {
    const clientId = '';

    const action = new CartAction.GetCartByClientId(clientId);

    expect({ ...action }).toEqual({
      type: CartAction.GET_CART_BY_CLIENT_ID,
      clientId,
    });
  });

  it('should create an action GetCartByClientIdSuccess ', () => {
    const payload = 'data';

    const action = new CartAction.GetCartByClientIdSuccess(payload);

    expect({ ...action }).toEqual({
      type: CartAction.GET_CART_BY_CLIENT_ID_SUCCESS,
      payload,
    });
  });

  it('should create an action GetCartByClientIddFail ', () => {
    const payload = '';

    const action = new CartAction.GetCartByClientIddFail(payload);

    expect({ ...action }).toEqual({
      type: CartAction.GET_CART_BY_CLIENT_ID_FAIL,
      payload,
    });
  });

  it('should create an action SelectedCasaAccountIndex ', () => {
    const index = 0;

    const action = new CartAction.SelectedCasaAccountIndex(index);

    expect({ ...action }).toEqual({
      type: CartAction.SELECTED_CASA_ACCOUNT_INDEX,
      index,
    });
  });


  it('should create an action SwitchCartFail ', () => {
    const payload = 'data';

    const action = new CartAction.SwitchCartFail(payload);

    expect({ ...action }).toEqual({
      type: CartAction.SWITCH_CART_FAIL,
      payload,
    });
  });

  it('should create an action DeleteCart ', () => {
    const clientId = 'data';

    const action = new CartAction.DeleteCart(clientId);

    expect({ ...action }).toEqual({
      type: CartAction.DELETE_CART_BY_CLIENT_ID_API,
      clientId,
    });
  });

  it('should create an action DeleteCartFail ', () => {
    const payload = 'data';

    const action = new CartAction.DeleteCartFail(payload);

    expect({ ...action }).toEqual({
      type: CartAction.DELETE_CART_BY_CLIENT_ID_FAIL,
      payload,
    });
  });


  it('should create an action StoreTransaction ', () => {
    const payload = 'data';

    const action = new CartAction.StoreTransaction(payload);

    expect({ ...action }).toEqual({
      type: CartAction.STORE_TRANSACTION,
      payload,
    });
  });


  it('should create an action StoreSchedulerMsg ', () => {
    const payload = 'data';

    const action = new CartAction.StoreSchedulerMsg(payload);

    expect({ ...action }).toEqual({
      type: CartAction.STORE_SCHEDULER_MSG,
      payload,
    });
  });

});
