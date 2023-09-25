import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as WhitelistingUserActions from './whitelisting-user.actions';
import { WhitelistingUserService } from '../../core/services/whitelisting-user.service';

@Injectable()
export class WhitelistingUserEffects {
  loadWhitelistingList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WhitelistingUserActions.loadWhitelistingList),
      switchMap(({ search, pageIndex }) =>
        this.whitelistingUserService.getWhitelistingListUser(search, pageIndex).pipe(
          map((whitelistingTable) => WhitelistingUserActions.loadWhitelistingListSuccess({ whitelistingTable })),
          catchError((error) => of(WhitelistingUserActions.loadWhitelistingListFailure({ error })))
        )
      )
    )
  );

  deleteWhitelistingUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WhitelistingUserActions.deleteWhitelistingUser),
      switchMap(({ id }) =>
        this.whitelistingUserService.deleteWhitelistingUser(id).pipe(
          map(() => WhitelistingUserActions.deleteWhitelistingUserSuccess()),
          catchError((error) => of(WhitelistingUserActions.deleteWhitelistingUserFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private whitelistingUserService: WhitelistingUserService
  ) {}
}
