import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RISK_PROFILE_QUESTIONS_FEATURE_KEY } from './risk-profile.reducer';
import { RiskProfileState } from './risk-profile.state';

export const getRiskProfileQuestionsState = createFeatureSelector<RiskProfileState>(
    RISK_PROFILE_QUESTIONS_FEATURE_KEY,
);

export const getQuestions = createSelector(getRiskProfileQuestionsState, (state) => {
    return state.questions;
});

export const getRiskProfileDetails = createSelector(getRiskProfileQuestionsState, (state) => {
    return state.details;
});

export const getRiskProfileResults = createSelector(getRiskProfileQuestionsState, (state) => {
    return state.results;
});
