import { Store } from './cart.reducer';

import { cartReducer } from './cart.reducer';

import {
    AddtoCart,
    RemoveFromCart,
    ToggleEditCartItem,
    UpdateItemAmount,
    ClearCart,
    UpdateCartPurchaseStatus,
    AddtoCartRedeem,
    RemoveFromCartRedeem,
    UpdateItemRedeemUnit,
    RemoveFromCartTopupDashboard,
    RemoveFromCartRedeemDashboard,
    VerifyOtpSuccess,
    VerifyOtpFail,
    RequestOtpSuccess,
    RequestOtpFail,
    PostAllTransactionFail,
    ToggleCartFooter,
    ToggleCartIconHeader,
    CreateCartSuccess,
    CreateCartFail,
    UpdateCartByClientIdSuccess,
    UpdateCartByClientIdFail,
    GetCartByClientIddFail,
    SelectedCasaAccountIndex,
    SwitchCartFail,
    DeleteCartFail,
    StoreTransaction,
    StoreSchedulerMsg,
    UpdateCartUTAccount,
} from './cart.actions';

export interface Fund {
    class_seq: number;
    risk_rating: string;
}

describe('Cart Reducer', () => {
    const initialState: Store = {
        totalAmount: 0.0,
        totalNetInvestmentAmount: 0.0,
        totalSalesCharges: 0.0,
        totalFundsCount: 0,
        higherRiskFundCategory: 0,
        fundList: [],
        accountName: '',
        unitTrustAccount: '',
        paymentAccount: '',
        referenceNumber: '',
        transactionSuccessStatus: false,
        transactionStatusName: '',
        transactionStatus: '',
        transactionStatusText: '',
        transactionDate: '',
        transactionWorkingDays: '',
        flow: '',
        flow_text: null,
        total_redemption_units: 0,
        total_redemption_amount: 0,

        total_switch_out_units: 0,
        total_switch_in_units: 0,
        total_switch_out_amount: 0,
        total_switch_in_amount: 0,
        otpResponse: null,
        otpResponseMessage: null,
        otpResponseReferenceNumber: null,
        verifyResponse: null,
        verifyResponseMessage: null,
        verifyResponseReferenceNumber: null,

        postAllTransactionResponse: null,

        cartFooterToggle: false,
        showCartIcon: false,
        createCartResponse: null,
        createCartResponseMessage: null,

        updateCartResponse: null,

        getCartByClientIdResponse: null,

        csId: null,
        txnType: null,
        clientId: null,
        selectedCasaAccountIndex: -1,

        switchCartResponse: null,
        deletCartResponse: null,
        storeTransaction: [],
        scheduler_msg: null,
        cartSummaryId: null
    };

    it('should call AddtoCart', () => {
        const fund = null;
        const amount = '0.00';
        const index = '0';
        const flow = '001';
        const source = 'dashboard';
        const existingCheck = false;
        const action = new AddtoCart(fund, index, amount, flow, existingCheck, source);

        const result = cartReducer(initialState, action);

        expect(result).toBe(result);
    });

    it('should call remote to cart', () => {
        const index = 0;

        const action = new RemoveFromCart(index);

        const result = cartReducer(initialState, action);

        expect(result).toBeDefined();
    });

    it('should call ToggleEditCartItem', () => {
        const index = 0;
        const editToggle = true;

        const action = new ToggleEditCartItem(index, editToggle);

        const result = cartReducer(initialState, action);

        expect(result).toBeDefined();
    });

    it('should call UpdateItemAmount', () => {
        const index = 0;
        const amount = 1;

        const action = new UpdateItemAmount(index, amount);

        const result = cartReducer(initialState, action);

        expect(result).toBeDefined();
    });

    it('should call ClearCart', () => {
        const payload = true;

        const action = new ClearCart(payload);

        const result = cartReducer(initialState, action);

        expect(result).toBeDefined();
    });

    it('should call UpdateCartPurchaseStatus', () => {
        const accountName = 'test';
        const paymentAccount = '00001';
        const referenceNumber = '123';
        const transactionSuccessStatus = true;
        const transactionStatus = 'PASS';
        const transactionStatusName = 'abc';
        const transactionStatusText = 'abc';
        const transactionDate = '01/01/2000';
        const transactionWorkingDays = '2';

        const action = new UpdateCartPurchaseStatus(
            accountName,
            paymentAccount,
            referenceNumber,
            transactionSuccessStatus,
            transactionStatus,
            transactionStatusName,
            transactionStatusText,
            transactionDate,
            transactionWorkingDays,
        );

        const result = cartReducer(initialState, action);

        expect(result).toBeDefined();
    });

    it('should call AddtoCartRedeem', () => {
        const fund = null;
        const amount = '0.00';
        const unit = '1';
        const index = '0';
        const flow = '001';
        const source = 'dashboard';
        const existingCheck = false;

        const action = new AddtoCartRedeem(fund, index, unit, amount, flow, existingCheck, source);

        const result = cartReducer(initialState, action);

        expect(result).toBeDefined();
    });

    it('should call RemoveFromCartRedeem', () => {
        const index = 0;

        const action = new RemoveFromCartRedeem(index);

        const result = cartReducer(initialState, action);

        expect(result).toBeDefined();
    });

    it('should call UpdateItemRedeemUnit', () => {
        const index = 0;
        const unit = 1;

        const action = new UpdateItemRedeemUnit(index, unit);

        const result = cartReducer(initialState, action);

        expect(result).toBeDefined();
    });

    it('should call RemoveFromCartTopupDashboard', () => {
        const fund_code = '111';
        const flow = '001';

        const action = new RemoveFromCartTopupDashboard(fund_code, flow);

        const result = cartReducer(initialState, action);

        expect(result).toBeDefined();
    });

    it('should call RemoveFromCartRedeemDashboard', () => {
        const fund_code = '111';
        const flow = '001';

        const action = new RemoveFromCartRedeemDashboard(fund_code, flow);

        const result = cartReducer(initialState, action);

        expect(result).toBeDefined();
    });

    it('should call RequestOtpSuccess', () => {
        const payload = '111111';

        const action = new RequestOtpSuccess(payload);

        const result = cartReducer(initialState, action);

        expect(result).toBeDefined();
    });

    it('should call RequestOtpFail', () => {
        const payload = '111111';

        const action = new RequestOtpFail(payload);

        const result = cartReducer(initialState, action);

        expect(result).toBeDefined();
    });

    it('should call VerifyOtpSuccess', () => {
        const payload = '111111';

        const action = new VerifyOtpSuccess(payload);

        const result = cartReducer(initialState, action);

        expect(result).toBeDefined();
    });

    it('should call VerifyOtpFail', () => {
        const payload = '111111';

        const action = new VerifyOtpFail(payload);

        const result = cartReducer(initialState, action);

        expect(result).toBeDefined();
    });

    it('should call ToggleCartFooter true', () => {
        const payload = true;

        const action = new ToggleCartFooter(payload);

        const result = cartReducer(initialState, action);

        expect(result).toBeDefined();
    });

    it('should call ToggleCartIconHeader false', () => {
        const payload = false;

        const action = new ToggleCartFooter(payload);

        expect(action.payload).toBeFalsy();
    });

    it('should call ToggleCartIconHeader true', () => {
        const payload = true;

        const action = new ToggleCartIconHeader(payload);

        expect(action.payload).toBeTruthy();
    });

    it('should call CreateCartSuccess', () => {
        const payload = '123';

        const action = new CreateCartSuccess(payload);

        const result = cartReducer(initialState, action);

        expect(result).toBeDefined();
    });

    it('should call CreateCartFail', () => {
        const payload = null;

        const action = new CreateCartFail(payload);

        const result = cartReducer(initialState, action);

        expect(result).toBeDefined();
        expect(action.payload).toBe(initialState.createCartResponse);
    });

    it('should call UpdateCartByClientIdSuccess', () => {
        const payload = null;

        const action = new UpdateCartByClientIdSuccess(payload);

        const result = cartReducer(initialState, action);

        expect(result).toBeDefined();
    });

    it('should call UpdateCartByClientIdFail', () => {
        const payload = null;

        const action = new UpdateCartByClientIdFail(payload);

        const result = cartReducer(initialState, action);

        expect(result).toBeDefined();
    });

    it('should call GetCartByClientIddFail', () => {
        const payload = null;

        const action = new GetCartByClientIddFail(payload);

        const result = cartReducer(initialState, action);

        expect(result).toBeDefined();
    });

    it('should call SelectedCasaAccountIndex', () => {
        const payload = null;

        const action = new SelectedCasaAccountIndex(payload);

        const result = cartReducer(initialState, action);

        expect(result).toBeDefined();
    });

    it('should call SwitchCartFail', () => {
        const payload = null;

        const action = new SwitchCartFail(payload);

        expect(action.payload).toBe(initialState.switchCartResponse);
    });

    it('should call DeleteCartFail', () => {
        const payload = null;

        const action = new DeleteCartFail(payload);

        expect(action.payload).toBe(initialState.deletCartResponse);
    });

    it('should call StoreTransaction', () => {
        const payload = null;

        const action = new StoreTransaction(payload);

        const result = cartReducer(initialState, action);

        expect(result).toBeDefined();
    });

    it('should call StoreSchedulerMsg', () => {
        const payload = null;

        const action = new StoreSchedulerMsg(payload);

        const result = cartReducer(initialState, action);

        expect(result).toBeDefined();
    });

    it('should call UpdateCartUTAccount', () => {
        const payload = null;

        const action = new UpdateCartUTAccount(payload);

        const result = cartReducer(initialState, action);

        expect(result).toBeDefined();
    });

    it('should return the default state', () => {
        const action = {} as any;

        const result = cartReducer(initialState, action);

        expect(result).toBe(initialState);
    });
});
