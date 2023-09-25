import { createReducer, on } from "@ngrx/store";
import * as CSATSurveyActions from './csat-survey.actions';


export const CSATSurveyFeatureKey = 'CSATSurvey';

export interface CSATSurveyState {
    surveyCSAT: any;
    submitSurveyCSAT: any;
    loading: boolean;
    error: any;
}

export const initialState: CSATSurveyState = {
    surveyCSAT: {},
    submitSurveyCSAT: {},
    loading: false,
    error: null,
};

export const csatSurveyReducer = createReducer(
    initialState,
    on(CSATSurveyActions.loadCSATSurvey, (state) => generateLoadState(state)),
    on(CSATSurveyActions.loadCSATSurveySuccess, (state, { surveyCSAT }) => {
        return {
            ...state,
            surveyCSAT,
            loading: false,
            error: null,
        };
    }),
    on(CSATSurveyActions.loadCSATSurveyFailure, (state, { error }) => generateErrorState(state, error)),
    on(CSATSurveyActions.submitCSATSurvey, (state) => generateLoadState(state)),
    on(CSATSurveyActions.submitCSATSurveySuccess, (state, { submitSurveyCSAT }) => {
        return {
            ...state,
            submitSurveyCSAT,
            loading: false,
            error: null,
        };
    }),
    on(CSATSurveyActions.submitCSATSurveyFailure, (state, { error }) => generateErrorState(state, error)),  
);

export function generateLoadState(state) {
    return {
        ...state,
        loading: true,
        error: null,
    };
}

export function generateErrorState(state, error) {
    return {
        ...state,
        loading: false,
        error,
    };
}