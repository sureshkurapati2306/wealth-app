import { CSATSurvey, CSATSurveyPayload } from '../../model/csat-survey.model';
import * as loadCSATSurveyAction from './csat-survey.actions';


describe('CSAT Survey Actions', () => {

    it('should create loadCSATSurvey action', () => {
        const action = loadCSATSurveyAction.loadCSATSurvey();
        expect(action.type).toBe('[CSAT survey] Load CSAT Survey data');
    });

    it('should create loadCSATSurveySuccess action', () => {
        const mockSurveyCSAT: CSATSurvey = {
            title: 'Sample questions',
            allowSurvey: false,
            prompterCoolDownPeriod: 30,
            lastFeedbackDate: 'date',
            dashboardPrompterRequired: false,
            logoutPrompterRequired: false,
            surveyRatings: []
        };
        const action = loadCSATSurveyAction.loadCSATSurveySuccess({ surveyCSAT: mockSurveyCSAT });
        expect(action.type).toBe('[CSAT survey] Load CSAT Survey data Success');
        expect(action.surveyCSAT).toEqual(mockSurveyCSAT);
    });

    it('should create loadCSATSurveyFailure action', () => {
        const mockError = 'An error occurred';
        const action = loadCSATSurveyAction.loadCSATSurveyFailure({ error: mockError });
        expect(action.type).toBe('[CSAT survey] Load CSAT Survey data Failure');
        expect(action.error).toEqual(mockError);
    });

    it('should create submitCSATSurvey action', () => {
        const mockPayload: CSATSurveyPayload = {
            surveyConfigId: 1,
            platform: "SSP",
            rating: 3,
            comment: 'testing rating'
          };
        const action = loadCSATSurveyAction.submitCSATSurvey({ payload: mockPayload });
        expect(action.type).toBe('[CSAT survey] submit CSAT Survey data');
        expect(action.payload).toEqual(mockPayload);
    });

    it('should create submitCSATSurveySuccess action', () => {
        const mockSurveyCSAT: CSATSurvey = {
            title: 'Sample questions',
            allowSurvey: true,
            prompterCoolDownPeriod: 30,
            lastFeedbackDate: 'date',
            dashboardPrompterRequired: true,
            logoutPrompterRequired: false,
            surveyRatings: []
        };
        const action = loadCSATSurveyAction.submitCSATSurveySuccess({ submitSurveyCSAT: mockSurveyCSAT });
        expect(action.type).toBe('[CSAT survey] submit CSAT Survey data Success');
        expect(action.submitSurveyCSAT).toEqual(mockSurveyCSAT);
    });

    it('should create submitCSATSurveyFailure action', () => {
        const mockError = 'An error occurred';
        const action = loadCSATSurveyAction.submitCSATSurveyFailure({ error: mockError });
        expect(action.type).toBe('[CSAT survey] submit CSAT Survey data Failure');
        expect(action.error).toEqual(mockError);
    });
});