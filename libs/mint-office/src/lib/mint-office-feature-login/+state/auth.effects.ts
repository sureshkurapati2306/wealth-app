import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, finalize, map, switchMap } from 'rxjs/operators';
import { AuthService } from '../../core/services/auth.service';

import * as AuthActions from './auth.actions';
import * as loadingBarActions from '../../mint-office-ui-loading-indicator/loading-bar/+state/loading-bar.actions';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AuthKey } from '../../core/models/auth.model';

@Injectable()
export class AuthEffects {
    getKey$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.getKey),
            switchMap(() => {

                return this.authService.getKey().pipe(
                    map((data: AuthKey) => {
                        return AuthActions.getKeySuccess({ authKey: data});
                    }),
                    catchError((error) => of(AuthActions.getKeyFailure({ error })))
                );
            }),
        );
    });

    login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.authStart),
            switchMap((action: any) => {
                this.store.dispatch(loadingBarActions.loadingBarShow());

                return this.authService.login(action.data).pipe(
                    map((data: any) => {
                        this.router.navigate(['/home']);
                        return AuthActions.loginSuccess({ authData: data});
                    }),
                    catchError((error) => of(AuthActions.loginFailure({ error }))),
                    finalize(() => {
                        this.store.dispatch(loadingBarActions.loadingBarHide());
                    }),
                );
            }),
        );
    });

    delSession$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.delSession),
            switchMap((action: any) => {
                this.store.dispatch(loadingBarActions.loadingBarShow());
                return this.authService.delSession(action.sessionId).pipe(
                    map((data: any) => {
                        this.router.navigate(['/login']);
                        return AuthActions.delSessionSuccess({ success: data});
                    }),
                    catchError((error) => of(AuthActions.delSessionFailure({ error }))),
                    finalize(() => {
                                            this.store.dispatch(loadingBarActions.loadingBarHide());
                                        }),
                );
            }),
        );
    });

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private store: Store,
        private router: Router,
    ) {}
}
