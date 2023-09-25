/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Injectable } from '@angular/core';
import { HttpService } from '@cimb/core';
import { DialogAlertComponent, MintDialogService } from '@cimb/mint';
import { environment } from '@env/self-serve/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AnswerPayload, Questions, RiskProfileDetails } from '../models';
import { MatDialog } from '@angular/material/dialog';
import { AnalyticService } from '@cimb/shared/services';
@Injectable({
    providedIn: 'root',
})
export class RiskProfileService {
    private endpoint: string = environment.apiUrl;

    constructor(private http: HttpService, private _mintDialogService: MintDialogService, private dialog: MatDialog, private analyticService: AnalyticService) {}

    getQuestions(): Observable<Questions[]> {
        return this.http.get(this.endpoint + environment.rws, `/question/getAllQuestion`).pipe(
            map((response) => response),
            catchError((error) => {
                this.dialoguePopupRWSMaintenance();
                return throwError(error);
            }),
        );
    }

    getRiskProfileDetails(): Observable<RiskProfileDetails[]> {
        return this.http
            .get(this.endpoint + environment.emanager, `/account/getRiskProfileDetail`)
            .pipe(map((response) => response));
    }

    addAnswers(answers: AnswerPayload): Observable<any> {
        return this.http
            .post(this.endpoint + environment.wealth, `rws/computeriskprofile`, answers)
            .pipe(
                map((response) => response),
                catchError((error) => {
                    this.dialoguePopupRWSMaintenance();
                    return throwError(error);
                }),
            );
    }

    dialoguePopupRWSMaintenance() {
    this.dialog.open(DialogAlertComponent,{
        panelClass: ['custom-dialog', 'dialog-inverse-button'],
        maxWidth: '600px',
        autoFocus: false,
        backdropClass: 'backdrop-modal',
        data: {
            dialogHeading: 'Unexpected Issue',
            dialogContent:
                '<p>We have encountered an unexpected issue. Please try again later. If this issue persists, please <strong><a class="go_to_consumer_contact_centre_link" >contact us to report this issue.</a></strong></p>',
            dialogButtonCancel: true,
            dialogButtonCancelText: 'Okay',
            dialogButtonProceed: false,
            dialogImage: '<em class="icon-warning"></em>',
        },
    });
    this.analyticService.loadPopUpAnalytics('Unexpected Issue');
    }

}
