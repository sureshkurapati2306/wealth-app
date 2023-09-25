import { Component, EventEmitter, OnDestroy, OnInit, Inject, Input, Output } from '@angular/core';
import { AsnbService } from 'apps/self-serve/src/app/modules/asnb/services/asnb.service';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromStore from 'apps/self-serve/src/app/core/state/reducers';

@Component({
    selector: 'cimb-dialog-otp-link-asnb',
    templateUrl: './dialog-otp-link-asnb.component.html',
    styleUrls: ['./dialog-otp-link-asnb.component.scss'],
})
export class DialogOtpLinkAsnbComponent implements OnInit, OnDestroy {
    flow = '005';
    factaEnabled = false;
    enableRequestNumber = true;
    isOTPRequested = false;
    customerMobileNumber = null;
    callingApi;
    disableConfirmButtonComponent = false;
    tagEntredCompleted = false;
    tacErrorMessageText = '';
    showTacError = false;
    autoRequestTAC = false;
    userObservable: Observable<any>;
    userSubscription: Subscription;
    userDataObj: any;
    transactionId: string;
    @Output() public updateOTPAttemptCount = new EventEmitter<number>();
    @Input() public attemptCount = 0;

    constructor(
        private router: Router,
        private store: Store<fromStore.AppState>,
        private asnbService: AsnbService,
        private dialogRef: MatDialogRef<DialogOtpLinkAsnbComponent>,
        public dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public otpDialogProps: any,
    ) {
        this.attemptCount = otpDialogProps.attemptCount;
    }

    ngOnInit(): void {
        this.loadData();
        this.dialogRef.afterOpened().subscribe(() => {
            this.autoRequestTAC = true;
        });
    }

    loadData(): void {
        this.userObservable = this.store.select('userReducer');
        this.userSubscription = this.userObservable.subscribe((users) => {
            this.loadUserData(users);
        });
    }

    loadUserData(users): void {
        this.userDataObj = users.user;
        this.customerMobileNumber = this.userDataObj?.customer_mobile_no
            ? this.userDataObj?.customer_mobile_no
            : null;
    }

    requestTAC(): void {
        this.callingApi = 'otp';

        this.asnbService.requestOtp('').subscribe(
            (response: { transactionId: string; message: string }) => {
                this.transactionId = response.transactionId;
                // OTP was requested successfully
            },
            (error) => {
                console.error('OTP request failed', error);
                // close the otp dialog if request failed
                this.dialogRef.close();
            },
        );
    }

    confirmAndProceed(otp): void {
        this.asnbService.verifyOtp({ otp, transactionId: this.transactionId }).subscribe(
            (response: any) => {
                if (response.message !== 'OTP Verification Successful') {
                    this.attemptCount++;
                    this.updateOTPAttemptCount.emit(this.attemptCount);
                    // OTP was not sent successfully
                    if (this.attemptCount === 3) {
                        // logout if third attepmt failed
                        this.dialogRef.close('logout');
                    }

                    this.handleOTPError(response.message);
                } else {
                    // OTP was verified successfully
                    this.dialogRef.close('continue');
                }
            },
            (error) => {
                console.error('OTP request failed', error);
            },
        );
    }

    handleOTPError(error): void {
        if (error === 'ALREADY_REQUESTED') {
            this.showTacError = true;
            this.tacErrorMessageText =
                'Already requested TAC, please check your registered mobile for TAC.';
        } else if (error === 'INVALID_REQUEST') {
            this.showTacError = true;
            this.tacErrorMessageText =
                'Your SMS TAC has expired. Please request and submit a new one';
        } else if (error === 'INVALID_CODE' || error === 'WRONG_CODE_THROTTLED') {
            this.showTacError = true;
            this.tacErrorMessageText = 'SMS TAC entered was invalid. Please check and try again.';
        }
    }

    tagEntredCompletedEvent(value): void {
        this.tagEntredCompleted = value;
    }

    ngOnDestroy(): void {
        this.callingApi = null;
        if (this.userSubscription) {
            this.userSubscription.unsubscribe();
        }
    }
}
