import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPortfolioRecommendation from './portfolio-reco.reducer';

// Lookup the 'PortfolioReco' feature state managed by NgRx
export const getPortfolioRecoState = createFeatureSelector<fromPortfolioRecommendation.State>(fromPortfolioRecommendation.PORTFOLIO_RECO_FEATURE_KEY);

export const selectHoldingList = createSelector(
  getPortfolioRecoState,
  state => {
    return state.portfolioData.holdingList
  }
);

export const selectRecommendedList = createSelector(
  getPortfolioRecoState,
  state => {
    return state.portfolioData.recommendedList
  }
);

export const selectAssetClassList = createSelector(
  getPortfolioRecoState,
  state => {
    return state.portfolioData.assetClassLst
  }
);

export const selectFundList = createSelector(
  getPortfolioRecoState,
  state => {
    return state.portfolioData.fundList
  }
);
