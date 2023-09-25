import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromLandingPage from './landing-page.reducer';

export const selectLandingPageStatusState = createFeatureSelector<fromLandingPage.State>(
    fromLandingPage.landingPageFeatureKey
);

export const selectLandingPageStatus = createSelector(
    selectLandingPageStatusState,
    state => {
        return state.landingPageStatus
    }
)

export const selectAccountStatus = createSelector(
    selectLandingPageStatusState,
    state => {
        return state.landingPageStatus.accountStatus
    }
)
