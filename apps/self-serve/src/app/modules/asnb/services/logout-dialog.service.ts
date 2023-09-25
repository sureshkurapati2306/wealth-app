import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogAlertComponent } from 'libs/mint/src/lib/components/mint-dialog/dialog-alert/dialog-alert.component';
import { Store } from '@ngrx/store';

import * as LogoutAction from '../../../core/state/logout/logout.action';

@Injectable({
    providedIn: 'root',
})
export class LogoutDialogService {
    constructor(private dialog: MatDialog, private router: Router, private store: Store) {}

    openDialogAndLogout(userDataObj: any) {
        const dialogtooManyAttempt = this.dialog.open(DialogAlertComponent, {
            panelClass: 'dialog-transaction-issue',
            width: '600px',
            maxWidth: '600px',
            autoFocus: false,
            backdropClass: 'backdrop-modal',
            disableClose: true,
            data: {
                dialogImage: '<em class="icon-danger">',
                dialogHeading: 'You are Now Logged Out',
                dialogContent:
                    '<p>Unfortunately there were too many failed attempts. Please log in and try again.</p>',
                dialogButtonCancel: false,
                dialogButtonProceed: true,
                dialogButtonProceedText: 'Okay',
            },
        });

        dialogtooManyAttempt.afterClosed().subscribe(() => {
            this.store.dispatch(new LogoutAction.LogoutTransaction());
            this.router.navigate(['/Logout']);
        });
    }
}
