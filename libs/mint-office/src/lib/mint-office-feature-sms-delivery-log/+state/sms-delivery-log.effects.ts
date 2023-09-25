import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, finalize, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as SMSDeliveryLogActions from './sms-delivery-log.actions';
import { SmsDeliveryLogService } from '../../core/services/sms-delivery-log.service';
import { Store } from '@ngrx/store';
import * as loadingBarActions from '../../mint-office-ui-loading-indicator/loading-bar/+state/loading-bar.actions';

@Injectable()
export class SmsDeliveryLogEffects {

  loadSmsDeliveryLog$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(SMSDeliveryLogActions.loadSmsTransactions),
      switchMap((action) => {
        this.store.dispatch(loadingBarActions.loadingBarShow());
        return this.smsDeliveryLogService.searchRecords(action.searchParams)
          .pipe(
            map(data => SMSDeliveryLogActions.loadSmsTransactionsSuccess({ data })),
            catchError(error => of(SMSDeliveryLogActions.loadSmsTransactionsFailure({ error }))),
            finalize(() => {
              this.store.dispatch(loadingBarActions.loadingBarHide());
            })
          )

      })
    );
  });

  constructor(
    private actions$: Actions,
    private smsDeliveryLogService: SmsDeliveryLogService,
    private store: Store
    ) {}

}
