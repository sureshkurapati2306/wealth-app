import { createAction, props } from '@ngrx/store';
import {  RiskProfile, PortfolioData } from '@cimb/shared/models';

export const PortfolioRecoDataLoading = createAction(
    '[PortfolioReco/API] Load Portfolio Reco Data Loading',
    props<{ data: RiskProfile }>(),
);
export const PortfolioRecoDataLoadingSuccess = createAction(
    '[PortfolioReco/API] Load Portfolio Reco Data Loading Success',
    props<{ portfolioData: PortfolioData }>(),
);

export const PortfolioRecoDataLoadingFailure = createAction(
    '[PortfolioReco/API] Load Portfolio Reco Data Loading Failure',
    props<{ error: any }>(),
);


