import {
    Component,
    Input,
    ChangeDetectionStrategy,
    EventEmitter,
    Output,
    ChangeDetectorRef,
} from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AssetLiability, WealthPortfolioBox } from '@cimb/shared/models';
import { Store } from '@ngrx/store';
import { MobileTooltipComponent } from '../../mint-action-sheets/mobile-tooltip/mobile-tooltip.component';
import * as fromStore from '../../../../../../../apps/self-serve/src/app/core/state/reducers';
import * as WealthDashboardSelectors from '../../../../../../../apps/self-serve/src/app/core/state/wealth-dashboard/wealth-dashboard.selectors';
import { MatDialog } from '@angular/material/dialog';
import { DialogAlertComponent } from '../../mint-dialog/dialog-alert/dialog-alert.component';
import { AnalyticService } from '@cimb/shared/services';
import { Router } from '@angular/router';

import { DialogAsnbConsentComponent } from '../../mint-dialog/dialog-asnb-consent/dialog-asnb-consent.component';
import { DialogAsnbLinkErrorComponent } from '../../mint-dialog/dialog-asnb-link-error/dialog-asnb-link-error.component';
import { DialogOtpLinkAsnbComponent } from '../../mint-dialog/dialog-otp-link-asnb/dialog-otp-link-asnb.component';

import { AsnbService } from 'apps/self-serve/src/app/modules/asnb/services/asnb.service';
import { combineLatest, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { path } from 'apps/self-serve/src/app/shared/config';
import { getClicksCustomerInfo } from 'apps/self-serve/src/app/core/state/clicks/clicks.selectors';
import { AsnbInquiry } from 'apps/self-serve/src/app/modules/asnb/models';
import { AppService } from 'apps/self-serve/src/app/core/services/app.service';

interface AsnbConsentResult {
    isMobile: boolean;
}
@Component({
    selector: 'cimb-box-investment',
    templateUrl: './box-investment.component.html',
    styleUrls: ['./box-investment.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoxInvestmentComponent {
    @Output() callRiskProfileEvent: EventEmitter<any> = new EventEmitter();
    @Input() canNavigateToDashboard: boolean;
    @Input() enableApplyNowAtMyInvestmentDAshboard: boolean;
    @Input() hasASNBDowntime = false;

    @Input() isOnScheduledMaintenance = false;

    showApplyNow: boolean;
    enableAccountOpening = true;
    customerType: string;
    _unsubscribeAll: Subject<void> = new Subject<void>();
    amlCheckResult = true;
    dHeading: string;
    dContent: string;
    soleProp: string;
    utDetails: AssetLiability[];

    attemptCount = 0;
    hasAsnbAccount: boolean;
    isAccountStatusNormal: boolean;

    showAsnbPnbError: boolean;
    showAsnbCimbError: boolean;

    asnb = 'Amanah Saham Nasional Berhad';

    @Input() maintenanceStartTime: string;
    @Input() maintenanceEndTime: string;
    @Input() maintenanceStartDate: any;
    @Input() maintenanceEndDate: any;

    constructor(
        private _bottomSheet: MatBottomSheet,
        private store: Store,
        public dialog: MatDialog,
        private analyticService: AnalyticService,
        public router: Router,
        public appStore: Store<fromStore.AppState>,
        private asnbService: AsnbService,
        private cd: ChangeDetectorRef,
        private appService: AppService,
    ) {
        this.appStore.select(getClicksCustomerInfo).subscribe((res) => {
            this.customerType = res.customerType;
            if (res.customerType == 'NTP') {
                this.showApplyNow = true;
            } else {
                this.showApplyNow = false;
            }
        });
    }

    _holdingDetails: WealthPortfolioBox;

    lastUpdatedDate = this.store.select(WealthDashboardSelectors.selectLastUpdatedDate);

    isASNBWhitelisted$ = this.store.select(WealthDashboardSelectors.selectIsASNBWhitelisted);

    isASNBAccountLinked$ = this.store.select(WealthDashboardSelectors.selectAccountSummary).pipe(
        map((accountSummary) => {
            return accountSummary.assetLiabilities.some((account) => account.alDesc === this.asnb);
        }),
    );

    get showLinkAccountOptions() {
        return combineLatest([this.isASNBWhitelisted$, this.isASNBAccountLinked$]).pipe(
            map(([isASNBWhitelisted, isASNBAccountLinked]) => {
                return isASNBWhitelisted && !isASNBAccountLinked && !this.showAsnbCimbError;
            }),
        );
    }
    private _isLinkError: boolean;

    now = Date.now();

    creditCardDisclaimer = [
        'supplementary credit card will be introduce\n  as part of the liabilities on the future.\n',
        'credit card record will be avaiable to mycard\n  holders only.',
    ];
    creditCardMobileDisclaimer = `<ul><li>• supplementary credit card will be introduce as part of the liabilities on the future.
        </li><br><li>• credit card record will be avaiable to mycard holders only.</li></ul>`;

    @Input() set holdingDetails(data: WealthPortfolioBox) {
        this._holdingDetails = data;
        this.now = Date.now();
    }

    ngOnInit() {
        this.store
            .select(getClicksCustomerInfo)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((info) => {
                this.amlCheckResult = info['amlCheckResult'];
                this.soleProp = info['soleprop_ind'];
            });

        if (this.customerType == 'NTP' && this.enableApplyNowAtMyInvestmentDAshboard) {
            this.enableAccountOpening = true;
        } else {
            this.enableAccountOpening = false;
        }

        this.utDetails = this._holdingDetails.items.filter((x) => x.alDesc !== this.asnb);

        this.hasAsnbAccount = this._holdingDetails.items.some((x) => x.alDesc === this.asnb);

        this.store
            .select(WealthDashboardSelectors.getASNBUserAccountStatus)
            .subscribe((riskStatus) => {
                if (riskStatus !== null) {
                    this.isAccountStatusNormal = riskStatus;
                    this.cd.markForCheck();
                }
            });

        this.store.select(WealthDashboardSelectors.selectAccountSummary).subscribe((res) => {
            this.showAsnbPnbError =
                res.asnbInquiryStatus === 'Failed' &&
                res.asnbInquiryCode.rejectCode !== '400' &&
                this.hasAsnbAccount;

            this.showAsnbCimbError =
                res.asnbInquiryStatus === 'Failed' && res.asnbInquiryCode.rejectCode === '400';
        });

        this._holdingDetails.items = this._holdingDetails.items.filter((item) => {
            return !(
                item.alDesc === this.asnb &&
                (this.showAsnbCimbError || this.showAsnbPnbError)
            );
        });
    }

    goToUtDashboard(utAccountNumber: string) {
        this.callRiskProfileEvent.emit({ isLinkClicked: true, payload: utAccountNumber });
        //should be dispatching this action to switch UT dashboard active UT account but UserAction is not in lib so cannot be imported
        // this.store.dispatch(new UserAction.SelectedUnitTrustAccount(utAccountNumber));

        //workaround to dispatch action without importing UserAction
        //   this.store.dispatch({
        //     type: '[User] Update Selected Unit Trust Account',
        //     payload: utAccountNumber
        //   });

        //   this.router.navigate(['./dashboard']);
    }

    goToASNBDashboard(utAccountNumber: string) {
        // this.callRiskProfileEvent.emit({ isLinkClicked: true, payload: utAccountNumber });
        this.router.navigate(['asnb-dashboard']);
    }

    applyNow(casa, haveActiveCasa) {
        if (!casa) {
            this.dHeading = 'Unable to Proceed (No CASA)';
            this.dContent =
                '<p>To complete your transaction, open a current or savings account/-i with CIMB. You may apply via CIMB Clicks.</p><p><strong>For assistance, please <a class="go_to_consumer_contact_centre_link" >contact us or visit any CIMB branch.</a></strong></p>';
            this.displayDialog(this.dHeading, this.dContent);
        } else if (!haveActiveCasa) {
            this.dHeading = 'Unable to Proceed';
            this.dContent =
                '<p>You need to have an active current or savings account with CIMB to open a Unit Trust account.</p><p><strong>For assistance, please <a class="go_to_consumer_contact_centre_link" >contact us or visit any CIMB branch.</a></strong></p>';
            this.displayDialog(this.dHeading, this.dContent);
        } else if (!this.amlCheckResult) {
            this.dHeading = 'Unable to Proceed';
            this.dContent =
                '<p>We regret to inform that we are unable to process your application. Thank you for your interest.</p><p><strong>For assistance, please visit any CIMB branch.</strong></p>';
            this.displayDialog(this.dHeading, this.dContent);
        } else if (this.soleProp === 'P') {
            this.dHeading = 'Unable to Transact <p><strong>(Sole Proprietor Customer)</strong></p>';
            this.dContent =
                '<br><p>For Unit Trust transactions as a sole proprietor customer, please visit any CIMB branch.</p>';
            this.displayDialog(this.dHeading, this.dContent);
        } else {
            this.router.navigate([path.DASHBOARD]);
        }
    }

    displayDialog(heading, content) {
        this.dialog.open(DialogAlertComponent, {
            panelClass: ['custom-dialog', 'dialog-inverse-button'],
            maxWidth: '600px',
            autoFocus: false,
            backdropClass: 'backdrop-modal',
            data: {
                dialogHeading: heading,
                dialogContent: content,
                dialogButtonProceed: true,
                dialogButtonProceedText: 'Okay',
                dialogImage: '<em class="icon-danger"></em>',
            },
        });
        const dialogHeading = heading.includes('Proprietor')
            ? 'Unable to Transact (Sole Proprietor Customer)'
            : heading;
        this.analyticService.loadPopUpAnalytics(dialogHeading);
    }

    openBottomSheet(heading = '', content = ''): void {
        this._bottomSheet.open(MobileTooltipComponent, {
            panelClass: 'tooltip-action-sheet',
            data: {
                actionHeading: heading,
                actionContent: `<p>${content}</p>`,
            },
        });
    }

    openDialogUnableToProceed(event) {
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

    openDialog() {
        this.appService.showLoadingSpinner();

        this.getInquiryTransactionStatus()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((res: AsnbInquiry) => {
                if (!res) return;

                this.appService.hideLoadingSpinner();
                this.handleUrlDialog(res);
            });
    }

    handleUrlDialog(res: AsnbInquiry): void {
        this.asnbService
            .getSpecificExternalUrl('2')
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data) => {
                if (!data) return;
                this.openUrlDialog(data.urlDesc, res);
            });
    }

    openUrlDialog(prospectusLink: string, res: AsnbInquiry): void {
        const dialogRef = this.dialog.open(DialogAsnbConsentComponent, {
            backdropClass: 'asnb-consent',
            data: {
                prospectusLink: prospectusLink,
            },
        });

        dialogRef
            .afterClosed()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((result: AsnbConsentResult) => {
                if (result) {
                    this.handleDialogResult(result, res);
                }
            });
    }

    handleDialogResult(result: AsnbConsentResult, res: AsnbInquiry): void {
        this.store
            .select(WealthDashboardSelectors.selectIsASNBAccountLinked)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((isLinked) => {
                this.store
                    .select(WealthDashboardSelectors.getASNBUserAccountStatus)
                    .pipe(takeUntil(this._unsubscribeAll))
                    .subscribe((riskStatus) => {
                        this.isAccountStatusNormal = riskStatus;
                        this.handleAccountStatus(result, res, isLinked);
                    });
            });
    }

    handleAccountStatus(result: AsnbConsentResult, res: AsnbInquiry, isLinked: boolean): void {
        if (!res.rejectCode || !res.rejectReason) {
            if (isLinked && this.isAccountStatusNormal) {
                this.openLinkOtpModal(result.isMobile);
            } else {
                this.varIsLinkError = true;
            }
            return;
        }

        this.handleRejectCode(res);
    }

    handleRejectCode(res: AsnbInquiry): void {
        this.appService.showLoadingSpinner();
        this.asnbService.getErrorCodeMapping(res.rejectCode, true).subscribe((errorCodeData) => {
            if (errorCodeData.displayMessageEng) {
                this.appService.hideLoadingSpinner();
                this.openLinkAccountRejectedModal(errorCodeData.displayMessageEng);
            }
        });
    }

    openLinkOtpModal(isMobile: boolean) {
        const data = {
            attemptCount: this.attemptCount,
        };
        const options = isMobile
            ? {
                  width: '100vw',
                  height: '100%',
                  maxWidth: '100vw',
                  position: {
                      bottom: '0px',
                      left: '0px',
                  },
                  panelClass: 'mobile-asnb-otp-container',
              }
            : {
                  backdropClass: 'asnb-sms-tac',
              };

        const otpDialogRef = this.dialog.open(DialogOtpLinkAsnbComponent, { ...options, data });
        otpDialogRef.componentInstance.updateOTPAttemptCount.subscribe((attempt: number) => {
            this.attemptCount = attempt;
        });
        otpDialogRef.afterClosed().subscribe((result) => {
            if (result === 'continue') {
                this.linkASNBAccount();
            } else if (result === 'logout') {
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
                    this.router.navigate(['/Logout']);
                });
            }
        });
    }

    linkASNBAccount() {
        this.asnbService.sendLinkAccountEvent();
    }

    get varIsLinkError() {
        return this._isLinkError;
    }

    set varIsLinkError(value: boolean) {
        if (value) {
            this.dialog.open(DialogAsnbLinkErrorComponent, {
                backdropClass: 'asnb-consent',
            });
        }
    }

    getInquiryTransactionStatus() {
        return this.asnbService.getASNBFundListOwnAccount({ unitHolderId: '' });
    }

    openLinkAccountRejectedModal(rejectReason: string) {
        this.dialog.open(DialogAlertComponent, {
            panelClass: ['custom-dialog', 'dialog-inverse-button'],
            maxWidth: '600px',
            autoFocus: false,
            disableClose: true,
            backdropClass: 'backdrop-modal',
            data: {
                dialogHeading: 'Unable to Proceed',
                dialogContent: `<p>${rejectReason}<p>`,
                dialogButtonCancel: false,
                dialogButtonProceed: true,
                dialogButtonProceedText: 'Okay',
                dialogImage: '<em class="icon-danger"></em>',
            },
        });
    }

    ngOnDestroy() {
        this._unsubscribeAll.next(null);
    }
}
