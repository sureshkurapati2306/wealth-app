import { createReducer, on, Action } from '@ngrx/store';

import * as AvailableFundsActions from './available-funds.actions';
import { initialState } from './available-funds.state';

export const AVAILABLE_FUNDS_FEATURE_KEY = 'availableFunds';

const availableFundsReducer = createReducer(
    initialState,
    on(AvailableFundsActions.loadRiskCategoriesSuccess, (state, action) => {
        return {
            ...state,
            riskCategories: action.riskCategories,
        };
    }),

    on(AvailableFundsActions.loadAssetsClassesSuccess, (state, action) => {
        return {
            ...state,
            assetsClasses: action.assetsClasses,
        };
    }),

    on(AvailableFundsActions.loadFundHouseSuccess, (state, action) => {
        return {
            ...state,
            fundHouse: action.fundHouse,
        };
    }),
    
    on(AvailableFundsActions.uploadFundDetailSuccess, (state, action) => {
        return {
            ...state,
            fundDetail: action.fundDetail,
        };
    }),
    on(AvailableFundsActions.fundPerHistorySuccess, (state, action) => {
        return {
            ...state,
            fundPerfHistory: action.payload,
        };
    }),
);

export function reducer(state, action: Action) {
    return availableFundsReducer(state, action);
}
