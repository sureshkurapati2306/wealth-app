import { DecimalPipe } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
  SimpleChanges
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatSliderChange } from '@angular/material/slider';
import { AnalyticService } from '@cimb/shared/services';
import { Subject } from 'rxjs';
import { EventService } from '@cimb/core';

import { MobileTooltipComponent } from '../../mint-action-sheets/mobile-tooltip/mobile-tooltip.component';
import { MintDialogService } from '../../mint-dialog';
import { DialogAlertComponent } from '../../mint-dialog/dialog-alert/dialog-alert.component';

@Component({
  selector: 'cimb-dashboard-redeem-value',
  templateUrl: './dashboard-redeem-value.component.html',
  styleUrls: ['./dashboard-redeem-value.component.scss'],
})
export class DashboardRedeemValueComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() enableAddToCart = false;
  @Input() unit: number;
  @Input() salesCharge = 0;
  @Input() indicativeDate;
  @Input() indexVal = 0;
  @Input() item: any;
  @Output() addToCart: EventEmitter<any> = new EventEmitter();
  @Output() removeFromCart: EventEmitter<any> = new EventEmitter();
  @Output() redeemSliderValueChange: EventEmitter<any> = new EventEmitter();
  @Input() averageNavPrice = 0;
  @Input() checkboxLabel: string;
  @Input() disabled: boolean;
  @Input() cardUnit = 0;
  @Input() dataItem;
  @Input() fundName = null;
  @Input() maximumUnit = 99999999999999999;
  @Input() minimumUnit = 0;
  @Input() sliderStep = 1;
  @Input() navPrice;
  @Input() cartFundCount = 0;
  @Input() flowText;
  @Input() topupValue;
  @Output() clearAndAddNewToCart: EventEmitter<any> = new EventEmitter();
  @Output() clearOtherTransactions: EventEmitter<any> = new EventEmitter();
  @Input() clearAllData: Subject<boolean>;
  @Input() cartUTAccount = '';
  @Input() selectedAccount = '';
  @Input() clearAllDataHoldingLists: Subject<boolean>;
  clearAllDataHoldingList: Subject<boolean> = new Subject();
  @Output() clearCartAndContinueEvent: EventEmitter<any> = new EventEmitter();
  @Output() selectAccountChange: EventEmitter<any> = new EventEmitter();
  @Input() showAmountToFund = false;
  @Input() foreignerInd = 'N';
  @Input() occupationInd = 'N';
  @Input() amlResult;
  indicativeAmount = 0;
  @ViewChild('redeemAllCheckbox') redeemAllCheckbox: ElementRef;
  middleAmount: number;
  minMessage = '';
  indicativeAmountDisplay = 0;
  amountAdded = false;
  redeemInput: number;
  sliderValue: number;
  value = 0;
  isRedeemAll: boolean;
  // ampunt key input form
  amountForm: FormGroup;

  amount = new FormControl();
  maximumUnitSlider = 0;
  minimumUnitSlider = 0;
  cartList = [];
  @Input() cartListObject = null;
  maxMessage = '';
  minPlaceHolder = '';
  exceedMessage = '';
  amountEdit = false;
  checked = false;
  disableSlider = false;
  disableCheckbox = false;

  @Output() updateCartDataInRedeem: EventEmitter<any> = new EventEmitter();


  constructor(
    private dialog: MatDialog,
    private _bottomSheet: MatBottomSheet,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private decimalPipe: DecimalPipe,
    private analyticService: AnalyticService,
    private mintDialogService: MintDialogService,
    public _eventService: EventService
  ) { }
  ngOnInit(): void {
    this._eventService.onReceivedError()?.subscribe(data => {
      const { fullRedeemPopUp } = data;
      if (fullRedeemPopUp) {
        this.amountAdded = false;
        this.sliderValue = 0;
        this.indicativeAmount = 0;
        this.isRedeemAll = false;
        this.amountForm.reset()
        if (this.redeemAllCheckbox) {
          this.redeemAllCheckbox['checked'] = false;
        }
      }
    });
    this.amountForm = this.formBuilder.group({
      amount: [''],
    });
    this.amountAdded = false;

    this.clearAllData?.subscribe((value) => {
      if (value) {
        this.amountForm.controls.amount.setValue('');
        this.sliderValue = 0;
        this.indicativeAmount = 0;
        this.amountAdded = false;
      }
    });
    if (!this.sliderStep || this.sliderStep && this.sliderStep < 1) {
      this.sliderStep = 1;
    }
    this.loadDate();
  }


  ngOnChanges(changes: SimpleChanges) {
    if(changes && changes.selectedAccount) {
      this.ngOnInit();
  }
  }
  ngAfterViewInit() {
    this.cdr.detectChanges();
  }


  redeemValueChange(redeemInput): void {
    if (redeemInput && redeemInput.target && redeemInput.target.value) {
      this.sliderValue = redeemInput.target.value;
      //Enable redeemAll checkbox when max unit is triggered in the slider
      if (this.sliderValue == this.maximumUnit) {
        this.isRedeemAll = true;
      } else {
        this.isRedeemAll = false;
      }
      this.indicativeAmount = redeemInput.target.value * this.navPrice;
    } else {
      this.indicativeAmount = 0.0;
    }
  }

  calculateIndicativeRate(redeemInput): void {
    if (redeemInput) {
      this.indicativeAmount = redeemInput * this.navPrice;
    }
  }

  loadDate() {
    if (this.item) {
      const units_held_number = this.item.units_held_number ? this.item.units_held_number : this.item.unit_held;
      this.calculateIndicativeRate(this.amountForm?.controls?.amount?.value);
      this.indicativeAmountDisplay = this.indicativeAmount ? this.indicativeAmount : 0.00;

      if (this.disabled) {
        this.amountForm.controls.amount.disable();
      }

      this.amountForm = this.formBuilder.group({
        amount: [''],
      });

      //   this.amount = new FormControl('', [
      //     Validators.required,
      //     Validators.min(this.minimumUnit),
      //     Validators.max(this.maximumUnit),
      //     redemptionUnitsExceed(units_held_number, this.maximumUnit),
      //   ]);
      // this.maximumUnit = parseFloat(this.maximumUnit);
      // this.minimumUnit = parseFloat(this.minimumUnit);

      this.maximumUnitSlider = units_held_number ? parseFloat(units_held_number.toString().replace(/,/g, '')) : 0.00;
      if (units_held_number) {
        const u =  parseFloat(units_held_number.toString().replace(/,/g, ''));
        this.middleAmount = u / 2;
      }

      this.sliderStep = this.maximumUnitSlider / 10;

      this.cartList =
        this.item && this.item.cart_list ? this.item.cart_list : [];
      if (this.cartListObject &&
        this.cartListObject.cart_txn_type === '02' &&
        this.selectedAccount === this.cartUTAccount && (this.showAmountToFund || this.cartListObject.cart_total_redem)
      ) {
        const formatedCartRedemAmount = this.getRoundNumber(this.cartListObject?.cart_total_redem);
        const redeemUnit = formatedCartRedemAmount ? parseFloat(formatedCartRedemAmount?.toString().replace(/,/g, '')) : 0.00;

        this.amountForm.controls.amount.setValue(formatedCartRedemAmount);
        //this.sliderValue = cartRedemAmount;
        const formatedIndicativeAmount = this.getRoundNumber(this.cartListObject?.cart_redem_amount);
        const formatedCartTotalInvestment = this.getRoundNumber(this.cartListObject?.cart_total_investment);
        this.indicativeAmount = this.cartListObject?.cart_total_investment >= 1 ? parseFloat(formatedCartTotalInvestment.toString().replace(/,/g, '')) : parseFloat(formatedIndicativeAmount.toString().replace(/,/g, ''));
        this.amountAdded = true;
        this.value = redeemUnit;
        this.redeemInput = redeemUnit;
        this.sliderValue = redeemUnit;

        //Enable redeemAll checkbox when max unit is triggered in the slider
        if (redeemUnit === this.maximumUnitSlider) {
          this.isRedeemAll = true;
          if (this.redeemAllCheckbox) {
            this.redeemAllCheckbox['checked'] = true;
          }

        } else {
          this.isRedeemAll = false;
          if (this.redeemAllCheckbox) {
            this.redeemAllCheckbox['checked'] = false;
          }
        }
      } else {
        this.amountAdded = false;
      }
      this.minPlaceHolder = 'Min ' + this.minimumUnit + ' units';
      this.minMessage = 'Minimum redemption is ' + this.getRoundNumber(this.minimumUnit) + ' units.';
      this.maxMessage = 'Maximum redemption is ' + this.getRoundNumber(this.maximumUnit) + ' units.';
      this.exceedMessage = 'Exceed available units.';
    }

    if (this.topupValue) {
      this.amountForm.controls.amount.setValue('');
      this.sliderValue = 0;
      this.indicativeAmount = 0;
      this.amountAdded = false;
    }
  }

  getErrorMessage() {
    if (this.amountForm.controls.amount.hasError('min')) {
      return 'Minimum redemption is ' + this.minimumUnit + ' unit.';
    } else if (
      this.amountForm.controls.amount.hasError('redemptionUnitsExceed') &&
      this.amountForm.controls.amount.value < this.maximumUnit
    ) {
      return 'Exceed available units.';
    }
    return this.amountForm.controls.amount.hasError('max')
      ? 'Maximum redemption is ' + this.maximumUnit + ' units.'
      : '';
  }

  changeValueEvent(events) {
    let value = 0.00;
    if (typeof this.navPrice === 'string') {
      // it's a string
      this.navPrice = parseFloat(this.navPrice);
    }
    const amountValue = this.amountForm.controls?.amount?.value;
    if (amountValue) {
      value = parseFloat(amountValue.toString().replace(/,/g, ''));
      if (value) {
        this.sliderValue = value;
        this.indicativeAmount = value * this.navPrice;
      } else {
        this.indicativeAmount = 0.0;
      }
    } else {
      this.indicativeAmount = 0.0;
    }
    if (this.amountAdded) {
      this.amountEdit = true;
    } else {
      this.amountEdit = false;
    }
    if (value === this.maximumUnitSlider) {
      this.isRedeemAll = true;
      this.redeemAllCheckbox['checked'] = true;
    } else {
      this.isRedeemAll = false;
      this.redeemAllCheckbox['checked'] = false;
    }
    if (this.indicativeAmount == 0.0) {
      this.sliderValue = 0;
    }
  }
  openIndicativeAmountActionSheet(): void {
    this._bottomSheet.open(MobileTooltipComponent, {
      panelClass: 'tooltip-action-sheet',
      data: {
        actionHeading: 'Indicative Amount',
        actionContent:
          '<p>The Indicative Amount comes from multiplying the number of selected units by the current NAV price and excludes any charges. However, the actual amount may differ based on the closing NAV price. If you transact after 2pm, the closing price on the next business day will be used.</p>',
        buttonRed: true,
      },
    });
  }

  addToCartClick(isUpdateCart = false) {
    if(!this.amlResult) {
      this.amountForm.reset();
      this.indicativeAmount = 0;
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
  else if (this.item && this.item.fund_status !== 'BO') {
      const unit = Number(this.amountForm.controls.amount.value?.toString().replace(/,/g, ''));
      const amount = parseFloat(this.amountForm.controls.amount.value);
      const min_holding = this.item.min_holding;
      const units_held_number = this.item.units_held_number;
      const calculatedUnit = units_held_number - unit;
      const value = {
        unit: this.amountForm.controls.amount.value?.toString().replace(/,/g, ''),
        amount: this.indicativeAmount?.toString().replace(/,/g, ''),
        index: this.indexVal,
        flow: '002',
        minimumUnit: this.minimumUnit,
        maximumUnit: this.maximumUnit,
        fund_code: this.item ? this.item.fund_code : '',
      };

      const currentFlowText = 'redeem';
      if (this.foreignerInd === 'Y' || this.occupationInd === 'Y') {
        this.unableToProceed();
      }
      else if (
        this.cartUTAccount &&
        this.cartFundCount >= 1 &&
        this.selectedAccount !== this.cartUTAccount
      ) {
        this.dialogCart(value);
      } else if (
        this.flowText &&
        this.cartFundCount >= 1 &&
        currentFlowText !== this.flowText
      ) {
        this.pendingOtherTransactinCart(this.flowText, '002', value);
      } else {
        if (calculatedUnit < min_holding && unit < units_held_number) {
          const dialogRef = this.dialog.open(DialogAlertComponent, {
            panelClass: ['custom-dialog', 'dialog-inverse-button'],
            maxWidth: '600px',
            autoFocus: false,
            backdropClass: 'backdrop-modal',
            data: {
              dialogImage: '<em class="icon-danger"></em>',
              dialogHeading: 'Minimum Holding Requirement',
              dialogContent:
                '<p>You need to maintain a minimum holding of <strong>' +
                min_holding +
                '</strong> units to stay invested in this fund. Redeem all or Change your redeeption units.</p>',
              dialogButtonCancel: true,
              dialogButtonCancelText: 'Change Redemption units',
              dialogButtonProceed: true,
              dialogButtonProceedText: 'Redeem all & add to cart',
            },
          });
          this.analyticService.loadPopUpAnalytics('Minimum Holding Requirement');
          dialogRef.afterClosed().subscribe((result) => {
            if (result === 'Redeem all & add to cart') {
              this.amountAdded = true;
              this.amountEdit = false;
              const indicativeAmount = units_held_number * this.averageNavPrice;
              value.unit = units_held_number;
              this.amountForm.controls.amount.setValue(this.getRoundNumber(units_held_number));
              this.isRedeemAll = true;
              this.redeemAllCheckbox['checked'] = true;
              if (!isUpdateCart) {
                //add units to cart
                this.addToCart.emit(value);
              } else {
                //update units in existing cart
                this.updateCartDataInRedeem.emit(value);
              }

            } else {
              this.amountAdded = false;
            }
          });
        } else {
          this.amountAdded = true;
          this.amountEdit = false;

          if (!isUpdateCart) {
            //add units to cart
            this.addToCart.emit(value);
          } else {
            //update units in existing cart
            this.updateCartDataInRedeem.emit(value);
          }

        }
        // this.redeemInput = this.amountForm.controls.amount.value;
        // this.amountForm.controls.amount.setValue(this.amountForm.controls.amount.value);
        // this.amountForm.controls.amount.setValue(this.amountForm.controls.amount.value);
      }
    } else {
      this.unableToTransact();
    }
  }

  dialogCart(value) {

    const dialogRef = this.mintDialogService.showPendingTransactionInOtherAccountDialog(this.cartUTAccount);


    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'Yes, clear cart and continue') {
        this.amountAdded = true;
        this.clearAndAddNewToCart.emit(value);
      }
    });
  }

  unableToTransact() {
    const dialogRef = this.dialog.open(DialogAlertComponent, {
      panelClass: ['custom-dialog', 'dialog-inverse-button'],
      maxWidth: '600px',
      autoFocus: false,
      backdropClass: 'backdrop-modal',
      data: {
        dialogImage: '<em class="icon-danger"></em>',
        dialogHeading: 'Unable to Transact',
        dialogContent:
          '<p>We are sorry to inform you that only purchase is allowed for this fund at the moment.</p>',
        dialogButtonCancel: false,
        dialogButtonCancelText: 'Okay',
        dialogButtonProceed: true,
        dialogButtonProceedText: 'Okay',
      },
    });
    this.analyticService.loadPopUpAnalytics('Unable to Transact');

  }

  removeUnit() {
    this.amountAdded = false;
    this.redeemInput = 0;
    this.value = 0;
    this.redeemInput = this.unit;
    this.sliderValue = 0;
    this.amountForm.controls.amount.setValue(0);
    this.calculateIndicativeRate(0);
    this.indicativeAmount = 0;
    this.isRedeemAll = false;
    this.removeFromCart.emit({
      index: this.indexVal,
      fund_code: this.item ? this.item.fund_code : null,
    });
    this.cdr.detectChanges();
  }

  toggle(event) {
    if (event) {
      this.amountEdit = true;
      if (event.checked) {
        const units_held = parseFloat(this.item.unit_held.toString().replace(/,/g, '')) 
        const value = this.item ? this.getRoundNumber(units_held) : 0.0;
        const units_held_number = this.item ? units_held : 0.0;
        this.value = units_held_number;
        this.redeemInput = units_held_number;
        this.sliderValue = units_held_number;
        this.amountForm.controls.amount.setValue(value);
        this.indicativeAmount = units_held_number * this.averageNavPrice;
        //this.redeemSliderValueChange.emit(this.value);
      } else {
        this.value = 0.00;
        this.redeemInput = this.unit;
        this.sliderValue = 0.00;
        this.amountForm.controls.amount.setValue('0.00');
        this.indicativeAmount = 0.00;
        // this.redeemSliderValueChange.emit(this.value);
      }
    }

    this.calculateIndicativeRate(this.value);
  }

  onSliderChange(event: MatSliderChange) {

    this.amountEdit = true;

    if (this.foreignerInd === 'Y' || this.occupationInd === 'Y') {
      this.sliderValue = 0;
      this.unableToProceed();
    } else {

      if (typeof this.navPrice === 'string') {
        // it's a string
        this.navPrice = parseFloat(this.navPrice);
      }

      if (event?.value) {
        const value = this.getRoundNumber(event.value);
        const valueNumber = parseFloat(value.toString().replace(/,/g, ''));
        const unit = event.value;
        if (unit) {
          this.amountForm.controls.amount.setValue(value);

          this.redeemInput = unit;
          this.indicativeAmount = this.redeemInput * this.navPrice;
          //Enable redeemAll checkbox when max unit is triggered in the slider
          if (valueNumber === this.maximumUnitSlider) {
            this.isRedeemAll = true;
            this.redeemAllCheckbox['checked'] = true;

          } else {
            this.isRedeemAll = false;
            this.redeemAllCheckbox['checked'] = false;
          }

        } else {
          this.indicativeAmount = 0.0;
          this.amountForm.controls.amount.setValue('0.00');
          this.amountForm.controls.amount.setErrors({invalidMinAmount: true});
        }
      } else {
        this.indicativeAmount = 0.0;
        this.isRedeemAll = false;
        this.amountForm.controls.amount.setValue('0.00');
        this.amountForm.controls.amount.setErrors({invalidMinAmount: true});
      }

    }
  }

  removeModal() {
    this.fundName = this.item && this.item.fund_name ? this.item.fund_name : '';
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
        this.removeUnit();
      }
    });
  }

  pendingOtherTransactinCart(previousFlow, currentFlow, values) {

    const dialogRef = this.mintDialogService.showPendingOtherTransactionInCartDialog(previousFlow, currentFlow);


    //Calling dialog Cart
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'Yes, clear cart and continue') {
        this.amountAdded = true;
        this.amountEdit = false;
        this.clearAndAddNewToCart.emit(values);
      }
    });
  }

  getRoundNumber(num: number): number {
    let amount;
    if (num) {
      let formattedAmount = num.toString().replace(/,/g, '');
      formattedAmount = formattedAmount.indexOf('.') >= 0 ? formattedAmount : (formattedAmount + ".00");

      amount = this.decimalPipe.transform(parseFloat(formattedAmount).toFixed(2), '1.2-2') ?? 0.00;
    } else {
      amount = num;
    }
    //const amountNoComma = amount ? parseFloat(amountr.toString().eplace(/,/g, '')) : 0.00;
    return amount;
  }

  unableToProceed() {
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

}
function redemptionUnitsExceed(
  holding: number,
  max: number
): ValidatorFn | null {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control && control.value) {
      const value = parseFloat(control.value);

      if (value && holding && max && value > holding) {
        return { redemptionUnitsExceed: true };
      }
    }
    return null;
  };
}
