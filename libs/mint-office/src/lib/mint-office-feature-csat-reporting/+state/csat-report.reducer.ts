import { createReducer, on } from '@ngrx/store';
import { CsatQuestionnaire } from '../../core/models/csat-report.model'; // Import the model
import * as CsatReportActions from './csat-report.actions';

export const csatReportFeatureKey = 'csatReport';

export interface State {
    csatReport: CsatQuestionnaire[];
    loading: boolean;
    error: any;
    csatQuestionnaire: CsatQuestionnaire | null;
    reportData: any[];
}

export const initialState: State = {
    csatReport: [],
    loading: false,
    error: null,
    csatQuestionnaire: null,
    reportData: []
};

export const csatReportReducer = createReducer(
    initialState,
    on(CsatReportActions.loadCsatReport, state => ({ ...state, loading: true, error: null })),
    on(CsatReportActions.loadCsatReportSuccess, (state, { csatReport }) => ({ ...state, csatReport, loading: false })),
    on(CsatReportActions.loadCsatReportFailure, (state, { error }) => ({ ...state, loading: false, error })),
    on(CsatReportActions.loadCsatQuestionnaireDetails, state => ({ ...state, csatQuestionnaire: null })),
    on(CsatReportActions.loadCsatQuestionnaireDetailsSuccess, (state, { csatQuestionnaire }) => ({ ...state, csatQuestionnaire })),
    on(CsatReportActions.loadCsatQuestionnaireDetailsFailure, state => ({ ...state, csatQuestionnaire: null })),
    on(CsatReportActions.loadReportData, state => ({ ...state, reportData: [] })),
    on(CsatReportActions.loadReportDataSuccess, (state, { reportData }) => ({ ...state, reportData })),
    on(CsatReportActions.loadReportDataFailure, state => ({ ...state, reportData: [] }))
);

