import * as UserAction from './user.actions';
import { User } from '../../model/user.model';
import { UTAccount } from '../../model/ut_account.model';

export interface Store {
    user: User;
    loadInitialData: boolean;
    loadCount: number;
    dashboardData: string;
    dashboardScreenData: string;
    unitTrustAccount: string;
    unitTrustAccountList: UTAccount[];
    customer_name: string;
    userTypeData: any;
    userType: string;
    userCodeResponse: string;
    riskProfileStatus: string;
    customerSessionData: any;
    getSessionData: any;
    deleteSessionResponse: any;
    customerIdType: string;
    riskProfile: string;
    sessionNo: any;
    createSessionResponse: boolean;
    loginTime: number;
    userTypeSuccessData: string;
    foreignerInd?: string;
    occupationInd?: string;
}

const initialState: Store = {
    user: new User(
        '',
        '',
        'N',
        null,
        null,
        '',
        '',
        'N',
        'N',
        'N',
        '',
        '',
        'N',
        'N',
        'N',
        '1',
    ),
    loadInitialData: false,
    loadCount: -1,
    dashboardData: '',
    dashboardScreenData: '',
    unitTrustAccount: '',
    unitTrustAccountList: [],
    customer_name: '',
    userTypeData: '',
    userType: '',
    userCodeResponse: '',
    riskProfileStatus: '',
    customerSessionData: '',
    getSessionData: '',
    deleteSessionResponse: '',
    customerIdType: '3',
    riskProfile: 'AGGRESIVE',
    sessionNo: null,
    createSessionResponse: false,
    loginTime: null,
    userTypeSuccessData: '',
    foreignerInd: '',
    occupationInd: '',
};

export function userReducer(state = initialState, action: UserAction.Actions) {
    switch (action.type) {
        case UserAction.ADD_USER:
        case UserAction.UPDATE_USER:
            return {
                ...state,
                user: action.payload,
            };
        case UserAction.STORE_DASHBOARD_DATA:
            return {
                ...state,
                dashboardData: action.payload,
            };
        case UserAction.CLEAR_DASHBOARD_DATA:
        case UserAction.STORE_DASHBOARD_SCREEN_DATA:
            return {
                ...state,
                dashboardScreenData: action.payload,
            };
        case UserAction.UPDATE_UNIT_TRUST_ACCOUNT_LIST:
            return {
                ...state,
                unitTrustAccountList: action.payload,
            };
        case UserAction.UPDATE_SELECTED_UNIT_TRUST_ACCOUNT: {
            const user = state.user;
            const userData = { ...user, utAccNo: action.payload };
            return {
                ...state,
                user: userData,
                unitTrustAccount: action.payload,
            };
        }
        case UserAction.UPDATE_USER_NAME: {
            const user = state.user;
            const userData = {
                ...user,
                customer_name: action.payload,
            };
            return {
                ...state,
                user: userData,
                customer_name: action.payload,
            };
        }
        case UserAction.STORE_SESSION_RESPONSE: {
            /* istanbul ignore next */
            const payload = action?.payload ? { ...action?.payload } : null;
            /* istanbul ignore else */
            if (payload) {
                payload.chkSessionValue = true;
            }
            /* istanbul ignore next */
            const sessionNo =
                action?.payload && action?.payload?.sessionNo ? action?.payload?.sessionNo : null;
            /* istanbul ignore next */
            const createSessionResponse = action?.payload?.sessionNo ? true : false;
            return {
                ...state,
                customerSessionData: payload,
                sessionNo: sessionNo,
                createSessionResponse: createSessionResponse,
            };
        }
        case UserAction.STORE_SESSION_DATA:
            return {
                ...state,
                getSessionData: action.payload,
            };
        case UserAction.GET_USER_TYPE: {
            return {
                ...state,
                userTypeSuccessData: action.payload,
            };
        }
        case UserAction.STORE_USER_TYPE_RESPONSE: {
            return {
                ...state,
                userTypeSuccessData: action.payload,
                userType: action.payload,
            };
        }
        case UserAction.UPDATE_USER_TYPE: {
            const user = state.user;
            const userData = {
                ...user,
                customer_name: state.user.customer_name,
                customer_id_type: action.customerIdType,
                sole_prop: 'N',
            };
            return {
                ...state,
                user: userData,
            };
        }
        case UserAction.STORE_RISK_PROFILE_STATUS:
            return {
                ...state,
                riskProfileStatus: action.payload,
            };

        case UserAction.UPDATE_USER_MOBILE_NUMBER: {
            const user = state.user;
            const userData = { ...user, customer_mobile_no: action.payload };
            return {
                ...state,
                user: userData,
            };
        }
        case UserAction.UPDATE_RISK_PROFILE: {
            const user = state.user;
            const userData = { ...user, risk_profile: action.payload };

            return {
                ...state,
                user: userData,
                riskProfile: action.payload,
            };
        }
        case UserAction.UPDATE_CUSTOMER_ID_TYPE:
            return {
                ...state,
                customerIdType: action.payload,
            };
        case UserAction.UPDATE_CIMB_STAFF_INDICATOR: {
            const user = state.user;
            const userData = { ...user, cimb_staff: action.payload };
            return {
                ...state,
                user: userData,
            };
        }

        case UserAction.UPDATE_SOLE_PROP_INDICATOR: {
            const user = state.user;
            const userData = { ...user, sole_prop: action.payload };

            return {
                ...state,
                user: userData,
            };
        }

        case UserAction.STORE_USER_LOGINTIME: {
            return {
                ...state,
                loginTime: action.loginTime,
            };
        }
        
        case UserAction.STORE_FOREIGNER_IND: {
            return {
                ...state,
                foreignerInd: action.foreignerInd,
            };
        }

        case UserAction.STORE_OCCUPATION_IND: {
            return {
                ...state,
                occupationInd: action.occupationInd,
            };
        }

        default:
            return state;
    }
}
