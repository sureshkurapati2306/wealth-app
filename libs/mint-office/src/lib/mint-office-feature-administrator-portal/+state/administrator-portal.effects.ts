import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as AdministratorPortalActions from './administrator-portal.actions';
import { AdministratorPortalService } from '../../core/services/administrator-portal.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { SnackBarService } from '../../core/services/snack-bar.service';
import * as loadingBarActions from '../../mint-office-ui-loading-indicator/loading-bar/+state/loading-bar.actions';
import { Router } from '@angular/router';

@Injectable()
export class AdministratorPortalEffects {
    init$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdministratorPortalActions.administratorPortalInit),
            fetch({
                run: (action) => {
                    const role = this.administratorPortalService.getUserRole();
                    const listUser = this.administratorPortalService.getListUser(action.pageIndex, action.search);

                    return forkJoin([role, listUser]).pipe(
                        map((results) => {
                            return AdministratorPortalActions.loadAdministratorPortalSuccess({
                                role: results[0],
                                administratorTable: results[1],
                            });
                        })
                    );
                },
                onError: (action, error) => {
                    console.error('Error', error);
                    return AdministratorPortalActions.loadAdministratorPortalFailure({ error });
                },
            }),
        ),
    );

    deleteUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdministratorPortalActions.DeleteUser),
            fetch({
                run: (action) => {
                    this.store.dispatch(loadingBarActions.loadingBarShow());
                    return this.administratorPortalService.deleteUser(action.username, action.role).pipe(
                        map((results) => {
                            this.store.dispatch(loadingBarActions.loadingBarHide());
                            this.snackBarService.openSnackbar('Your changes are saved successfully!', 5000, 'success');
                            return AdministratorPortalActions.loadDeleteUserSuccess({
                                row: results
                            });
                        })
                    );
                },
                onError: (action, error) => {
                    this.store.dispatch(loadingBarActions.loadingBarHide());
                    console.error('Error', error);
                    return AdministratorPortalActions.loadDeleteUserFailure({ error });
                },
            }),
        ),
    );

    createUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdministratorPortalActions.CreateUser),
            fetch({
                run: (action) => {
                    this.store.dispatch(loadingBarActions.loadingBarShow());
                    return this.administratorPortalService.createUser(action.username, action.role).pipe(
                        map((results) => {
                            this.store.dispatch(loadingBarActions.loadingBarHide());
                            this.snackBarService.openSnackbar('You have added the new user successfully!', 5000, 'success');
                            this.router.navigate(['/administrator-portal']);
                            return AdministratorPortalActions.loadCreateUserSuccess({
                                row: results
                            });
                        })
                    );
                },
                onError: (action, error) => {
                    this.store.dispatch(loadingBarActions.loadingBarHide());
                    console.error('Error', error);
                    return AdministratorPortalActions.loadCreateUserFailure({ error });
                },
            }),
        ),
    );

    updateUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdministratorPortalActions.UpdateUser),
            fetch({
                run: (action) => {
                    this.store.dispatch(loadingBarActions.loadingBarShow());
                    return this.administratorPortalService.updateUser(action.username, action.role).pipe(
                        map((results) => {
                            this.store.dispatch(loadingBarActions.loadingBarHide());
                            this.snackBarService.openSnackbar('Your changes are saved successfully!', 5000, 'success');
                            return AdministratorPortalActions.loadUpdateUserSuccess({
                                row: results
                            });
                        })
                    );
                },
                onError: (action, error) => {
                    this.store.dispatch(loadingBarActions.loadingBarHide());
                    console.error('Error', error);
                    return AdministratorPortalActions.loadUpdateUserFailure({ error });
                },
            }),
        ),
    );

    constructor(private readonly actions$: Actions, private administratorPortalService: AdministratorPortalService, private store: Store,
        private snackBarService: SnackBarService, public router: Router) { }

}
