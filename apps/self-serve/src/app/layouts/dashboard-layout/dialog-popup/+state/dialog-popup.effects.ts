import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { DialogPopupService } from '../../../../core/services/dialog-popup/dialog-popup.service';
import * as DialogPopupActions from './dialog-popup.actions';


@Injectable()
export class DialogPopupEffects {
  loadPopUpDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DialogPopupActions.loadPopUpDetails),
      switchMap((action) =>
        this.dialogPopupService.getPopUpDetails(action.id).pipe(
          map((dialogPopup) =>
            DialogPopupActions.loadPopUpDetailsSuccess({ dialogPopup })
          ),
          catchError((error) =>
            of(DialogPopupActions.loadPopUpDetailsFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private dialogPopupService: DialogPopupService
  ) {}
}
