import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MintSnackbarComponent, DialogAlertComponent } from '@cimb/mint';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AnalyticService } from '@cimb/shared/services';
import * as fromStore from '../../state/reducers';
import * as LogoutAction from '../../../core/state/logout/logout.action';

@Injectable({
    providedIn: 'root',
})
export class ErrorHandlingService {
    errorObservable: Observable<any>;
    errorSubscription: Subscription;
    count = 0;
    errorMessage;
    lastUrl;
    unauthorizedMesssage = 'Unauthorized. Please try again.';
    genericMessage = 'There seems to be a slight issue. Please try again.';
    dialogSessionVisible = false;
    dialogTokenTimeout = false;

    hasASNBDowntime = false;

    apiErrorMessageSubj$ = new BehaviorSubject<any>({});

    apiErrorMessage = this.apiErrorMessageSubj$.asObservable();

    constructor(
        private store: Store<fromStore.AppState>,
        public snackbar: MatSnackBar,
        public dialog: MatDialog,
        public router: Router,
        private analyticService: AnalyticService,
    ) {
    }

    /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
    GenericError(error) {
        this.errorMessage = '';
        if (error.status === 408) {
            if (error.error.errorCode === '40003') {
                if (this.dialogTokenTimeout === false) {
                    const dialogRef = this.dialog.open(DialogAlertComponent, {
                        panelClass: ['custom-dialog', 'dialog-inverse-button'],
                        maxWidth: '600px',
                        autoFocus: false,
                        disableClose: true,
                        backdropClass: 'backdrop-modal',
                        data: {
                            dialogHeading: 'You are now logged out.',
                            dialogContent:
                                '<p>Your Session has expired. Please login again to continue.</p>',
                            dialogButtonCancel: false,
                            dialogButtonProceed: true,
                            dialogButtonProceedText: 'Okay',
                            dialogImage: '<em class="icon-danger"></em>',
                        },
                    });

                    dialogRef.afterClosed().subscribe(() => {
                        this.store.select('cartReducer').subscribe((data) => {
                            this.navigateBasedOnStoreTransaction(data.storeTransaction, this.router);
                            dialogRef.close();
                        });
                    });
                }
                this.dialogTokenTimeout = true;
            } else {
                if (this.dialogSessionVisible === false) {
                    const dialogRef = this.dialog.open(DialogAlertComponent, {
                        panelClass: ['custom-dialog', 'dialog-inverse-button'],
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
                    // Calling dialog
                    dialogRef.afterClosed().subscribe(() => {
                        this.store.dispatch(new LogoutAction.LogoutTransaction());
                        this.store.select('cartReducer').subscribe((data) => {
                            this.navigateBasedOnStoreTransaction(data.storeTransaction, this.router);
                            dialogRef.close();
                        });
                    });
                }
                this.dialogSessionVisible = true;
            }
        } else {
            this.errorObservable = this.store.select('errorReducer');
            this.errorSubscription = this.errorObservable.subscribe(() => {
                if (this.errorMessage != 'dontAssign') {
                    this.errorMessage = error;
                    this.count = this.count + 1;
                    if (this.count === 3) {
                        if (error.error.error !== 'BUSINESS_ERROR') { //exception made due to WJ-625 business error
                            this.dialoguePopup();
                            this.count = 0;
                        }
                    } else {
                        this.handlingError(this.errorMessage);
                    }
                }
            });
        }
    }

    navigateBasedOnStoreTransaction(storeTransaction, router) {
        if (storeTransaction && storeTransaction.length !== 0) {
            router.navigate(['/TransactionLogout']);
        } else {
            router.navigate(['/Logout']);
        }
    }

    popupCloseAfterLogout() {
        this.dialog.closeAll();
    }
    /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
    handlingError(error) {
        if (error.status == 401 && error.error.error == 'Unauthorized') {
            if (this.unauthorizedMesssage == 'Unauthorized. Please try again.') {
                this.opensnackbar(this.unauthorizedMesssage);
            }
        } else if (error.status == 0 || error.status === 503) {

            this.router.navigate(['/SystemDownTime']);
        } else if (error.error.message === 'INVALID_CODE') {
            return;
        } else {
            if (this.genericMessage == 'There seems to be a slight issue. Please try again.' && error.error.error !== 'BUSINESS_ERROR') {
                this.opensnackbar(this.genericMessage);
                this.analyticService.loadPopUpAnalytics(
                    'There seems to be a slight issue. Please try again.'
                );
            }
        }
    }

    /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
    opensnackbar(message) {
        this.errorMessage = 'dontAssign';

        if (message) {
            this.snackbar.openFromComponent(MintSnackbarComponent, {
                //duration: 10000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
                data: {
                    message: message,
                    snackType: 'danger',
                },
            });
        }
    }

    /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
    dialoguePopup() {
        this.errorMessage = 'dontAssign';
        this.snackbar.dismiss();
        if (this.dialog != undefined) {
            this.dialog.open(DialogAlertComponent, {
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

    //asnb downtime error
    setASNBDowntimeError(hasError: boolean) {
        this.apiErrorMessageSubj$.next(hasError);
    }
}
