import { DecimalPipe } from '@angular/common';
import { AfterContentChecked, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { AnalyticService } from 'libs/shared/services/src/lib/analytic/analytic.service';
import { MobileTooltipComponent } from '../../mint-action-sheets/mobile-tooltip/mobile-tooltip.component';
import { DialogAlertComponent } from '../../mint-dialog/dialog-alert/dialog-alert.component';
import * as fromStore from '../../../../../../../apps/self-serve/src/app/core/state/reducers';
import { Store } from '@ngrx/store';
import { getClicksCustomerInfo } from 'apps/self-serve/src/app/core/state/clicks/clicks.selectors';
@Component({
  selector: 'cimb-card-cart',
  templateUrl: './card-cart.component.html',
  styleUrls: ['./card-cart.component.scss'],
})
export class CardCartComponent implements OnInit, AfterContentChecked {
  @Input() investments;

  @Input() redemptionUnits: number;

  @Input() redemptionAmount: number;

  @Input() isNeededOnPage = true;

  @Input() hasRedeemOption: boolean;

  @Output() editItem: EventEmitter<any> = new EventEmitter();

  @Output() updateAmount: EventEmitter<any> = new EventEmitter();

  @Output() removeItem: EventEmitter<any> = new EventEmitter();

  @Input() cimbStaff: 1;

  @Input() flow: string;

  @Input() schedulerMsg = "Transactions performed after 2pm will be executed the next business day";

  @Input() enableProceedToCheckOutInPurchaseTnx = true;

  @Input() enableRedeemTransationAtCart = true;

  @Input() enableSwitchTransactionAtCart = true;

  currentindex = -1;

  editingItem;
  editingIndex = -1;
  amount: FormGroup;
  amountRedeem: FormGroup;
  //   amount = new FormControl('', [
  //     Validators.required,
  //     Validators.min(1),
  //     Validators.max(99999.99),
  //   ]);

  redeem = new FormControl('', [
    Validators.required,
    Validators.min(1),
    Validators.max(99999.99),
  ]);

  currentMinAmount = -1;
  currentMaxAmount = -1;
  indicativeAmountDisplay = 0;
  placeHolderError = "";
  minError = "";
  maxError = "";
  holdingError = "";
  holding = 0.00;
  minValue = 0.00;
  maxValue = 0.00;
  minValueRedeem = "";
  maxValueRedeem = "";
  placeHolderErrorRedeem = "";
  exceedAvailableAmountRedeem = "Exceed available units.";
  redeemAll = "Redeem All";
  totalRedemAmount = '';
  navPrice = 0.00;
  amountAdded = false;
  amountEdit = false;
  isRedeemAll = false;
  showEditBtn = true;
  showEditBtnRedeem = true;
  customerType;

  constructor(
    public dialog: MatDialog,
    private _bottomSheet: MatBottomSheet,
    private decimalPipe: DecimalPipe,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private analyticService: AnalyticService,
    private store: Store<fromStore.AppState>) { }

  ngOnInit(): void {
    this.loadData();
    this.store.select(getClicksCustomerInfo).subscribe((info) => {
      this.customerType = info.customerType;
    });
  }

  ngOnChanges(){
    this.checkEditBtn();
    this.checkRedeem();
  }

  ngAfterContentChecked() {

    this.cdr.detectChanges();

  }

  checkEditBtn() {
    if (this.flow === '001' && this.enableProceedToCheckOutInPurchaseTnx === false) {
      this.showEditBtn = false;
    } else {
      this.showEditBtn = true;
    }
  }

  checkForBOfund(ele){
    if(ele.flow === '002' && ele.fund_status === 'BO'){
      return true;
    }else{
      return false;
    }
  }

  checkSoSoHoFund(ele){
    if(((ele.fund_status === 'SO' || ele.fund_status === 'SOHO') && ele.flow === '001') || 
    ((ele.fund_status === 'SO' || ele.fund_status === 'SOHO') && ele.flow === '003')){
      return true;
    }else{
      return false;
    }
  }

  checkRedeem() {
    if (this.flow === '002' && this.enableRedeemTransationAtCart === false) {
      this.showEditBtnRedeem = false;
    } else {
      this.showEditBtnRedeem = true;
    }
  }

  loadData(): boolean {
    this.amount = this.formBuilder.group({
      amount: [''],
    });

    this.amountRedeem = this.formBuilder.group({
      redeem: [''],
    });
    //this.amount.setValue();
    // this.amount?.controls?.amount? = new FormControl('', [
    //   Validators.required,
    //   Validators.min(1),
    //   Validators.max(99999.99),

    // ]);
    return true;
  }

  removeModal(index) {
    this.currentindex = index;
    const fundName = this.investments[index].fund_name ? '<strong>'+this.investments[index].fund_name+'</strong>' : 'the fund';
    const dialogRef = this.dialog.open(DialogAlertComponent, {
      panelClass: ['dialog-transaction-issue', 'dialog-inverse-button'],
      maxWidth: '600px',
      autoFocus: false,
      backdropClass: 'backdrop-modal',
      data: {
        dialogImage: '<em class="icon-warning">',
        dialogHeading: 'Are you sure?',
        dialogContent:
          '<p>Do you really want to remove ' +
          fundName +
          ' from your cart?</p>',
        dialogButtonCancel: true,
        dialogButtonCancelText: 'Cancel',
        dialogButtonProceed: true,
        dialogButtonProceedText: 'Yes, Remove',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'Yes, Remove') {
        this.removeItem.emit({ index });
      }
    });
  }

  getRoundNumber(num: number): string | null {
    return this.decimalPipe.transform(num, '1.2-2') ?? '0.00';
  }

  edit(item, index) {
    const flow = item.flow;
    const fund = this.investments[index];
    const minFund = fund.current_holding === 'Y' ? fund.minimum_subsequent_subscription_amount : fund.minimum_initial_subscription_amount;
    const maxFund = fund.current_holding === 'Y' ? fund.maximum_subsequent_subscription_amount : fund.maximumInitialSubscriptionAmount;
    this.editingItem = fund;
    this.editingIndex = index;
    this.redemptionUnits = fund.totalRedem;
    this.placeHolderError = "Min MYR  " + this.getRoundNumber(minFund);
    if (item.flow_text !== 'redeem') {
      this.minError = "Minimum amount is MYR " + this.getRoundNumber(minFund);
      this.maxError = "Maximum amount is MYR " + this.getRoundNumber(maxFund);
    }
    else {
      this.minError = "Minimum redemption is " + this.getRoundNumber(fund.min_redem_amt) + " units.";
      this.maxError = "Maximum redemption is " + this.getRoundNumber(fund.holding) + " units.";
    }

    this.holdingError = "Exceed available Amount.";
    const holding = fund.holding;
    this.navPrice = fund.nav_price;

    // this.amount?.controls?.amount? = new FormControl('', [
    //   Validators.required,
    //   Validators.min(fund.min_redem_amt),
    //   Validators.max(fund.max_redem_amt),
    //   redemptionUnitsExceed(units_held_number, fund.max_redem_amt)
    // ]);
    this.minValueRedeem = "Minimum redemption is " + this.getRoundNumber(fund.min_redem_amt) + " units.";
    this.maxValueRedeem = "Maximum redemption is " + this.getRoundNumber(fund.max_redem_amt) + " units.";
    this.placeHolderErrorRedeem = 'Min ' + this.getRoundNumber(fund.min_redem_amt) + ' units';

    this.currentMinAmount = fund.min_amt;
    this.currentMaxAmount = fund.max_amt;
    this.holding = parseFloat(fund?.holding?.toString()?.replace(/,/g, ''));
    this.minValue = parseFloat(fund?.min_redem_amt?.toString()?.replace(/,/g, ''))
    this.maxValue = parseFloat(maxFund?.toString()?.replace(/,/g, ''));

    const amount = this.getRoundNumber(item?.totalInvestment);
    const amountData = amount?.toString()?.indexOf('.') === -1 ? amount?.toString() + "00" : amount?.toString()?.replace('.', '')?.replace(/,/g, '');
    if (flow === '001') {
      this.amount?.controls?.amount?.setValue(amountData);
      this.minValue = parseFloat(minFund?.toString()?.replace(/,/g, ''))
      this.maxValue = parseFloat(maxFund?.toString()?.replace(/,/g, ''));
    } else {
      this.minValue = parseFloat(fund?.min_redem_amt?.toString()?.replace(/,/g, ''))
      this.maxValue = parseFloat(maxFund?.toString()?.replace(/,/g, ''));
      const redeemUnit = this.getRoundNumber(this.redemptionUnits);
      const redeemUnitData = redeemUnit?.toString()?.indexOf('.') === -1 ? redeemUnit?.toString() + "00" : redeemUnit?.toString()?.replace('.', '')?.replace(/,/g, '');
      this.totalRedemAmount = this.getRoundNumber(item.totalRedemAmount);
      this.amount?.controls?.amount?.setValue(redeemUnitData);
      if (this.redemptionUnits >= holding) {
        this.isRedeemAll = true;
      } else {
        this.isRedeemAll = false;
      }
    }

    this.getRedeemMessage(index)
    const canEdit = true;
    this.editItem.emit({ item, index, canEdit });
  }

  cancel(item, index) {
    const canEdit = false;
    this.editItem.emit({ item, index, canEdit });
  }

  done(item, index, checkMinValue: boolean = true) {

    const flow = item.flow;
    if (flow === '002') {
      const redeem = this.amount?.controls?.amount ? this.amount?.controls?.amount?.value?.toString()?.replaceAll(',', '') : "0.00";
      const min_holding = item.min_holding;
      const max = parseFloat(item.max_redem_amt);

      const units_held_number = item.holding;
      const calculatedUnit = units_held_number - redeem;
      const nav_price = item.nav_price ? item.nav_price : 0.00;
      const amount = redeem * nav_price;

      if (checkMinValue && (calculatedUnit < min_holding) && redeem < units_held_number) {
        this.holdingRequirementModal(min_holding, max, units_held_number);
      } else {
        //this.amount?.controls?.amount?.setValue(this.amount?.controls?.amount?.value);
        this.amount?.controls?.amount?.setValue(this.redemptionUnits);
        const canEdit = false;
        this.updateAmount.emit({
          item,
          index,
          canEdit,
          amount: amount,
          unit: redeem,
        });
      }
    } else if (flow === '003') {

      const canEdit = false;

      this.updateAmount.emit({
        item,
        index,
        canEdit,
        amount: item.amount,
        unit: item.unit,
        to_fund_code: item.toFundCode,
      });

    } else {
      const amount = this.amount?.controls?.amount ? this.amount?.controls?.amount?.value?.toString()?.replaceAll(',', '') : "0.00";
      const min = this.currentMinAmount ? this.currentMinAmount : 0.00;
      const max = this.currentMaxAmount ? this.currentMaxAmount : 0.00;
      // eslint-disable-next-line no-empty
      if (amount < min) { } else {
        this.amount.controls.amount.setValue(this.amount?.controls?.amount?.value);
        //this.amount?.controls?.amount?.setValue(this.redemptionUnits);
        const canEdit = false;
        this.updateAmount.emit({
          item,
          index,
          canEdit,
          amount: amount,
        });
      }
    }
  }

  remove(index) {
    this.removeItem.emit({ index });
  }

  getErrorMessage() {
    if (this.amount.hasError('min')) {
      return 'Minimum amount is MYR 1,000.';
    } else if (this.amount.hasError('redemptionUnitsExceed')) {
      return 'Exceed available units.';
    }
    return this.amount.hasError('max')
      ? 'Maximum amount is MYR 99,999.99.'
      : '';
  }
  getRedeemMessage(index) {
    const fund = this.investments[index];
    if (this.amount?.controls?.amount?.hasError('min')) {
      return 'Minimum redemption is ' + fund.min_redem_amt + ' units.';
    }
    return this.amount?.controls?.amount?.hasError('max')
      ? 'Exceed available units.'
      : '';
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

  //modal for Minimumk Holding Requirement
  holdingRequirementModal(min, max, holding) {
    const dialogContent = "<p>You need to maintain a minimum holding of <strong>" + min + "</strong> units to stay invested in this fund. Redeem all or change your redemption units.</p>";
    const dialogRef = this.dialog.open(DialogAlertComponent, {
      panelClass: 'dialog-transaction-issue',
      maxWidth: '600px',
      autoFocus: false,
      backdropClass: 'backdrop-modal',
      data: {
        dialogImage:
          '<em class="icon-warning">',
        dialogHeading: 'Minimum Holding Requirement',
        dialogContent: dialogContent,
        dialogButtonCancel: true,
        dialogButtonCancelText: 'Change Redemption units',
        dialogButtonProceed: true,
        dialogButtonProceedText: 'Redeem all & add to cart',
      },
    });
    this.analyticService.loadPopUpAnalytics('Minimum Holding Requirement');
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'Redeem all & add to cart') {
        this.amount?.controls?.amount?.setValue(holding);
        this.done(this.editingItem, this.editingIndex, false);
      }
    });

  }

  redeemSliderValueChangeEvent(value): void {
    const units = parseFloat(value.toString().replace(/,/g, ''));
    const nav_price = this.editingItem.nav_price ? this.editingItem.nav_price : 0.00;
    this.amount?.controls?.amount?.setValue(this.getRoundNumber(value));
    this.totalRedemAmount = this.getRoundNumber(units * nav_price);
    // this.amount?.controls?.amount?SliderValueChange.emit(value);
  }

  getMinimumTopup(value) {
    return ('Min MYR ' + value);
  }

  getMinimumErrorTopup(value) {
    return ('Minimum amount is MYR ' + value);
  }

  getMaxErrorTopup(value) {
    return ('Maximum amount is MYR ' + value);
  }


  getHoldingErrorTopup(value) {
    return ('Minimum amount is MYR ' + value);
  }

  getMinimumRedeem(value) {
    return ('Min ' + value + ' units');
  }
  // calculateIndicativeRate(redeemInput) : void {
  //   this.indicativeAmount = this.amount?.controls?.amount?Input  *  this.averageNavPrice;
  //  //this.sliderValue = this.amount?.controls?.amount?Input;
  // }

  changeValueEvent(events) {
    let value = 0.00;
    const holding = this.editingItem.holding;
    if (typeof this.navPrice === 'string') {
      // it's a string
      this.navPrice = parseFloat(this.navPrice);
    }

    const amountValue = this.amount?.controls?.amount?.value;
    if (amountValue) {
      value = parseFloat(amountValue.toString().replace(/,/g, ''));
      if (value) {
        this.redemptionUnits = value;
        const amountValueFloat = parseFloat((value * this.navPrice).toFixed(2));
        this.totalRedemAmount = this.getRoundNumber(amountValueFloat);
      } else {
        this.totalRedemAmount = '0.00';
      }
    } else {
      this.totalRedemAmount = '0.00';
    }
    if (this.amountAdded) {
      this.amountEdit = true;
    } else {
      this.amountEdit = false;
    }
    if (value === holding) {
      this.isRedeemAll = true;
    } else {
      this.isRedeemAll = false;
    }
  }

}


function redemptionUnitsExceed(holding: number, max: number): ValidatorFn | null {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control && control.value) {
      const value = parseFloat(control.value);
      if ((value && holding && max) && value > holding) {
        return { 'redemptionUnitsExceed': true }
      }
    }
  }
}

