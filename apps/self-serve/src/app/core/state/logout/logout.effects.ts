import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import * as LogoutAction from './logout.action';

import { environment } from '../../../../environments/environment';

const handlelogoutTransaction = (data: any) => {
  return new LogoutAction.LogoutTransactionSuccess(data);
};
const handlelogoutTransactionError = (errorRes: any) => {
  return of(new LogoutAction.LogoutTransactionError(errorRes));
};
@Injectable()
export class LogoutEffects {


  @Effect()
  postAllTransactionApi = this.actions$.pipe(
    ofType(LogoutAction.LOGOUT_TRANSACTION_API),
    switchMap(() => {
      return this.http
        .post<any>(
          environment.apiUrl + environment.wealth + '/v2/logout-audit',
          {logout: {}},
          {
            responseType: 'json',
            headers: new HttpHeaders({
              'content-type': 'application/json',
            }),
          }
        )
        .pipe(
          map((resData) => {
            return handlelogoutTransaction(resData);
          }),
          catchError((errorRes) => {
            return handlelogoutTransactionError(errorRes);
          })
        );
    })
  );

  constructor(
    private http: HttpClient,
    private actions$: Actions,
  ) { }

}


