import { createAction, props } from '@ngrx/store';
import { AccountStatus, FatcaStatus, FinalStatus, InvestmentStatus, LandingPageStatus, LandingStatus } from '../../model/landing-page-status.model';


export const storeLandingPageStatus = createAction(
  '[LandingPage] Store LandingPageStatus',
  props<{ customerID: any }>()
);

export const storeLandingPageStatusSuccess = createAction(
  '[LandingPage] Store LandingPageStatus success',
  props<{ landingPageStatus: any }>()
);


export const setInitialLandingPageStatus = createAction(
  '[LandingPage] Set Initial LandingPageStatus',
  props<{ userRequest: LandingPageStatus }>()
);

export const setInitialLandingPageStatusSuccess = createAction(
  '[LandingPage] Set Initial LandingPageStatus Success',
  props<{ landingPageStatus: LandingPageStatus }>()
);

export const updateFatcaStatus = createAction(
  '[LandingPage] Set fatca status',
  props<{ fatcaStatus: FatcaStatus }>()
);

export const updateLandingPageStatusSuccess = createAction(
  '[LandingPage] Update Landing page status',
  props<{ landingPageStatus: LandingPageStatus }>()
);
export const updateLandingStatus = createAction(
  '[LandingPage] Set Landing status',
  props<{ landingStatus: LandingStatus }>()
);


export const updateAccountStatus = createAction(
  '[LandingPage] Set Account opening status',
  props<{ accountStatus: AccountStatus }>()
);

export const updateInvestmentStatus = createAction(
  '[LandingPage] Set Investment status',
  props<{ investmentStatus: InvestmentStatus }>()
);

export const updateFinalStatus = createAction(
  '[LandingPage] Set Final status',
  props<{ finalStatus: FinalStatus }>()
);

export const searchFundsFromLandingPage = createAction(
  '[LandingPage] Search Funds From LandingPage',
  props<{ IsSearchFundsFromLandingPage: boolean }>()
);










