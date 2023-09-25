import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AVAILABLE_FUNDS_FEATURE_KEY } from './available-funds.reducer';
import { AvailableFundsState } from './available-funds.state';

const getAvailableFundsState = createFeatureSelector<AvailableFundsState>(
    AVAILABLE_FUNDS_FEATURE_KEY,
);

export const getRiskCategories = createSelector(getAvailableFundsState, (state) => {
    return state.riskCategories;
});

export const getAssetsClasses = createSelector(getAvailableFundsState, (state) => {
    return state.assetsClasses;
});

export const getFundHouse = createSelector(getAvailableFundsState, (state) => {
    return state.fundHouse;
});

export const getFundDetail = createSelector(getAvailableFundsState, (state) => {
    return state.fundDetail;
})

export const getFundPerHistory = createSelector(getAvailableFundsState, (state) => {
    return state.fundPerfHistory;
})
