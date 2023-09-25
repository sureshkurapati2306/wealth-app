import { createAction, props } from '@ngrx/store';
import { AnswerPayload, Questions, Results, RiskProfileDetails } from '../models';

// Load risk profile question
export const loadRiskProfileQuestions = createAction('[RiskProfileQuestions Page] Load Risk profile questions');

export const loadRiskProfileQuestionsSuccess = createAction(
    '[RiskProfileQuestion/Questions] Load RiskProfileQuestions Success',
    props<{ questions: Questions[] }>(),
);

export const loadRiskProfileQuestionsFailure = createAction(
    '[RiskProfileQuestion/Questions] Load RiskProfileQuestions Failure',
    props<{ error: any }>(),
);

// Load risk profile details
export const loadRiskProfileDetails = createAction('[RiskProfileDetail Page] Load Risk profile details');

export const loadRiskProfileDetailsSuccess = createAction(
    '[RiskProfileDetails/Details] Load RiskProfileDetails Success',
    props<{ details: RiskProfileDetails[] }>(),
);

export const loadRiskProfileDetailsFailure = createAction(
    '[RiskProfileDetails/Details] Load RiskProfileDetails Failure',
    props<{ error: any }>(),
);

// Submit risk profile answers
export const submitAnswer = createAction('[RiskProfileAnswer/API] Submit Answers', props<{ payload: AnswerPayload }>());

export const submitAnswerSuccess = createAction(
    '[RiskProfileAnswer/API] Submit Answers Success',
    props<{ results: Results }>(),
);

export const submitAnswerFailure = createAction(
    '[RiskProfileAnswer/API] Submit Answers Failure',
    props<{ error: any }>(),
);