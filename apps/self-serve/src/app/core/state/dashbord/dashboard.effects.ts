import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, switchMap, map } from 'rxjs/operators';
import { Dashboard } from '../../model/dashboard.model';

import * as DashboardActions from './dashboard.actions';
import { environment } from '../../../../environments/environment';
import { EventService } from '@cimb/core';

@Injectable()
export class DashboardEffects {
  @Effect()
  GetDashboardApiData = this.effectsActions$.pipe(
    ofType(DashboardActions.CALL_DASHBOARD_API),
    switchMap((CallDashboardApi: DashboardActions.CallDashboardApi) => {
      const urlData =  [CallDashboardApi.payload.split('/')[2],CallDashboardApi.payload.split('/')[3]].join('/');
      return this.http
         .get(environment.apiUrl+environment.emanager+'/account/v2/getAccountDetail/' +urlData )
        .pipe(
          map((resData : Dashboard) => {
            this._eventService.onSend({ accountDetail: resData});
            return new DashboardActions.StoreDashboardApiResponse(resData);
          }),
          catchError(() => {
            return of(new DashboardActions.StoreDashboardApiResponse(null));
          })
        );
    })
  );

  @Effect()
  GetPurchaseDetailData = this.effectsActions$.pipe(
    ofType(DashboardActions.GET_PURCHASE_DETAIL),
    switchMap((getPurchaseDetail: DashboardActions.GetPurchaseDetail) => {

      return this.http
      // .get(environment.apiUrl+environment.emanager+'/purchase/getPurchaseDetail/' +
      // getPurchaseDetail.payload
      // )
      .get(environment.apiUrl+environment.emanager+'/purchase/v2/getPurchaseDetail'
        )
        .pipe(
          map((resData : any) => {
            return new DashboardActions.StorePurchaseDetailResponse(resData);
          }),
          catchError(() => {
            return of(new DashboardActions.StorePurchaseDetailResponse(null));
          })
        );
    })
  );

  constructor(
    private effectsActions$: Actions,
    private http: HttpClient,
    private router: Router,
    private _eventService: EventService
  ) {}
}
