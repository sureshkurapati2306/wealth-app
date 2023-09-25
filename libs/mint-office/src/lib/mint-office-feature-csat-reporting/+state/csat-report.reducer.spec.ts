import { csatReportReducer, initialState } from './csat-report.reducer';
import * as CsatReportActions from './csat-report.actions';

describe('CsatReportReducer', () => {
    it('should set loading to true on loadCsatReport action', () => {
        const csatReportPayload = {
            "title": "Sample Question 5",
            "prompterCoolDownPeriod": 30,
            "dashboardPrompterRequired": false,
            "logoutPrompterRequired": false
        }
        const newState = csatReportReducer(initialState, CsatReportActions.loadCsatReport({ payload: csatReportPayload }));
        expect(newState.loading).toBe(true);
        expect(newState.error).toBe(null);
    });

    it('should set loading to false and populate csatReport on loadCsatReportSuccess action', () => {
        const mockCsatReport = null;
        const newState = csatReportReducer(initialState, CsatReportActions.loadCsatReportSuccess({ csatReport: mockCsatReport }));
        expect(newState.loading).toBe(false);
        expect(newState.csatReport).toBe(mockCsatReport);
    });

    it('should set loading to false and populate error on loadCsatReportFailure action', () => {
        const mockError = 'error response';
        const newState = csatReportReducer(initialState, CsatReportActions.loadCsatReportFailure({ error: mockError }));
        expect(newState.loading).toBe(false);
        expect(newState.error).toBe(mockError);
    });

    it('should set csatQuestionnaire to null on loadCsatQuestionnaireDetails action', () => {
        const newState = csatReportReducer(initialState, CsatReportActions.loadCsatQuestionnaireDetails({ id: '1' }));
        expect(newState.csatQuestionnaire).toBe(null);
    });

    it('should reset csatQuestionnaire to null on loadCsatQuestionnaireDetailsFailure action', () => {
        const newState = csatReportReducer(initialState, CsatReportActions.loadCsatQuestionnaireDetailsFailure({ error: 'error' }));
        expect(newState.csatQuestionnaire).toBe(null);
    });

    it('should clear reportData on loadReportData action', () => {
        const newState = csatReportReducer(initialState, CsatReportActions.loadReportData({ startDate: '2023-01-01', endDate: '2023-12-31' }));
        expect(newState.reportData.length).toBe(0);
    });

    it('should populate reportData on loadReportDataSuccess action', () => {
        const mockReportData = 'test csv data';
        const newState = csatReportReducer(initialState, CsatReportActions.loadReportDataSuccess({ reportData: mockReportData }));
        expect(newState.reportData).toBe(mockReportData);
    });

    it('should clear reportData on loadReportDataFailure action', () => {
        const newState = csatReportReducer(initialState, CsatReportActions.loadReportDataFailure({ error: 'error' }));
        expect(newState.reportData.length).toBe(0);
    });
});
