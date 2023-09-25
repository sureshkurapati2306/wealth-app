import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogAlertComponent } from '@cimb/mint';
import { Store } from '@ngrx/store';
import { DialogAlertLandingPageComponent } from 'libs/mint/src/lib/components/mint-dialog/dialog-alert-landing-page/dialog-alert-landing-page.component';
import { FatcaStatus, LandingPageStatus, LandingStatus } from '../../core/model/landing-page-status.model';
import { getClicksCustomerInfo } from '../../core/state/clicks/clicks.selectors';
import * as fromStore from '../../core/state/reducers';
import * as CartActions from '../../core/state/cart/cart.actions';
import { path } from '../../shared/config';
import * as LandingPageActions from '../../core/state/landing-page/landing-page.actions';
import { Actions, ofType } from '@ngrx/effects';
import * as LandingPageSelector from '../../core/state/landing-page/landing-page.selectors';
import * as UserAction from '../../core/state/user/user.actions';
import { setEventAndDigitalData, getDayOfWeek } from '@cimb/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'cimb-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit, OnDestroy {
    investmentJouneyProgres: number;
    isOpenAccountCompleted = false;
    landingPageStatus: LandingPageStatus;
    userDetails: any;
    blockedUser = false;
    customerIDNumber: string;
    _unsubscribeAll: Subject<void> = new Subject<void>();

    masterPopup = {
        2: {
            dialogHeading: 'Select Investment',
            dialogContent: '<p>You have successfully completed your risk profiling! Next, view and select your investment option.</p>',
            dialogButtonProceedText: 'View Investment Option',
            dialogImage: '<img src="./assets/images/Illustration_Cart 2.svg" alt="Logout" />',
            dialogSecondButtonText: '',
            dialogSecondButton: false,
            proceedButtonRedirection: '/investment-options',
            secondButtonRedirection: '',
        },
        3: {
            dialogHeading: 'Open Account',
            dialogContent:
                '<p>You have selected your investments. Open your Unit Trust Account now to continue!</p>',
            dialogButtonProceedText: 'Open Account',
            dialogImage: '<img src="./assets/images/illustration-open-acc.svg" alt="Logout" />',
            dialogSecondButtonText: '',
            dialogSecondButton: false,
            proceedButtonRedirection: '/opening-account',
            secondButtonRedirection: '/cart',
        },
        4: {
            dialogHeading: 'Confirm Purchase',
            dialogContent: '<p>Review and pay to complete your first investment! </p>',
            dialogButtonProceedText: 'Review and Pay',
            dialogImage:
                '<img src="./assets/images/illustration-confirm-purchase.svg" alt="Logout" />',
            dialogSecondButtonText: 'Add Investments',
            dialogSecondButton: true,
            proceedButtonRedirection: '/cart',
            secondButtonRedirection: '/investment-options',
        },
    };

    constructor(
        private router: Router,
        public dialog: MatDialog,
        private store: Store<fromStore.AppState>,
        private actions$: Actions,
    ) { }

    ngOnInit(): void {
        this.store.dispatch(LandingPageActions.searchFundsFromLandingPage({ IsSearchFundsFromLandingPage: false }));
        this.store.select(getClicksCustomerInfo).pipe(takeUntil(this._unsubscribeAll)).subscribe((userDetailsInfo) => {
            this.userDetails = userDetailsInfo;
            this.customerIDNumber = userDetailsInfo.customerIDNumber;
            this.checkUserUTAccountExist(this.customerIDNumber);
            const request = { customerID: this.userDetails.customerIDNumber };
            this.store.dispatch(LandingPageActions.storeLandingPageStatus(request));
            this.updateLandingPageStatus();
            this.checkAmlBlockedCountryUser();
            this.store.dispatch(new CartActions.ToggleCartIconHeader(false));
            this.store.dispatch(new CartActions.GetCartByClientId(this.userDetails.customerIDNumber));
        });
        this.clickToSubmitAAData('fatca');
    }

    checkUserUTAccountExist(customerIDNumber) {
        /* istanbul ignore else */
        if (customerIDNumber) {
            this.store.dispatch(new UserAction.GetUserUTAccountInfo(customerIDNumber));
        }
    }

    updateLandingPageStatus() {
        this.actions$
            .pipe(ofType(LandingPageActions.storeLandingPageStatusSuccess), takeUntil(this._unsubscribeAll))
            .subscribe((response) => {
                if (
                    response === null ||
                    !response.landingPageStatus.landingPageStatus?.onboardingId
                ) {
                    const userRequest = this.createInitialUser();
                    this.store.dispatch(
                        LandingPageActions.setInitialLandingPageStatus({ userRequest }),
                    );
                    this.investmentJouneyProgres = 1;
                } else {
                    this.landingPageStatus = response.landingPageStatus.landingPageStatus;
                    /* istanbul ignore else */
                    if (this.landingPageStatus.rwsStatus === 'Y') {
                        this.investmentJouneyProgres = 2;
                        /* istanbul ignore else */
                        if (this.landingPageStatus.accountStatus === 'Y') {
                            this.isOpenAccountCompleted = true;
                            this.masterPopup[2].dialogContent = '<p>You have successfully completed your risk profiling and Unit Trust Account opening! Next, view and select your investment option.</p>'
                        }
                    }
                    /* istanbul ignore else */
                    if (this.landingPageStatus.investmentStatus === 'Y') {
                        this.investmentJouneyProgres = 3;
                    }
                    /* istanbul ignore else */
                    if (
                        this.landingPageStatus.accountStatus === 'Y' &&
                        this.landingPageStatus.investmentStatus === 'Y'
                    ) {
                        this.investmentJouneyProgres = 4;
                    }
                    /* istanbul ignore else */
                    if (this.landingPageStatus.finalStatus === 'Y') {
                        this.investmentJouneyProgres = 5;
                    }
                    if (this.router.url == '/landing-page') {
                        this.showInvestmentJouneyProgresPopup();
                    }
                }
            });
    }
    loadLandingPopupAdobeAnalytics(subCategory){
                            const day = getDayOfWeek();
                               setEventAndDigitalData(
                                    {
                                        wealthEvent: 'wealth:ntp popup'
                                    },
                                    {
                                        wealthDigitalData: {
                                            page: {
                                                category: {
                                                    primaryCategory: 'Unit Trust Module',
                                                    subCategory1:subCategory,
                                                    pageType: 'Content'
                                                },
                                                pageInfo: {
                                                    pageName: 'Wealth: UT NTP Landing Page',
                                                    day: day
                                                }
                                            },
                                            user: {
                                                loginStatus: 'logged-in'
                                            }
                                        }
                                    }
                                );
    }
    openRiskProfileSection() {
        this.blockedUser ? this.openBlockedUserPopup() : this.updateLandingPageStatusAndFatca();
    }
    updateLandingPageStatusAndFatca() {
        this.store.select(LandingPageSelector.selectLandingPageStatus).pipe(takeUntil(this._unsubscribeAll)).subscribe((result) => {
            this.landingPageStatus = result
        });
        if (this.landingPageStatus.landingStatus !== 'Y') {
            const req: LandingStatus = {
                onboardingId: this.landingPageStatus.onboardingId,
                landingStatus: 'Y',
                landingStartDate: '',
                landingEndDate: '',
            };
            this.store.dispatch(LandingPageActions.updateLandingStatus({ landingStatus: req }));
        }
        this.checkFatcaDeclaration();
    }
    checkFatcaDeclaration() {
        if (this.landingPageStatus.fatcaStatus === 'N') {
            const dialogRef = this.dialog.open(DialogAlertComponent, {
                panelClass: ['dialog-transaction-issue', 'dialog-inverse-button'],
                maxWidth: '600px',
                autoFocus: false,
                backdropClass: 'backdrop-modal',
                data: {
                    dialogHeading: 'FATCA/CRS Declaration',
                    dialogContent:
                        '<p>I confirm that I am a tax resident of Malaysia and do not have any foreign tax residency or US residency status (tax or otherwise).</p>',
                    dialogButtonCancel: true,
                    dialogButtonCancelText: 'No',
                    dialogButtonProceed: true,
                    dialogButtonProceedText: 'Yes',
                    dialogFooterContent: '<b>Note:</b> For foreign tax residents, please visit any CIMB branch for assistance.',
                },
            });

            dialogRef.afterClosed().subscribe((result) => {
                /* istanbul ignore else */
                if (result === 'Yes') {
                    const req: FatcaStatus = {
                        onboardingId: this.landingPageStatus.onboardingId,
                        fatcaStatus: 'Y',
                        fatcaStartDate: '',
                        fatcaEndDate: '',
                    };
                    this.store.dispatch(LandingPageActions.updateFatcaStatus({ fatcaStatus: req }));
                    this.router.navigate([path.RISK_PROFILE_QUESTIONS]);
                }
            });
        } else {
            this.router.navigate([path.RISK_PROFILE_QUESTIONS]);
        }
    }

    clickToSubmitAAData(question) {
        const day = getDayOfWeek();
        if(question === 'fatca'){
            setEventAndDigitalData(
                {
                    wealthEvent: 'wealth:allpage'
                },
                {
                    wealthDigitalData: {
                        page: {
                            category: {
                                primaryCategory: 'Unit Trust Module',
                                pageType: 'Content'
                            },
                            pageInfo: {
                                pageName: 'Wealth: UT NTP Landing Page',
                                day: day
                            }
                        },
                        user: {
                            loginStatus: 'logged-in',
                            memberLoginType: 'repeat'
                        }
                    }
                }
            );

        }
    }

    showInvestmentJouneyProgresPopup() {
        if (this.investmentJouneyProgres > 1 && this.investmentJouneyProgres < 5) {
            this.dialog.open(DialogAlertLandingPageComponent, {
                panelClass: ['custom-dialog', 'dialog-inverse-button'],
                maxWidth: '600px',
                autoFocus: false,
                backdropClass: 'backdrop-modal',
                disableClose: true,
                data: {
                    dialogHeading: this.masterPopup[this.investmentJouneyProgres].dialogHeading,
                    dialogContent: this.masterPopup[this.investmentJouneyProgres].dialogContent,
                    dialogButtonCancel: false,
                    dialogButtonCancelText: 'Cancel',
                    dialogButtonProceed: true,
                    dialogButtonProceedText:
                        this.masterPopup[this.investmentJouneyProgres].dialogButtonProceedText,
                    dialogSecondButton:
                        this.masterPopup[this.investmentJouneyProgres].dialogSecondButton,
                    dialogSecondButtonText:
                        this.masterPopup[this.investmentJouneyProgres].dialogSecondButtonText,
                    dialogImage: this.masterPopup[this.investmentJouneyProgres].dialogImage,
                    progressStep: this.investmentJouneyProgres,
                    isOpenAccountCompleted: this.isOpenAccountCompleted,
                    proceedButtonRedirection:
                        this.masterPopup[this.investmentJouneyProgres].proceedButtonRedirection,
                    secondButtonRedirection:
                        this.masterPopup[this.investmentJouneyProgres].secondButtonRedirection,
                },
            });
            if (this.investmentJouneyProgres === 2 && this.landingPageStatus.accountStatus !== 'Y'){
                this.loadLandingPopupAdobeAnalytics('UT NTP Select Investment 1');
            }else if(this.investmentJouneyProgres === 2 && this.landingPageStatus.accountStatus === 'Y'){
                this.loadLandingPopupAdobeAnalytics('UT NTP Select Investment 4');
            }else if(this.investmentJouneyProgres === 3)
            {
                this.loadLandingPopupAdobeAnalytics('UT NTP Open Account 2');
            }else if(this.investmentJouneyProgres === 4){
                this.loadLandingPopupAdobeAnalytics('UT NTP Confirm Purchase 3');
            }
        }
    }

    createInitialUser() {
        const user: LandingPageStatus = {
            fatcaStatus: 'N',
            landingStatus: 'Y',
            rwsStatus: 'N',
            rwsStartDate: null,
            fatcaStartDate: null,
            onboardingId: 0,
            fatcaEndDate: null,
            landingStartDate: null,
            clientIdType: 'NTP',
            rwsEndDate: null,
            investmentStatus: 'N',
            finalStartDate: null,
            landingEndDate: null,
            investmentEndDate: null,
            finalStatus: 'N',
            clientId: this.userDetails.customerIDNumber,
            finalEndDate: null,
            investmentStartDate: null,
            accountStatus: 'N',
            accountStartDate: null,
            accountEndDate: null,
        };
        return user;
    }
    checkAmlBlockedCountryUser() {
        this.store.select('accountOpeningReducer').pipe(takeUntil(this._unsubscribeAll)).subscribe((result) => {
            if (result && result.userDetailsAPIResponseData) {
                if (
                    result.userDetailsAPIResponseData['nationality'] != 'MYS' ||
                    result.userDetailsAPIResponseData['occupation'] === 'Student'
                ) {
                    this.blockedUser = true;
                } else {
                    this.blockedUser = false;
                }
            }
        });
    }

    openBlockedUserPopup() {
        this.dialog.open(DialogAlertComponent, {
            panelClass: 'dialog-transaction-issue',
            maxWidth: '600px',
            autoFocus: false,
            disableClose: true,
            backdropClass: 'backdrop-modal',
            data: {
                dialogHeading: 'Unable to Proceed',
                dialogContent:
                    'We regret to inform that we are unable to process your application. <br> Thank you for your interest. <br><br><b>For assistance, please visit any CIMB branch.</b>',
                dialogButtonCancel: false,
                dialogButtonProceed: true,
                dialogButtonProceedText: 'Close',
                dialogImage: '<em class="icon-danger"></em>',
            },
        });
    }
    redirectToSearchFunds() {
        const request = { IsSearchFundsFromLandingPage: true };
        this.store.dispatch(LandingPageActions.searchFundsFromLandingPage(request));
        this.router.navigate(['/available-funds']);
    }

    ngOnDestroy(): void {
        this.dialog.closeAll();
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
