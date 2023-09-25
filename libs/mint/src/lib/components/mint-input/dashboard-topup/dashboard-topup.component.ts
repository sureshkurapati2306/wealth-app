import { DecimalPipe } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';

import { DialogAlertComponent } from '../../mint-dialog/dialog-alert/dialog-alert.component';
import { InputAmountKeyComponent } from '../input-amount-key/input-amount-key.component';
import { AnalyticService } from '@cimb/shared/services';
import { MintDialogService } from '../../mint-dialog';
import { EventService } from 'libs/core/src/lib/services/event/event.service';

@Component({
    selector: 'cimb-dashboard-topup',
    templateUrl: './dashboard-topup.component.html',
    styleUrls: ['./dashboard-topup.component.scss'],
})
export class DashboardTopupComponent implements OnInit, AfterViewInit, OnChanges {
    @Input() enableAddToCart = false;
    @Output() addToCart: EventEmitter<any> = new EventEmitter();
    @Output() removeFromCart: EventEmitter<any> = new EventEmitter();
    @Input() minimumAmount = 1;
    @Input() indexVal = 0;
    @Input() maximumAmount = 99999.99;
    @Input() fundStatus: any;
    @Input() disabled = false;
    @Input() card_amount = 0;
    @Input() fundName = null;
    @Input() cimbStaff: 1;
    @Input() item: any;
    @Input() salesChargesNonstaff = 0;
    @Input() salesChargeStaff = 0;
    @Input() cartFundCount = 0;
    @Input() flowText;
    @Output() clearAndAddNewToCart: EventEmitter<any> = new EventEmitter();
    @Input() redeemValue;
    @Input() clearAllData: Subject<boolean>;
    @Input() cartUTAccount = '';
    @Input() selectedAccount = '';
    @ViewChild(InputAmountKeyComponent) amountKeyInput: InputAmountKeyComponent;
    clearAllDataHoldingList: Subject<boolean> = new Subject();
    @Output() clearCartAndContinueEvent: EventEmitter<any> = new EventEmitter();
    @Output() selectAccountChange: EventEmitter<any> = new EventEmitter();
    @Output() updateAmountInCart: EventEmitter<any> = new EventEmitter();
    @Input() amlResult;
    salesCharge = 0;
    amountAdded = false;
    minimumPlaceHolder = '';
    selectedValue: number;
    currentValue = 0.0;
    amountForm: FormGroup;
    amountPlaceholder: string;
    cartList = [];
    cartListObject = null;
    amountEdit = false;
    placeHolderError = '';
    minError = '';
    maxError = '';
    holdingError = '';
    holding = '0.00';
    showMyrPrefix = false;

    constructor(
        private _eventService: EventService,
        private dialog: MatDialog,
        private formBuilder: FormBuilder,
        private cdr: ChangeDetectorRef,
        private decimalPipe: DecimalPipe,
        private analyticService: AnalyticService,
        private mintDialogService: MintDialogService
    ) {}


    ngOnChanges(changes: SimpleChanges) {
        if(changes?.selectedAccount) {
            this.ngOnInit();
        }
    }

    ngOnInit(): void {
        this._eventService.onReceivedError()?.subscribe(data => {
            const { fullRedeemPopUp } = data;
            if (fullRedeemPopUp) {
                this.amountAdded = false;
                this.showMyrPrefix = false;
                this.amountForm.reset()
            }
        });
        this.amountForm = this.formBuilder.group({
            amount: [''],
        });
        this.cartList = this.item?.cart_list ? this.item.cart_list : [];
        this.cartListObject = this.cartList.length > 0 ? this.cartList[0] : null;
        if (
            this.cartListObject &&
            this.cartListObject.cart_txn_type === '01' &&
            this.selectedAccount === this.cartUTAccount
        ) {
            const cartTotalInvestment =
                this.getRoundNumber(this.cartListObject?.cart_total_investment) ?? 0.0;
            const amount =
                cartTotalInvestment?.toString()?.indexOf('.') === -1
                    ? cartTotalInvestment?.toString() + '00'
                    : cartTotalInvestment?.toString()?.replace('.', '')?.replace(/,/g, '');
            const roundAmount = parseInt(amount);
            this.amountForm.controls.amount.setValue(roundAmount);
            this.amountAdded = true;
        } else {
            this.amountAdded = false;
            this.showMyrPrefix = false;
        }
        if (this.redeemValue) {
            this.amountForm.controls.amount.setValue('');
            this.amountAdded = false;
        }
        this.clearAllData?.subscribe((value) => {
            if (value) {
                this.amountForm.controls.amount.setValue('');
                this.amountAdded = false;
            }
        });
        this.amountPlaceholder = 'Min MYR ' + this.minimumAmount + '.00';
        this.holding = this.item?.holding?.toString()?.replace(/,/g, '');
        this.placeHolderError =
            'Min MYR  ' + this.getRoundNumber(this.item?.minimum_subsequent_subscription_amount);
        this.minError =
            'Minimum amount is MYR ' +
            this.getRoundNumber(this.item?.minimum_subsequent_subscription_amount);
        this.maxError =
            'Maximum amount is MYR ' +
            this.getRoundNumber(this.item?.maximum_subsequent_subscription_amount);
        this.holdingError = 'Exceed available Amount.';
    }

    getRoundNumber(num: number): string | null {
        return this.decimalPipe.transform(num, '1.2-2') ?? '0.00';
    }

    ngAfterViewInit() {
        this.cdr.detectChanges();
    }

    getErrorMessage() {
        if (this.amountForm.hasError('min')) {
            return 'Minimum amountForm is MYR ' + this.minimumAmount + '.';
        }

        return this.amountForm.hasError('max')
            ? 'Maximum amountForm is MYR ' + this.maximumAmount + '.'
            : '';
    }

    addToCartClick(indexVal) {
        if(!this.amlResult) {
            this.amountForm.reset();
            this.showMyrPrefix = false;
            this.dialog.open(DialogAlertComponent, {
                panelClass: 'custom-dialog',
                maxWidth: '600px',
                autoFocus: false,
                backdropClass: 'backdrop-modal',
                data: {
                    dialogHeading: 'Unable to Proceed',
                    dialogContent: '<p>We regret to inform that we are unable to process your application. Thank you for your interest.</p><p><strong>For assistance, please visit any CIMB branch.</strong></p>',
                    dialogButtonProceed: true,
                    dialogButtonProceedText: 'Close',
                    dialogImage: '<em class="icon-danger"></em>',
                },
              });
            return true;
        }
        const amountForm = this.amountForm?.controls?.amount?.value?.toString()?.replace(/,/g, '');
        const amountFormFormatted = this.amountForm?.controls?.amount?.value;
        this.currentValue = amountForm;

        try {
            if (
                this.fundStatus === 'SO' ||
                this.fundStatus === 'SOHO' ||
                this.fundStatus === 'HO'
            ) {
                this.amountAdded = false;
                this.amountForm.controls.amount.setValue(amountFormFormatted);
                this.addToCart.emit({
                    amount: amountForm,
                    amountForm: this.amountForm?.controls?.amount?.value,
                    index: indexVal,
                });
            } else {
                if (amountForm) {
                    const currentFlowText = 'topup';

                    if (
                        this.cartUTAccount &&
                        this.cartFundCount >= 1 &&
                        this.selectedAccount !== this.cartUTAccount
                    ) {
                        this.dialogCart({
                            amountForm: amountForm,
                            amount: amountForm,
                            index: indexVal,
                            flow: '001',
                            fund_code: this.item ? this.item.fund_code : '',
                        });
                    } else if (
                        this.flowText &&
                        this.cartFundCount >= 1 &&
                        currentFlowText !== this.flowText
                    ) {
                        this.pendingOtherTransactinCart(this.flowText, '001', {
                            amount: amountForm,
                            index: indexVal,
                            flow: '001',
                            fund_code: this.item ? this.item.fund_code : '',
                        });
                    } else {
                        if (parseFloat(amountForm) < this.minimumAmount) {
                            this.amountAdded = false;
                            this.amountForm.controls.amount.setValue(amountFormFormatted);
                        } else if (parseFloat(amountForm) > this.maximumAmount) {
                            this.amountAdded = false;
                            this.amountForm.controls.amount.setValue(amountFormFormatted);
                        } else {
                            this.amountAdded = true;
                            this.amountForm.controls.amount.setValue(amountFormFormatted);
                            this.addToCart.emit({
                                amount: amountForm,
                                index: indexVal,
                                flow: '001',
                                fund_code: this.item ? this.item.fund_code : '',
                            });
                        }
                    }
                }
            }
        } catch (error) {
            this.amountForm.controls.amount.setValue(amountFormFormatted);
        }
    }

    removeFromCartClick(values) {
        this.amountForm.reset();
        this.amountKeyInput.isFocus=false;
        this.amountAdded = false;
        this.removeFromCart.emit(values);
    }

    dialogRedemption() {
        const dialogRef = this.dialog.open(DialogAlertComponent, {
            panelClass: ['custom-dialog', 'dialog-inverse-button'],
            maxWidth: '600px',
            autoFocus: false,
            backdropClass: 'backdrop-modal',
            data: {
                dialogImage: '<em class="icon-danger"></em>',
                dialogHeading: 'Unable to Transact',
                dialogContent:
                    '<p>You already requested a <strong>full redemption</strong> for this fund which is currently under processing. Hence, no subsequent transaction could be performed.</p>',
                dialogButtonCancel: true,
                dialogButtonCancelText: 'Close',
                dialogButtonProceed: true,
                dialogButtonProceedText: 'View Transaction History',
            },
        });
        // Calling dialog Cart
        dialogRef.afterClosed().subscribe((result) => {
            if (result === 'proceed') {
                this.dialogCart(null);
            }
        });
    }

    dialogCart(values) {
                
        const dialogRef = this.mintDialogService.showPendingTransactionInOtherAccountDialog(this.cartUTAccount);
        dialogRef.afterClosed().subscribe((result) => {
            if (result === 'Yes, clear cart and continue') {
                this.amountAdded = true;
                this.clearAndAddNewToCart.emit(values);
                this.amountForm.controls.amount.setValue(this.currentValue);
            }
        });
    }

    removeModal() {
        const dialogRef = this.dialog.open(DialogAlertComponent, {
            panelClass: ['dialog-transaction-issue', 'dialog-inverse-button'],
            maxWidth: '600px',
            autoFocus: false,
            backdropClass: 'backdrop-modal',
            data: {
                dialogImage: '<em class="icon-warning">',
                dialogHeading: 'Are you sure?',
                dialogContent:
                    '<p>Do you really want to remove <strong>' +
                    this.fundName +
                    '</strong> from your cart?</p>',
                dialogButtonCancel: true,
                dialogButtonCancelText: 'Cancel',
                dialogButtonProceed: true,
                dialogButtonProceedText: 'Yes, Remove',
            },
        });

        dialogRef.afterClosed().subscribe((result) => {

            if (result === 'Yes, Remove') {
                this.removeFromCartClick({
                    index: this.indexVal,
                    fund_code: this.item ? this.item.fund_code : null,
                });
            }
        });
    }

    pendingOtherTransactinCart(previousFlow, currentFlow, values) {

        const dialogRef = this.mintDialogService.showPendingOtherTransactionInCartDialog(previousFlow, currentFlow);
        //Calling dialog Cart
        dialogRef.afterClosed().subscribe((result) => {
            if (result === 'Yes, clear cart and continue') {
                const amountFormFormatted = this.amountForm?.controls?.amount?.value;
                this.amountForm.controls.amount.setValue(amountFormFormatted);
                this.amountAdded = true;
                this.clearAndAddNewToCart.emit(values);
            }
        });
    }
    changeValueEvent(value) {
        if (this.amountAdded) {
            this.amountEdit = true;
        } else {
            this.amountEdit = false;
        }
    }

    doneClick() {
        const dialogRef = this.dialog.open(DialogAlertComponent, {
            panelClass: ['dialog-transaction-issue', 'dialog-inverse-button'],
            maxWidth: '600px',
            autoFocus: false,
            backdropClass: 'backdrop-modal',
            data: {
                dialogImage: '<em class="icon-warning">',
                dialogHeading: 'Are you sure?',
                dialogContent:
                    '<p>Do you really want to remove <strong>' +
                    this.fundName +
                    '</strong> Tracker from cart?</p>',
                dialogButtonCancel: true,
                dialogButtonCancelText: 'Cancel',
                dialogButtonProceed: true,
                dialogButtonProceedText: 'Yes, Remove',
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result === 'Yes, Remove') {
                // this.removeFromCartClick({
                //   index: this.indexVal,
                //   fund_code: this.item ? this.item.fund_code : null,
                // });
            }
        });
    }

    doneButtonClick() {
        const amountForm = this.amountForm?.controls?.amount?.value?.toString()?.replace(/,/g, '');
        this.updateAmountInCart.emit({
            amount: amountForm,
            flow: '001',
            fund_code: this.item ? this.item?.fund_code : null,
        });
        this.amountEdit = false;
    }
}
