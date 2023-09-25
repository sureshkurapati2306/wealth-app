import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as WealthDashboardActions from './wealth-dashboard.actions';
import { WealthService } from '../../services/wealth-dashboard/wealth.service';
import { AsnbService } from '../../../modules/asnb/services/asnb.service';
import { AppService } from '../../services/app.service';
import { fetch } from '@nrwl/angular';
@Injectable()
export class WealthDashboardEffects {
    loadAccountSummary$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(WealthDashboardActions.loadAccountSummary),
            switchMap((action) => {
                return this.wealthService.getAccountSummary(action.data).pipe(
                    map((data) => WealthDashboardActions.loadAccountSummarySuccess({ data })),
                    catchError((error) =>
                        of(WealthDashboardActions.loadAccountSummaryFailure({ error })),
                    ),
                );
            }),
        );
    });

    riskProfile$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(WealthDashboardActions.riskProfileEnquiry),
            switchMap((action) => {
                return this.wealthService.getRiskProfileEnquiry(action.data).pipe(
                    map((data) => WealthDashboardActions.riskProfileEnquirySuccess({ data })),
                    catchError((error) =>
                        of(WealthDashboardActions.riskProfileEnquiryFailure({ error })),
                    ),
                );
            }),
        );
    });

    settingsData$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(WealthDashboardActions.settingsData),
            switchMap(() => {
                return this.wealthService.getSettingsData().pipe(
                    map((data) => WealthDashboardActions.settingsDataSuccess({ data })),
                    catchError((error) =>
                        of(WealthDashboardActions.riskProfileEnquiryFailure({ error })),
                    ),
                );
            }),
        );
    });

    asnbWhiteList$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(WealthDashboardActions.asnbWhiteListEnquiry),
            switchMap(() => {
                return this.asnbService.checkWhitelist().pipe(
                    map((data) => WealthDashboardActions.asnbWhiteListEnquirySuccess({ data })),
                    catchError((error) =>
                        of(WealthDashboardActions.asnbWhiteListEnquiryFailure({ error })),
                    ),
                );
            }),
        );
    });

    asnbLinkAccount$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(WealthDashboardActions.asnbLinkAccountEnquiry),
            switchMap(() => {
                return this.asnbService.getAccountLinkingStatus().pipe(
                    map((data) => WealthDashboardActions.asnbLinkAccountEnquirySuccess({ data })),
                    catchError(() => of(WealthDashboardActions.asnbLinkAccountEnquiryFailure())),
                );
            }),
        );
    });

    loadAsnbUserAccountStatus$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(WealthDashboardActions.loadAsnbUserAccountStatus),
            switchMap(() => {
                return this.asnbService.getUserAccountStatus().pipe(
                    map((data) =>
                        WealthDashboardActions.loadAsnbUserAccountStatusSuccess({ payload: data }),
                    ),
                    catchError((error) =>
                        of(WealthDashboardActions.loadAsnbUserAccountStatusFailure({ error })),
                    ),
                );
            }),
        );
    });

    //Scheduled Maintenance
    fetchScheduledMaintenance$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(WealthDashboardActions.WDLoadScheduledMaintenance),
            fetch({
                run: () => {
                    return this.asnbService.getASNBScheduledMaintenance().pipe(
                        map((response) => {
                            return WealthDashboardActions.WDLoadScheduledMaintenanceSuccess({
                                payload: response,
                            });
                        }),
                    );
                },
                onError: (action, error) => {
                    return WealthDashboardActions.WDLoadScheduledMaintenanceFailure({ error });
                },
            }),
        );
    });

    constructor(
        private actions$: Actions,
        private wealthService: WealthService,
        private asnbService: AsnbService,
        private appService: AppService,
    ) {}
}
