import { createReducer, on } from '@ngrx/store';
import { AccountSummary, RiskProfile, Setting, UtAccount } from '@cimb/shared/models';
import * as WealthDashboardActions from './wealth-dashboard.actions';
import { ScheduledMaintenance } from '../../../modules/asnb/models';

export const wealthDashboardFeatureKey = 'wealthDashboard';

const GROUP_01 = '01';
const GROUP_02 = '02';
const GROUP_03 = '03';
const GROUP_04 = '04';

const ENABLED_TRUE = true;

export interface State {
    riskProfile: RiskProfile;
    accountSummary: AccountSummary;
    asnbWhiteListed: boolean;
    asnbAccountExist: boolean;
    status: 'pending' | 'loading' | 'success' | 'error'; // Series of states for the state
    error: string; // For any error messages
    settings: Setting[];
    compositeAccSummaryCalled: boolean;
    riskprofileEnquiryCalled: boolean;
    utAccount: UtAccount[];
    casaIndicator: string;
    asnbWhiteListEnquiryCalled: boolean;
    asnbLinkAccountEnquiryCalled: boolean;
    userAccountStatus: boolean;
    ASNBDowntimeScheduledMaintenance: ScheduledMaintenance;
}

export const initialState: State = {
    settings: [
        {
            description: "Show 'add new investment' button at investment dashboard",
            enabled: ENABLED_TRUE,
            utSettingId: '001',
            utSettingGroupId: GROUP_01,
        },
        {
            description:
                "Enable 'add to cart' button for topup under my holdings at investment dashboad",
            enabled: ENABLED_TRUE,
            utSettingId: '002',
            utSettingGroupId: GROUP_01,
        },
        {
            description: "Enable 'add to cart' button for purchase at fund detail page",
            enabled: ENABLED_TRUE,
            utSettingId: '003',
            utSettingGroupId: GROUP_01,
        },
        {
            description: "Enable 'add to cart' button for topup at fund detail page",
            enabled: ENABLED_TRUE,
            utSettingId: '004',
            utSettingGroupId: GROUP_01,
        },
        {
            description: 'Allow purchase transaction in the cart',
            enabled: ENABLED_TRUE,
            utSettingId: '005',
            utSettingGroupId: GROUP_01,
        },
        {
            description: "Show 'redeem radio' button at the investment dashboard",
            enabled: ENABLED_TRUE,
            utSettingId: '006',
            utSettingGroupId: GROUP_02,
        },
        {
            description: "Show 'redeem radio' button at the fund details",
            enabled: ENABLED_TRUE,
            utSettingId: '007',
            utSettingGroupId: GROUP_02,
        },
        {
            description: 'Allow redeem transaction in the cart',
            enabled: ENABLED_TRUE,
            utSettingId: '008',
            utSettingGroupId: GROUP_02,
        },
        {
            description: "Show 'switch radio' button at the investment dashboard",
            enabled: ENABLED_TRUE,
            utSettingId: '009',
            utSettingGroupId: GROUP_03,
        },
        {
            description: "Show 'switch radio' button at the fund details",
            enabled: ENABLED_TRUE,
            utSettingId: '010',
            utSettingGroupId: GROUP_03,
        },
        {
            description: 'Allow switching transaction in the cart',
            enabled: ENABLED_TRUE,
            utSettingId: '011',
            utSettingGroupId: GROUP_03,
        },
        {
            description: "Show 'Redo Risk Profiling' link button at investment dashboard",
            enabled: ENABLED_TRUE,
            utSettingId: '012',
            utSettingGroupId: GROUP_04,
        },
        {
            description: "Show 'Learn more' link button at investment dashboard",
            enabled: ENABLED_TRUE,
            utSettingId: '013',
            utSettingGroupId: GROUP_04,
        },
    ],
    riskProfile: null,
    accountSummary: {
        totalAsset: 0,
        totalLiability: 0,
        totalDeposits: 0,
        totalInvestments: 0,
        totalLoans: 0,
        totalCredits: 0,
        cifNumber: '',
        assetsPct: 0,
        liabilitiesPct: 0,
        myInvestmentPct: 0,
        myDepositPct: 0,
        myLoansPct: 0,
        myCreditCardsPct: 0,
        customerName: '',
        lastUpdated: '',
        assetLiabilities: [],
        utInvestmentsStatus: '',
        tdaStatus: '',
        sibsStatus: '',
        cardLinkStatus: '',
        islamicCreditCardStatus: '',
        asnbInquiryStatus: '',
        asnbInquiryCode: null,
    },
    asnbWhiteListed: false,
    asnbAccountExist: false,
    status: 'pending',
    error: '',
    compositeAccSummaryCalled: false,
    riskprofileEnquiryCalled: false,
    utAccount: null,
    casaIndicator: '',
    asnbWhiteListEnquiryCalled: false,
    asnbLinkAccountEnquiryCalled: false,
    userAccountStatus: null,
    ASNBDowntimeScheduledMaintenance: null,
};

const setLoadingState = (state: State): State => {
    return {
        ...state,
        status: 'loading',
        error: '',
    };
};

const setErrorState = <T extends { error: string }>(state: State, action: T): State => {
    return {
        ...state,
        status: 'error',
        error: action.error,
    };
};

export const reducer = createReducer(
    initialState,

    on(WealthDashboardActions.loadAccountSummary, (state): State => {
        return setLoadingState(state);
    }),
    on(WealthDashboardActions.loadAccountSummarySuccess, (state, action): State => {
        return {
            ...state,
            accountSummary: action.data,
            status: 'success',
            error: '',
            compositeAccSummaryCalled: true,
        };
    }),
    on(WealthDashboardActions.updateLastUpdateTime, (state, action) => {
        return {
            ...state,
            accountSummary: {
                ...state.accountSummary,
                assetLiabilities: state.accountSummary.assetLiabilities.map((item) => {
                    if (item.alDesc === 'Amanah Saham Nasional Berhad') {
                        return {
                            ...item,
                            investmentLastUpdated: action.timestamp,
                        };
                    }
                    return item;
                }),
            },
        };
    }),
    on(WealthDashboardActions.loadAccountSummaryFailure, (state, action): State => {
        return {
            ...state,
            status: 'error',
            error: action.error,
            compositeAccSummaryCalled: true,
        };
    }),
    on(WealthDashboardActions.riskProfileEnquiry, (state): State => {
        return setLoadingState(state);
    }),
    on(WealthDashboardActions.riskProfileEnquirySuccess, (state, action): State => {
        return {
            ...state,
            riskProfile: action.data,
            status: 'success',
            error: '',
            riskprofileEnquiryCalled: true,
        };
    }),
    on(WealthDashboardActions.riskProfileEnquiryFailure, (state, action): State => {
        return {
            ...state,
            status: 'error',
            error: action.error,
            riskprofileEnquiryCalled: true,
        };
    }),
    on(WealthDashboardActions.settingsData, (state): State => {
        return setLoadingState(state);
    }),
    on(WealthDashboardActions.settingsDataSuccess, (state, action) => {
        return {
            ...state,
            settings: action.data,
        };
    }),
    on(WealthDashboardActions.settingsDataFailure, (state, action) => {
        return {
            ...state,
            error: action.error,
        };
    }),
    on(WealthDashboardActions.asnbWhiteListEnquiry, (state): State => {
        return setLoadingState(state);
    }),
    on(WealthDashboardActions.asnbWhiteListEnquirySuccess, (state, action): State => {
        return {
            ...state,
            asnbWhiteListed: action.data.validateWhitelisted,
            status: 'success',
            error: '',
            asnbWhiteListEnquiryCalled: true,
        };
    }),
    on(WealthDashboardActions.asnbWhiteListEnquiryFailure, (state, action): State => {
        return {
            ...state,
            status: 'error',
            error: action.error,
            asnbWhiteListEnquiryCalled: true,
        };
    }),
    on(WealthDashboardActions.asnbLinkAccountEnquiry, (state): State => {
        return setLoadingState(state);
    }),
    on(WealthDashboardActions.asnbLinkAccountEnquirySuccess, (state, action): State => {
        return {
            ...state,
            asnbAccountExist: action.data.accountExist,
            status: 'success',
            error: '',
            asnbLinkAccountEnquiryCalled: true,
        };
    }),
    on(WealthDashboardActions.asnbLinkAccountEnquiryFailure, (state): State => {
        return {
            ...state,
            status: 'error',
            error: '',
            asnbLinkAccountEnquiryCalled: true,
        };
    }),
    on(WealthDashboardActions.loadAsnbUserAccountStatus, (state): State => {
        return setLoadingState(state);
    }),
    on(WealthDashboardActions.loadAsnbUserAccountStatusSuccess, (state, action): State => {
        return {
            ...state,
            userAccountStatus: Boolean(action.payload.data),
            status: 'success',
            error: '',
        };
    }),
    on(WealthDashboardActions.loadAsnbUserAccountStatusFailure, (state, action): State => {
        return setErrorState(state, action);
    }),

    on(WealthDashboardActions.resetAsnbAccountAfterDelink, () => {
        return initialState;
    }),

    //Downtime scheduled maintenance
    on(WealthDashboardActions.WDLoadScheduledMaintenance, (state): State => {
        return setLoadingState(state);
    }),
    on(WealthDashboardActions.WDLoadScheduledMaintenanceSuccess, (state, action): State => {
        return {
            ...state,
            ASNBDowntimeScheduledMaintenance: action.payload,
            status: 'success',
            error: '',
        };
    }),
    on(WealthDashboardActions.WDLoadScheduledMaintenanceFailure, (state, action): State => {
        return setErrorState(state, action);
    }),
    on(WealthDashboardActions.storeUtAccount, (state, action) => {
        return {
            ...state,
            utAccount: action.data,
        };
    }),
    on(WealthDashboardActions.storeCasaIndicator, (state, action) => {
        return {
            ...state,
            casaIndicator: action.data,
        };
    }),
);
