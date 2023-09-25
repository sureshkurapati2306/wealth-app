import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAsnbReducer from './asnb.reducer';

// Lookup the 'Asnb' feature state managed by NgRx
export const getAsnbState = createFeatureSelector<fromAsnbReducer.State>(
    fromAsnbReducer.ASNB_FEATURE_KEY,
);

export const getTopUp = createSelector(getAsnbState, (state) => state.asnbTopUp);
//bank account
export const getCheckoutBankAccounts = createSelector(getAsnbState, (state) => {
    return state.checkoutBankAccount;
});

//cart purchase account
export const getCheckoutPurchaseSummary = createSelector(getAsnbState, (state) => {
    return state.checkoutPurchaseSummary;
});

//account Details
export const getCheckoutAccountDetails = createSelector(getAsnbState, (state) => {
    return state.checkoutUserData;
});

//cart source Details
export const getCheckoutSOWSOF = createSelector(getAsnbState, (state) => {
    return state.checkoutSOWSOF;
});

//past Transaction
export const getPastTransaction = createSelector(getAsnbState, (state) => {
    return state.pastTransaction;
});

export const getASNBFundDetails = createSelector(getAsnbState, (state) => {
    return state.fundDetail;
});

export const getASNBMemberList = createSelector(getAsnbState, (state) => {
    return state.memberList;
});

export const getASNBOverview = createSelector(getAsnbState, (state) => {
    return state.asnbOverview;
});

export const getUserRiskStatus = createSelector(getAsnbState, (state) => {
    return state.riskStatus;
});

export const getCheckout = createSelector(getAsnbState, (state) => {
    return state.checkout;
});

export const getFetchStatus = createSelector(getAsnbState, (state) => {
    const { status, error } = state;
    return { status, error };
});

export const getMembership = createSelector(getAsnbState, (state) => {
    if (state.purchaseFavouriteDetails.transId) {
        return state.checkout.guardianDetails;
    } else if (state.checkout.minorDetails) {
        return state.checkout.minorDetails;
    } else {
        return state.checkout.guardianDetails;
    }
});

export const getFundTypesMap = createSelector(getAsnbState, (state) => {
    return state.fundTypesMap;
});

export const getFundTypes = createSelector(getAsnbState, (state) => {
    return state.fundTypeIds.map((fundCode) => state.fundTypesMap[fundCode]);
});

export const getTransactionLimit = createSelector(getAsnbState, (state) => {
    return state.transactionLimit;
});

export const getASNBDowntimeScheduledMaintenance = createSelector(getAsnbState, (state) => {
    if (state) {
        return state.ASNBDowntimeScheduledMaintenance;
    }
});
export const getCheckoutError = createSelector(getAsnbState, (state) => {
    const { status, error } = state;
    return { status, error };
});

export const getSofSowList = createSelector(getAsnbState, (state) => {
    return state.sofSowList;
});

export const loadUserAccountStatus = createSelector(getAsnbState, (state) => {
    return state.isAccountStatusNormal;
});

export const getSelectedMember = createSelector(getAsnbState, (state) => {
    return state.selectedAccount;
});

export const getEligibleFunds = createSelector(getAsnbState, (state) => {
    if (state) {
        return state.eligibleFunds;
    }
});

export const getAllFundsListing = createSelector(getAsnbState, (state) => {
    if (state) {
        return state.allFunds;
    }
});

export const getOperationHourDetails = createSelector(getAsnbState, (state) => {
    return state.operationHourDetails;
});

export const getExternalUrlList = createSelector(getAsnbState, (state) => {
    return state.externalUrls;
});

export const getIdTypeList = createSelector(getAsnbState, (state) => {
    return state.idTypes;
});

export const getRelationshipList = createSelector(getAsnbState, (state) => {
    return state.relationships;
});

export const getTransferReasonList = createSelector(getAsnbState, (state) => {
    return state.transferReasonList;
});

export const getPurchaseFavouriteDetails = createSelector(getAsnbState, (state) => {
    return state.purchaseFavouriteDetails;
});

export const getCheckoutReceipt = createSelector(
    getCheckout,
    getTransferReasonList,
    getPurchaseFavouriteDetails,
    (checkout, sowList, favouriteDetails) => {
        const reasonId = checkout?.favouriteDetails?.reasonOfTransfer;
        const reasonObj = sowList?.find((obj) => obj.id === reasonId);
        return {
            ...checkout,
            favouriteDetails,
            reason: reasonObj?.value || '',
            relationship: favouriteDetails?.relationship || '',
        };
    },
);

export const getAddFavouriteDetails = createSelector(getAsnbState, (state) => {
    return state.addFavouriteDetails;
});

export const getReceiptMembership = createSelector(
    getMembership,
    getPurchaseFavouriteDetails,
    (membershipDetails, favouriteDetails) => {
        return {
            ...membershipDetails,
            favouriteDetails,
        };
    },
);

export const getASNBFundDetailsCondition = createSelector(getAsnbState, (state) => {
    return { fundTypesMap: state.fundTypesMap, allFunds: state.allFunds };
});
