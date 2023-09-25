import { createReducer, on } from '@ngrx/store';
import * as LandingPageActions from './landing-page.actions';

export const landingPageFeatureKey = 'landingPageReducer';


export interface State {
  landingPageStatus: {
    onboardingId: number,
    clientId: string,
    clientIdType: string,
    fatcaStatus: string,
    fatcaStartDate: string,
    fatcaEndDate: string,
    landingStatus: string,
    landingStartDate: string,
    landingEndDate: string,
    rwsStatus: string,
    rwsStartDate: string,
    rwsEndDate: string,
    accountStatus: string,
    accountStartDate: string,
    accountEndDate: string,
    investmentStatus: string,
    investmentStartDate: string,
    investmentEndDate: string,
    finalStatus: string,
    finalStartDate: string,
    finalEndDate: string
  },
    searchFundsFromLandingPage: boolean


}

export const initialState: State = {
  landingPageStatus: {
    onboardingId: null,
    clientId: "",
    clientIdType: "NTP",
    fatcaStatus: "N",
    fatcaStartDate: null,
    fatcaEndDate: null,
    landingStatus: "N",
    landingStartDate: null,
    landingEndDate: null,
    rwsStatus: "N",
    rwsStartDate: null,
    rwsEndDate: null,
    accountStatus: "N",
    accountStartDate: null,
    accountEndDate: null,
    investmentStatus: "N",
    investmentStartDate: null,
    investmentEndDate: null,
    finalStatus: "N",
    finalStartDate: null,
    finalEndDate: null
  },
  searchFundsFromLandingPage: false

};


export const reducer = createReducer(
  initialState,

  /** Store Landing Page Status */
  on(LandingPageActions.storeLandingPageStatus, (state) => getState(state)),


  on(LandingPageActions.storeLandingPageStatusSuccess, (state, action) =>  {
    return {
      ...state,
      landingPageStatus:  action.landingPageStatus.landingPageStatus
    }
  }),

  on(LandingPageActions.setInitialLandingPageStatus, (state) => getState(state)),

  on(LandingPageActions.setInitialLandingPageStatusSuccess, (state, action) => getLandingStatus(state, action)),

  on(LandingPageActions.updateFatcaStatus, (state) => getState(state)),


  on(LandingPageActions.updateLandingPageStatusSuccess, (state, action) => getLandingStatus(state, action)),

  on(LandingPageActions.searchFundsFromLandingPage, (state, action) => {
    return {
      ...state,
      searchFundsFromLandingPage: action.IsSearchFundsFromLandingPage

    }
  })
);

export function getState(state) {
  return {
    ...state
  }
}

export function getLandingStatus(state, action) {
  return {
    ...state,
    landingPageStatus:  action.landingPageStatus
  }
}