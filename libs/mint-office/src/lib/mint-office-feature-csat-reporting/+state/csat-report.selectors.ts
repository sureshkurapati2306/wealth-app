import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './csat-report.reducer';

export const selectCsatReportState = createFeatureSelector<State>('csatReport');

export const selectCsatReport = createSelector(
    selectCsatReportState,
    state => state.csatReport
);

export const selectCsatReportLoading = createSelector(
    selectCsatReportState,
    state => state.loading
);

export const selectCsatReportError = createSelector(
    selectCsatReportState,
    state => state.error
);

export const selectCsatQuestionnaire = createSelector(
    selectCsatReportState,
    state => state.csatQuestionnaire
);

export const selectReportData = createSelector(
    selectCsatReportState,
    state => state.reportData
);

