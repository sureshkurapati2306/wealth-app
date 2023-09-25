import { DecimalPipe } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EventService } from '@cimb/core';
import {  MintDialogService } from '@cimb/mint';
import { AnalyticService } from '@cimb/shared/services';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FundList } from '../models/fund-list.model';
import { uploadFundDetailSuccess } from 'apps/self-serve/src/app/modules/available-funds/+state/available-funds.actions';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../../../../../apps/self-serve/src/app/core/state/reducers';
import * as LandingPageSelector from 'apps/self-serve/src/app/core/state/landing-page/landing-page.selectors';

@Component({
  selector: 'cimb-fund-list',
  templateUrl: './fund-list.component.html',
  styleUrls: ['./fund-list.component.scss']
})
export class FundListComponent implements OnInit {

  @Input() fund: FundList;

  @Input() perfMonthInd: string;

  @Input() cartUTAccount;

  @Input() selectedAccounts;

  @Input() staff: string;

  @Input() customerType?: string;

  @Output() addItem: EventEmitter<any> = new EventEmitter();

  @Output() clearAndAddNewToCart: EventEmitter<any> = new EventEmitter();

  @Output() removeItem: EventEmitter<any> = new EventEmitter();

  @Output() updateItem: EventEmitter<any> = new EventEmitter();

  productForm: FormGroup;

  isFocus = false;

  currentHoldingFlag: number;

  isAddedToCart = false;

  hasValue = false;

  isAmountRemoved = false;

  isAmountEdited = false;

  isAmountEnteredValid : boolean;

  minAmount: string;

  maxAmount: string;

  inputHasValue = false;

  isRowRefreshed = true;

  currentCustomerType = 'NTP';

  @ViewChild('toolTipFH') toolTipFH: TemplateRef<any>;

  @ViewChild('toolTipNavPrice') toolTipNavPrice: TemplateRef<any>;

  highlightedRow = '';

  private _unsubscribeAll: Subject<any> = new Subject<any>();


  @Input() index: number;

  @Input() fundHouse: string;

  constructor(
    private _fb: FormBuilder,
    private dialog: MatDialog,
    public _bottomSheet: MatBottomSheet,
    private decimalPipe: DecimalPipe,
    private _eventService: EventService,
    private router: Router,
    private analyticService: AnalyticService,
    private mintDialogService: MintDialogService,
    private store: Store<fromStore.AppState>,
  ) {

  }

  ngOnInit(): void {
 /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
    if(this.fund?.current_holding === 'Y') {
      this.currentHoldingFlag = <number><unknown>this.getRoundNumber(Number(this.fund?.minimum_subsequent_subscription_amount));
      this.minAmount = this.fund?.minimum_subsequent_subscription_amount_str;
      this.maxAmount = this.fund?.maximum_subsequent_subscription_amount_str;
    } else {

      this.currentHoldingFlag = <number><unknown>this.getRoundNumber(Number(this.fund?.minimum_initial_subscription_amount));
      this.minAmount = this.fund?.minimum_initial_subscription_amount_str;
      this.maxAmount = this.fund?.maximum_initial_subscription_amount_str;
    }

    this.productForm = this._fb.group({
      investmentAmount: [{value: this.fund?.totalInvestment ? this.fund?.totalInvestment : '', disabled: this.fund?.fund_status === 'I'},
        [
          Validators.required,
          this.amountMinExceed( this.fund?.current_holding === 'Y'
            ? this.fund?.minimum_subsequent_subscription_amount
            : this.fund?.minimum_initial_subscription_amount),

          this.amountMaxExceed( this.fund?.current_holding === 'Y'
            ? this.fund?.maximum_subsequent_subscription_amount
            : this.fund?.maximum_initial_subscription_amount)
        ]
      ],

    });

    //format number
    this.formatExistingValue(this.fund?.totalInvestment);

  }

  formatExistingValue(value: number) {

    if(value) {
      const number = this.getRoundNumber(value)
      const formattedNumber = number.toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')

      this.productForm.patchValue({
        investmentAmount: value ? formattedNumber : ''
      });

      this.inputHasValue = this.productForm.controls.investmentAmount.value ? true : false;

      if(this.inputHasValue) {
        this.isAmountRemoved = true;
        this.hasValue = true;
        this.isAmountEdited = false;
      }
    }
  }

 onAddItem(product, i) {
    if(this.customerType !== 'NTP' && this.cartUTAccount && (this.selectedAccounts !== this.cartUTAccount)) {
      this.dialogCart({
        productForm: this.productForm.controls.investmentAmount
      });
    } else {
      const formData = {
        ...product,
        investmentAmount: this.productForm.controls.investmentAmount.value
      }

      this.addItem.emit({formData});

      return this._eventService
        .onReceived()
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((event) => {
          const { index, addedToCart, fundHouse } = event;
            if (addedToCart && index === i && this.fundHouse.toLowerCase() === fundHouse.toLowerCase()) {
              this.hasValue = true;
              this.isAmountEdited = false;
              this.isAmountRemoved = true;
            }
           
        });

    }


  }
  onSelectRow(fund) {
    this.highlightedRow = fund?.fund_name;
  }

  onRemovedItem(product, i) {
    this.removeItem.emit({ product});

    this._eventService
      .onReceived()
      .subscribe((event) => {
          const { removedCart, index, fundHouse } = event;

          if (removedCart && index === i && this.fundHouse.toLowerCase() === fundHouse.toLowerCase()) {
            this.productForm.patchValue({
              investmentAmount: ''
            });
            this.hasValue = false,
            this.isAmountRemoved = false,
            this.isAmountEdited = false,
            this.highlightedRow = '';
            this.isFocus = false;
            this.isRowRefreshed = false;
          }
      });
  }

  onUpdateCart(fund) {
    const formData = {
      ...fund,
      investmentAmount: this.productForm.controls.investmentAmount.value
    };
    this.updateItem.emit({ formData });

    return this._eventService
        .onReceived()
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((event) => {
            const { updateCart } = event;
            if (updateCart) {
              this.hasValue = true;
              this.isAmountRemoved = true;
              this.isAmountEdited = false;
            }
        });
  }
  onInput() {

    if(this.inputHasValue) {
      this.hasValue = true;
      this.isAmountRemoved = false;
      this.isAmountEdited = true;
    }

  }
  onFocus() {
    const inputValue = this.productForm.controls.investmentAmount.value;
    if(!inputValue) {
      this.productForm.setValue({
        investmentAmount: '0.00'
      })
    }
    this.isFocus = true;
  }
  onFocusOut() {
    const inputVal = this.productForm.controls.investmentAmount.value;

    if(parseFloat(inputVal) === 0) {
      this.productForm.reset()
    }
    if (inputVal) {
        if (parseFloat(inputVal) === 0) {
         
          this.productForm.setValue({
            investmentAmount: null
          });
            this.isFocus = false;
        } else {
            this.isFocus = true;
        }
    }
     else {
        this.isFocus = false;
    }


  }
  onKeyDown() {
    const inputValue = this.productForm.controls.investmentAmount;
    this.isAmountEnteredValid = this.amountEnteredValid(inputValue)
}
  amountEnteredValid(inputValue) {
    if(inputValue.value == '0.00' || inputValue.value == '0.0' ||
        inputValue.value == '0.' || inputValue.value == '0' ||
        inputValue.value == '' || inputValue.value == '.00' ||
        inputValue.value == '00' || inputValue.value == '000'
      ) {
        return true
    }
  }
  onAmountEnter(event) {
    this.applyNumberFormatting(event)
    return true;

  }

  applyNumberFormatting(event) : boolean {

    if (this.hasValue) {
      this.isAmountRemoved = false;
      this.isAmountEdited = true;

    }

    if (this.isAmountEnteredValid && (event.keyCode === 8 || event.keyCode === 46))  {
      this.productForm.setValue({
        investmentAmount: '0.00'
      });
      return false;
    }

    const investmentAmountValue: any = this.productForm.controls.investmentAmount;

    if (!isNaN(parseFloat(investmentAmountValue.value))) {

        if (investmentAmountValue.dirty) {
          investmentAmountValue.markAllAsTouched();
        }
        if (parseFloat(investmentAmountValue.value) != 0) {
            if (
              investmentAmountValue.value.length > 4 &&
                parseFloat(
                  investmentAmountValue.value.substring(0, 5),
                ) === 0
            ) {
                if (
                    !isNaN(
                        parseFloat(
                          investmentAmountValue.value.slice(-2),
                        ),
                    )
                ) {
                  this.productForm.setValue({
                    investmentAmount: investmentAmountValue.value.slice(-2)
                  })
                }
            }

            if (

              investmentAmountValue
            ) {
                this.productForm.setValue(
                  {
                    investmentAmount: investmentAmountValue.value.replaceAll(
                      ',',
                      '',
                    )
                  }
                );
                this.productForm.setValue(
                  {
                  investmentAmount: investmentAmountValue.value.replaceAll(
                        '.',
                        '',
                    )
                  }
              );
            }
            this.callThousandCommaSeperatorAndTwoDecimal(investmentAmountValue);
        }
        else {
          this.productForm.setValue({
            investmentAmount: '0.00'
          })
        }
    }

    return true;
  }
  callThousandCommaSeperatorAndTwoDecimal(input) {
    if (
        input.value &&
        input.value.length >= 6
    ) {
        const last2 =input.value.slice(-2);
      input.setValue(
          input.value
                .slice(0, -2)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
                '.' +
                last2,
        );
    } else {
        if (parseFloat(input.value) > 0) {
            const val = (
              input.value / 100
            ).toString();
          input.setValue(
                parseFloat(val).toFixed(2).toString(),
            );
        } else {
          input.setValue(null);
        }
    }
  }

  dialogCart(values) {
    const dialogRef = this.mintDialogService.showPendingTransactionInOtherAccountDialog(this.cartUTAccount);
    dialogRef.afterClosed().subscribe((result) => {
        this.onDialogRefClose(result,values);
    });
  }
  onDialogRefClose(result,values) {
    if (result === 'Yes, clear cart and continue') {
        this.clearAndAddNewToCart.emit(values);
    }
  }
  openFundHolidayBottomSheet() {
    this._bottomSheet.open(this.toolTipFH, {
        panelClass: 'tooltip-action-sheet',
    });
  }
  getRoundNumber(num: number): string | null {
    return this.decimalPipe.transform(num, '1.2-2') ?? '0.00';
  }
  ValidateMinAmount(minAmount: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        if (control.value) {
            const val = control.value.replaceAll(',', '');
            if (!(parseFloat(val) >= minAmount)) {
                return { invalidMinAmount: true };
            }
        }
        return null;
    };
  }

  openNavBottomSheet() {
    this._bottomSheet.open(this.toolTipNavPrice, {
        panelClass: 'tooltip-action-sheet',
    });
  }

  acceptNumbersOnly(event) {
    const regex = new RegExp('^[0-9]*$');
    const str = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (regex.test(str)) {
      return true;
    }
    return false;
  }

  amountMinExceed(min: number): ValidatorFn  | null  {
    return (control: AbstractControl): ValidationErrors | null => {
      if(control && control.value){
        const value =  parseFloat(control.value.toString()?.replace(/,/g, '')) ;
        if ((value && min) &&  value < min)  {
          return { 'min': true }
        }
      }
    }
  }

  amountMaxExceed(max: number): ValidatorFn  | null  {
    return (control: AbstractControl): ValidationErrors | null => {
      if(control && control.value){
        const value =  parseFloat(control.value.toString()?.replace(/,/g, '')) ;
        if ((value && max) &&  value > max)  {
          return { 'max': true }
        }
      }
    }
  }

  showDetailPage(fund) {
    const fundRoute = fund;
    this.store.select(LandingPageSelector.selectLandingPageStatusState).subscribe((result) => {
        this.currentCustomerType = result?.landingPageStatus?.accountStatus === 'Y' || this.customerType === 'ETP' ? 'ETP' : 'NTP';
    });
    this.analyticService.loadAnalytisFundDetails(fundRoute, this.currentCustomerType);
    this.store.dispatch(uploadFundDetailSuccess({ fundDetail: JSON.parse(JSON.stringify(fundRoute)) }));
    this.router.navigate(['available-funds/fund-detail']);
  }

}


