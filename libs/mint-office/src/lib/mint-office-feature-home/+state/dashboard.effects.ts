import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';

@Injectable()
export class DashboardEffects {


  // loadDashboards$ = createEffect(() => {
  //   return this.actions$.pipe( 

  //     ofType(DashboardActions.loadDashboards),
  //     /** An EMPTY observable only emits completion. Replace with your own observable API request */
  //     concatMap(() => EMPTY as Observable<{ type: string }>)
  //   );
  // });


  constructor(private actions$: Actions) {}

}
