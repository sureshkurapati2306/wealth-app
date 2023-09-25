import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, finalize, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as RefConfigActions from './ref-config.actions';
import { RefConfigService } from '../../core/services/ref-config.service';
import { Store } from '@ngrx/store';
import * as loadingBarActions from '../../mint-office-ui-loading-indicator/loading-bar/+state/loading-bar.actions';

@Injectable()
export class UnitTrustTransactionsEffects {

  loadUnitTrustTransactions$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(RefConfigActions.loadRefConfig),
      switchMap((action) => {
        
        this.store.dispatch(loadingBarActions.loadingBarShow());
    
        return this.refConfigService.searchRecordsForRefConfig()
          .pipe(
            map(data => RefConfigActions.loadRefConfigSuccess({ data })),
            catchError(error => of(RefConfigActions.loadUnitTrustTransactionsFailure({ error }))),
            finalize(() => {
              this.store.dispatch(loadingBarActions.loadingBarHide());
            })
          )

      })
    );
  });

  deleteRefConfig$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(RefConfigActions.deleteRefConfig),
      switchMap((action) => {
        
        this.store.dispatch(loadingBarActions.loadingBarShow());

        console.log(action.deleteItem)
    
        return this.refConfigService.deleteRefConfigEntry(action.deleteItem)
          .pipe(
            map((data) =>{
              this.store.dispatch(RefConfigActions.loadRefConfig())
              return RefConfigActions.loadRefConfigSuccess({ data })
            }),
            catchError(error => of(RefConfigActions.loadUnitTrustTransactionsFailure({ error }))),
            finalize(() => {
              this.store.dispatch(loadingBarActions.loadingBarHide());
            })
          )

      })
    );
  });

  editRefConfig$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(RefConfigActions.editRefConfig),
      switchMap((action) => {
        
        this.store.dispatch(loadingBarActions.loadingBarShow());

        // console.log(action.deleteItem)
    
        return this.refConfigService.editRefConfigEntry(action.editItem)
          .pipe(
            map(data => RefConfigActions.loadRefConfigSuccess({ data })),
            catchError(error => of(RefConfigActions.loadUnitTrustTransactionsFailure({ error }))),
            finalize(() => {
              this.store.dispatch(loadingBarActions.loadingBarHide());
            })
          )

      })
    );
  });

  addRefConfig$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(RefConfigActions.addRefConfig),
      switchMap((action) => {
        
        this.store.dispatch(loadingBarActions.loadingBarShow());

        // console.log(action.deleteItem)
    
        return this.refConfigService.addRefConfigEntry(action.addItem)
          .pipe(
            map(data => RefConfigActions.loadRefConfigSuccess({ data })),
            catchError(error => of(RefConfigActions.loadUnitTrustTransactionsFailure({ error }))),
            finalize(() => {
              this.store.dispatch(loadingBarActions.loadingBarHide());
            })
          )

      })
    );
  });

 


  constructor(
    private actions$: Actions,
    private refConfigService: RefConfigService,
    private store: Store
    ) {}

}
