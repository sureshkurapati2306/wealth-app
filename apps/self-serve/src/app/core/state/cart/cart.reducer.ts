import * as CartAction from './cart.actions';

import { Fund } from '../../model/fund.model';

export interface Store {
    totalAmount: number;
    totalNetInvestmentAmount: number;
    totalSalesCharges: number;
    totalFundsCount: number;
    higherRiskFundCategory: number;
    fundList: Fund[];
    csId: string;

    accountName: string;
    unitTrustAccount: string;
    paymentAccount: string;
    referenceNumber: string;
    transactionSuccessStatus: boolean;
    transactionStatusName: string;
    transactionStatus: string;
    transactionStatusText: string;
    transactionDate: string;
    transactionWorkingDays: string;

    flow: string;
    flow_text: string;
    total_redemption_units: number;
    total_redemption_amount: number;

    total_switch_out_units: number;
    total_switch_in_units: number;

    total_switch_out_amount: number;
    total_switch_in_amount: number;

    otpResponse: string;
    otpResponseMessage: null;
    otpResponseReferenceNumber: null;

    verifyResponse: string;
    verifyResponseMessage: null;
    verifyResponseReferenceNumber: null;

    postAllTransactionResponse: string;

    cartFooterToggle: boolean;

    showCartIcon: boolean;
    createCartResponse: string;
    createCartResponseMessage: string;
    updateCartResponse: string;
    getCartByClientIdResponse: string;
    cartSummaryId: string;
    txnType: string;
    clientId: string;
    selectedCasaAccountIndex: number;

    switchCartResponse: string;

    deletCartResponse: string;

    storeTransaction: any[];
    scheduler_msg: string;
}

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
    cartSummaryId: ""
};

export function cartReducer(state = initialState, action: CartAction.Actions) {
    switch (action.type) {
        case CartAction.ADD_TO_CART: {
            const flow = action.flow;
            let flowText = null;
            /* istanbul ignore next */
            if (flow === '001') {
                flowText = 'topup';
            } else if (flow === '002') {
                flowText = 'redeem';
            } else if (flow === '003') {
                flowText = 'switch';
            }

            const amount = parseFloat(action.amount);
            const fundObj = {
                ...action.fund,
            };

            const salesCharge = fundObj ? fundObj.sales_charge_nonstaff : 0.0;
            const highRisk = fundObj && fundObj.risk_ind === 'Y' ? true : false;

            const salesChargeAmount = amount * (salesCharge / 100);
            const cardNetAmount = flow === '001' ? amount - salesChargeAmount : 0.0;
            let minAmount = 1;
            let maxAmount = 999999.99;
            if (fundObj) {
                minAmount = fundObj.min_sub_amt;
                maxAmount = fundObj.max_sub_amt;
            }

            const newFundObj = {
                ...fundObj,
                card_amount: amount,
                card_sale_charge: salesChargeAmount,
                card_net_amount: cardNetAmount,
                canEdit: false,
                min_amt: minAmount,
                max_amt: maxAmount,
                flow: flow,
                flow_text: flowText,
                source_screen: action.source,
            };

            const totalSalesCharges = state.totalSalesCharges + salesChargeAmount;
            const totalNetInvestmentAmount = state.totalNetInvestmentAmount + cardNetAmount;
            const totalAmount = state.totalAmount + amount;

            return {
                ...state,
                fundList: [...state.fundList, newFundObj],
                totalFundsCount: state.totalFundsCount + 1,
                higherRiskFundCategory: highRisk
                    ? state.higherRiskFundCategory + 1
                    : state.higherRiskFundCategory,
                totalSalesCharges: totalSalesCharges,
                totalNetInvestmentAmount: totalNetInvestmentAmount,
                totalAmount: totalAmount,
                flow: flow,
                flow_text: flowText,
            };
        }
        case CartAction.REMOVE_TO_CART: {
            const fundItem = {
                ...state.fundList[action.index],
            };
            const totalSalesCharges = state.totalSalesCharges - fundItem.card_sale_charge;
            const totalNetInvestmentAmount =
                state.totalNetInvestmentAmount - fundItem.card_net_amount;
            const totalAmount = state.totalAmount - fundItem.card_amount;
            const totalFundsCount = state.totalFundsCount - 1;
            const fundList = state.fundList.filter((fund, index) => {
                return index !== action.index;
            });
            return {
                ...state,
                totalFundsCount: totalFundsCount,
                totalSalesCharges: totalSalesCharges,
                totalNetInvestmentAmount: totalNetInvestmentAmount,
                totalAmount: totalAmount,
                flow: totalFundsCount < 1 ? null : state.flow,
                flow_text: totalFundsCount < 1 ? null : state.flow_text,
                fundList: fundList,
            };
        }
        case CartAction.TOGGLE_EDIT_CART_ITEM: {
            const fundList = [...state.fundList];
            for (let i = 0; i < fundList.length; i++) {
                if (i === action.index) {
                    const fundItem = {
                        ...state.fundList[i],
                        canEdit: action.editToggle,
                    };
                    fundList[i] = fundItem;
                } else {
                    const fundItem1 = {
                        ...state.fundList[i],
                        canEdit: false,
                    };
                    fundList[i] = fundItem1;
                }
            }

            return {
                ...state,
                fundList: fundList,
            };
        }
        case CartAction.UPDATE_ITEM_IN_CART: {
            const fundList = [...state.fundList];
            const fundItem = {
                ...state.fundList[action.index],
            };
            const cardSaleChargePrevious = fundItem.card_sale_charge;
            const cardNetChargePrevious = fundItem.card_net_amount;

            const salesCharge = fundItem.sales_charge_nonstaff;
            const amountNew = action.amount;
            const salesChargeAmountNew = amountNew * (salesCharge / 100);
            const cardNetAmountNew = amountNew - salesChargeAmountNew;

            const fundItemNew = {
                ...state.fundList[action.index],
                card_amount: amountNew,
                card_net_amount: cardNetAmountNew,
                card_sale_charge: salesChargeAmountNew,
                canEdit: false,
            };
            fundList[action.index] = fundItemNew;
            const totalSalesCharges =
                state.totalSalesCharges - cardSaleChargePrevious + salesChargeAmountNew;
            const totalNetInvestmentAmount =
                state.totalNetInvestmentAmount - cardNetChargePrevious + cardNetAmountNew;
            const totalAmount = totalSalesCharges + totalNetInvestmentAmount;
            return {
                ...state,
                totalFundsCount: state.totalFundsCount,
                totalSalesCharges: totalSalesCharges,
                totalNetInvestmentAmount: totalNetInvestmentAmount,
                totalAmount: totalAmount,
                fundList: fundList,
            };
        }
        case CartAction.CLEAR_CART: {
            return {
                ...state,
                fundList: [],
                totalFundsCount: 0,
                higherRiskFundCategory: 0,
                totalSalesCharges: 0,
                totalNetInvestmentAmount: 0,
                totalAmount: 0,
                total_redemption_units: 0,
                total_redemption_amount: 0,
                total_switch_out_units: 0,
                total_switch_in_units: 0,
                accountName: '',
                unitTrustAccount: '',
                paymentAccount: '',
                referenceNumber: '',
                transactionStatusName: '',
                transactionStatus: '',
                transactionStatusText: '',
                transactionDate: '',
                transactionWorkingDays: '',
                flow_text: null,
                flow: null,
                otpResponse: null,
                otpResponseMessage: null,
                otpResponseReferenceNumber: null,
                verifyResponse: null,
                verifyResponseMessage: null,
                verifyResponseReferenceNumber: null,
            };
        }

        case CartAction.UPDATE_CART_PURCHASE_STATUS: {
            return {
                ...state,
                accountName: action.accountName,
                paymentAccount: action.paymentAccount,
                referenceNumber: action.referenceNumber,
                transactionSuccessStatus: action.transactionSuccessStatus,
                transactionStatusName: action.transactionStatusName,
                transactionStatus: action.transactionStatus,
                transactionStatusText: action.transactionStatusText,
                transactionDate: action.transactionDate,
                transactionWorkingDays: action.transactionWorkingDays,
            };
        }

        case CartAction.ADD_TO_CART_REDEEM: {
            const flow = action.flow;
            let flowText = null;
            /* istanbul ignore next */
            if (flow === '001') {
                flowText = 'topup';
            } else if (flow === '002') {
                flowText = 'redeem';
            } else if (flow === '003') {
                flowText = 'switch';
            }

            const fundObj = {
                ...action.fund,
            };
            const unit = parseFloat(action.unit);
            const highRisk = fundObj && fundObj.risk_ind === 'Y' ? true : false;
            const redemptionAmount = parseFloat(action.amount);
            let minAmount = 1;
            let maxAmount = 999999.99;
            if (fundObj) {
                minAmount = fundObj.min_sub_amt;
                maxAmount = fundObj.max_sub_amt;
            }

            const total_redemption_units = state.total_redemption_units + unit;
            const total_redemption_amount = state.total_redemption_amount + redemptionAmount;

            const newFundObj = {
                ...fundObj,
                card_amount: total_redemption_amount,
                card_redemption_units: unit,
                card_redemption_amount: redemptionAmount,
                canEdit: false,
                min_amt: minAmount,
                max_amt: maxAmount,
                flow: action.flow,
                flow_text: flowText,
            };

            return {
                ...state,
                fundList: [...state.fundList, newFundObj],
                totalFundsCount: state.totalFundsCount + 1,
                higherRiskFundCategory: highRisk
                    ? state.higherRiskFundCategory + 1
                    : state.higherRiskFundCategory,
                total_redemption_units: total_redemption_units,
                total_redemption_amount: total_redemption_amount,
                totalAmount: total_redemption_amount,
                flow: flow,
                flow_text: flowText,
            };
        }

        case CartAction.REMOVE_FROM_CART_REDEEM: {
            const fundItem = {
                ...state.fundList[action.index],
            };
            const total_redemption_units =
                state.total_redemption_units - fundItem.card_redemption_units;
            const total_redemption_amount =
                state.total_redemption_amount - fundItem.card_redemption_amount;
            const totalAmount = state.totalAmount - fundItem.card_amount;
            const totalFundsCount = state.totalFundsCount - 1;
            const fundList = state.fundList.filter((fund, index) => {
                return index !== action.index;
            });
            return {
                ...state,
                totalFundsCount: totalFundsCount,
                total_redemption_units: total_redemption_units,
                total_redemption_amount: total_redemption_amount,
                totalAmount: totalAmount,
                fundList: fundList,
                flow: totalFundsCount < 1 ? null : state.flow,
                flow_text: totalFundsCount < 1 ? null : state.flow_text,
            };
        }

        case CartAction.UPDATE_ITEM_IN_CART_REDEEM: {
            const fundList = [...state.fundList];
            const fundItem = {
                ...state.fundList[action.index],
            };

            const card_redemption_units = fundItem.card_redemption_units;
            const unit = action.unit;

            const fundItemNew = {
                ...state.fundList[action.index],
                card_redemption_units: unit,
                canEdit: false,
            };
            fundList[action.index] = fundItemNew;
            const total_redemption_units =
                state.total_redemption_units - card_redemption_units + unit;

            return {
                ...state,
                totalFundsCount: state.totalFundsCount,
                total_redemption_units: total_redemption_units,
                fundList: fundList,
            };
        }

        case CartAction.REMOVE_FROM_CART_DASHBOARD_TOPUP: {
            const fundList = [...state.fundList];
            const objIndex = fundList.findIndex((obj) => obj.fund_code == action.fund_code);
            const fundItem = {
                ...fundList[objIndex],
            };
            const totalSalesCharges = state.totalSalesCharges - fundItem.card_sale_charge;
            const totalNetInvestmentAmount =
                state.totalNetInvestmentAmount - fundItem.card_net_amount;
            const totalAmount = state.totalAmount - fundItem.card_amount;
            const totalFundsCount = state.totalFundsCount;
            const totalFundsCountNew = totalFundsCount - 1;
            const fundListNew = state.fundList.filter((fund, index) => {
                return index !== objIndex;
            });
            return {
                ...state,
                totalFundsCount: totalFundsCountNew,
                totalSalesCharges: totalSalesCharges,
                totalNetInvestmentAmount: totalNetInvestmentAmount,
                totalAmount: totalAmount,
                flow: totalFundsCountNew < 1 ? null : state.flow,
                flow_text: totalFundsCountNew < 1 ? null : state.flow_text,
                fundList: fundListNew.length >= 1 ? fundListNew : [],
            };
        }

        case CartAction.REMOVE_FROM_CART_DASHBOARD_REDEEM: {
            const fundList = [...state.fundList];
            const objIndex = fundList.findIndex((obj) => obj.fund_code == action.fund_code);
            const fundItem = {
                ...fundList[objIndex],
            };

            const total_redemption_units =
                state.total_redemption_units - fundItem.card_redemption_units;
            const total_redemption_amount =
                state.total_redemption_amount - fundItem.card_redemption_amount;
            const totalAmount = state.totalAmount - fundItem.card_amount;
            const totalFundsCount = state.totalFundsCount - 1;
            const totalFundsCountNew = totalFundsCount - 1;
            const fundListNew = state.fundList.filter((fund, index) => {
                return index !== objIndex;
            });
            return {
                ...state,
                totalFundsCount: totalFundsCountNew,
                total_redemption_units: total_redemption_units,
                total_redemption_amount: total_redemption_amount,
                totalAmount: totalAmount,
                fundList: fundListNew.length >= 1 ? fundListNew : [],
                flow: totalFundsCountNew < 1 ? null : state.flow,
                flow_text: totalFundsCountNew < 1 ? null : state.flow_text,
            };
        }

        case CartAction.CALL_OTP_SUCCESS: {
            const payload = action.payload;
            const json = JSON.parse(payload);
            return {
                ...state,
                otpResponse: payload,
                otpResponseMessage: json.message,
            };
        }
        case CartAction.CALL_OTP_FAIL: {
            const payload = action.payload;
            const json = JSON.parse(payload);
            return {
                ...state,
                otpResponse: payload,
                otpResponseMessage: json.message,
                verifyResponseMessage: null,
            };
        }

        case CartAction.VERIFY_OTP_SUCCESS: {
            const payload = action.payload;
            const json = JSON.parse(payload);
            return {
                ...state,
                verifyResponse: payload,
                verifyResponseMessage: json.message,
                verifyResponseReferenceNumber: json.referenceNo,
                otpResponseMessage: null,
            };
        }

        case CartAction.VERIFY_OTP_FAIL: {
            return {
                ...state,
                otpResponseMessage: null,
                verifyResponse: action.payload,
                verifyResponseMessage: null,
                verifyResponseReferenceNumber: null,
            };
        }

        /* istanbul ignore next */
        case CartAction.POST_ALL_TRANSACTION_SUCCESS: {
            const payload = action.payload;
            const request = action.request;
            const json = JSON.parse(payload);
            const storeTransactionArray = [...state.storeTransaction, ...json.logoutList];
            return {
                ...state,
                postAllTransactionResponse: payload,
                referenceNumber: 'Ref ' + json.referenceNumber,
                transactionSuccessStatus: json.transactionSuccessStatus,
                transactionStatusName: json.transactionStatusName,
                transactionStatus: json.transactionStatus,
                transactionStatusText: json.transactionStatusText,
                transactionDate: json.transactionDate,
                transactionWorkingDays: json.transactionWorkingDays,
                otpResponseMessage: null,
                storeTransaction: storeTransactionArray,
                verifyResponse:null,
            };
        }

        case CartAction.POST_ALL_TRANSACTION_FAIL: {
            const payload = action.payload;
            const json = JSON.parse(payload);
            return {
                ...state,
                otpResponseMessage: json.error.message,
                verifyResponse:json.error.message,
                postAllTransactionResponse: action.payload,
            };
        }

        case CartAction.TOGGLE_CART_FOOTER: {
            return {
                ...state,
                cartFooterToggle: action.payload,
            };
        }

        case CartAction.TOGGLE_CART_ICON_HEADER: {
            return {
                ...state,
                showCartIcon: action.payload,
            };
        }

        case CartAction.CREATE_CART_SUCCESS:
        case CartAction.CREATE_CART_FAIL: {
            return {
                ...state,
                createCartResponse: action.payload,
            };
        }

        case CartAction.UPDATE_CART_BY_CLIENT_ID_SUCCESS: {
            const data = JSON.parse(action.payload);
            const txnType = data && data.txnType ? data.txnType : null;
            let flow = '01';
            let flowText = 'topup';
            /* istanbul ignore next */
            if (txnType === '01') {
                flow = '001';
                flowText = 'topup';
            } else if (txnType === '02') {
                flow = '002';
                flowText = 'redeem';
            } else if (txnType === '03') {
                flow = '003';
                flowText = 'switch';
            }

            return {
                ...state,
                updateCartResponse: action.payload,
                cartSummaryId: data && data.cartSummaryId ? data.cartSummaryId : -1,
            };
        }

        case CartAction.UPDATE_CART_BY_CLIENT_ID_FAIL: {
            return {
                ...state,
                updateCartResponse: action.payload,
            };
        }

        /* istanbul ignore next */
        case CartAction.GET_CART_BY_CLIENT_ID_SUCCESS: {
            const payload = action.payload;
            if (payload && payload !== null) {
                const data = JSON.parse(action.payload);
                if (data && data !== null) {
                    const txnType = data.txnType ? data.txnType : null;
                    let flow = '001';
                    let flowText = 'topup';
                    let totalRedem = 0.0;
                    let cartTotalAmount = 0.0;
                    let fundAmount = 0.0;
                    let minAmount = 0.0;
                    let maxAmount = 0.0;
                    if (txnType === '01') {
                        flow = '001';
                        flowText = 'topup';
                        cartTotalAmount = data.totalInvestment;
                    } else if (txnType === '02') {
                        flow = '002';
                        flowText = 'redeem';
                        cartTotalAmount = data.totalRedemAmount;
                        totalRedem = data.totalRedem;
                    } else if (txnType === '03') {
                        flow = '003';
                        flowText = 'switch';
                        cartTotalAmount = data.switchInAmount;
                    }

                    const cartDetailList = data.cartDetailFund;
                    const fundList = [];

                    if (cartDetailList && cartDetailList.length >= 1) {
                        for (let k = 0; k < cartDetailList.length; k++) {
                            const item = cartDetailList[k];
                            if (item.txnType === '01') {
                                fundAmount = item.totalInvestment;
                                minAmount = item.minimum_subsequent_subscription_amount;
                                maxAmount = item.maximum_subsequen_subscription_amount;
                            } else if (item.txnType === '02') {
                                fundAmount = item.totalRedemAmount;
                                minAmount = item.min_redem_amt;
                                maxAmount = item.max_redem_amt;
                            } else if (item.txnType === '03') {
                                fundAmount = item.switchInAmount;
                                minAmount = item.min_switch_amt;
                                maxAmount = item.max_switch_amt;
                            }
                            const value = {
                                ...item,
                                fund_code: item.fundCode,
                                txnType: item.txnType,
                                canEdit: false,
                                min_amt: minAmount,
                                max_amt: maxAmount,
                                flow: flow,
                                flow_text: flowText,
                                card_amount: txnType === '02' ? item.totalRedemAmount : fundAmount,
                                card_sale_charge: item.totalSalesCharges,
                                card_net_amount: item.totalNetAmount,
                                card_redemption_units: item.totalRedem,
                                card_redemption_amount: item.totalRedemAmount,
                                cartDetailId: item.cartDetailId,
                                source_screen: 'api',
                            };
                            fundList.push(value);
                        }
                    }
                    return {
                        ...state,
                        getCartByClientIdResponse: action.payload,
                        cartSummaryId: data.cartSummaryId ? data.cartSummaryId : "-1",
                        fundList: [...fundList],
                        totalFundsCount: data ? data.totalFund : 0,
                        higherRiskFundCategory: state.higherRiskFundCategory,
                        totalAmount: txnType === '02' ? totalRedem : cartTotalAmount,
                        totalSalesCharges: data ? data.totalSalesCharges : 0,
                        totalNetInvestmentAmount: data ? data.totalNetAmount : 0,

                        total_redemption_amount: data ? data.totalRedemAmount : 0,
                        total_redemption_units: data ? data.totalRedem : 0,

                        total_switch_out_amount: data ? data.switchOutAmount : 0,
                        total_switch_in_amount: data ? data.switchInAmount : 0,

                        total_switch_out_units: data ? data.totalSwitchOut : 0,
                        total_switch_in_units: data ? data.totalSwitchIn : 0,
                        //cartSummaryId: data && data.cartSummaryId ? data.cartSummaryId : "-1",
                        unitTrustAccount: data.utAccountNo,
                        clientId: data.clientId,
                        txnType: data.txnType,
                        flow: flow,
                        flow_text: flowText,
                    };
                } else {
                    return {
                        ...state,
                        cartSummaryId: "-1",
                    };
                }
            } else {
                return {
                    ...state,
                    cartSummaryId: "-1",
                };
            }
        }

        case CartAction.GET_CART_BY_CLIENT_ID_FAIL: {
            return {
                ...state,
                getCartByClientIdResponse: action.payload,
                cartSummaryId: null,
                fundList: [],
            };
        }
        case CartAction.SELECTED_CASA_ACCOUNT_INDEX: {
            return {
                ...state,
                selectedCasaAccountIndex: action.index,
            };
        }

        case CartAction.SWITCH_CART_FAIL: {
            return {
                ...state,
                switchCartResponse: action.payload,
            };
        }

        case CartAction.DELETE_CART_BY_CLIENT_ID_FAIL: {
            return {
                ...state,
                deletCartResponse: action.payload,
            };
        }

        case CartAction.STORE_TRANSACTION: {
            {
                let storeTransactionArray = [];
                storeTransactionArray = [...state.storeTransaction.slice()];
                let storeTransactionArrayNew = [];
                storeTransactionArrayNew = storeTransactionArray.slice();
                storeTransactionArrayNew.push(action.payload);
                return {
                    ...state,
                    storeTransaction: [...storeTransactionArrayNew],
                };
            }
        }

        case CartAction.STORE_SCHEDULER_MSG: {
            return {
                ...state,
                scheduler_msg: action?.payload ? action?.payload : '',
            };
        }

        case CartAction.UPDATE_CART_UTACCOUNT: {
            return {
                ...state,
                unitTrustAccount: action.utAccount,
            };
        }

        case CartAction.UPDATE_CART_UTACCOUNTNO_API_SUCCESS: {
            return {
                ...state,
            };
        }

        default:
            return state;
    }
}
