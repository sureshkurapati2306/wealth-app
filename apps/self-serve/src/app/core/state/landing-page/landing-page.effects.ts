import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import * as LandingPageActions from './landing-page.actions';
import { LandingPageService } from '../../services/landing-page/landing-page.service';


@Injectable()
export class LandingPageEffects {
  constructor(
    private actions$: Actions,
    private landingPageService: LandingPageService,
  ) { }

  loadLandingPageStatus$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LandingPageActions.storeLandingPageStatus),
      switchMap((data: any) => {
        return this.landingPageService.getLandingPageStatus(data.customerID).pipe(
          map((result: any) => {
            return LandingPageActions.storeLandingPageStatusSuccess({ landingPageStatus: result });

          }),
        );
      }
      )
    );
  });

  setInitialUserLandingPageStatus$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LandingPageActions.setInitialLandingPageStatus),
      switchMap((data: any) => {
        return this.landingPageService.addNewLandingPageStatus(data.userRequest).pipe(
          map((result: any) => {
            return LandingPageActions.setInitialLandingPageStatusSuccess({ landingPageStatus: result });
            
          }),
        );
      }
      )
    );
  });

  updateFatca$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LandingPageActions.updateFatcaStatus),
      switchMap((data: any) => {
        return this.landingPageService.updateFatcaStatus(data.fatcaStatus).pipe(
          map((result: any) => {
            return LandingPageActions.updateLandingPageStatusSuccess({ landingPageStatus: result });
            
          }),
        );
      }
      )
    );
  });

  updateAccount$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LandingPageActions.updateAccountStatus),
      switchMap((data: any) => {
        return this.landingPageService.updateAccountStatus(data.accountStatus).pipe(
          map((result: any) => {
            return LandingPageActions.updateLandingPageStatusSuccess({ landingPageStatus: result });
          }),
        );
      }
      )
    );
  });

  updateInvestment$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LandingPageActions.updateInvestmentStatus),
      switchMap((data: any) => {
        return this.landingPageService.updateInvestmentStatus(data.investmentStatus).pipe(
          map((result: any) => {
            return LandingPageActions.updateLandingPageStatusSuccess({ landingPageStatus: result });
            
          }),
        );
      }
      )
    );
  });

  updateFinal$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LandingPageActions.updateFinalStatus),
      switchMap((data: any) => {
        return this.landingPageService.updateFinalStatus(data.finalStatus).pipe(
          map((result: any) => {
            return LandingPageActions.updateLandingPageStatusSuccess({ landingPageStatus: result });
            
          }),
        );
      }
      )
    );
  });

  updateLanding$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LandingPageActions.updateLandingStatus),
      switchMap((data: any) => {
        return this.landingPageService.updateLandingStatus(data.landingStatus).pipe(
          map((result: any) => {
            return LandingPageActions.updateLandingPageStatusSuccess({ landingPageStatus: result });
            
          }),
        );
      }
      )
    );
  });
}
