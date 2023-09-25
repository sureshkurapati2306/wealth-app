import { State } from './csat-report.reducer';
import {
    selectCsatReport,
    selectCsatReportLoading,
    selectCsatReportError,
    selectCsatQuestionnaire,
    selectReportData
} from './csat-report.selectors';

describe('CsatReportSelectors', () => {
    const initialState: State = {
        csatReport: [],
        loading: false,
        error: null,
        csatQuestionnaire: null,
        reportData: []
    };

    it('selectCsatReport should return the csatReport from the state', () => {
        const result = selectCsatReport.projector(initialState);
        expect(result).toBe(initialState.csatReport);
    });

    it('selectCsatReportLoading should return the loading state', () => {
        const result = selectCsatReportLoading.projector(initialState);
        expect(result).toBe(initialState.loading);
    });

    it('selectCsatReportError should return the error from the state', () => {
        const result = selectCsatReportError.projector(initialState);
        expect(result).toBe(initialState.error);
    });

    it('selectCsatQuestionnaire should return the csatQuestionnaire from the state', () => {
        const result = selectCsatQuestionnaire.projector(initialState);
        expect(result).toBe(initialState.csatQuestionnaire);
    });

    it('selectReportData should return the reportData from the state', () => {
        const result = selectReportData.projector(initialState);
        expect(result).toBe(initialState.reportData);
    });
});
