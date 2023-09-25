import { createAction, props } from "@ngrx/store";
import { CSATSurvey, CSATSurveyPayload } from "../../model/csat-survey.model";

export const loadCSATSurvey = createAction(
    '[CSAT survey] Load CSAT Survey data'
);

export const loadCSATSurveySuccess = createAction(
    '[CSAT survey] Load CSAT Survey data Success',
    props<{ surveyCSAT: CSATSurvey }>()
);

export const loadCSATSurveyFailure = createAction(
    '[CSAT survey] Load CSAT Survey data Failure',
    props<{ error: any }>()
);

export const submitCSATSurvey = createAction(
    '[CSAT survey] submit CSAT Survey data',
    props<{ payload: CSATSurveyPayload }>()
);

export const submitCSATSurveySuccess = createAction(
    '[CSAT survey] submit CSAT Survey data Success',
    props<{ submitSurveyCSAT: any }>()
);

export const submitCSATSurveyFailure = createAction(
    '[CSAT survey] submit CSAT Survey data Failure',
    props<{ error: any }>()
);