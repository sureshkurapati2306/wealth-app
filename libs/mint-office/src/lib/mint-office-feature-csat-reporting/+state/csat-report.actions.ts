import { createAction, props } from '@ngrx/store';
import { CsatQuestionnaire } from '../../core/models/csat-report.model';


export const loadCsatReport = createAction(
    '[CSAT Report] Load CSAT Report Data',
    props<{ payload: CsatQuestionnaire }>()
);

export const loadCsatReportSuccess = createAction(
    '[CSAT Report] Load CSAT Report Data Success',
    props<{ csatReport: any[] }>()
);

export const loadCsatReportFailure = createAction(
    '[CSAT Report] Load CSAT Report Data Failure',
    props<{ error: any }>()
);

export const loadCsatQuestionnaireDetails = createAction(
    '[CSAT Report] Load CSAT Questionnaire Details',
    props<{ id: string }>()
);

export const loadCsatQuestionnaireDetailsSuccess = createAction(
    '[CSAT Report] Load CSAT Questionnaire Details Success',
    props<{ csatQuestionnaire: CsatQuestionnaire }>()
);

export const loadCsatQuestionnaireDetailsFailure = createAction(
    '[CSAT Report] Load CSAT Questionnaire Details Failure',
    props<{ error: any }>()
);

export const loadReportData = createAction(
    '[Report] Load Report Data',
    props<{ startDate: string, endDate: string }>()
);

export const loadReportDataSuccess = createAction(
    '[Report] Load Report Data Success',
    props<{ reportData: any }>()
);

export const loadReportDataFailure = createAction(
    '[Report] Load Report Data Failure',
    props<{ error: any }>()
);