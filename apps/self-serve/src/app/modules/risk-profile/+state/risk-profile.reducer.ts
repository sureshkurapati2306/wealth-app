import { createReducer, on, Action } from '@ngrx/store';

import * as RiskProfileQuestionsActions from './risk-profile.actions';
import { initialState } from './risk-profile.state';

export const RISK_PROFILE_QUESTIONS_FEATURE_KEY = 'riskProfile';

const riskProfileQuestionsReducer = createReducer(
    initialState,
    on(RiskProfileQuestionsActions.loadRiskProfileQuestions, (state) => ({ ...state })),
    on(RiskProfileQuestionsActions.loadRiskProfileQuestionsSuccess, (state, action) => {
        return {
            ...state,
            questions: action.questions,
        };
    }),

    on(RiskProfileQuestionsActions.loadRiskProfileDetails, (state) => ({ ...state })),
    on(RiskProfileQuestionsActions.loadRiskProfileDetailsSuccess, (state, action) => {
        return {
            ...state,
            details: action.details,
        };
    }),

    on(RiskProfileQuestionsActions.submitAnswer, (state) => ({ ...state })),
    on(RiskProfileQuestionsActions.submitAnswerSuccess, (state, action) => {
        return {
            ...state,
            results: action.results
        };
    }),
);

export function reducer(state, action: Action) {
    return riskProfileQuestionsReducer(state, action);
}
