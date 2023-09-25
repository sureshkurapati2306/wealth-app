import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import * as UserActions from './user.actions';
import * as ErrorAction from '../error/error.action';
import { environment } from '../../../../environments/environment';

@Injectable()
export class UserEffects {
    /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line
    @Effect({ dispatch: false })
    userDataSuccess = this.effectsActions$.pipe(
        ofType(UserActions.STORE_DASHBOARD_DATA_SUCCESS),
        tap(() => {
            // this.router.navigate(['/']);
        }),
    );

    /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line
    @Effect()
    GetUserTypeApiData = this.effectsActions$.pipe(
        ofType(UserActions.GET_USER_UTACCOUNT_INFO),
        switchMap((GetUserUTAccountInfo: UserActions.GetUserUTAccountInfo) => {
            return this.http
                .get(
                    environment.apiUrl +
                        environment.validate +
                        '/ut-account-client/?clientId=' +
                        GetUserUTAccountInfo.customerIDNumber,
                )
                .pipe(
                    map((resData: any) => {
                        if (
                            resData.accountDTOs[0]['utAccountNo'] === null ||
                            resData.accountDTOs === []
                        ) {
                            return new UserActions.SelectedUnitTrustAccount('');
                        } else {
                            return new UserActions.SelectedUnitTrustAccount(
                                resData.accountDTOs[0]['utAccountNo'],
                            );
                        }
                    }),
                    catchError((error) => {
                        return of(new ErrorAction.AddGlobalError(error));
                    }),
                );
        }),
    );

    constructor(private effectsActions$: Actions, private http: HttpClient) {}
}
