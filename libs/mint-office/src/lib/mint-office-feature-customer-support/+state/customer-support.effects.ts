import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, finalize, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as CustomerSupportActions from './customer-support.actions';
import { CustomerSupportService } from '../../core/services/customer-support.service';
import { Store } from '@ngrx/store';
import * as loadingBarActions  from '../../mint-office-ui-loading-indicator/loading-bar/+state/loading-bar.actions';

@Injectable()
export class CustomerSupportEffects {

  loadCustomerSupports$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(CustomerSupportActions.loadCustomerSupports),
      switchMap((action) => {

        this.store.dispatch(loadingBarActions.loadingBarShow());

        return this.customerSupportService.searchRecords(action.searchParams)
          .pipe(
            map(data => CustomerSupportActions.loadCustomerSupportsSuccess({ data })),
            catchError(error => of(CustomerSupportActions.loadCustomerSupportsFailure({ error: error?.error?.details || 'Fail to search Customer records!' }))),
            finalize(() => {
              this.store.dispatch(loadingBarActions.loadingBarHide());
            })
          );

      })
    );
  });


  constructor(
    private actions$: Actions,
    private customerSupportService: CustomerSupportService,
    private store: Store
  ) {}

}
