import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AvailableFundsState } from '../availableFunds/availableFunds.state'
import { AVAILABLEFUNDS_FEATURE_KEY } from '../availableFunds/availableFunds.reducer';


const getAvailableFundsState = createFeatureSelector<AvailableFundsState>(
    AVAILABLEFUNDS_FEATURE_KEY,
);

export const getFundPerHistory = createSelector(getAvailableFundsState, (state) => {
    return state.fundPerfHistory;
});