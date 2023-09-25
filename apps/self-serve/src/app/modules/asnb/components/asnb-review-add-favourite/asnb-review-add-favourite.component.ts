import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'apps/self-serve/src/app/core/services/app.service';
import { AsnbService } from '../../services/asnb.service';
import { LogoutDialogService } from '../../services/logout-dialog.service';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../../core/state/reducers';
import {
    getAddFavouriteDetails,
    getIdTypeList,
    getRelationshipList,
    getFundTypesMap,
} from '../../+state/asnb.selectors';
import { MatDialog } from '@angular/material/dialog';
import { AsnbAddFavourite } from '../../models';
import { updateAddFavouriteState, clearAddFavouriteState } from '../../+state/asnb.actions';

@Component({
    selector: 'cimb-asnb-review-add-favourite',
    templateUrl: './asnb-review-add-favourite.component.html',
    styleUrls: ['./asnb-review-add-favourite.component.scss'],
})
export class AsnbReviewAddFavouriteComponent implements OnInit {
    pageTitle = 'Request Confirmation';
    currentUrl: string;
    noProgressStep: boolean;
    showTacError: boolean;
    tacErrorMessageText: string;

    tagEntredCompleted = false;
    disableConfirmButtonComponent = false;
    customerMobileNumber = null;
    factaEnabled = true;
    requestTagCanEnabled = false;
    enableRequestNumber = false;
    flow = '003';
    fatcaEnabled = false;
    isForFavourite = true;
    userObservable: Observable<any>;

    favouriteDetails: AsnbAddFavourite;

    userSubscription: Subscription;
    userDataObj: any;

    otpTransactionId: string;
    verifyAttempt = 0;

    idTypes$ = this.store.select(getIdTypeList);
    relationships$ = this.store.select(getRelationshipList);
    fundTypes$ = this.store.select(getFundTypesMap);

    constructor(
        private appService: AppService,
        private router: Router,
        private asnbService: AsnbService,
        private logoutDialogService: LogoutDialogService,
        private store: Store<fromStore.AppState>,
        public dialog: MatDialog,
    ) {
        this.currentUrl = this.appService.getPreviousUrl();
    }

    ngOnInit(): void {
        this.loadData();

        this.store.select(getAddFavouriteDetails).subscribe((data) => {
            this.favouriteDetails = data;
        });
    }

    backButtonEvent() {
        // need to check and change the url to add favourite page or keep it redirect to dashboard
        this.router.navigate([this.currentUrl]);
    }

    confirmAndProceed(event: string): boolean {
        this.appService.showLoadingSpinner();
        if (event) {
            this.verifyAttempt += 1;
            this.asnbService
                .saveFavourite({
                    stageTableId: this.favouriteDetails.stageId,
                    otp: event,
                    transactionId: this.otpTransactionId,
                })
                .subscribe({
                    next: (response) => {
                        if (response.error === 'OK' && this.verifyAttempt > 2) {
                            this.handleOTPError(response.message);

                            this.logoutDialogService.openDialogAndLogout(this.userDataObj);
                        } else if (response.error === 'OK') {
                            this.handleOTPError(response.message);
                        } else if (response.data !== null) {
                            const {
                                beneClientName,
                                beneAsnbAccountNo,
                                beneClientIdType,
                                beneClientId,
                                relationship,
                                transactionId,
                                date,
                            } = response.data;
                            this.store.dispatch(
                                updateAddFavouriteState({
                                    payload: {
                                        ...this.favouriteDetails,
                                        nickname: beneClientName,
                                        membershipNumber: beneAsnbAccountNo.toUpperCase(),
                                        idType: beneClientIdType,
                                        idNumber: beneClientId.toUpperCase(),
                                        relationship,
                                        transactionId,
                                        timestamp: date,
                                    },
                                }),
                            );
                            this.router.navigate(['/asnb-dashboard/add-favourite-summary']);
                        }
                    },
                    complete: () => {
                        this.appService.hideLoadingSpinner();
                    },
                });
        }
        return true;
    }

    fatcaDeclaratonEvent(): void {
        this.asnbService.updateTabIndex(1);
        this.store.dispatch(clearAddFavouriteState());
        this.router.navigate(['/asnb-dashboard']);
    }

    requestTAC(): void {
        this.asnbService.requestOtp('').subscribe((response) => {
            if (response.message !== 'OTP Sent Successfully') {
                this.handleOTPError(response.message);
            } else {
                this.otpTransactionId = response.transactionId;
            }
        });
    }

    tagEntredCompletedEvent(value): void {
        this.tagEntredCompleted = value;
    }

    requestTagCanEnableEvent(value): boolean {
        this.requestTagCanEnabled = value;

        return true;
    }

    fatcaToggleEvent(event: boolean) {
        this.fatcaEnabled = event;
    }

    handleOTPError(error: string): void {
        if (error === 'ALREADY_REQUESTED') {
            this.showTacError = true;
            this.tacErrorMessageText =
                'Already requested TAC, please check your registered mobile for TAC.';
        } else if (error === 'INVALID_REQUEST') {
            this.showTacError = true;
            this.tacErrorMessageText =
                'Your SMS TAC has expired. Please request and submit a new one';
        } else if (error === 'INVALID_CODE') {
            this.showTacError = true;
            this.tacErrorMessageText = 'SMS TAC entered was invalid. Please check and try again.';
        }
    }
    loadData() {
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
}
