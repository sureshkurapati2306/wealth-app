import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import * as AsnbSettingsActions from './asnb-settings.actions';
import { AsnbSettingsService } from '../../core/services/asnb-settings.service';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromStore from '../+state/asnb-settings.reducer';
import { forkJoin, of } from 'rxjs';

@Injectable()
export class AsnbSettingsEffects {
    loadFundSuspensionList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AsnbSettingsActions.loadFundSuspensionList),
            withLatestFrom(
                this.store.select((state: any) => {
                    return state.asnbSettings?.fundTypesMap;
                }),
            ),
            switchMap(() => {
                return forkJoin([
                    this.asnbSettingsService.getFundSuspensionList(),
                    this.asnbSettingsService.getFundList(),
                ]).pipe(
                    map(([fundSuspensionRes, lookupRes]) => {
                        return AsnbSettingsActions.loadFundSuspensionListSuccess({
                            payload: {
                                lookupRes,
                                fundSuspensionRes,
                            },
                        });
                    }),
                    catchError((error) => {
                        return of(AsnbSettingsActions.loadFundSuspensionListFailure({ error }));
                    }),
                );
            }),
        ),
    );

    loadOperationHours$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AsnbSettingsActions.loadOperationHours),
            switchMap(() => {
                return this.asnbSettingsService.getOperationHours().pipe(
                    map((data: any) => {
                        return AsnbSettingsActions.loadOperationHoursSuccess({
                            payload: data,
                        });
                    }),
                    catchError((error) =>
                        of(AsnbSettingsActions.loadOperationHoursFailure({ error })),
                    ),
                );
            }),
        );
    });

    loadFundLibraryList$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AsnbSettingsActions.loadFundLibraryList),
            switchMap(() => {
                return this.asnbSettingsService.getFundLibrary().pipe(
                    map((data) => {
                        return AsnbSettingsActions.loadFundLibraryListSuccess({
                            payload: data,
                        });
                    }),
                    catchError((error) => {
                        return of(AsnbSettingsActions.loadFundLibraryListFailure({ error }));
                    }),
                );
            }),
        );
    });

    loadFundLibrary$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AsnbSettingsActions.loadFundLibrary),
            switchMap((action) => {
                return this.asnbSettingsService.getFundLibrary(action.fundId).pipe(
                    map((data) => {
                        return AsnbSettingsActions.loadFundLibrarySuccess({
                            payload: data,
                        });
                    }),
                    catchError((error) => {
                        return of(AsnbSettingsActions.loadFundLibraryFailure({ error }));
                    }),
                );
            }),
        );
    });

    loadUrlList$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AsnbSettingsActions.loadUrlList),
            switchMap(() => {
                return this.asnbSettingsService.getUrlList().pipe(
                    map((data) => {
                        return AsnbSettingsActions.loadUrlListSuccess({ payload: data });
                    }),
                    catchError((error) => {
                        return of(AsnbSettingsActions.loadUrlListFailure({ error }));
                    }),
                );
            }),
        );
    });

    loadUrlDetails$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AsnbSettingsActions.loadUrlDetails),
            switchMap((action) => {
                return this.asnbSettingsService.getUrlDetails(action.urlCode).pipe(
                    map((data) => {
                        return AsnbSettingsActions.loadUrlDetailsSuccess({ payload: data });
                    }),
                    catchError((error) => {
                        return of(AsnbSettingsActions.loadUrlDetailsFailure({ error }));
                    }),
                );
            }),
        );
    });

    constructor(
        private store: Store<fromStore.State>,
        private readonly actions$: Actions,
        private asnbSettingsService: AsnbSettingsService,
    ) {}
}
