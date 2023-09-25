import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MobileTooltipComponent } from '../../mint-action-sheets/mobile-tooltip/mobile-tooltip.component';
import { DecimalPipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogAlertComponent, MintDialogService } from '@cimb/mint';
import { InputAmountKeyComponent } from '../../mint-input/input-amount-key/input-amount-key.component';
import { AnalyticService } from '@cimb/shared/services';
import { Store } from '@ngrx/store';
import * as fromStore from 'apps/self-serve/src/app/core/state/reducers';
import { Store as UserState } from 'apps/self-serve/src/app/core/state/user/user.reducer';
import * as LandingPageSelector from 'apps/self-serve/src/app/core/state/landing-page/landing-page.selectors';
import { LandingPageStatus } from 'apps/self-serve/src/app/core/model/landing-page-status.model';
import { Observable, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
    selector: 'cimb-card-fund-invest',
    templateUrl: './card-fund-invest.component.html',
    styleUrls: ['./card-fund-invest.component.scss'],
})
export class CardFundInvestComponent implements OnInit {
    @Input() price: number;
    @Input() isFundHoliday: boolean;
    amountForm: FormGroup;
    amountPlaceholder: string;
    placeHolderError = '';
    minError = '';
    maxError = '';
    amountAdded = false;
    amountEdit = false;
    soSohoFund = false;
    @Input() closeDate: string;
    @Input() selectedFund;
    @Input() cartFundCount;
    @Input() cartUTAccount;
    @Input() selectedAccounts;
    @Input() cartAmount;
    @Input() cartData: any = null;
    @Input() enableAddToCart = true
    @Input() enableAddToCartRedeem = true

    @Output() addToCart: EventEmitter<any> = new EventEmitter();
    @Output() removeFromCart: EventEmitter<any> = new EventEmitter();
    @Output() updateAmountInCart: EventEmitter<any> = new EventEmitter();
    @Output() clearAndAddNewToCart: EventEmitter<any> = new EventEmitter();
    @ViewChild(InputAmountKeyComponent) amountKeyInput: InputAmountKeyComponent;
    currentValue = 0.0;
    flowText = '1';
    minimumAmount;
    maximumAmount;
    fundStatus;
    minAmount;
    maxAmount;
    totalAmountChange;
    userObservable :Observable<any>;
    userSubscription : Subscription;
    userData: UserState;
    showProgressBar = false;
    landingPageStatus: LandingPageStatus;
    _unsubscribeAll: Subject<void> = new Subject<void>();
    constructor(
        private _bottomSheet: MatBottomSheet,
        private formBuilder: FormBuilder,
        private decimalPipe: DecimalPipe,
        private dialog: MatDialog,
        private analyticService: AnalyticService,
        private mintDialogService: MintDialogService,
        private store: Store<fromStore.AppState>,
    ) {}
    
    ngOnInit(): void {
        this.userObservable = this.store.select('userReducer');

        this.userSubscription = this.userObservable.pipe(takeUntil(this._unsubscribeAll)).subscribe((users) => {
            this.userData = users;

        });
        this.store.select(LandingPageSelector.selectLandingPageStatus).pipe(takeUntil(this._unsubscribeAll)).subscribe((result) => {
            this.landingPageStatus = result;
            if((this.userData.userType === 'NTP' && this.landingPageStatus.landingStatus === 'Y') || this.userData.userType === 'ETP') {
                this.showProgressBar = true
            }
        });
        this.amountForm = this.formBuilder.group({
            amount: [''],
        });
        if(this.selectedFund.fund_status === 'SO' || this.selectedFund.fund_status === 'SOHO') {
            this.soSohoFund = true;
        }
        if (this.selectedFund.current_holding == 'Y') {
            this.placeHolderError =
                'Min MYR  ' +
                this.getRoundNumber(this.selectedFund?.minimum_subsequent_subscription_amount);

            this.minAmount = this.getRoundNumber(
                this.selectedFund?.minimum_subsequent_subscription_amount,
            );
            this.maxAmount = this.getRoundNumber(
                this.selectedFund?.maximum_subsequent_subscription_amount,
            );

            this.minError =
                'Minimum amount is MYR ' +
                this.getRoundNumber(this.selectedFund?.minimum_subsequent_subscription_amount);
            this.maxError =
                'Maximum amount is MYR ' +
                this.getRoundNumber(this.selectedFund?.maximum_subsequent_subscription_amount);
        } else {
            this.placeHolderError =
                'Min MYR  ' +
                this.getRoundNumber(this.selectedFund?.minimum_initial_subscription_amount);

            this.minAmount = this.getRoundNumber(
                this.selectedFund?.minimum_initial_subscription_amount,
            );
            this.maxAmount = this.getRoundNumber(
                this.selectedFund?.maximum_initial_subscription_amount,
            );

            this.minError =
                'Minimum amount is MYR ' +
                this.getRoundNumber(this.selectedFund?.minimum_initial_subscription_amount);
            this.maxError =
                'Maximum amount is MYR ' +
                this.getRoundNumber(this.selectedFund?.maximum_initial_subscription_amount);
        }

        const cartAmt = this.getRoundNumber(this.cartAmount)
            ? this.getRoundNumber(this.cartAmount).toString().replace(/,/g, '').replace('.', '')
            : 0.0;

        if (this.cartAmount != 0) {
            this.amountForm.controls.amount.setValue(cartAmt);
            this.amountAdded = true;
        }
    }

    getRoundNumber(num: number): string | null {
        return this.decimalPipe.transform(num, '1.2-2') ?? '0.00';
    }

    openBottomSheet(): void {
        this._bottomSheet.open(MobileTooltipComponent, {
            panelClass: 'tooltip-action-sheet',
            data: {
                actionHeading: 'NAV Price',
                actionContent:
                    '<p>Net Asset Value (NAV) price tells you how much one unit of a fund is worth as of the stated date.</p>',
            },
        });
    }

    changeValueEvent(value) {
        if (this.amountAdded) {
            this.amountEdit = true;
        } else {
            this.amountEdit = false;
        }
    }

    addToCartClick(indexVal) {
        const amountForm = this.amountForm?.controls?.amount?.value?.toString()?.replace(/,/g, '');
        const amountFormFormatted = this.amountForm?.controls?.amount?.value;

        this.currentValue = amountForm;

        try {
            if (this.fundStatus === 'SO') {
                this.amountAdded = false;
                this.amountForm.controls.amount.setValue(amountFormFormatted);
                this.addToCart.emit({
                    amount: amountForm,
                    amountForm: this.amountForm?.controls?.amount?.value,
                    index: indexVal,
                });
            } else {
                if (amountForm) {
                    if (this.cartUTAccount && this.selectedAccounts !== this.cartUTAccount) {
                        this.updateDialogCart(amountForm, amountFormFormatted, indexVal);
                    }
                    //Just see whether this need to be used
                    //}
                    //  else if (
                    //     this.flowText &&
                    //     this.cartFundCount >= 1 &&
                    //     currentFlowText !== this.flowText
                    // ) {
                    //     this.pendnigOtherTransactinCart(this.flowText, '001', {
                    //         amount: amountForm,
                    //         index: indexVal,
                    //         flow: '001',
                    //         fund_code: this.selectedFund ? this.selectedFund.fund_code : '',
                    //     });
                    // }
                    else if(this.cartData.flow !== '001' && this.cartData.fundList.length) {
                        //there are other items in cart not belonging to the same flow, show confirmation dialog
                        this.pendingOtherTransactinCart(this.cartData.flow, {
                            amountFormFormatted: amountFormFormatted,
                            amount: amountForm,
                            index: indexVal,
                            flow: '001',
                            fund_code: this.selectedFund ? this.selectedFund.fund_code : '',
                        });
                    }
                    else {
                        this.updateAmountForm(amountForm, amountFormFormatted, indexVal);
                    }
                }
            }
        } catch (error) {
            this.amountForm.controls.amount.setValue(amountFormFormatted);
        }
    }

    updateDialogCart(amountForm, amountFormFormatted, indexVal) {
        this.openDialogCart({
            amountFormFormatted: amountFormFormatted,
            amount: amountForm,
            index: indexVal,
            flow: '001',
            fund_code: this.selectedFund ? this.selectedFund.fund_code : '',
        });
    }

    updateAmountForm(amountForm, amountFormFormatted, indexVal) {
        if (
            parseFloat(amountForm) < this.selectedFund.minimum_subsequent_subscription_amount ||
            parseFloat(amountForm) > this.selectedFund.maximum_subsequent_subscription_amount
        ) {
            this.amountAdded = false;
            this.amountForm.controls.amount.setValue(amountFormFormatted);
        } else {
            this.amountAdded = true;
            this.amountForm.controls.amount.setValue(amountFormFormatted);
            this.addToCart.emit({
                amount: amountForm,
                index: indexVal,
                flow: '001',
                fund_code: this.selectedFund ? this.selectedFund.fund_code : '',
            });
        }
    }

    openDialogCart(values) {
        const dialogRef = this.mintDialogService.showPendingTransactionInOtherAccountDialog(this.cartUTAccount);
        //Calling dialog Cart
        dialogRef.afterClosed().subscribe((response) => {
            this.clearCartSetValue(response, values);
        });
    }

    pendingOtherTransactinCart(previousFlow, values) {
        const dialogRef = this.mintDialogService.showPendingOtherTransactionInCartDialog(previousFlow, '001');
        //Calling dialog Cart
        dialogRef.afterClosed().subscribe((response) => {
            this.clearCartSetValue(response, values);
        });
    }

    clearCartSetValue(response, values){
        if (response === 'Yes, clear cart and continue') {   
            this.amountForm.controls.amount.setValue(values.amountFormFormatted);
            this.clearAndAddNewToCart.emit(values);
            this.amountAdded = true;
        }
    }

    removeDialogModal() {
        const dialogReference = this.dialog.open(DialogAlertComponent, {
            maxWidth: '600px',
            panelClass: ['dialog-transaction-issue', 'dialog-inverse-button'],
            backdropClass: 'backdrop-modal',
            autoFocus: false,

            data: {
                dialogHeading: 'Are you sure?',
                dialogImage: '<em class="icon-warning">',
                dialogButtonCancel: true,
                dialogButtonProceed: true,
                dialogButtonProceedText: 'Yes, Remove',
                dialogContent:
                    '<p>Do you really want to remove <strong>' +
                    this.selectedFund.fund_name +
                    '</strong> from your cart?</p>',

                dialogButtonCancelText: 'Cancel',
            },
        });

        dialogReference.afterClosed().subscribe((response) => {
            if (response === 'Yes, Remove') {
                this.removeFromCartClick({
                    fund_code: this.selectedFund ? this.selectedFund.fund_code : null,
                    index: '1',
                });
            }
        });
    }

    removeFromCartClick(values) {
        this.amountForm.reset();
        this.amountAdded = false;
        this.amountKeyInput.isFocus = false;
        this.removeFromCart.emit(values);
    }

    doneButtonClick() {
        const amountForm = this.amountForm?.controls?.amount?.value?.toString()?.replace(/,/g, '');
        this.updateAmountInCart.emit({
            amount: amountForm,
            flow: '001',
            fund_code: this.selectedFund ? this.selectedFund?.fund_code : null,
        });
        this.amountEdit = false;
    }

    ngOnDestroy(): void {
        this.dialog.closeAll();
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
