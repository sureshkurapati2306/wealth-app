import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, switchMap, map } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import * as AuthActions from './auth.actions';
import * as UserActions from '../user/user.actions';
import { Store } from '@ngrx/store';
import * as fromStore from '../../state/reducers';

export interface AuthResponseData {
  token: string;
}

/* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
const handleError = (errorRes: any) => {
  let errorMessage = 'An unknown error occurred!';
  if (!errorRes.error || !errorRes.error.error) {
    return of(new AuthActions.AuthenticateFail(errorMessage));
  }
  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'This email exists already';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'This email does not exist.';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'This password is not correct.';
      break;
  }
  return of(new AuthActions.AuthenticateFail(errorMessage));

};

@Injectable()
export class AuthEffects {
  @Effect()
  /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
  authLogin = this.actions$.pipe(
    ofType(AuthActions.CALL_AUTHENTICATE_API),
    switchMap((callAuthenticateApi: AuthActions.CallAuthenticateApi) => {
      return this.http
        .post<AuthResponseData>(environment.apiUrl+environment.gateway+'/v2/getToken',
          {
            username: callAuthenticateApi.username,
          },
          {
            responseType:'json',
            headers: new HttpHeaders({
            'content-type':'application/json'
            })
          }
        )
        .pipe(
          map((resData: any) => {
            this.store.dispatch(new UserActions.StoreSessionResponse(resData.session))
            
            return new AuthActions.AddAuthData(
              resData && resData.token ? resData.token.toString() : null,
              callAuthenticateApi.username,
              resData.downtime
            );
          }),
          catchError((errorRes) => {
            return handleError(errorRes);
          })
        );
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private store: Store<fromStore.AppState>
  ) {}
}
