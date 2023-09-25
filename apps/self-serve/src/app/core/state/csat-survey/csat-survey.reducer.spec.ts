import { csatSurveyReducer, initialState } from "./csat-survey.reducer";
import * as CSATSurveyActions from "./csat-survey.actions";

describe('csatSurveyReducer', () => {
    it('should set loading to true and error to null on loadCSATSurvey action', () => {
        const action = CSATSurveyActions.loadCSATSurvey();
        const newState = csatSurveyReducer(initialState, action);

        expect(newState.loading).toBe(true);
        expect(newState.error).toStrictEqual(null);
    });

    it('should update surveyCSAT, set loading to false, and error to null on loadCSATSurveySuccess action', () => {
        const surveyCSAT = {
            title: 'string',
            allowSurvey: true,
            prompterCoolDownPeriod: 30,
            lastFeedbackDate: 'string',
            dashboardPrompterRequired: true,
            logoutPrompterRequired: true,
            surveyRatings: [],
        };
        const action = CSATSurveyActions.loadCSATSurveySuccess({ surveyCSAT });
        const newState = csatSurveyReducer(initialState, action);

        expect(newState.surveyCSAT).toBe(surveyCSAT);
        expect(newState.loading).toBe(false);
        expect(newState.error).toStrictEqual(null);
    });

    it('should set surveyCSAT to null, set loading to false, and update error on loadCSATSurveyFailure action', () => {
        const error = 'Test Error';
        const action = CSATSurveyActions.loadCSATSurveyFailure({ error });
        const newState = csatSurveyReducer(initialState, action);

        expect(newState.surveyCSAT).toStrictEqual({});
        expect(newState.loading).toBe(false);
        expect(newState.error).toBe(error);
    });
});
