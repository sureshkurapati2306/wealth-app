
import { createReducer, on } from '@ngrx/store';

import * as PortfolioRecoActions from './portfolio-reco.actions';

import { RecommendedList, HoldingList, AssetClassLst, PortfolioData } from '@cimb/shared/models';
import { FundList } from '../models/fund-list.model';


export const PORTFOLIO_RECO_FEATURE_KEY = 'portfolioReco';

export interface State {
    holdingList: HoldingList;
    recommendedList: RecommendedList;
    assetClassList: AssetClassLst[];
    fundList: FundList[];
    portfolioData: PortfolioData
    status: 'pending' | 'loading' | 'success' | 'error';  // Series of states for the state
    error: string;  // For any error messages
}

export const initialState: State = {
    holdingList: null,
    recommendedList: null,
    assetClassList: null,
    fundList: null,
    portfolioData: {
        holdingList: null,
        recommendedList: null,
        assetClassLst: null,
        fundList: null,
    },
    status: 'pending',
    error: ''
};

export const reducer = createReducer(
    initialState,
    on(PortfolioRecoActions.PortfolioRecoDataLoading, (state)=> {
        return {
            ...state,
            status: 'loading',
            error: ''
        }
    }),
    on(PortfolioRecoActions.PortfolioRecoDataLoadingSuccess, (state, action)=> {
        return {
            ...state,
            portfolioData: action.portfolioData,
            status: 'success',
            error: ''
        }
    }),
    on(PortfolioRecoActions.PortfolioRecoDataLoadingFailure, (state, action)=> {
        return {
            ...state,
            status: 'error',
            error: action.error
        }
    }),
);