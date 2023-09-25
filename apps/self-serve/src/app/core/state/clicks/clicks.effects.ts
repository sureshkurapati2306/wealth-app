import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { fetch } from '@nrwl/angular';
import { map } from 'rxjs/operators';
import { ClicksService } from '../../services/clicks/clicks.service';

import * as ClicksActions from './clicks.actions';
import * as fromStore from '../../../core/state/reducers';

@Injectable()
export class ClicksEffects {
    /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
    loadClicks$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ClicksActions.loadClicks),
            fetch({
                run: (action) => {
                    // loading TCJ API
                    return this.clicksService.getClicksCustomer(action.code).pipe(
                        map((clicks) => {
                            return ClicksActions.loadClicksSuccess({
                                clicks,
                            });
                        }),
                    );
                },
                onError: (action, error) => {
                    console.error('Error', error);
                    return ClicksActions.loadClicksFailure({ error });
                },
            }),
        ),
    );

    constructor(
        private readonly actions$: Actions,
        private clicksService: ClicksService,
        private store: Store<fromStore.AppState>
    ) {}
}
