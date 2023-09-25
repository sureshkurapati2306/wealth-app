import { CustomerDetail } from '../../model/customerDetail.model';
import * as AccountOpeningAction from './account.actions';

export interface Store {
    accountOpeningAPIParams: string;
    accountOpeningAPIResponseData: string;
    userDetailsAPIParams: string;
    userDetailsAPIResponseData: CustomerDetail;
    userDetailsSessionData: string;
    accountOpeningAuditAPIParams: string;
    accountOpeningAuditAPIResponse: any;
}

const initialState: Store = {
    accountOpeningAPIParams: null,
    accountOpeningAPIResponseData: null,
    userDetailsAPIParams: null,
    userDetailsAPIResponseData: null,
    userDetailsSessionData: null,
    accountOpeningAuditAPIParams: null,
    accountOpeningAuditAPIResponse: null,
};

export function accountOpeningReducer(state = initialState, action: AccountOpeningAction.Actions) {
    switch (action.type) {
        case AccountOpeningAction.GET_ACCOUNT_OPENING_API:
            return {
                ...state,
                accountOpeningAPIParams: action.payload,
            };
        case AccountOpeningAction.GET_ACCOUNT_OPENING_API_RESPONSE:
            return {
                ...state,
                accountOpeningAPIResponseData: action.payload,
            };
        case AccountOpeningAction.GET_USER_DETAILS_API:
            return {
                ...state,
                userDetailsAPIParams: action.payload,
            };
        /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line
        case AccountOpeningAction.GET_USER_DETAILS_API_RESPONSE: {
            let settlementAccounts = [];
            const bankAccounts = [];
            let bankAccountObj;
            let accountObj;

            settlementAccounts = action.payload.settlementAccount;

            for (let j = 0; j < settlementAccounts.length; j++) {
                accountObj = { ...settlementAccounts[j] };
                bankAccountObj = {
                    casa_account_format: accountObj.casa_account_format,
                    casa_account_balance: accountObj.casa_account_balance,
                    joint_indicator: accountObj.joint_indicator,
                    signingCondition: accountObj.signingCondition,
                    casa_account_name: accountObj.casa_account_name,
                    account_status: accountObj.account_status === 'Active' ? 'Active' : false,
                    casa_account_no: accountObj.accountNumber,
                    name: accountObj.casa_account_format,
                    account: accountObj.casa_account_name,
                    accountNumber: accountObj.accountNumber,
                    isActive: accountObj.account_status === 'Active',
                    hasJointAccount: accountObj.joint_indicator === 'J',
                    index: j,
                };

                bankAccounts.push(bankAccountObj);
            }

            return {
                ...state,
                userDetailsAPIResponseData: { ...action.payload, bankAccounts },
            };
        }
        case AccountOpeningAction.GET_USER_DETAILS_SESSION_DATA:
            return {
                ...state,
                userDetailsSessionData: action.payload,
            };
        case AccountOpeningAction.GET_USER_DETAIL_FIELD_OPTIONS_API:
            return {
                ...state,
                userDetailFieldOptionsAPIParam: action.payload,
            };
        case AccountOpeningAction.GET_USER_DETAIL_FIELD_OPTIONS_API_RESPONSE:
            return {
                ...state,
                userDetailFieldOptionsAPIResponseData: action.payload,
            };
        case AccountOpeningAction.POST_UTACCOUNT_AUDIT:
            return {
                ...state,
                accountOpeningAuditAPIParams: action.payload,
            };
        /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line
        case AccountOpeningAction.POST_UTACCOUNT_AUDIT_RESPONSE:
            return {
                ...state,
                accountOpeningAuditAPIResponse: action.payload,
            };

        /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line
        default:
            return state;
    }
}
