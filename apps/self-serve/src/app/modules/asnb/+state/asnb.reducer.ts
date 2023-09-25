import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import * as AsnbActions from './asnb.actions';

import { AsnbEntity } from './asnb.models';
import { BankAccount } from '../../../core/model/customerDetail.model';
import {
    AsnbCheckout,
    AsnbSofSow,
    AsnbTransactionLimit,
    CartAccountDetails,
    CartPurchaseSummary,
    CartSource,
    ScheduledMaintenance,
    FundDetails,
    AsnbMember,
    AsnbOverview,
    RiskStatus,
    AsnbFundListing,
    OperationHourResponse,
    AsnbIdType,
    AsnbRelationship,
    CommonDropDown,
    AsnbAddFavourite,
    AsnbFavourite,
    AsnbEligibleFunds,
    PastTransactionMap,
    FundType,
} from '../models';

import {
    getOwnerDetails,
    groupFundListByFundId,
    formatMinorDetails,
    getFundOverview,
    formatRecentTransaction,
} from '../utils';

export const ASNB_FEATURE_KEY = 'asnb';

export type Status = 'pending' | 'loading' | 'success' | 'error'; // Series of states for the state

export interface State {
    checkoutBankAccount: Partial<BankAccount>[];
    checkoutPurchaseSummary: CartPurchaseSummary;
    checkoutUserData: CartAccountDetails;
    checkoutSOWSOF: CartSource;
    pastTransaction: PastTransactionMap;
    asnbTopUp?: {
        fundName: string;
        amount: number;
        fundId: string;
    };
    status: Status;
    error?: string; // For any error messages,
    fundTypesMap: any;
    fundTypeIds: string[];
    fundDetail: FundDetails;
    memberList: AsnbMember[];
    asnbOverview: AsnbOverview;
    riskStatus: RiskStatus;
    checkout: AsnbCheckout;
    transactionLimit: AsnbTransactionLimit;
    ASNBDowntimeScheduledMaintenance: ScheduledMaintenance;
    sofSowList: AsnbSofSow[];
    isAccountStatusNormal: boolean;
    selectedAccount: AsnbMember | null;
    eligibleFunds: AsnbEligibleFunds;
    allFunds: AsnbFundListing[] | null;
    operationHourDetails: OperationHourResponse;
    externalUrls: Record<string, string>;
    idTypes: AsnbIdType[];
    relationships: AsnbRelationship[];
    addFavouriteDetails: AsnbAddFavourite;
    transferReasonList: CommonDropDown[];
    purchaseFavouriteDetails: AsnbFavourite;
}

export interface AsnbPartialState {
    readonly [ASNB_FEATURE_KEY]: State;
}

export const asnbAdapter: EntityAdapter<AsnbEntity> = createEntityAdapter<AsnbEntity>();

export const initialState: State = asnbAdapter.getInitialState({
    // set initial required properties
    checkoutBankAccount: null,
    checkoutPurchaseSummary: null,
    checkoutUserData: null,
    checkoutSOWSOF: null,
    asnbTopUp: {
        fundName: null,
        amount: null,
        fundId: null,
    },
    pastTransaction: {},
    status: 'pending',
    error: '',
    loaded: false,
    fundTypesMap: null,
    fundTypeIds: [],
    fundDetail: { fix_price: [], variable_price: [] },
    memberList: [
        {
            name: '',
            membershipNumber: '',
            value: '',
        },
    ],
    asnbOverview: {
        name: '',
        uhId: '',
        currentInvestment: 0,
        lastUpdateDate: '',
    },
    riskStatus: '',
    checkout: {
        investmentType: '',
        stageTableId: '',
        transactionId: '',
        guardianDetails: {
            unitHolderId: '',
            name: '',
        },
        fundId: '',
        amount: null,
        bankCharge: 0,
        total: 0,
        fundType: null,
        fundName: '',
        transactionStatus: null,
        timeStamp: '',
        identificationNumber: '',
        unitsAlloted: null,
        navPrice: null,
        bankAccountNumber: '',
        asnbReferenceNo: null,
        salesCharge: null,
        salesChargePercentage: null,
    },
    transactionLimit: {
        currentLimit: null,
        maxLimit: null,
    },
    ASNBDowntimeScheduledMaintenance: null,
    sofSowList: [],
    isAccountStatusNormal: null,
    selectedAccount: null,
    eligibleFunds: null,
    allFunds: null,
    operationHourDetails: {
        startTime: null,
        endTime: null,
    },
    externalUrls: {},
    idTypes: [],
    relationships: [],
    addFavouriteDetails: {
        nickname: '',
        membershipNumber: '',
        fundCode: '',
        idType: '',
        idNumber: '',
        relationship: '',
        stageId: '',
        transactionId: '',
        timestamp: '',
    },
    favouriteSummary: {
        transactionId: '',
        date: '',
        nickName: '',
        beneClientName: '',
        beneClientId: '',
        beneClientIdType: '',
        beneAsnbAccountNo: '',
        relationship: '',
        transStatus: '',
    },
    transferReasonList: [],
    purchaseFavouriteDetails: {
        no: 0,
        nickname: '',
        beneName: '',
        fundCode: '',
        fundDesc: '',
        beneClientId: '',
        relationship: '',
        memberIdType: '',
        asnbAccountNo: '',
        transId: '',
    },
});

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

const asnbReducer = createReducer(
    initialState,
    on(AsnbActions.init, (state) => ({ ...state, loaded: false, error: null })),
    on(AsnbActions.asnbTopUp, (state, topUp) => ({
        ...state,
        asnbTopUp: topUp,
    })),

    //bank accounts
    on(AsnbActions.loadCheckoutBankAccount, (state): State => {
        return {
            ...setLoadingState(state),
            checkoutBankAccount: null,
        };
    }),

    on(AsnbActions.loadCheckoutBankAccountSuccess, (state, action): State => {
        return {
            ...state,
            checkoutBankAccount: action.checkoutBankAccount,
            status: 'success',
            error: '',
        };
    }),

    on(AsnbActions.loadCheckoutBankAccountFailure, (state, action): State => {
        return setErrorState<typeof action>(state, action);
    }),

    //cart purchase summary
    on(AsnbActions.loadCheckoutPurchaseSummary, (state): State => {
        return setLoadingState(state);
    }),

    on(AsnbActions.loadCheckoutPurchaseSummarySuccess, (state, action): State => {
        return {
            ...state,
            checkoutPurchaseSummary: action.checkoutPurchaseSummary,
            status: 'success',
            error: '',
        };
    }),

    on(AsnbActions.loadCheckoutPurchaseSummaryFailure, (state, action): State => {
        return setErrorState<typeof action>(state, action);
    }),

    //account details
    on(AsnbActions.loadCheckoutAccountDetails, (state): State => {
        return setLoadingState(state);
    }),

    on(AsnbActions.loadCheckoutAccountDetailsSuccess, (state, action): State => {
        return {
            ...state,
            checkoutUserData: action.checkoutUserData,
            status: 'success',
            error: '',
        };
    }),

    on(AsnbActions.loadCheckoutAccountDetailsFailure, (state, action): State => {
        return setErrorState<typeof action>(state, action);
    }),

    //Cart Source
    on(AsnbActions.loadCheckoutSource, (state): State => {
        return setLoadingState(state);
    }),

    on(AsnbActions.loadCheckoutSourceSuccess, (state, action): State => {
        return {
            ...state,
            checkoutSOWSOF: action.checkoutSOWSOF,
            status: 'success',
            error: '',
        };
    }),

    on(AsnbActions.loadCheckoutSourceFailure, (state, action): State => {
        return setErrorState<typeof action>(state, action);
    }),

    //past transaction
    on(AsnbActions.loadPastTransaction, (state): State => {
        return setLoadingState(state);
    }),

    on(AsnbActions.loadPastTransactionSuccess, (state, action): State => {
        return {
            ...state,
            pastTransaction: {
                ...state.pastTransaction,
                [action.payload.options.fundId]: {
                    transactionalDetail: formatRecentTransaction(
                        action.payload?.response?.transactionalDetail,
                    ),
                    errorCode: action.payload?.response?.errorCode,
                    errorMsg: action.payload?.response?.errorMsg,
                },
            },
            status: 'success',
            error: '',
        };
    }),

    on(AsnbActions.loadPastTransactionFailure, (state, action): State => {
        return setErrorState<typeof action>(state, action);
    }),

    on(
        AsnbActions.asnbTopUp,
        (state, topUp): State => ({
            ...state,
            asnbTopUp: topUp,
        }),
    ),
    on(AsnbActions.loadAsnbFundDetails, (state): State => {
        return setLoadingState(state);
    }),
    on(AsnbActions.loadAsnbFundDetailsSuccess, (state, action): State => {
        let isAccountStatusNormal = true;

        if (action.payload?.fundRes?.fundDetail && action.payload?.fundRes?.fundDetail.length > 0) {
            isAccountStatusNormal = action.payload?.fundRes.fundDetail.some(
                (fund) => fund.uhAccountStatus === 'NORMAL',
            );
        }
        return {
            ...state,
            ...groupFundListByFundId(action.payload, state),
            asnbOverview: getFundOverview(action.payload?.fundRes),
            memberList: [
                getOwnerDetails(action.payload?.fundRes),
                ...(action.payload?.fundRes?.minorDetail
                    ? formatMinorDetails(action.payload?.fundRes?.minorDetail)
                    : []),
            ],
            checkout: {
                ...state.checkout,
                guardianDetails: {
                    name: getOwnerDetails(action.payload?.fundRes).name,
                    unitHolderId: getOwnerDetails(action.payload?.fundRes).membershipNumber,
                },
            },
            riskStatus: action.payload?.fundRes.riskProfile,
            isAccountStatusNormal,
            pastTransaction: {}, // reset past Transaction when fund details is loaded
            status: 'success',
            error: '',
            allFunds: action.payload.allFunds,
        };
    }),
    on(AsnbActions.loadAsnbMinorFundDetailsSuccess, (state, action): State => {
        let isAccountStatusNormal = true;

        if (action.payload?.fundRes?.fundDetail && action.payload?.fundRes?.fundDetail.length > 0) {
            isAccountStatusNormal = action.payload?.fundRes.fundDetail.some(
                (fund) => fund.uhAccountStatus === 'NORMAL',
            );
        }
        return {
            ...state,
            checkout: {
                ...state.checkout,
                guardianDetails: {
                    name: state.memberList[0].name,
                    unitHolderId: state.memberList[0].membershipNumber,
                },
                minorDetails: {
                    name: getOwnerDetails(action.payload?.fundRes).name,
                    unitHolderId: getOwnerDetails(action.payload?.fundRes).membershipNumber,
                },
            },
            fundDetail: groupFundListByFundId(action.payload, state).fundDetail,
            isAccountStatusNormal,
            riskStatus: action.payload.fundRes.riskProfile,
            pastTransaction: {}, // reset past Transaction when fund details is loaded
            status: 'success',
            error: '',
        };
    }),

    on(AsnbActions.updateCheckoutState, (state, action): State => {
        return {
            ...state,
            checkout: {
                ...action.payload,
            },
        };
    }),
    on(AsnbActions.clearCheckoutState, (state): State => {
        return {
            ...state,
            checkout: initialState.checkout,
        };
    }),
    on(AsnbActions.createOrder, (state): State => {
        return setLoadingState(state);
    }),
    on(AsnbActions.createOrderSuccess, (state, action): State => {
        const { amount, fundType } = action.payload;
        return {
            ...state,
            checkout: {
                ...state.checkout,
                ...action.payload,
                salesCharge: fundType === 'fixed price' ? '0.00' : null,
                salesChargePercentage: fundType === 'fixed price' ? '0.00' : 'N/A',
                amount: fundType === 'fixed price' ? amount : null,
            },
            status: 'success',
            error: '',
        };
    }),
    on(AsnbActions.createOrderFailure, (state, action): State => {
        return setErrorState<typeof action>(state, action);
    }),
    on(AsnbActions.createSubscription, (state): State => {
        return setLoadingState(state);
    }),
    on(AsnbActions.createSubscriptionSuccess, (state, action): State => {
        const {
            transactionStatus,
            navPrice,
            unitsAlloted,
            errorCode,
            fundType,
            salesCharge,
            salesChargePercentage,
            amount,
        } = action.payload;

        return {
            ...state,
            checkout: {
                ...state.checkout,
                ...action.payload,
                unitsAlloted: getUnitsAllottedAndNavPrice(
                    transactionStatus,
                    fundType,
                    salesCharge,
                    unitsAlloted,
                    navPrice,
                ).unitsAlloted,
                navPrice: getUnitsAllottedAndNavPrice(
                    transactionStatus,
                    fundType,
                    salesCharge,
                    unitsAlloted,
                    navPrice,
                ).navPrice,
                salesCharge: getSalesChargeAndPercentage(
                    transactionStatus,
                    fundType,
                    salesCharge,
                    salesChargePercentage,
                ).salesCharge,
                salesChargePercentage: getSalesChargeAndPercentage(
                    transactionStatus,
                    fundType,
                    salesCharge,
                    salesChargePercentage,
                ).salesChargePercentage,
                amount: getCheckoutAmount(fundType, salesCharge, amount),
                errorCode: getCheckoutErrorCodeState(transactionStatus, errorCode),
            },
            status: 'success',
            error: '',
        };
    }),
    on(AsnbActions.createSubscriptionFailure, (state, action): State => {
        return setErrorState<typeof action>(state, action);
    }),
    on(AsnbActions.loadCheckoutOTPFailure, (state, action): State => {
        return {
            ...state,
            status: 'error',
            error: action?.otpError?.message,
        };
    }),
    on(AsnbActions.loadTransactionLimit, (state): State => {
        return setLoadingState(state);
    }),
    on(AsnbActions.loadTransactionLimitSuccess, (state, action): State => {
        return {
            ...state,
            transactionLimit: action.payload,
            status: 'success',
            error: '',
        };
    }),
    on(AsnbActions.loadTransactionLimitFailure, (state, action): State => {
        return setErrorState<typeof action>(state, action);
    }),
    on(AsnbActions.loadSofSowList, (state) => {
        return setLoadingState(state);
    }),
    on(AsnbActions.loadSofSowListSuccess, (state, action): State => {
        return {
            ...state,
            sofSowList: action.payload,
            status: 'success',
            error: '',
        };
    }),
    on(AsnbActions.loadSofSowListFailure, (state, action): State => {
        return setErrorState<typeof action>(state, action);
    }),

    //Downtime scheduled maintenance
    on(AsnbActions.loadScheduledMaintenance, (state): State => {
        return setLoadingState(state);
    }),
    on(AsnbActions.loadScheduledMaintenanceSuccess, (state, action): State => {
        return {
            ...state,
            ASNBDowntimeScheduledMaintenance: action.payload,
            status: 'success',
            error: '',
        };
    }),
    on(AsnbActions.loadScheduledMaintenanceFailure, (state, action): State => {
        return setErrorState<typeof action>(state, action);
    }),

    on(AsnbActions.updateSelectedMember, (state, action): State => {
        return {
            ...state,
            selectedAccount: action.payload,
        };
    }),

    //eligible funds
    on(AsnbActions.loadEligibleFunds, (state): State => {
        return setLoadingState(state);
    }),
    on(AsnbActions.loadEligibleFundsSuccess, (state, action): State => {
        return {
            ...state,
            eligibleFunds: action.payload,
            status: 'success',
        };
    }),
    on(AsnbActions.loadEligibleFundsFailure, (state, action): State => {
        return setErrorState<typeof action>(state, action);
    }),
    on(AsnbActions.loadOperationHourDetails, (state): State => {
        return setLoadingState(state);
    }),
    on(AsnbActions.loadOperationHourDetailsSuccess, (state, action): State => {
        return {
            ...state,
            operationHourDetails: action.payload[0],
            status: 'success',
            error: '',
        };
    }),
    on(AsnbActions.loadOperationHourDetailsFailure, (state, action): State => {
        return setErrorState<typeof action>(state, action);
    }),
    on(AsnbActions.loadExternalUrlList, (state) => {
        return setLoadingState(state);
    }),
    on(AsnbActions.loadExternalUrlListSuccess, (state, action): State => {
        return { ...state, status: 'success', externalUrls: action.payload };
    }),
    on(AsnbActions.loadExternalUrlListFailure, (state, action): State => {
        return setErrorState<typeof action>(state, action);
    }),
    on(AsnbActions.loadIdTypeList, (state): State => {
        return { ...state, status: 'loading', error: '' };
    }),
    on(AsnbActions.loadIdTypeListSuccess, (state, action): State => {
        return {
            ...state,
            status: 'success',
            idTypes: action.payload,
        };
    }),
    on(AsnbActions.loadIdTypeListFailure, (state, action): State => {
        return { ...state, status: 'error', error: action.error };
    }),
    on(AsnbActions.loadRelationshipList, (state): State => {
        return { ...state, status: 'loading', error: '' };
    }),
    on(AsnbActions.loadRelationshipListSuccess, (state, action): State => {
        return {
            ...state,
            status: 'success',
            relationships: action.payload,
        };
    }),
    on(AsnbActions.loadRelationshipListFailure, (state, action): State => {
        return { ...state, status: 'error', error: action.error };
    }),
    on(AsnbActions.updateAddFavouriteState, (state, action): State => {
        return {
            ...state,
            addFavouriteDetails: {
                ...action.payload,
            },
        };
    }),
    on(AsnbActions.clearAddFavouriteState, (state): State => {
        return {
            ...state,
            addFavouriteDetails: initialState.addFavouriteDetails,
        };
    }),

    on(AsnbActions.loadTransferReasonList, (state): State => {
        return setLoadingState(state);
    }),
    on(AsnbActions.loadTransferReasonListSuccess, (state, action): State => {
        return {
            ...state,
            transferReasonList: action.payload,
            status: 'success',
            error: '',
        };
    }),
    on(AsnbActions.loadTransferReasonListFailure, (state, action): State => {
        return setErrorState<typeof action>(state, action);
    }),

    on(
        AsnbActions.asnbFavouritePurchase,
        (state, action): State => ({
            ...state,
            purchaseFavouriteDetails: action.payload,
        }),
    ),
    on(AsnbActions.clearAsnbFavouritePurchase, (state): State => {
        return {
            ...state,
            purchaseFavouriteDetails: initialState.purchaseFavouriteDetails,
        };
    }),
);

export function reducer(state: State | undefined, action: Action) {
    return asnbReducer(state, action);
}

export function getUnitsAllottedAndNavPrice(
    transactionStatus: string,
    fundType: FundType | null,
    salesCharge: string | null,
    unitsAlloted: number | null,
    navPrice: number | null,
): { unitsAlloted: number | null; navPrice: number | null } {
    const values = { unitsAlloted: null, navPrice: null };
    if (transactionStatus === '000' && (fundType === 'fixed price' || salesCharge !== '0.0')) {
        values.unitsAlloted = unitsAlloted;
        values.navPrice = navPrice;
    } else if (transactionStatus !== '5000' && fundType === 'fixed price') {
        values.unitsAlloted = 0;
        values.navPrice = 0;
    }
    return values;
}

export function getSalesChargeAndPercentage(
    transactionStatus: string,
    fundType: FundType | null,
    salesCharge: string | null,
    salesChargePercentage: string | null,
): { salesCharge: string | null; salesChargePercentage: string | null } {
    const values = { salesCharge: null, salesChargePercentage: 'N/A' };
    if (fundType === 'fixed price') {
        values.salesCharge = '0.00';
        values.salesChargePercentage = '0.00';
    } else if (transactionStatus === '000' && salesCharge !== '0.0') {
        values.salesCharge = salesCharge;
        values.salesChargePercentage = salesChargePercentage;
    }
    return values;
}

export function getCheckoutAmount(
    fundType: FundType | null,
    salesCharge: string | null,
    amount: number | null,
): number | null {
    if (fundType === 'fixed price' || salesCharge !== '0.0') return amount;
    return null;
}

export function getCheckoutErrorCodeState(
    transactionStatus: string,
    errorCode?: string,
): string | null {
    if (transactionStatus === '000' || transactionStatus === '5000') return null;
    return errorCode;
}
