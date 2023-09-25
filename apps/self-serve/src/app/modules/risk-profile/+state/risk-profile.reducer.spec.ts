import { Action } from '@ngrx/store';
import { mockQuestions, mockRiskProfileDetails, mockSubmitAnswerResponse } from '../mock/data';
import { AnswerPayload } from '../models';

import * as RiskProfileQuestionsActions from './risk-profile.actions';
import { reducer } from './risk-profile.reducer';
import { initialState } from './risk-profile.state';

describe('RiskProfileQuestions Reducer', () => {
    describe('[RiskProfileQuestion/Questions]', () => {
        const questions = mockQuestions;

        it('Should loadRiskProfileQuestionsSuccess return the list of questions', () => {
            const action = RiskProfileQuestionsActions.loadRiskProfileQuestionsSuccess({
                questions,
            });

            const result = reducer(initialState, action);

            expect(result.questions).toBe(questions);
        });

        it('should set the risk profile questions property in state', () => {
            const action = RiskProfileQuestionsActions.loadRiskProfileQuestionsSuccess({
                questions,
            });
            const result = reducer(initialState, action);

            expect(result).toEqual({
                ...initialState,
                questions: action.questions,
            });
        });

        it('Should call load api to set init state', () => {
            const action = RiskProfileQuestionsActions.loadRiskProfileQuestions();
            const result = reducer(initialState, action);

            expect(result).toEqual({
                ...initialState,
            });
        });
    });

    describe('[RiskProfileDetails/Details]', () => {
        const details = mockRiskProfileDetails;

        it('Should loadRiskProfileDetailsSuccess return the list of details', () => {
            const action = RiskProfileQuestionsActions.loadRiskProfileDetailsSuccess({
                details,
            });

            const result = reducer(initialState, action);

            expect(result.details).toBe(details);
        });

        it('Should set the risk profile details property in state', () => {
            const action = RiskProfileQuestionsActions.loadRiskProfileDetailsSuccess({
                details,
            });
            const result = reducer(initialState, action);

            expect(result).toEqual({
                ...initialState,
                details: action.details,
            });
        });

        it('Should call load loadRiskProfileDetails api to set init state', () => {
            const action = RiskProfileQuestionsActions.loadRiskProfileDetails();
            const result = reducer(initialState, action);

            expect(result).toEqual({
                ...initialState,
            });
        });
    });

    describe('[RiskProfileAnswer/API]', () => {
        const results = mockSubmitAnswerResponse;

        it('Should submitAnswerSuccess return the response', () => {
            const action = RiskProfileQuestionsActions.submitAnswerSuccess({
                results,
            });

            const result = reducer(initialState, action);

            expect(result.results).toBe(results);
        });

        it('Should set the response from submit answers in state', () => {
            const action = RiskProfileQuestionsActions.submitAnswerSuccess({
                results,
            });
            const result = reducer(initialState, action);

            expect(result).toEqual({
                ...initialState,
                results: action.results,
            });
        });

        it('Should call load loadRiskProfileDetails api to set init state', () => {
            const payload: AnswerPayload = {
                computeRiskProfile: {
                    cifNumber: '10330000219671',
                    rmId: 'BRMGR1',
                    custName: 'WEALTH THREE',
                    custIdType: 'NTP',
                    custIdNo: '950310034403',
                    custIdIssue: '',
                    onboardingId: 34,
                    questionAns: [
                        { questionNumber: '1', multiOptions: 'N', options: [1] },
                        { questionNumber: '2', multiOptions: 'N', options: [3] },
                        { questionNumber: '3', multiOptions: 'N', options: [2] },
                    ],
                },
            };
            const action = RiskProfileQuestionsActions.submitAnswer({ payload });
            const result = reducer(initialState, action);

            expect(result).toEqual({
                ...initialState,
            });
        });
    });

    describe('unknown action', () => {
        it('should return the previous state', () => {
            const action = {} as Action;

            const result = reducer(initialState, action);

            expect(result).toBe(initialState);
        });
    });
});
