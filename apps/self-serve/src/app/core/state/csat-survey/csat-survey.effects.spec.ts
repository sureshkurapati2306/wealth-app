import { cold } from "jasmine-marbles";
import * as CSATSurveyActions from "./csat-survey.actions";
import { CSATSurveyEffects } from "./csat-survey.effects";
import { Observable, of } from "rxjs";
import { CsatSurveyService } from "../../services/csat-survey/csat-survey.service";
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { CSATSurvey, CSATSurveyPayload } from "../../model/csat-survey.model";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe('CSATSurveyEffects', () => {
    let effects: CSATSurveyEffects;
    let actions$: Observable<any>;
    let csatSurveyService: CsatSurveyService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                CSATSurveyEffects,
                provideMockActions(() => actions$)
            ],
        });

        effects = TestBed.inject(CSATSurveyEffects);
        actions$ = of(CSATSurveyActions);
        csatSurveyService = TestBed.inject(CsatSurveyService);
    });

    it('should load CSAT survey successfully', () => {
        const surveyCSAT: CSATSurvey = {
            title: 'string',
            allowSurvey: true,
            prompterCoolDownPeriod: 30,
            lastFeedbackDate: 'string',
            dashboardPrompterRequired: true,
            logoutPrompterRequired: true,
            surveyRatings: [],
        };
        jest.spyOn(csatSurveyService, 'getCSATSurvey').mockReturnValue(of(surveyCSAT));

        effects.loadCSATSurvey$.subscribe((action) => {
            expect(action).toEqual(CSATSurveyActions.loadCSATSurvey());
        });
    });

    it('should handle load CSAT survey failure', () => {
        const error = 'Error loading CSAT survey';
        jest.spyOn(csatSurveyService, 'getCSATSurvey').mockReturnValue(of(cold('#', {}, error)));
        effects.loadCSATSurvey$.subscribe((action) => {
            expect(action).toEqual(CSATSurveyActions.loadCSATSurvey());
        });
    });

    it('should submit CSAT survey successfully', () => {
        const surveyCSAT: any = {
            headers: {},
            body: null,
            statusCode: "CREATED",
            statusCodeValue: 201
        };
        const payload: CSATSurveyPayload = {
            surveyConfigId: 1,
            platform: "SSP",
            rating: 3,
            comment: 'testing rating'
        };
        jest.spyOn(csatSurveyService, 'submitCSATSurvey').mockReturnValue(of(surveyCSAT));

        effects.submitCSATSurvey$.subscribe((action) => {
            expect(action).toEqual(CSATSurveyActions.submitCSATSurvey({ payload }));
        });
    });

    it('should handle submit CSAT survey failure', () => {
        const error = 'Error submitting CSAT survey';
        const payload: CSATSurveyPayload = {
            surveyConfigId: 1,
            platform: "SSP",
            rating: 3,
            comment: 'testing rating'
        };
        jest.spyOn(csatSurveyService, 'submitCSATSurvey').mockReturnValue(of(cold('#', {}, error)));
        effects.submitCSATSurvey$.subscribe((action) => {
            expect(action).toEqual(CSATSurveyActions.submitCSATSurvey({ payload }));
        });
    });

});