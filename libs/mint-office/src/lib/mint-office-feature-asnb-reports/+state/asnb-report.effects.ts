import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, finalize, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as AsnbReportActions from './asnb-report.actions';
import { AsnbReportsService } from '../../core/services/asnb-reports.service';
import * as loadingBarActions from '../../mint-office-ui-loading-indicator/loading-bar/+state/loading-bar.actions';
@Injectable()
export class AsnbReportEffects {
    loadTransactions$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AsnbReportActions.loadTransactions),
            switchMap((action) => {
                this.store.dispatch(loadingBarActions.loadingBarShow());
                return this.asnbReportsService.searchTransactions(action.payload).pipe(
                    map((data) => {
                        return AsnbReportActions.loadTransactionsSuccess({
                            payload: data,
                            filter: action.payload,
                        });
                    }),
                    catchError((error) => of(AsnbReportActions.loadTransactionsFailure({ error }))),
                    finalize(() => {
                        this.store.dispatch(loadingBarActions.loadingBarHide());
                    }),
                );
            }),
        );
    });

    loadLinkAccount$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AsnbReportActions.loadLinkAccount),
            switchMap((action) => {
                this.store.dispatch(loadingBarActions.loadingBarShow());
                return this.asnbReportsService.searchLinkAccount(action.payload).pipe(
                    map((data) => {
                        return AsnbReportActions.loadLinkAccountSuccess({
                            payload: data?.linkDelinkReportDetails,
                            filter: action.payload,
                        });
                    }),
                    catchError((error) => of(AsnbReportActions.loadLinkAccountFailure({ error }))),
                    finalize(() => {
                        this.store.dispatch(loadingBarActions.loadingBarHide());
                    }),
                );
            }),
        );
    });

    loadFavourite$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AsnbReportActions.loadFavourite),
            switchMap((action) => {
                this.store.dispatch(loadingBarActions.loadingBarShow());
                return this.asnbReportsService.searchFavourite(action.payload).pipe(
                    map((data) => {
                        return AsnbReportActions.loadFavouriteSuccess({
                            payload: data,
                            filter: action.payload,
                        });
                    }),
                    catchError((error) => of(AsnbReportActions.loadFavouriteFailure({ error }))),
                    finalize(() => {
                        this.store.dispatch(loadingBarActions.loadingBarHide());
                    }),
                );
            }),
        );
    });

    constructor(
        private actions$: Actions,
        private asnbReportsService: AsnbReportsService,
        private store: Store,
    ) {}
}
