import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAsnbReport from './asnb-report.reducer';

export const selectAsnbReportState = createFeatureSelector<fromAsnbReport.State>(
    fromAsnbReport.asnbReportFeatureKey,
);

export const getTransactions = createSelector(selectAsnbReportState, (state) => {
    return state.transactionList;
});

export const getTransactionFilter = createSelector(selectAsnbReportState, (state) => {
    return state.transactionFilter;
});

export const getLoadingStatus = createSelector(selectAsnbReportState, (state) => {
    return state.status;
});
export const getHasSearched = createSelector(selectAsnbReportState, (state) => {
    return state.hasSearched;
});

export const getLinkAccount = createSelector(selectAsnbReportState, (state) => {
    return state.linkAccountList;
});

export const getLinkAccountFilter = createSelector(selectAsnbReportState, (state) => {
    return state.linkAccountFilter;
});

export const getLinkAccountLoadingStatus = createSelector(selectAsnbReportState, (state) => {
    return state.linkAccountStatus;
});
export const getLinkAccountHasSearched = createSelector(selectAsnbReportState, (state) => {
    return state.linkAccountHasSearched;
});

export const getFavourite = createSelector(selectAsnbReportState, (state) => {
    return state.favouriteList;
});

export const getFavouriteFilter = createSelector(selectAsnbReportState, (state) => {
    return state.favouriteFilter;
});

export const getFavouriteLoadingStatus = createSelector(selectAsnbReportState, (state) => {
    return state.favouriteStatus;
});
export const getFavouriteHasSearched = createSelector(selectAsnbReportState, (state) => {
    return state.favouriteHasSearched;
});
