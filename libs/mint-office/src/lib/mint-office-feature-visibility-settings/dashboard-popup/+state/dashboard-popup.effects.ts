import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { DashboardPopupService } from '../../../core/services/dashboard-popup.service'; 
import * as DashboardPopupActions from './dashboard-popup.actions';
import { SnackBarService } from '../../../core/services/snack-bar.service';

@Injectable()
export class DashboardPopupEffects {
  loadDashboardPopup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardPopupActions.loadDashboardPopup),
      mergeMap((action) =>
        this.dashboardPopupService.updatePopUpDetails(action.loadDashboardPopupdata).pipe(
          map((data) => {
            this.snackBarService.openSnackbar('You have saved the changes successfully!', 5000, 'success');
            return DashboardPopupActions.loadDashboardPopupSuccess({ data });
          }),
          catchError((error) => {
            this.snackBarService.openSnackbar('Error Response!!', 5000, 'warning');
            return of(DashboardPopupActions.loadDashboardPopupFailure({ error }));
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private dashboardPopupService: DashboardPopupService,
    private snackBarService: SnackBarService
  ) {}
}
