import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CSATSurveyFeatureKey, CSATSurveyState } from "./csat-survey.reducer";

const selectCSATSurveyState = createFeatureSelector<CSATSurveyState>(
    CSATSurveyFeatureKey,
);

export const selectCSATSurveyPopup = createSelector(selectCSATSurveyState, (state) => {
    return state.surveyCSAT;
});

export const selectCSATSurveySubmit = createSelector(selectCSATSurveyState, (state) => {
    return state.submitSurveyCSAT;
});

export { CSATSurveyFeatureKey }

