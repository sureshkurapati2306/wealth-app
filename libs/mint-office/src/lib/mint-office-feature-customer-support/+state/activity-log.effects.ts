import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

import * as ActivityLogActions from './activity-log.actions';
import * as CustomerSupportSelectors from '../+state/customer-support.selectors';
import { ActivityLogService } from '../../core/services/activity-log.service';
import { Store } from '@ngrx/store';
import * as loadingBarActions from '../../mint-office-ui-loading-indicator/loading-bar/+state/loading-bar.actions';

@Injectable()
export class ActivityLogEffects {
    clientId: string;
    loadActivityLogs$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ActivityLogActions.loadActivityLogs),
            switchMap((action) => {
                this.store.dispatch(loadingBarActions.loadingBarShow());
                this.store
                    .select(CustomerSupportSelectors.selectCustomerDetail)
                    .subscribe((res) => {
                        this.clientId = res.clientId;
                    });

                return this.activityLogService
                    .searchRecords(action.searchParams, this.clientId)
                    .pipe(
                        map((data) => ActivityLogActions.loadActivityLogsSuccess({ data })),
                        catchError((error) =>
                            of(ActivityLogActions.loadActivityLogsFailure({ error })),
                        ),
                        finalize(() => {
                            this.store.dispatch(loadingBarActions.loadingBarHide());
                        }),
                    );
            }),
        );
    });

    loadActivityLogModules$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ActivityLogActions.loadActivityLogModules),
            switchMap(() => {
                this.store.dispatch(loadingBarActions.loadingBarShow());

                return this.activityLogService
                    .getActivityLogModule()
                    .pipe(
                        map((data) => ActivityLogActions.loadActivityLogModulesSuccess({ data })),
                        catchError((error) =>
                            of(ActivityLogActions.loadActivityLogModulesFailure({ error })),
                        ),
                        finalize(() => {
                            this.store.dispatch(loadingBarActions.loadingBarHide());
                        }),
                    );
            }),
        );
    });

    loadActivityLogChannel$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ActivityLogActions.loadActivityLogChannel),
            switchMap(() => {
                this.store.dispatch(loadingBarActions.loadingBarShow());

                return this.activityLogService
                    .getActivityLogChannel()
                    .pipe(
                        map((data) => ActivityLogActions.loadActivityLogChannelSuccess({ data })),
                        catchError((error) =>
                            of(ActivityLogActions.loadActivityLogChannelFailure({ error })),
                        ),
                        finalize(() => {
                            this.store.dispatch(loadingBarActions.loadingBarHide());
                        }),
                    );
            }),
        );
    });

    constructor(
        private actions$: Actions,
        private activityLogService: ActivityLogService,
        private store: Store,
    ) {}
}
