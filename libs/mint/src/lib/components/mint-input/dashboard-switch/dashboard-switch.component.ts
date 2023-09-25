import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Fund, SwitchFund, CartList } from '@cimb/shared/models';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MobileTooltipComponent } from '../../mint-action-sheets/mobile-tooltip/mobile-tooltip.component';
import { DialogAlertComponent } from '../../mint-dialog/dialog-alert/dialog-alert.component';
import { formatNumber } from '@angular/common';
import { MintDialogService } from '../../mint-dialog';
import { EventService } from '@cimb/core';
import { AnalyticService } from '@cimb/shared/services';

@Component({
  selector: 'cimb-dashboard-switch',
  templateUrl: './dashboard-switch.component.html',
  styleUrls: ['./dashboard-switch.component.scss'],
})
export class DashboardSwitchComponent implements OnInit {
  @Input() enableAddToCart = false;
  @Input() item: Fund;
  @Input() isPanelOpen: boolean;
  @Input() cartUTAccount = '';
  @Input() selectedAccount = '';
  @Input() cartFundCount = 0;
  @Input() flowText = 'switch';
  @Input() foreignerInd = 'N';
  @Input() occupationInd = 'N';
  @Input() indexVal = 0;
  @Output() addToCart: EventEmitter<any> = new EventEmitter();
  @Output() removeFromCart: EventEmitter<any> = new EventEmitter();
  @Output() updateCart: EventEmitter<any> = new EventEmitter();
  @Output() clearAndAddNewToCart: EventEmitter<any> = new EventEmitter();
  @Input() amlResult;

  highlightedText: string;
  minimumUnit = 0;
  maximumUnit = 0;
  inputUnit = 0;
  inputPlaceholder = '';
  indicativeAmountDisplay = 0;
  disabled = true;
  selectedSwitchToFundCode: string = null;
  selectedSwitchToFundCodeChanged: string = null;
  unitsAdded = false;
  fieldsEdited = false;
  formValid = false;
  cartListObject: CartList;
  
  unitForm:FormGroup = this.formBuilder.group({
    units: [''],
  });
  currUrl: string;

  constructor(
    private dialog: MatDialog,
    public _eventService: EventService,
    private _bottomSheet: MatBottomSheet,
    private formBuilder: FormBuilder,
    private mintDialogService: MintDialogService,
    private analyticService: AnalyticService
  ) { }

  ngOnInit() {
   this._eventService.onReceived()?.subscribe(data => {
      if(data.addedToCartAPIFailed){
        const fCode = data.data.cartSummary.cartDetailList.filter(x => x.cartDetailId === '')[0].fundCode;
        if(this.item.fund_code === fCode){
          this.inputUnit = 0;
          this.unitsAdded = false;
          this.selectedSwitchToFundCode = null;
          this.indicativeAmountDisplay = 0;
          this.disabled = true;
          this.unitForm.reset();
        }
      }
      if(data.fullSwitch){
        this.inputUnit = 0;
        this.unitsAdded = false;
        this.disabled = true;
        this.selectedSwitchToFundCode = null;
        this.indicativeAmountDisplay = 0;
        this.unitForm.reset();
      }
    });
    this.inputPlaceholder = `Min ${this.item.min_switch_amt} unit`;
    this.minimumUnit = this.item.min_switch_amt;
    this.maximumUnit = this.item.units_held_number ? this.item.units_held_number : parseFloat(this.item.unit_held.toString().replace(/,/g, ''));
      
    //prep to prepopulate switch fields if data is available
    const cartList = this.item && this.item.cart_list ? this.item.cart_list : [];
    this.cartListObject = cartList.length > 0 ? cartList[0] : null;
    if (
        this.cartListObject &&
        this.cartListObject.cart_txn_type === '03' &&
        this.selectedAccount === this.cartUTAccount
    ) {
      
      //pre-select SwitchIn fund if available in cart
      this.selectedSwitchToFundCode = this.cartListObject.to_fund_code;
      
      //pre-populate slider value
      this.inputUnit = this.cartListObject.cart_total_switch_out;
      
      this.indicativeAmountDisplay = this.inputUnit * this.item.nav_price_number;
      
      //do some weird formatting to pre-populate units text field
      const formattedValue = formatNumber(this.inputUnit, 'en-US', '1.2-2').replace(/,/g, '').replace('.','')

      //pre-populate units text field
      this.unitForm.controls.units.setValue(formattedValue);

      this.validateForm();

      this.unitsAdded = true;

    }

  }

  optionSelected(event: SwitchFund) {
    if(this.selectedSwitchToFundCode === null) {
      this.selectedSwitchToFundCode = event?.fundCode;
      this.validateForm();
    } else {
      //there's already a selectedSwitchToFundCode value, so the new selected fund has to be confirmed first
      this.selectedSwitchToFundCodeChanged = event?.fundCode;
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

  async addUnitToCart(isUpdateCart = false) {
    if(!this.amlResult) {
      this.unitForm.reset();
      this.indicativeAmountDisplay = 0.0;
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
    let clearAndAddNewToCart = false;

    const currentFlowText = 'switch';

    //block from switching unit trust if country or occupation doesn't comply with AML regulations
    if(this.foreignerInd === 'Y' || this.occupationInd === 'Y'){
      this.unableToProceed();
      return;
    }

    if (
      this.cartUTAccount &&
      this.cartFundCount >= 1 &&
      this.selectedAccount !== this.cartUTAccount
    ) {
      //there are other items in cart for other UT account than the current one

      const dialogPendingTransactionInOtherAccount = await this.dialogPendingTransactionInOtherAccount();

      if (dialogPendingTransactionInOtherAccount === 'Yes, clear cart and continue') {
        clearAndAddNewToCart = true;
      } else {
        return;
      }

    } else if (
      this.flowText &&
      this.cartFundCount >= 1 &&
      currentFlowText !== this.flowText
    ) {
      //there are other items in cart not belonging to the same flow, show confirmation dialog

      const dialogPendingOtherTransactionCart = await this.dialogPendingOtherTransactionCart(this.flowText);

      if (dialogPendingOtherTransactionCart === 'Yes, clear cart and continue') {
        clearAndAddNewToCart = true;
      } else {
        return;
      }
        
    }
    const unit_held = this.item.units_held_number ? this.item.units_held_number : parseFloat(this.item.unit_held.toString().replace(/,/g, ''))
    const balanceUnits = unit_held - this.inputUnit;

    // if remaining units after switch is below the min holding requirement and this is not a "Switch All" scenario
    if(balanceUnits < this.item.min_holding && this.inputUnit < unit_held) {

      const dialogMinimumHoldingRequirements = await this.dialogMinimumHoldingRequirements();
      
      if (dialogMinimumHoldingRequirements === 'Switch all and add to cart') {

        if(this.selectedSwitchToFundCodeChanged !== null) {
          //there's a new selected switch to fund, it's safe to set it properly now
          this.selectedSwitchToFundCode = this.selectedSwitchToFundCodeChanged;
        }

        this.unitsAdded = true;
        this.fieldsEdited = false;
        this.selectedSwitchToFundCodeChanged = null;
        const navPrice = this.item.nav_price_number ? this.item.nav_price_number : Number(this.item?.nav_price);
        const indicativeAmount = unit_held * navPrice;
        this.sliderValueChangeEvent(unit_held);

        const values = {
          unit: unit_held,
          amount: indicativeAmount,
          index: this.indexVal,
          flow: "003",
          fund_code: this.item.fund_code,
          to_fund_code: this.selectedSwitchToFundCode,
        };

        if(clearAndAddNewToCart) {
          //clean cart and add all units to cart
          this.clearAndAddNewToCart.emit(values);
        } else {

          if(!isUpdateCart) {
            //add all units to cart
            this.addToCart.emit(values);
          } else {
            //add all units to existing cart
            this.updateCart.emit(values);
          }

        }

      }
      
    } else {

      if(this.selectedSwitchToFundCodeChanged !== null) {
        //there's a new selected switch to fund, it's safe to set it properly now
        this.selectedSwitchToFundCode = this.selectedSwitchToFundCodeChanged;
      }

      this.unitsAdded = true;
      this.fieldsEdited = false;
      this.selectedSwitchToFundCodeChanged = null;

      const values = {
        unit: this.inputUnit,
        amount: this.indicativeAmountDisplay,
        index: this.indexVal,
        flow: "003",
        fund_code: this.item.fund_code,
        to_fund_code: this.selectedSwitchToFundCode,
      };
      
      if(clearAndAddNewToCart) {
        //clean cart and add specified units to cart
        this.clearAndAddNewToCart.emit(values);
      } else {

        if(!isUpdateCart) {
          //add specified units to cart
          this.addToCart.emit(values);
        } else {
          //add specified units to existing cart
          this.updateCart.emit(values);
        }
      }

    }
  }

  async dialogPendingTransactionInOtherAccount() {

    const dialogRef = this.mintDialogService.showPendingTransactionInOtherAccountDialog(this.cartUTAccount);

    return dialogRef.afterClosed().toPromise();
  }

  async dialogPendingOtherTransactionCart(previousFlow = '') {
    
    const dialogRef = this.mintDialogService.showPendingOtherTransactionInCartDialog(previousFlow, '003');

    return dialogRef.afterClosed().toPromise();
  }

  async dialogMinimumHoldingRequirements() {

    const dialogRef = this.mintDialogService.showMinimumHoldingRequirementsForSwitchDialog(this.item.min_holding);
    
    return dialogRef.afterClosed().toPromise();

  }

  dialogConfirmRemoveUnitFromCart() {
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
          this.item.fund_name +
          '</strong> from your cart?</p>',
        dialogButtonCancel: true,
        dialogButtonCancelText: 'Cancel',
        dialogButtonProceed: true,
        dialogButtonProceedText: 'Yes, Remove',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'Yes, Remove') {
        this.removeUnitFromCart({
          fund_code: this.item ? this.item.fund_code : null,
        });
      }
    });
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

  removeUnitFromCart(values) {
    this.removeFromCart.emit(values);
    this.sliderValueChangeEvent(0);
    this.unitsAdded = false;
    this.fieldsEdited = false;
    this.selectedSwitchToFundCodeChanged = null;
    this.selectedSwitchToFundCode = null;
    this.disabled = true;
  }

  getErrorMessage() {
    ///
  }

  sliderValueChangeEvent(value: number): void {
    const navPrice = this.item.nav_price_number ? this.item.nav_price_number : Number(this.item?.nav_price)
    this.indicativeAmountDisplay = Number(value.toFixed(2)) * navPrice;
    
    this.unitForm.controls.units.setValue( formatNumber(value, 'en-US', '1.2-2') );

    this.inputUnit = value;

    this.validateForm();

  }

  changeValueEvent(event: KeyboardEvent) {
    
    let value = 0.00;

    const unitsValue: string = this.unitForm.controls.units.value;
    
    this.indicativeAmountDisplay = 0.0;

    if (unitsValue) {
      value = parseFloat(unitsValue.toString().replace(/,/g, ''));
      if (value) {
        const navPrice = this.item.nav_price_number ? this.item.nav_price_number : Number(this.item?.nav_price);
        this.indicativeAmountDisplay = value * navPrice;
      }
    }

    //if this comes from keyboard event, mark field as edited
    if (event) {
      this.fieldsEdited = true;
    }
    
    this.inputUnit = value;

    this.validateForm();

  }

  validateForm() {

    let isValid = false;

    if(this.selectedSwitchToFundCode) {
      this.disabled = false;
    } else {
      this.disabled = true;
    }

    if(this.selectedSwitchToFundCode 
      && this.inputUnit >= this.minimumUnit
      && this.inputUnit <= this.maximumUnit) {
        isValid = true;
    }

    this.formValid = isValid;

  }
}
