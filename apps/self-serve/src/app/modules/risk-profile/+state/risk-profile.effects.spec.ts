import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { Observable, of } from 'rxjs';
import { mockQuestions, mockRiskProfileDetails, mockSubmitAnswerResponse } from '../mock/data';
import { AnswerPayload } from '../models';
import { RiskProfileService } from '../services/risk-profile.service';
import * as RiskProfileQuestionsActions from './risk-profile.actions';
import { RiskProfileQuestionsEffects } from './risk-profile.effects';

describe('RiskProfileQuestionsEffects', () => {
    let actions: Observable<Action>;
    let effects: RiskProfileQuestionsEffects;
    let service: RiskProfileService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NxModule.forRoot(), RouterTestingModule],
            providers: [
                RiskProfileQuestionsEffects,
                provideMockActions(() => actions),
                provideMockStore(),
                {
                    provide: RiskProfileService,
                    useValue: {
                        getQuestions: jest.fn(),
                        addAnswers: jest.fn(),
                        getRiskProfileDetails: jest.fn(),
                    },
                },
            ],
        });
        service = TestBed.inject(RiskProfileService);
        effects = TestBed.inject(RiskProfileQuestionsEffects);
    });

    describe('RiskProfileQuestionsEffects', () => {
        it('should work', async () => {
            expect(effects).toBeTruthy();
        });
    });

    describe('loadQuestions$', () => {
        it('Should risk profile questions', () => {
            const action = RiskProfileQuestionsActions.loadRiskProfileQuestions();
            const questions = mockQuestions;

            jest.spyOn(service, 'getQuestions').mockReturnValue(of(questions));
            actions = hot('a', { a: action });

            effects.loadQuestions$.subscribe((result) => {
                expect(result).toEqual(
                    RiskProfileQuestionsActions.loadRiskProfileQuestionsSuccess({ questions }),
                );
            });
        });

        it('Should show error if risk profile question failed', () => {
            const action = RiskProfileQuestionsActions.loadRiskProfileQuestions();
            const error: any = 'ERROR_MESSAGE';
            actions = hot('a', { a: action });

            effects.loadQuestions$.subscribe((result) => {
                expect(result).toEqual(
                    RiskProfileQuestionsActions.loadRiskProfileQuestionsFailure(error),
                );
            });
        });
    });

    describe('loadRiskProfileDetails$', () => {
        it('Should call risk profile details', () => {
            const action = RiskProfileQuestionsActions.loadRiskProfileDetails();
            const details = mockRiskProfileDetails;

            jest.spyOn(service, 'getRiskProfileDetails').mockReturnValue(of(details));
            actions = hot('a', { a: action });

            effects.loadRiskProfileDetails$.subscribe((result) => {
                expect(result).toEqual(
                    RiskProfileQuestionsActions.loadRiskProfileDetailsSuccess({ details }),
                );
            });
        });

        it('Should show error if risk profile details failed', () => {
            const action = RiskProfileQuestionsActions.loadRiskProfileDetails();
            const error: any = 'ERROR_MESSAGE';
            actions = hot('a', { a: action });

            effects.loadRiskProfileDetails$.subscribe((result) => {
                expect(result).toEqual(
                    RiskProfileQuestionsActions.loadRiskProfileDetailsFailure(error),
                );
            });
        });
    });
    describe('submitRiskProfileAnswers$', () => {
        const payload: AnswerPayload = {
            computeRiskProfile: {
                cifNumber: '10330000219671',
                rmId: 'BRMGR1',
                custName: 'WEALTH THREE',
                custIdType: 'NTP',
                custIdNo: '950310034403',
                onboardingId: 34,
                custIdIssue: '',
                questionAns: [
                    { questionNumber: '1', multiOptions: 'N', options: [1] },
                    { questionNumber: '2', multiOptions: 'N', options: [3] },
                    { questionNumber: '3', multiOptions: 'N', options: [2] },
                ],
            },
        };
        it('Should call submit risk profile answers', () => {
            const action = RiskProfileQuestionsActions.submitAnswer({ payload });
            const results = mockSubmitAnswerResponse;

            jest.spyOn(service, 'addAnswers').mockReturnValue(of(results));
            actions = hot('a', { a: action });

            effects.submitRiskProfileAnswers$.subscribe((result) => {
                expect(result).toEqual(
                    RiskProfileQuestionsActions.submitAnswerSuccess({ results }),
                );
            });
        });

        it('Should show error if submit answer is failed', () => {
            const action = RiskProfileQuestionsActions.submitAnswer(undefined);
            const error: any = 'ERROR_MESSAGE';
            actions = hot('a', { a: action });

            effects.loadRiskProfileDetails$.subscribe((result) => {
                expect(result).toEqual(RiskProfileQuestionsActions.submitAnswerFailure({ error }));
            });
        });
    });
});
