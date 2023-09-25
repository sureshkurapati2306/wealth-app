import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Location } from '@angular/common';

import { environment } from '../../../environments/environment';
import { AccountSummary, RiskProfile } from '@cimb/shared/models';
import { ClicksInfo } from '../../core/state/clicks/clicks.models';
import { DialogAlertComponent } from '@cimb/mint';
import { MatDialog } from '@angular/material/dialog';
import { getClicksCustomerInfo } from '../../core/state/clicks/clicks.selectors';
import { ClicksState } from '../../core/state/clicks/clicks.state';
import { path } from '../../../app/shared/config/path';
import * as LogoutAction from '../../core/state/logout/logout.action';
import * as fromStore from '../../core/state/reducers';
import * as CartActions from '../../core/state/cart/cart.actions';
import * as DashbordAction from '../../core/state/dashbord/dashboard.actions';
import * as WealthDashboardSelectors from '../../core/state/wealth-dashboard/wealth-dashboard.selectors';
import * as WealthDashboardActions from '../../core/state/wealth-dashboard/wealth-dashboard.actions';
import * as UserAction from '../../core/state/user/user.actions';
import { AsnbService } from '../../modules/asnb/services/asnb.service';

@Component({
    selector: 'cimb-dashboard-layout',
    templateUrl: './dashboard-layout.component.html',
    styleUrls: ['./dashboard-layout.component.scss'],
})
export class DashboardLayoutComponent implements OnInit, OnDestroy {
    cartData: any;
    private userObservable: Observable<any>;
    private subscription: Subscription;
    private userSubscription: Subscription;

    accountSummary$: Observable<AccountSummary>;
    riskProfile$: Observable<RiskProfile>;
    clicksInfo: ClicksInfo;
    clicksState: ClicksState;
    clicksObservable$: Observable<ClicksInfo>;
    clicksSubscription: Subscription;

    totalAmountVal = 0.0;
    cartFooterToggle = true;
    totalFundsCountVal = 0;
    totalUnitVal = 0.0;
    flowText = 'topup';
    showCartIconValue: boolean;
    userData: any;
    logoutParams: any;
    storeTransaction: any;
    currentRoute: any;
    userType: any;
    customerName: '';
    users: any;
    riskProfileDataReceived = false;
    asnbAccountIsLinked = false;
    headerLogoUrl = environment.apiUrl + environment.wealth + '/image/category/1';

    constructor(
        private store: Store<fromStore.AppState>,
        private router: Router,
        location: Location,
        public dialog: MatDialog,
        private asnbService: AsnbService,
    ) {
        this.currentRoute = location.path();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
    ngOnInit(): void {
        this.store.select(getClicksCustomerInfo).subscribe((info) => {
            this.userType = info.customerType;
            this.clicksState = info;
        });

        this.userObservable = this.store.select('userReducer');

        this.userSubscription = this.userObservable.subscribe((users) => {
            this.users = users;
            this.userData = users.user;
            this.customerName = users?.customer_name ?? '';

            if (this.users?.riskProfileStatus) {
                this.riskProfileDataReceived = true;
            }
        });
        this.store.dispatch(new UserAction.StoreUserTypeResponse(this.userType));
        this.loadData();
        if (
            this.router.url === '/wealthdashboard' ||
            this.router.url.includes(path.ASNB_DASHBOARD)
        ) {
            this.cartFooterToggle = false;
            this.showCartIconValue = false;
        }

        this.store.select(WealthDashboardSelectors.selectAccountSummary).subscribe((accountSummary) => {
            this.asnbAccountIsLinked = accountSummary.assetLiabilities.some(
                (account) => account.alDesc === 'Amanah Saham Nasional Berhad',
            );
        })
    }

    loadData(): boolean {
        this.userObservable = this.store.select('cartReducer');
        this.subscription = this.userObservable.subscribe((data) => {
            this.cartData = data;
            this.storeTransaction = data.storeTransaction;
            /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
            this.updateData(data);
        });

        return true;
    }

    updateData(data): boolean {
        if (data) {
            this.totalAmountVal = data.totalAmount ? data.totalAmount : 0.0;
            this.totalFundsCountVal = data.fundList?.length;
            this.flowText = data.flow ? data.flow : '001';

            if (this.flowText == '002') {
                this.totalUnitVal = data.total_redemption_units;
            } else if (this.flowText == '003') {
                this.totalUnitVal = data.total_switch_out_units;
            } else {
                this.totalUnitVal = 0;
            }

            this.showCartIconValue = this.router.url.includes(path.ASNB_DASHBOARD)
                ? false
                : data.showCartIcon;
        }

        return true;
    }

    viewMyCartClick(): boolean {
        this.store.dispatch(new CartActions.ToggleCartFooter(false));
        this.store.dispatch(new CartActions.ToggleCartIconHeader(false));
        this.router.navigate(['/cart']);

        return true;
    }

    /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
    logoutEvent() {
        this.store.dispatch(new LogoutAction.LogoutTransaction());

        if (this.storeTransaction) {
            if (this.storeTransaction.length !== 0) {
                this.router.navigate(['/TransactionLogout']);
            } else {
                this.router.navigate(['/Logout']);
            }
        } else {
            this.router.navigate(['/Logout']);
        }
    }

    /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
    pageRedirectEvent(event): boolean {
        if (event === 'My Wealth Dashboard') {
            if (this.currentRoute.includes('/wealthdashboard')) {
                this.wealthDashboardCall();
                this.router.navigate(['/wealthdashboard']);
            } else {
                this.router.navigate(['/wealthdashboard']);
            }
        } else if (event == 'Unit Trust') {
            const riskProfileStatus = this.users?.riskProfileStatus;

            if (riskProfileStatus === 'Expired') {
                this.openRiskProfile('<p> It’s been a year since your risk profile was updated. Please update now for us to recommend investments suitable to your current risk profile.</p>');
            } else if (riskProfileStatus === 'Not Profiled') {
                this.openRiskProfile('Incomplete profile. Please update now, for us to recommend investments suitable to your current risk profile.');
            } else {
                if (this.currentRoute == '/dashboard' || this.currentRoute == '/dashboard;tab=0') {
                    const params =
                        this.userData.customer_id +
                        '/' +
                        this.userData.cifNumber +
                        '/' +
                        this.users.customerIdType +
                        '/' +
                        this.users.riskProfile;

                    this.store.dispatch(new DashbordAction.StoreDashboardApiResponse(null));
                    this.store.dispatch(
                        new DashbordAction.GetPurchaseDetail(this.userData.customer_id),
                    );
                    this.store.dispatch(
                        new CartActions.GetCartByClientId(this.userData.customer_id),
                    );
                    this.store.dispatch(new DashbordAction.CallDashboardApi(params));
                    this.router.navigate(['/dashboard']);
                } else {
                    this.router.navigate(['/dashboard']);
                }
            }
        } else if (event == 'ASNB') {
            this.router.navigate(['/asnb-dashboard']);
        }

        return true;
    }

    /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
    wealthDashboardCall() {
        this.store.dispatch(new CartActions.ToggleCartFooter(false));
        this.store.dispatch(new CartActions.ToggleCartIconHeader(false));

        this.accountSummary$ = this.store.select(WealthDashboardSelectors.selectAccountSummary);
        this.riskProfile$ = this.store.select(WealthDashboardSelectors.selectRiskProfileEnquiry);

        this.store.select(getClicksCustomerInfo).subscribe((info) => {
            this.clicksInfo = info;

            if (this.clicksInfo.customerIDType) {
                this.store.dispatch(
                    WealthDashboardActions.loadAccountSummary({
                        data: {
                            bankId: '35',
                            branchId: '09938',
                            govIssueIdentType: 'New IC',
                        },
                    }),
                );

                this.store.dispatch(new UserAction.UpdateUserDetails('01'));
            }
        });
    }

    /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
    openRiskProfile(dialogContent): boolean {
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

        return true;
    }
    /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
    navigateOnclosePopup(result) {
        if (result === 'Logout') {
            this.router.navigate(['/Logout']);
        }
        if (result === 'Proceed') {
            this.router.navigate(['/risk-profile/questions']);
        }
    }
}
