import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { map } from 'rxjs/operators';
import { RiskProfileService } from '../services/risk-profile.service';
import * as RiskProfileQuestionsActions from './risk-profile.actions';
import { path } from '../../../shared/config';

@Injectable()
export class RiskProfileQuestionsEffects {
    loadQuestions$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RiskProfileQuestionsActions.loadRiskProfileQuestions),
            fetch({
                run: () => {
                    return this.riskProfileService.getQuestions().pipe(
                        map((questions) => {
                            return RiskProfileQuestionsActions.loadRiskProfileQuestionsSuccess({
                                questions,
                            });
                        }),
                    );
                },
                onError: (action, error) => {
                    return RiskProfileQuestionsActions.loadRiskProfileQuestionsFailure({ error });
                },
            }),
        ),
    );

    loadRiskProfileDetails$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RiskProfileQuestionsActions.loadRiskProfileDetails),
            fetch({
                run: () => {
                    return this.riskProfileService.getRiskProfileDetails().pipe(
                        map((details) => {
                            return RiskProfileQuestionsActions.loadRiskProfileDetailsSuccess({
                                details,
                            });
                        }),
                    );
                },
                onError: (action, error) => {
                    return RiskProfileQuestionsActions.loadRiskProfileDetailsFailure({ error });
                },
            }),
        ),
    );

    submitRiskProfileAnswers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RiskProfileQuestionsActions.submitAnswer),
            fetch({
                run: (action) => {
                    return this.riskProfileService.addAnswers(action.payload).pipe(
                        map((results) => {
                            this.router.navigate([path.RISK_PROFILE_RESULTS]);
                            return RiskProfileQuestionsActions.submitAnswerSuccess({
                                results,
                            });
                        }),
                    );
                },
                onError: (action, error) => {
                    return RiskProfileQuestionsActions.submitAnswerFailure({ error });
                },
            }),
        ),
    );

    constructor(
        private readonly actions$: Actions,
        private router: Router,
        private riskProfileService: RiskProfileService,
    ) {}
}
