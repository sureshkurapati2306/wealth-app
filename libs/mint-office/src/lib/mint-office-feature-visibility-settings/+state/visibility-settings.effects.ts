import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { forkJoin } from 'rxjs';
import { VisibilitySettingsService } from '../../core/services/visibility-settings.service';

import * as VisibilitySettingsActions from './visibility-settings.actions';
import { map } from 'rxjs/operators';
import { SnackBarService } from '../../core/services/snack-bar.service';
import * as loadingBarActions from '../../mint-office-ui-loading-indicator/loading-bar/+state/loading-bar.actions';
import { Store } from '@ngrx/store';
@Injectable()
export class VisibilitySettingsEffects {

    init$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VisibilitySettingsActions.VisibilitySettingsInit),
            fetch({
                run: (action) => {
                    const group = this.visibilitySettingsService.getAllSettingGroups();
                    const listSettingsByGroup = this.visibilitySettingsService.getListSettingsByGroup(action.utSettingGroupId);

                    return forkJoin([group, listSettingsByGroup]).pipe(
                        map((results) => {
                            return VisibilitySettingsActions.loadVisibilitySettingsSuccess({
                                settingGroups: results[0],
                                listSettings: results[1]
                            });
                        })
                    );
                },
                onError: (action, error) => {
                    console.error('Error', error);
                    return VisibilitySettingsActions.loadVisibilitySettingsFailure({ error });
                },
            }),
        ),
    );

    getListSettings$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VisibilitySettingsActions.loadListSettings),
            fetch({
                run: (action) => {
                    return this.visibilitySettingsService.getListSettingsByGroup(action.utSettingGroupId).pipe(
                        map((resp) => {
                            return VisibilitySettingsActions.loadListSettingsSuccess({
                                listSettings: resp
                            });
                        })
                    );
                },
                onError: (action, error) => {
                    console.error('Error', error);
                    return VisibilitySettingsActions.loadVisibilitySettingsFailure({ error });
                },
            }),
        ),
    );

    updateToggleAction$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VisibilitySettingsActions.loadUpdateToggle),
            fetch({
                run: (action) => {
                    return this.visibilitySettingsService.updateToggleAction(action.utSettingGroupId, action.setting).pipe(
                        map((results) => {
                            return VisibilitySettingsActions.loadListSettingsSuccess({
                                listSettings: results
                            });
                        })
                    );
                },
                onError: (action, error) => {
                    console.error('Error', error);
                    return VisibilitySettingsActions.loadVisibilitySettingsFailure({ error });
                },
            }),
        ),
    );

    updateImage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VisibilitySettingsActions.loadSaveImage),
            fetch({
                run: (action) => {
                    this.store.dispatch(loadingBarActions.loadingBarShow());
                    return this.visibilitySettingsService.updateImage(action.image).pipe(
                        map((results) => {
                            this.store.dispatch(loadingBarActions.loadingBarHide());
                            this.snackBarService.openSnackbar('You have saved the changes successfully!', 5000, 'success');
                            return VisibilitySettingsActions.loadSaveImageSuccess({
                                image: results
                            });
                        })
                    );
                },
                onError: (action, error) => {
                    this.store.dispatch(loadingBarActions.loadingBarHide());
                    console.error('Error', error);
                    return VisibilitySettingsActions.loadVisibilitySettingsFailure({ error });
                },
            }),
        ),
    );

    constructor(
        private readonly actions$: Actions,
        private visibilitySettingsService: VisibilitySettingsService,
        private store: Store,
        private snackBarService: SnackBarService) { }
}
