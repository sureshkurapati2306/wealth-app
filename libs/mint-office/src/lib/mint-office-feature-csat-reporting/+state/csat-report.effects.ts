import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { CsatReportService } from '../../core/services/csat-report.service';
import * as CsatReportActions from './csat-report.actions';
import { SnackBarService } from '../../core/services/snack-bar.service';
import { EventService } from '@cimb/core';

@Injectable()
export class CsatReportEffects {
    toggleSwitchQestionier : boolean;
    loadCsatReport$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CsatReportActions.loadCsatReport),
            switchMap(action =>
                this.csatReportService.updateCsatQuestionnaireDetails(action.payload).pipe(
                    map(csatReport => {
                        if (this.toggleSwitchQestionier) { 
                            this.snackBarService.openSnackbar('You have saved the changes successfully!', 5000, 'success');
                        }
                        return CsatReportActions.loadCsatReportSuccess({ csatReport });
                    }),
                    catchError(error => {
                        return of(CsatReportActions.loadCsatReportFailure({ error }));
                    })
                )
            )
        )
    );

    loadCsatQuestionnaireDetails$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CsatReportActions.loadCsatQuestionnaireDetails),
            mergeMap(action =>
                this.csatReportService.getCsatQuestionnaireDetails(action.id).pipe(
                    map(csatQuestionnaire => CsatReportActions.loadCsatQuestionnaireDetailsSuccess({ csatQuestionnaire })),
                    catchError(error => of(CsatReportActions.loadCsatQuestionnaireDetailsFailure({ error })))
                )
            )
        )
    );

    loadReportData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CsatReportActions.loadReportData),
            mergeMap(action =>
                this.csatReportService.getReportData(action.startDate, action.endDate).pipe(
                    map(reportData => CsatReportActions.loadReportDataSuccess({ reportData })),
                    catchError(error => of(CsatReportActions.loadReportDataFailure({ error })))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private csatReportService: CsatReportService,
        private snackBarService: SnackBarService,
        private _eventService: EventService,
    ) { 
        this._eventService.onReceivedQuestionnaireToogle().subscribe(data =>{
            this.toggleSwitchQestionier = data?.toogleSelected;
        })
    }
}
