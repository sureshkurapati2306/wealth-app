import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { PortfolioRecommendationService } from '../service/portfolio-recommendation.service';

import * as PortfolioRecoActions from './portfolio-reco.actions';

@Injectable()
export class PortfolioRecoEffects {
    loadPortFolioData$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PortfolioRecoActions.PortfolioRecoDataLoading),
            switchMap((action: any) => {
                //replace getPortfolioData parameter with actual wealth dashboard user reducer data using action.data.riskProfile
                return this.portfolioRecoService.getPortfolioData(action.risk_profile).pipe(
                    map((data: any) => {
                        return PortfolioRecoActions.PortfolioRecoDataLoadingSuccess({
                            portfolioData: {
                                holdingList: data.holding_list,
                                recommendedList: data.recommended_list,
                                assetClassLst: data.asset_class_list,
                                fundList: data.fund_list,
                            },
                        });
                    }),
                    catchError((error) =>
                        of(PortfolioRecoActions.PortfolioRecoDataLoadingFailure({ error })),
                    ),
                );
            }),
        );
    });

    constructor(
        private readonly actions$: Actions,
        private portfolioRecoService: PortfolioRecommendationService,
    ) {}
}
