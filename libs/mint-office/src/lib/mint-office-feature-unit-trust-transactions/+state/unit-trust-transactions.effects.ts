import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, finalize, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as UnitTrustTransactionsActions from './unit-trust-transactions.actions';
import { UnitTrustTransactionsService } from '../../core/services/unit-trust-transactions.service';
import { Store } from '@ngrx/store';
import * as loadingBarActions from '../../mint-office-ui-loading-indicator/loading-bar/+state/loading-bar.actions';

@Injectable()
export class UnitTrustTransactionsEffects {

  loadUnitTrustTransactions$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(UnitTrustTransactionsActions.loadUnitTrustTransactions),
      switchMap((action) => {
        
        this.store.dispatch(loadingBarActions.loadingBarShow());
    
        return this.unitTrustTransactionService.searchRecords(action.searchParams)
          .pipe(
            map(data => UnitTrustTransactionsActions.loadUnitTrustTransactionsSuccess({ data })),
            catchError(error => of(UnitTrustTransactionsActions.loadUnitTrustTransactionsFailure({ error }))),
            finalize(() => {
              this.store.dispatch(loadingBarActions.loadingBarHide());
            })
          )

      })
    );
  });

  cancelUnitTrustTransactions$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(UnitTrustTransactionsActions.cancelUnitTrustTransactions),
      switchMap((action) => {
        
        this.store.dispatch(loadingBarActions.loadingBarShow());
    
        return this.unitTrustTransactionService.cancelUnitTrustTransactions(action.payload)
          .pipe(
            map(data => UnitTrustTransactionsActions.cancelUnitTrustTransactionsSuccess({ data })),
            catchError(error => of(UnitTrustTransactionsActions.cancelUnitTrustTransactionsFailure({ error: error?.error?.details || 'Fail to cancel UT Transaction!' }))),
            finalize(() => {
              this.store.dispatch(loadingBarActions.loadingBarHide());
            })
          )

      })
    );
  });


  constructor(
    private actions$: Actions,
    private unitTrustTransactionService: UnitTrustTransactionsService,
    private store: Store
    ) {}

}
