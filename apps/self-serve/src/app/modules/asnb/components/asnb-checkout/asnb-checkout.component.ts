import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable, Subscription } from 'rxjs';
import {
    getCheckoutSOWSOF,
    getCheckoutBankAccounts,
    getCheckoutPurchaseSummary,
    getCheckoutAccountDetails,
    getMembership,
    getCheckout,
    getCheckoutError,
    getExternalUrlList,
    getPurchaseFavouriteDetails,
} from '../../+state/asnb.selectors';
import * as AsnbActions from '../../+state/asnb.actions';
import { first, tap } from 'rxjs/operators';
import {
    CartAccountDetails,
    CartPurchaseSummary,
    CartSource,
    AsnbAccountListingResponse,
    AsnbCardDetail,
    AsnbPurchaseFavouriteSummary,
} from '../../models';
import { BankAccount } from '../../../../core/model/customerDetail.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogAlertComponent } from 'libs/mint/src/lib/components/mint-dialog/dialog-alert/dialog-alert.component';
import { CardPaymentAccountComponent } from 'libs/mint/src/lib/components/mint-card/card-payment-account/card-payment-account.component';
import { DialogAsnbRedirectionComponent } from 'libs/mint/src/lib/components/mint-dialog/dialog-asnb-redirection/dialog-asnb-redirection.component';

import * as fromStore from '../../../../core/state/reducers';
import { AppService } from '../../../../core/services/app.service';
import { AsnbService } from '../../services/asnb.service';
import { LogoutDialogService } from '../../services/logout-dialog.service';

@Component({
    selector: 'cimb-asnb-checkout',
    templateUrl: './asnb-checkout.component.html',
    styleUrls: ['./asnb-checkout.component.scss'],
})
export class AsnbCheckoutComponent implements OnInit, OnDestroy {
    pageTitle = 'Checkout';

    membershipSubscription$: Subscription;
    membership = { name: '', id: '' };

    isBackButtonEnabled = true;
    currentUrl: string;
    noProgressStep: boolean;

    bankAccountSubscription$: Subscription;

    bankAccountList: Partial<BankAccount>[] = [];

    cardAccountSelectionPlaceholder = 'Select Payment Account';

    selectedAccountIndex = -1;

    card1Title = 'Select Payment Account';

    disableConfirmButtonComponent = false;

    customerMobileNumber = null;

    tagErrorShow = false;

    factaEnabled = true;

    tagErrorMessageText = '';

    accountSelected = false;

    tagEntredCompleted = false;

    requestTagCanEnabled = false;

    enableRequestNumber = false;

    schedulerMsg = '';

    cartPurchaseSummarySubscription$: Subscription;

    cartPurchaseFundName: string;

    cartPurchaseFundCategory: string;

    totalSalesCharge: string | number;

    totalNetInvestmentAmount: string | number;

    totalBankcharge: number | string;

    cartAccountDetails$: Subscription;

    accountName: string;

    asnbMembershipNumber: string | number;

    membershipType: string;

    idNumber: string | number;

    relationship: string;

    reason: string;

    cartSource$: Subscription;

    sof: string;

    sow: string;

    flow = '003';
    showFactaInlineError = true;

    userObservable: Observable<any>;
    checkoutErrorSubscription: Subscription;
    userSubscription: Subscription;
    userDataObj: any;
    showTacError: boolean;
    tacErrorMessageText: string;

    purchaseFavouriteDetails: AsnbPurchaseFavouriteSummary;
    purchaseReason: string;

    sourceDetails: AsnbCardDetail[] = [];
    thirdPartyDetails: AsnbCardDetail[] = [];

    @ViewChild(CardPaymentAccountComponent) childComponent: CardPaymentAccountComponent;
    fatcaEnabled = false;

    bankAccountNumber: string;
    accountType: string;
    bankId: number;
    customerBankAccountInfo: AsnbAccountListingResponse = {
        accounts: null,
    };

    otpTransactionId: string;
    verifyAttempt = 0;

    prospectusLink = '';
    fundPriceLink = '';

    isFavouritePurchase = false;

    constructor(
        private appService: AppService,
        private asnbService: AsnbService,
        private logoutDialogService: LogoutDialogService,
        private router: Router,
        private store: Store<fromStore.AppState>,
        public dialog: MatDialog,
    ) {
        this.currentUrl = this.appService.getPreviousUrl();
    }

    ngOnInit(): void {
        this.store.dispatch(AsnbActions.loadCheckoutBankAccount());
        this.store.dispatch(AsnbActions.loadCheckoutPurchaseSummary());
        this.store.dispatch(AsnbActions.loadCheckoutAccountDetails());
        this.store.dispatch(AsnbActions.loadCheckoutSource());

        this.getBankAccounts();
        this.getCartPurchaseSummary();
        this.getCartAccountDetails();
        this.getCartSource();
        this.loadData();
        this.getMembershipDetails();

        this.store.select(getPurchaseFavouriteDetails).subscribe((data) => {
            this.purchaseFavouriteDetails = {
                beneName: data.beneName,
                beneClientId: data.beneClientId.replace(
                    /(\d{4})(\d{2})(\d{2})(\d{4})/,
                    '$1-$2-$3-$4',
                ),
                relationship: data.relationship,
                memberIdType: data.memberIdType,
                asnbAccountNo: data.asnbAccountNo.replace(/(\d{4})(\d{4})(\d{4})/, '$1 $2 $3'),
                transId: data?.transId,
            };
        });

        this.store.select(getCheckout).subscribe((data) => {
            if (data.favouriteDetails) {
                this.isFavouritePurchase = true;
            }

            this.purchaseReason = data.favouriteDetails?.reasonOfTransferValue;
            if (data.sof) {
                this.sourceDetails.push({
                    label: 'Source of funds',
                    value: data.sof.id === 'OTH' ? `Others - ${data.sof.value}` : data.sof.value,
                });
            }

            if (data.sow) {
                this.sourceDetails.push({
                    label: 'Source of wealth',
                    value: data.sow.id === 'OTH' ? `Others - ${data.sow.value}` : data.sow.value,
                });
            }
        });

        this.store.select(getExternalUrlList).subscribe((data) => {
            if (data.prospectus) this.prospectusLink = data.prospectus;
            if (data.fundPrice) this.fundPriceLink = data.fundPrice;
        });
    }

    loadData(): void {
        this.userObservable = this.store.select('userReducer');
        this.userSubscription = this.userObservable.subscribe((users) => {
            this.loadUserData(users);
        });

        this.checkoutErrorSubscription = this.store
            .select(getCheckoutError)
            .pipe()
            .subscribe((data) => {
                if (data.status === 'error' && this.verifyAttempt > 2) {
                    this.handleOTPError(data.error);
                    this.logoutDialogService.openDialogAndLogout(this.userDataObj);
                } else if (data.status === 'error') {
                    this.handleOTPError(data.error);
                }
            });
    }
    loadUserData(users): void {
        this.userDataObj = users.user;
        this.customerMobileNumber = this.userDataObj?.customer_mobile_no
            ? this.userDataObj?.customer_mobile_no
            : null;
    }

    backButtonEvent() {
        if (this.currentUrl === '/dashboard;tab=0') {
            this.currentUrl = '/dashboard';
        }
        this.router.navigate([this.currentUrl]);
    }

    getMembershipDetails() {
        this.membershipSubscription$ = this.store.select(getMembership).subscribe((data) => {
            this.membership.name = data.name;
            this.membership.id = data.unitHolderId;
        });
    }

    getBankAccounts() {
        this.bankAccountSubscription$ = this.store
            .select(getCheckoutBankAccounts)
            .subscribe((data) => {
                this.bankAccountList = data;
            });
    }

    confirmAndProceed(event: string): boolean {
        if (event) {
            this.verifyAttempt += 1;
            this.store
                .select(getCheckout)
                .pipe(first())
                .subscribe((data) => {
                    this.store.dispatch(
                        AsnbActions.createSubscription({
                            payload: {
                                stageTableId: data.stageTableId,
                                otp: event,
                                bankAccountNumber:
                                    this.customerBankAccountInfo.accounts.casa_account_no,
                                acctType: this.customerBankAccountInfo.accounts.acctType,
                                bankId: this.customerBankAccountInfo.accounts.bankId,
                                transactionId: this.otpTransactionId,
                            },
                        }),
                    );
                });
        }
        return true;
    }

    fatcaDeclaratonEvent(): void {
        this.router.navigate(['/asnb-dashboard']);
        if (this.isFavouritePurchase) {
            this.asnbService.updateTabIndex(1);
        }
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

    handleOTPError(error: string): void {
        if (error === 'ALREADY_REQUESTED') {
            this.showTacError = true;
            this.tacErrorMessageText =
                'Already requested TAC, please check your registered mobile for TAC.';
        } else if (error === 'INVALID_REQUEST') {
            this.showTacError = true;
            this.tacErrorMessageText =
                'Your SMS TAC has expired. Please request and submit a new one';
        } else if (error === 'INVALID_OTP') {
            this.showTacError = true;
            this.tacErrorMessageText = 'SMS TAC entered was invalid. Please check and try again.';
        }
    }

    tagEntredCompletedEvent(value): void {
        this.tagEntredCompleted = value;
    }

    requestTagCanEnableEvent(value): boolean {
        this.requestTagCanEnabled = value;

        return true;
    }

    accountSelectedEvent(event) {
        this.customerBankAccountInfo.accounts = event;
        if (event.isSufficientAmount === false) {
            const dialogRef = this.dialog.open(DialogAlertComponent, {
                panelClass: ['dialog-pending-cart', 'dialog-inverse-button'],
                maxWidth: '600px',
                autoFocus: false,
                backdropClass: 'backdrop-modal',
                data: {
                    dialogImage:
                        '<img src="assets/images/insufficient-balance-icon.svg" alt="insufficient-balance-icon" class="insufficient-balance-icon"/>',
                    dialogHeading: 'Insufficient Balance',
                    dialogContent:
                        '<p class="asnb-checkout-message">We’re sorry, you have insufficient balance in the account selected. Please top-up to continue your investment.</p>',
                    dialogButtonCancel: false,
                    dialogButtonCancelText: 'Close',
                    dialogButtonProceed: true,
                    dialogButtonProceedText: 'Okay',
                },
            });

            dialogRef.afterClosed().subscribe(() => {
                this.childComponent.account.setValue('');
            });
        } else {
            this.accountSelected = true;
        }
    }

    getCartPurchaseSummary() {
        this.cartPurchaseSummarySubscription$ = this.store
            .select(getCheckoutPurchaseSummary)
            .pipe(
                tap((data: CartPurchaseSummary) => {
                    this.cartPurchaseFundName = data.name;
                    this.cartPurchaseFundCategory = data.category;
                    this.totalBankcharge = data.total_bank_charge;
                    this.totalSalesCharge = data.total_sales_charge;
                    this.totalNetInvestmentAmount = data.total_net_investment_amount;
                }),
            )
            .subscribe();
    }

    getCartAccountDetails() {
        this.cartAccountDetails$ = this.store
            .select(getCheckoutAccountDetails)
            .pipe(
                tap((data: CartAccountDetails) => {
                    this.accountName = data.name;
                    this.asnbMembershipNumber = data.asnb_membership_number;
                    this.membershipType = data.membership_id_type;
                    this.idNumber = data.id_number;
                    this.relationship = data.relationship;
                    this.reason = data.reason;
                }),
            )
            .subscribe();
    }

    getCartSource() {
        this.cartSource$ = this.store
            .select(getCheckoutSOWSOF)
            .pipe(
                tap((data: CartSource) => {
                    this.sof = data.source_of_funds;
                    this.sow = data.source_of_wealth;
                }),
            )
            .subscribe();
    }

    fatcaToggleEvent(event: boolean) {
        this.fatcaEnabled = event;
    }

    redirectConfirmation(url: string): void {
        this.dialog.open(DialogAsnbRedirectionComponent, {
            backdropClass: 'asnb-redirection',
            data: {
                url: url,
            },
        });
    }

    ngOnDestroy(): void {
        this.bankAccountSubscription$.unsubscribe();
        this.cartPurchaseSummarySubscription$.unsubscribe();
        this.cartAccountDetails$.unsubscribe();
    }
}
