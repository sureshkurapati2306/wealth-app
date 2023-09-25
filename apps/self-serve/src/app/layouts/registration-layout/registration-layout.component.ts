import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Location } from '@angular/common';

import * as fromStore from '../../core/state/reducers';
import * as LogoutAction from '../../core/state/logout/logout.action';
import * as CartActions from '../../core/state/cart/cart.actions';

import { selectAccountStatus } from '../../core/state/landing-page/landing-page.selectors';
import { getClicksCustomerInfo } from '../../core/state/clicks/clicks.selectors';
import { path } from '../../shared/config/path';
import { environment } from '../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { DialogAlertComponent } from '@cimb/mint';

@Component({
    selector: 'cimb-registration-layout',
    templateUrl: './registration-layout.component.html',
    styleUrls: ['./registration-layout.component.scss'],
})
export class RegistrationLayoutComponent implements OnDestroy, OnInit {
    cartData: any;
    private userObservable: Observable<any>;
    private subscription: Subscription;
    private userSubscription: Subscription;
    totalAmountVal = 0.00;
    totalFundsCountVal = 0;
    totalUnitVal = 0.00;
    flowText = 'topup';
    cartFooterToggle = true;
    showCartIconValue = true;
    users: any;
    userData: any;
    logoutParams: any;
    storeTransaction: any;
    currentRoute: any;
    userType: string;
    customerName = '';
    ipAddress: any;
    accountStatus: Observable<string>;
    headerLogoUrl = environment.apiUrl + environment.wealth + '/image/category/1';

    constructor(
        private store: Store<fromStore.AppState>,
        private router: Router,
        public location: Location,
        public dialog: MatDialog
    ) {
        this.currentRoute = location.path();
    }

    ngOnInit(): void {
        this.loadData();
        /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
        this.store.select(getClicksCustomerInfo).subscribe((clicks) => {
            this.ipAddress = clicks.ipAddress;
            this.userType = clicks.customerType;
            if (this.userType === 'NTP') {
                this.accountStatus = this.store.select(selectAccountStatus);
            }
        });

        this.userObservable = this.store.select('userReducer');
        /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
        this.userSubscription = this.userObservable.subscribe((users) => {
            this.users = users;
            this.userData = users.user;
            this.customerName = users?.customer_name ?? '';
        });
    }

    /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
    loadData(): boolean {
        this.userObservable = this.store.select('cartReducer');
        this.subscription = this.userObservable.subscribe((data) => {
            this.cartData = data;
            this.storeTransaction = this.cartData.storeTransaction;
            this.updateData(data);
        });

        return true;
    }

    updateData(data): boolean {
        /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
        if (data) {
            this.totalAmountVal = data?.totalAmount ?? 0.0;
            this.totalFundsCountVal = data?.fundList?.length ?? 0;
            this.flowText = data?.flow ? data.flow : '001';

            if (this.flowText == '002') {
                this.totalUnitVal = data.total_redemption_units;
            } else if (this.flowText == '003') {
                this.totalUnitVal = data.total_switch_out_units;
            } else {
                this.totalUnitVal = 0;
            }

            this.cartFooterToggle = data.cartFooterToggle;
            this.showCartIconValue = data.showCartIcon;
        }
        return true;
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    viewMyCartClick(): boolean {
        this.store.dispatch(new CartActions.ToggleCartFooter(false));
        this.store.dispatch(new CartActions.ToggleCartIconHeader(false));
        this.router.navigate(['/cart']);

        return true;
    }

    logoutEvent() {
        this.store.dispatch(new LogoutAction.LogoutTransaction());

        this.checkStoreTransansaction();
    }

    checkStoreTransansaction() {
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

    pageRedirectEvent(event): boolean {
        if (event === 'My Wealth Dashboard') {
            this.router.navigate(['/wealthdashboard']);
        } else if (event == 'Unit Trust') {
            const riskProfileStatus = this.users?.riskProfileStatus;

            if (riskProfileStatus === 'Expired') {
                this.openRiskProfile('<p> It’s been a year since your risk profile was updated. Please update now for us to recommend investments suitable to your current risk profile.</p>');
            } else if (riskProfileStatus === 'Not Profiled') {
                this.openRiskProfile('Incomplete profile. Please update now, for us to recommend investments suitable to your current risk profile.');
            } else {
                this.router.navigate([path.DASHBOARD]);
            }
        }
        return true;
    }

    openRiskProfile(dialogContent): boolean {
        const dialogRiskProfileStatus = this.dialog.open(DialogAlertComponent, {
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

        dialogRiskProfileStatus.afterClosed().subscribe((result) => {
            this.navigateOnclosePopup(result);
        });

        return true;
    }

    navigateOnclosePopup(result) {
        if (result === 'Proceed') {
            this.router.navigate(['/risk-profile/questions']);
        }
    }

}
