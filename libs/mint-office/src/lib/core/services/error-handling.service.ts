import { Injectable } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { SnackBarService } from './snack-bar.service';
import { DialogMessageComponent } from '../../mint-office-ui-dialog/dialog-message/dialog-message.component';
import { DialogAlertComponent } from '@cimb/mint';
import { Store } from '@ngrx/store';

import * as CustomerSupportActions from 'libs/mint-office/src/lib/mint-office-feature-customer-support/+state/customer-support.actions';
import { AnalyticService } from '@cimb/shared/services';

@Injectable({
    providedIn: 'root',
})
export class ErrorHandlingService {
    count = 0;
    unauthorizedMesssage = 'Unauthorized. Please try again.';
    genericMessage = 'There seems to be a slight issue. Please try again.';
    constructor(
        public dialog: MatDialog,
        public router: Router,
        private snackBarService: SnackBarService,
        private store: Store,
        private analyticService: AnalyticService
    ) { }

    /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
    GenericError(error) {
        if (error.status === 408) {
            const concurrentDialog = this.dialog.open(DialogAlertComponent, {
                panelClass: ['forcePadding', 'custom-dialog', 'dialog-inverse-button'],
                maxWidth: '600px',
                autoFocus: false,
                backdropClass: 'backdrop-modal',
                data: {
                    dialogHeading: 'Concurrent Session Detected',
                    dialogContent:
                        '<p>We noticed you have another active session. Only one session is allowed at a time for security reasons. You will log out from your current session.</p>',
                    dialogButtonCancel: false,
                    dialogButtonProceed: true,
                    dialogButtonProceedText: 'Ok',
                    dialogImage:
                        '<img src="./assets/images/ic_feedback_48px.svg" alt=" Concurrent Session Detected" />',
                },
            });
            this.analyticService.loadPopUpAnalytics('Concurrent Session Detected');
            concurrentDialog.afterClosed().subscribe(() => {
                this.store.dispatch(CustomerSupportActions.resetCustomerSupportState());
                this.router.navigate(['/login']);
            });
        } else if (error.error.errorCode === "40104") {
            this.dialog.open(DialogMessageComponent, {
                panelClass: ['custom-dialog', 'dialog-inverse-button'],
                maxWidth: '600px',
                autoFocus: false,
                backdropClass: 'backdrop-modal',
                data: {
                    title: 'Error',
                    description: '<p>Same user (LAN ID) added. Please try again later.</p>',
                },
            });
        } else if (error.error.errorCode === "40101") {
            this.dialog.open(DialogMessageComponent, {
                panelClass: ['custom-dialog', 'dialog-inverse-button'],
                maxWidth: '600px',
                autoFocus: false,
                backdropClass: 'backdrop-modal',
                data: {
                    title: 'Error',
                    description: '<p>Unable to locate the LAN ID from backend Active Directory.' + '<br />' + 'Please try again later.</p>',
                },
            });
        } else if (error?.error?.errorCode) {
            this.dialog.open(DialogMessageComponent, {
                panelClass: ['custom-dialog', 'dialog-inverse-button'],
                maxWidth: '600px',
                autoFocus: false,
                backdropClass: 'backdrop-modal',
                data: {
                    title: 'Error',
                    description: error.error.message,
                },
            });
        } else {
            this.count = this.count + 1;
            if (this.count == 3) {
                this.count = 0;
                this.dialoguePopup();
            } else {
                this.handlingError(error);
            }
        }
    }

    /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
    handlingError(error: any) {
        if (error.status === 0 || error.status === 503) {
            this.router.navigate(['/SystemDownTime']);
        } else {
            this.opensnackbar(this.genericMessage);
            this.analyticService.loadPopUpAnalytics(
                this.genericMessage
            );
        }
    }

    /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
    opensnackbar(message: any) {
        this.snackBarService.openSnackbar(message, 1000000, 'danger');
    }

    /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
    dialoguePopup() {
        this.snackBarService.dismissSnackbar();
        if (this.dialog != undefined) {
            this.dialog.open(DialogMessageComponent, {
                panelClass: ['custom-dialog', 'dialog-inverse-button'],
                maxWidth: '600px',
                autoFocus: false,
                backdropClass: 'backdrop-modal',
                data: {
                    title: 'Error',
                    description: '<p>There seems to be a slight issue. Please try again later.</p>',
                },
            });
        }
    }

    popupCloseAfterLogout() {
        this.dialog.closeAll();
    }
}
