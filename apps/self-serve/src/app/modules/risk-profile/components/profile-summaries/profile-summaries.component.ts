import { MediaMatcher } from '@angular/cdk/layout';
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { getRiskProfileResults } from '../../+state/risk-profile.selectors';
import * as fromStore from '../../../../core/state/reducers';
import { Results } from '../../models';
import { DialogsService, setEventAndDigitalData, getDayOfWeek } from '@cimb/common';
import { AnalyticService } from '@cimb/shared/services';
import { selectRiskProfileEnquiry } from 'apps/self-serve/src/app/core/state/wealth-dashboard/wealth-dashboard.selectors';
import { DialogAlertComponent, DialogSelectTransactionComponent } from '@cimb/mint';
import { AppService } from 'apps/self-serve/src/app/core/services/app.service';
import { getClicksCustomerInfo } from 'apps/self-serve/src/app/core/state/clicks/clicks.selectors';
import { takeUntil } from 'rxjs/operators';
import * as WealthDashboardSelectors from '../../../../core/state/wealth-dashboard/wealth-dashboard.selectors';

@Component({
    selector: 'cimb-profile-summaries',
    templateUrl: './profile-summaries.component.html',
    styleUrls: ['./profile-summaries.component.scss'],
})
export class ProfileSummariesComponent implements OnInit, OnDestroy {
    @ViewChild('riskProfileCalculationDialog') riskProfileCalculationDialog: TemplateRef<any>;
    results$: Observable<Results>;
    userSoleProp$: Observable<any>;
    userSubscription: Subscription;
    customerType: any;
    mediaQueryList: MediaQueryList;
    accounts: any[] = [];
    casaIndicator: string;
    soleProp: string;
    amlCheckResult = true;
    _unsubscribeAll: Subject<void> = new Subject<void>();
    constructor(
        private _matDialog: MatDialog,
        private store: Store<fromStore.AppState>,
        private _dialogsService: DialogsService,
        private analyticService: AnalyticService,
        private mediaMatcher: MediaMatcher,
        private appService: AppService
    ) {
        this.mediaQueryList = mediaMatcher.matchMedia('(max-width: 768px)');
    }

    ngOnInit(): void {
        this.loadSummarySection();
        this.userSoleProp$ = this.store.select('userReducer');
        this.userSubscription = this.userSoleProp$.subscribe((users) => {
            this.customerType = users.userType;
            this.soleProp = users.user.sole_prop;
        });
        this.clickToSubmitAAData();
        this.store.select(WealthDashboardSelectors.selectUtAccountAndCasaIndicator).pipe(takeUntil(this._unsubscribeAll)).subscribe((data) => {
            this.accounts = data?.accounts;
            this.casaIndicator = data?.casaIndicator;
        });
        this.store.select(getClicksCustomerInfo).pipe(takeUntil(this._unsubscribeAll)).subscribe((info) => {
            this.amlCheckResult = info['amlCheckResult'] ? true : false;
        });
    }

    openRiskCalculationDialog() {
        this._matDialog.open(this.riskProfileCalculationDialog);
    }

    checkIfSolePropDialog(): void {
        this._dialogsService.showDialogIfSolePropCustomer();
        this.analyticService.loadPopUpAnalytics(
            'Unable to Transact <br> (Sole Proprietor Customer)'
        );
    }

    clickToSubmitAAData() {
        const day = getDayOfWeek();
        setEventAndDigitalData(
            {
                wealthEvent: 'wealth:UT RP Results',
            },
            {
                wealthDigitalData: {
                    page: {
                        category: {
                            primaryCategory: 'Risk Profile Module',
                            pageType: 'Input',
                        },
                        pageInfo: {
                            pageName: 'Wealth: Risk Profile Results',
                            day: day,
                        },
                    },
                    user: {
                        loginStatus: 'logged-in',
                        memberLoginType: 'repeat',
                        customerType: this.customerType,
                    },
                    sales: {
                        type: 'Unit Trust Risk Profiling',
                    },
                },
            },
        );
    }

    loadSummarySection() {
        if (this.appService.learn_more === true) {
            this.store.select(selectRiskProfileEnquiry).subscribe((riskProfile) => {
                const param: Results = {
                    data: riskProfile['data'],
                    status: riskProfile['status'],
                };
                this.results$ = of(param);
            });
        } else {
            this.results$ = this.store.select(getRiskProfileResults);
        }
    }

    openDialog() {
        if (this.casaIndicator === 'N') {
            this._matDialog.open(DialogAlertComponent, {
                panelClass: ['custom-dialog', 'dialog-inverse-button'],
                maxWidth: '600px',
                autoFocus: false,
                backdropClass: 'backdrop-modal',
                data: {
                    dialogHeading: 'Unable to Transact (No CASA)',
                    dialogContent:
                        '<p>To complete your transaction, open a current or savings account/-i with CIMB. You may apply via CIMB Clicks.</p><p><strong>For assistance, please <a class="go_to_consumer_contact_centre_link" >contact us or visit any CIMB branch.</a></strong></p>',
                    dialogButtonProceed: true,
                    dialogButtonProceedText: 'Okay',
                    dialogImage: '<em class="icon-danger"></em>',
                },
            });
            this.analyticService.loadPopUpAnalytics('Unable to Transact (No CASA)');
        }
        //Sole prop indicator
        else if (this.soleProp === 'P') {
            this._matDialog.open(DialogAlertComponent, {
                panelClass: 'custom-dialog',
                maxWidth: '600px',
                autoFocus: false,
                backdropClass: 'backdrop-modal',
                data: {
                    dialogHeading:
                        'Unable to Transact <p><strong>(Sole Proprietor Customer)</strong></p>',
                    dialogContent:
                        '<br><p>For Unit Trust transactions as a sole proprietor customer, please visit any CIMB branch.</p>',
                    dialogButtonProceed: true,
                    dialogButtonProceedText: 'Okay',
                    dialogImage: '<em class="icon-danger"></em>',
                },
            });
            this.analyticService.loadPopUpAnalytics(
                'Unable to Transact <br> (Sole Proprietor Customer)',
            );
        }
        // Under AML watch list
        else if (!this.amlCheckResult) {
            this._matDialog.open(DialogAlertComponent, {
                panelClass: ['custom-dialog', 'dialog-inverse-button'],
                maxWidth: '600px',
                autoFocus: false,
                backdropClass: 'backdrop-modal',
                data: {
                    dialogHeading: 'Unable to Proceed',
                    dialogContent:
                        '<p>We regret to inform that we are unable to process your application. Thank you for your interest.</p><p><strong>For assistance, please visit any CIMB branch.</strong></p>',
                    dialogButtonProceed: true,
                    dialogButtonProceedText: 'Close',
                    dialogImage: '<em class="icon-danger"></em>',
                },
            });
        } else {
            this._matDialog.open(DialogSelectTransactionComponent, {
                panelClass: ['full-width', 'select-acc'],
                maxWidth: '772px',
                autoFocus: false,
                data: {
                    selectedAccount: this.accounts[0]?.ut_account_no,
                    accounts: this.accounts,
                },
            });
        }
    }

    ngOnDestroy() {
        this.userSubscription.unsubscribe();
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
