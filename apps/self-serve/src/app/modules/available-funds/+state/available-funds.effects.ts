import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { map, switchMap, finalize } from 'rxjs/operators';
import { AvailableFundsService } from '../services/available-funds.service';

import * as AvailableFundsActions from './available-funds.actions';

@Injectable()
export class AvailableFundsEffects {
    loadRiskCategories$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AvailableFundsActions.loadRiskCategories),
            fetch({
                run: () => {
                    return this.availableFundsService.getRiskCategories().pipe(
                        map((riskCategories) => {
                            return AvailableFundsActions.loadRiskCategoriesSuccess({
                                riskCategories,
                            });
                        }),
                    );
                },
                onError: (action, error) => {
                    return AvailableFundsActions.loadRiskCategoriesFailure({
                        error,
                    });
                },
            }),
        ),
    );

    loadAssetsClasses$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AvailableFundsActions.loadAssetsClasses),
            fetch({
                run: () => {
                    return this.availableFundsService.getAssetsClasses().pipe(
                        map((assetsClasses) => {
                            return AvailableFundsActions.loadAssetsClassesSuccess({
                                assetsClasses,
                            });
                        }),
                    );
                },
                onError: (action, error) => {
                    return AvailableFundsActions.loadAssetsClassesFailure({
                        error,
                    });
                },
            }),
        ),
    );

    loadFundHouse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AvailableFundsActions.loadFundHouse),
            fetch({
                run: () => {
                    return this.availableFundsService.getFundHouse().pipe(
                        map((fundHouse) => {
                            return AvailableFundsActions.loadFundHouseSuccess({
                                fundHouse: fundHouse.sort((a, b) => a.name.localeCompare(b.name))
                            });
                        }),
                    );
                },
                onError: (action, error) => {
                    return AvailableFundsActions.loadFundHouseFailure({
                        error,
                    });
                },
            }),
        ),
    );

    getFundPerHistory$ = createEffect(() => {
        return this.actions$.pipe(
          ofType(AvailableFundsActions.fundPerHistory),
          switchMap((data: any) => {
            return this.availableFundsService.getFundPerHistory(data.fundCode).pipe(
              map((result: any) => {

                return AvailableFundsActions.fundPerHistorySuccess({ payload: result });

              }),
              finalize(() => {
                // dispatch loader
              })
            );
          }
          )
        );
      });

    constructor(
        private readonly actions$: Actions,
        private availableFundsService: AvailableFundsService,
    ) {}
}
