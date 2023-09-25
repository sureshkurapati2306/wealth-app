import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, Subscription, combineLatest } from 'rxjs';
import { distinctUntilChanged, take, tap, skip, takeUntil } from 'rxjs/operators';
import { AccountSummary, RiskProfile, Setting, SettingsUid } from '@cimb/shared/models';
import { AppService } from '../../core/services/app.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogAlertComponent, MintDialogService } from '@cimb/mint';
import { ClicksInfo } from '../../core/state/clicks/clicks.models';
import { getClicksCustomerInfo } from '../../core/state/clicks/clicks.selectors';
import { path } from '../../shared/config';
import * as fromStore from '../../core/state/reducers';
import * as CartActions from '../../core/state/cart/cart.actions';
import * as WealthDashboardActions from '../../core/state/wealth-dashboard/wealth-dashboard.actions';
import * as WealthDashboardSelectors from '../../core/state/wealth-dashboard/wealth-dashboard.selectors';
import * as UserAction from '../../core/state/user/user.actions';
import * as CifAction from '../../core/state/cifInquiry/cifInquiry.actions';
import * as DashbordAction from '../../core/state/dashbord/dashboard.actions';
import { setEventAndDigitalData, getDayOfWeek } from '@cimb/common';
import { AnalyticService } from '@cimb/shared/services';
import { AsnbService } from '../asnb/services/asnb.service';
import { Investment, ScheduledMaintenance } from '../asnb/models';
import { isEqual } from 'lodash-es';
import * as DialogPopupAction from '../../layouts/dashboard-layout/dialog-popup/+state/dialog-popup.actions';
import * as DialogPopupSelector from '../../layouts/dashboard-layout/dialog-popup/+state/dialog-popup.selectors';
import { DialogPopupComponent } from '../../layouts/dashboard-layout/dialog-popup/dialog-popup.component';
import { environment } from '../../../environments/environment';
import * as moment from 'moment';

import { ErrorHandlingService } from '../../core/services/error-handling/error-handling.service';
import { DowntimeService } from '../../core/services/downtime/downtime.service';

@Component({
    selector: 'cimb-wealth-dashboard',
    templateUrl: './wealth-dashboard.component.html',
    styleUrls: ['./wealth-dashboard.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WealthDashboardComponent implements OnInit, OnDestroy {
    lastUpdated = '';
    portfoliolist = [];
    _unsubscribeAll$: Subscription;
    accountSummary$: Observable<AccountSummary>;
    // riskProfile$: Observable<RiskProfile>;
    clicksInfo: ClicksInfo;
    userName: string;
    navigateUTAccount: any;
    riskProfileData: any;
    logoutParams: any;
    reqSessionParams: any;
    chkSession: boolean;
    chkSessionPopup: boolean;
    dashboardApiCalled = false;
    riskProfileDataReceived: boolean;
    shownNoCifPopup = false;
    customerType: string;
    rwsData: RiskProfile;
    currentCustomerType = 'ETP';
    getType: Subject<string> = new Subject<string>();
    asnbInvestment: Investment;
    settingsData: Setting[];
    enableApplyNowAtMyInvestmentDAshboard = true;

    applyNowAtMyInvestmentDAshboardSettingUid = SettingsUid.APPLY_NOW_AT_MYINVETMENT_DASHBOARD;
    dialogPopup: any;
    dialogPopupObservable$: Observable<any[]>;
    authTokenUpdated = false;
    private unsubscribeAll: Subject<any> = new Subject<any>();
    scheduledMaintenance: ScheduledMaintenance;

    maintenanceStartTime;
    maintenanceEndTime;

    isOnScheduledMaintenance = false;
    hasASNBDowntime = false;

    format = 'HH:mm:ss';
    now = moment().utcOffset('+0800').format(this.format);
    time = moment(this.now, this.format);

    constructor(
        public dialog: MatDialog,
        public router: Router,
        private store: Store<fromStore.AppState>,
        private appService: AppService,
        private _mintDialogService: MintDialogService,
        private analyticService: AnalyticService,
        private asnbService: AsnbService,
        private errorHandling: ErrorHandlingService,
        private DS: DowntimeService,
    ) {
        this.asnbService.getLinkAccountEvent().subscribe(() => {
            this.callDashboardApi();
            this.appService.showLoadingSpinner();

            this.accountSummary$.subscribe((data) => {
                const asnbLinked = data.assetLiabilities.some(
                    (item) => item.alDesc === 'Amanah Saham Nasional Berhad',
                );

                if (asnbLinked) {
                    this.appService.hideLoadingSpinner();
                }
            });
        });

        this.asnbService.getDelinkAccountEvent().subscribe(() => {
            this.store.dispatch(WealthDashboardActions.resetAsnbAccountAfterDelink());
        });
    }

    /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
    ngOnInit() {
        this.store.dispatch(new CartActions.ToggleCartFooter(false));
        this.store.dispatch(new CartActions.ToggleCartIconHeader(false));
        this.dashboardApiCalled = false;

        this.store.select(getClicksCustomerInfo).subscribe((info) => {
            this.clicksInfo = info;

            this.store.select('userReducer').subscribe((users) => {
                this.customerType = users.userType;
                if (this.customerType) {
                    this.getType.next(this.customerType);
                }
                if (users?.createSessionResponse && this.dashboardApiCalled === false) {
                    this.store.select('authReducer').subscribe((auth) => {
                        if (auth.token) {
                            this.callDashboardApi();
                        }
                    });
                }
            });
        });

        this.accountSummary$ = this.store.select(WealthDashboardSelectors.selectAccountSummary);

        this.store.select(WealthDashboardSelectors.selectAccountSummary).subscribe((info) => {
            if (info && info.customerName) {
                this.store.dispatch(new UserAction.UpdateUserName(info?.customerName ?? ''));
            }
            if (info.assetLiabilities.length > 0) {
                const utAccount = info.assetLiabilities.filter(
                    (item) => item.alCategory === 'Assets' && item.alcName === 'My Investment',
                );
                const accounts = utAccount.map((item) => {
                    return {
                        ut_account_no: item.accountNumber,
                        accountStatus: item.accountStatus,
                    };
                });
                this.store.dispatch(WealthDashboardActions.storeUtAccount({ data: accounts }));
                const casaAvailability = info.assetLiabilities.filter(
                    (item) => item.alCategory === 'Assets' && item.alcName === 'My Deposit',
                );
                const casaIndicator = casaAvailability.length !== 0 ? 'Y' : 'N';
                this.store.dispatch(
                    WealthDashboardActions.storeCasaIndicator({ data: casaIndicator }),
                );
            }
        });

        this.appService.showLoadingSpinner();
        this.store
            .select(WealthDashboardSelectors.selectRiskProfileEnquiry)
            .subscribe((info: any) => {
                if (info) {
                    this.checkRiskProfileExpiryOnLoad(info);
                    this.checkRiskProfileStatusCode(info);
                    this.rwsData = info;
                }
                const isRiskProfileExpired = info?.data?.riskProfileStatus;
                if (isRiskProfileExpired === 'EXPIRED') {
                    this.checkIfRiskProfileExpired();
                }
            });

        this.store
            .select('cifInquiryReducer')
            .pipe(distinctUntilChanged(isEqual))
            .subscribe((info) => {
                if (info && info.phoneNumber) {
                    this.store.dispatch(new UserAction.UpdateUserMobileNumber(info.phoneNumber));
                }
            });

        // ASNB - hide loading spinner after multiple store select is completed
        combineLatest([
            this.store.select(WealthDashboardSelectors.getASNBUserAccountStatus),
            this.store.select(WealthDashboardSelectors.selectAccSummaryAndRiskProfileStatusCalled),
            this.store.select(WealthDashboardSelectors.getASNBDowntimeScheduledMaintenance),
            this.store.select('cifInquiryReducer'),
        ]).subscribe(([accountStatus, status, data, { cifInquiryCalled }]) => {
            if (accountStatus !== null && status && data && cifInquiryCalled) {
                this.appService.hideLoadingSpinner();
            }
        });

        this._unsubscribeAll$ = this.store
            .select('userReducer')
            .pipe(
                tap((data) => {
                    this.userName = data.user.customer_name;
                }),
            )
            .subscribe();
        this.getType.pipe(take(1)).subscribe(() => this.loadAnalytisWealthDahboard());
        this.getNdSetSettings();
    }

    loadAnalytisWealthDahboard() {
        const day = getDayOfWeek();
        if (this.clicksInfo?.accountStatus === 'Y' || this.customerType === 'ETP') {
            this.currentCustomerType = 'ETP';
        } else {
            this.currentCustomerType = 'NTP';
        }
        setEventAndDigitalData(
            {
                wealthEvent: 'wealth:allpage',
            },
            {
                wealthDigitalData: {
                    page: {
                        category: {
                            primaryCategory: 'Wealth Dashboard Module',
                            subCategory1: 'Assets',
                            pageType: 'Dashboard Summary',
                        },
                        pageInfo: {
                            pageName: 'Wealth: My Wealth Dashboard',
                            day: day,
                        },
                    },
                    user: {
                        loginStatus: 'logged-in',
                        memberLoginType: 'repeat',
                        customerType: this.currentCustomerType,
                    },
                },
            },
        );
    }

    checkIfRiskProfileExpired(): void {
        this._mintDialogService.open({
            title: 'Update your Risk Profile',
            message: `It’s been a year since your risk profile was updated. Please update now, for us to recommend investments suitable to your current risk profile.`,
            actions: {
                confirm: {
                    label: 'Proceed',
                    click: () => this.router.navigate([path.RISK_PROFILE_QUESTIONS]),
                },
                cancel: {
                    show: false,
                },
            },
        });
    }

    /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
    checkRiskProfileStatusCode(riskProfileStatus: any) {
        if (
            (riskProfileStatus.status.code === '4' && this.clicksInfo.customerType !== 'NTP') ||
            riskProfileStatus.status === 'error'
        ) {
            this.riskProfileDataReceived = false;
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

    /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
    callDashboardApi() {
        if (this.clicksInfo.customerType) {
            this.dashboardApiCalled = true;

            // check by using customerID
            this.store.dispatch(new CifAction.GetCifInquiryParam());

            this.store.dispatch(
                WealthDashboardActions.loadAccountSummary({
                    data: {
                        bankId: '35',
                        branchId: '09938',
                        govIssueIdentType: this.clicksInfo.customerIDTypeDesc,
                    },
                }),
            );

            // ASNB check for white list and link account

            this.store.dispatch(WealthDashboardActions.asnbWhiteListEnquiry());
            this.store.dispatch(WealthDashboardActions.asnbLinkAccountEnquiry());
            this.store.dispatch(WealthDashboardActions.loadAsnbUserAccountStatus());

            //asnb downtime
            this.store.dispatch(WealthDashboardActions.WDLoadScheduledMaintenance());
            this.DS.getASNBScheduledDowntime().subscribe((data) => {
                if (data) {
                    this.scheduledMaintenance = data.scheduledMaintenance;
                    this.maintenanceStartTime = data.maintenanceStartTime;
                    this.maintenanceEndTime = data.maintenanceEndTime;
                    this.isOnScheduledMaintenance = data.hasScheduledMaintenance;
                }
            });

            //asnb downtime
            this.getASNBDowntimeError();

            this.store.dispatch(new UserAction.UpdateUserDetails(this.clicksInfo.customerIDType));

            //WJ-3861 Sole prop pop-up error message is not being displayed
            this.store.dispatch(
                new UserAction.UpdateCustomerIdType(this.clicksInfo.customerIDType),
            );

            this.store.dispatch(new UserAction.StoreUserTypeResponse(this.clicksInfo.customerType));
            if (!this.riskProfileData || this.riskProfileData === null) {
                this.store.dispatch(
                    WealthDashboardActions.riskProfileEnquiry({
                        data: {
                            custName: '',
                            custIdType: '',
                            custIdIssue: '',
                        },
                    }),
                );
            }
            this.store.dispatch(WealthDashboardActions.settingsData());
            this.callPopUpAPI();
        }
    }

    ngOnDestroy(): void {
        this.unsubscribeAll.next(null);
        this.unsubscribeAll.complete();
        this._unsubscribeAll$.unsubscribe();
        this.store.dispatch(new CartActions.ToggleCartIconHeader(true));
    }

    /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
    callRiskProfilePopup(event) {
        this.navigateUTAccount = event;
        if (event.isLinkClicked) {
            this.checkRiskProfileExpiry(this.rwsData);
        }
    }

    /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
    checkRiskProfileExpiryOnLoad(data) {
        const riskData = data?.data;
        if (riskData && riskData?.riskProfileStatus) {
            this.store.dispatch(new UserAction.StoreRiskProfileStatus(riskData?.riskProfileStatus));
        }
        if (riskData && riskData?.riskProfile) {
            this.store.dispatch(new UserAction.UpdateRiskProfile(riskData?.riskProfile));
        }
        this.riskProfileDataReceived = true;
    }

    /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
    checkRiskProfileExpiry(data) {
        this.riskProfileData = data;
        const riskData = data?.data;
        if (riskData && riskData?.riskProfileStatus && riskData?.riskProfileStatus === 'Expired') {
            this.openRiskProfile(
                '<p> It’s been a year since your risk profile was updated. Please update now for us to recommend investments suitable to your current risk profile.</p>',
            );
        } else if (
            riskData &&
            riskData?.riskProfileStatus &&
            riskData?.riskProfileStatus === 'Not Profiled'
        ) {
            this.openRiskProfile(
                'Incomplete profile. Please update now, for us to recommend investments suitable to your current risk profile.',
            );
        } else {
            if (this.navigateUTAccount && this.navigateUTAccount.payload) {
                this.store.dispatch(
                    new DashbordAction.UpdateCartUTAccount(this.navigateUTAccount?.payload),
                );
                this.store.dispatch(
                    new UserAction.SelectedUnitTrustAccount(this.navigateUTAccount?.payload),
                );
                this.router.navigate([path.DASHBOARD]);
            }
        }
    }

    getNdSetSettings(): void {
        this.store.select(WealthDashboardSelectors.settingsDataSuccess).subscribe((resp) => {
            if (resp) {
                this.settingsData = resp;
                if (this.settingsData) {
                    this.settingsData.forEach((settingData: Setting) => {
                        const isEnabled = settingData.enabled;
                        const settingUid = settingData.utSettingId;

                        if (settingUid === this.applyNowAtMyInvestmentDAshboardSettingUid) {
                            this.enableApplyNowAtMyInvestmentDAshboard = isEnabled;
                        }
                    });
                }
            }
        });
    }

    /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
    openRiskProfile(dialogContent) {
        const dialogRefOPenAccount = this.dialog.open(DialogAlertComponent, {
            panelClass: 'dialog-transaction-issue',
            maxWidth: '600px',
            autoFocus: false,
            backdropClass: 'backdrop-modal',
            data: {
                dialogImage: '<em class="icon-warning">',
                dialogHeading: 'Update your Risk Profile',
                dialogContent: dialogContent,
                dialogButtonProceed: true,
                dialogButtonProceedText: 'Proceed',
                dialogShowCloseButtonCancel: true,
            },
        });

        dialogRefOPenAccount.afterClosed().subscribe((result) => {
            this.navigateOnclosePopup(result);
        });
    }

    navigateOnclosePopup(result) {
        if (result === 'Logout') {
            /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
            this.router.navigate([path.LOGOUT]);
        }
        if (result === 'Proceed') {
            this.router.navigate(['/risk-profile/questions']);
        }
    }

    callPopUpAPI() {
        this.store.dispatch(DialogPopupAction.loadPopUpDetails({ id: '1' }));
        this.openDialogPopup();
    }

    openDialogPopup() {
        this.dialogPopupObservable$ = this.store.select(DialogPopupSelector.selectDialogPopup);
        this.dialogPopupObservable$.pipe(
            skip(1),
            takeUntil(this.unsubscribeAll)
        ).subscribe((info) => {
            this.dialogPopup = info;
            if (this.dialogPopup?.status) {
                this.popupData();
            }
        });
    }

    popupData() {
        if (!this.authTokenUpdated) {
            this.dialog.open(DialogPopupComponent, {
                panelClass: ['dialog-popup'],
                autoFocus: false,
                maxHeight: '32rem',
                backdropClass: 'backdrop-modal',
                data: {
                    imageSrc: environment?.apiUrl + environment.wealth + '/image/category/2',
                    title: this.dialogPopup?.title,
                    subtitle: this.dialogPopup?.subtitle,
                    content: this.dialogPopup?.content,
                },
            });
            this.authTokenUpdated = true;
        }
    }
    getASNBDowntimeError() {
        this.errorHandling.apiErrorMessageSubj$.subscribe((data) => {
            if (data === true) {
                this.hasASNBDowntime = data;
            }
        });
    }
}
