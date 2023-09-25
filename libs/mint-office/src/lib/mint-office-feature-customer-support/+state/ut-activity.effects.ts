import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, finalize, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as UtActivityActions from './ut-activity.actions';
import { ActivityLogService } from '../../core/services/activity-log.service';
import { Store } from '@ngrx/store';
import * as loadingBarActions  from '../../mint-office-ui-loading-indicator/loading-bar/+state/loading-bar.actions';

@Injectable()
export class UtActivityEffects {

  loadUtActivity$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(UtActivityActions.loadUtActivity),
      switchMap((action) => {

        this.store.dispatch(loadingBarActions.loadingBarShow());

        return this.activityLogService.getUtActivityRecord(action.referenceNo)
          .pipe(
            map(data => UtActivityActions.loadUtActivitySuccess({ data })),
            catchError(error => of(UtActivityActions.loadUtActivityFailure({ error: error?.error?.details || 'Fail to retrieve activity record!' }))),
            finalize(() => {
              this.store.dispatch(loadingBarActions.loadingBarHide());
            })
          );

      })
    );
  });

  loadUtActivitySMSDelivery$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(UtActivityActions.loadUtActivitySMSDelivery),
      switchMap((action) => {

        this.store.dispatch(loadingBarActions.loadingBarShow());

        return this.activityLogService.getSMSDeliveryRecord(action.referenceNo)
          .pipe(
            map(data => UtActivityActions.loadUtActivitySMSDeliverySuccess({ data })),
            catchError(error => of(UtActivityActions.loadUtActivityFailure({ error: error?.error?.details || 'Fail to retrieve sms delivery record!' }))),
            finalize(() => {
              this.store.dispatch(loadingBarActions.loadingBarHide());
            })
          );

      })
    );
  });
  

  constructor(
    private actions$: Actions,
    private activityLogService: ActivityLogService,
    private store: Store
  ) {}

}
