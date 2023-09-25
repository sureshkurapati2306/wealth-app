import { formatNumber } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { Fund, FundCart, SwitchFund} from '@cimb/shared/models';
import { Store } from '@ngrx/store';
import { MobileTooltipComponent } from '../../mint-action-sheets/mobile-tooltip/mobile-tooltip.component';
import { MintDialogService } from '../../mint-dialog';

@Component({
  selector: 'cimb-card-switch-summary',
  templateUrl: './card-switch-summary.component.html',
  styleUrls: ['./card-switch-summary.component.scss'],
})
export class CardSwitchSummaryComponent implements OnInit {

  updatedSwitchToFundCode!: string;
  updatedSwitchOutUnits!: number;
  minimumUnit = 0;
  maximumUnit = 0;
  inputPlaceholder = '';
  indicativeAmountDisplay = 0;
  fund!: Fund;
  formValid = false;

  unitForm: FormGroup = this.formBuilder.group({
    units: [''],
  });

  @Input() item!: FundCart;
  @Input() showAssetClass = true;
  @Input() showRiskProfile = true;
  @Input() canModify = false;
  @Input() enableSwitchTransactionAtCart = true;
  switchIndicatorFlag : boolean;
  isBOFund:boolean;
  toSwitchIndicatorFlag: boolean;
  switchInFlag: boolean;
  switchOutFlag:boolean;


  @Output() toggleEditCartItemState = new EventEmitter<boolean>();
  @Output() updateCartItem = new EventEmitter<{
    flow: '003',
    unit: number;
    amount: number;
    toFundCode: string;
  }>();
  @Output() removeCartItem = new EventEmitter<boolean>();

  constructor(
    private dialog: MatDialog,
    private _bottomSheet: MatBottomSheet,
    private store: Store<any>,
    private formBuilder: FormBuilder,
    private mintDialogService: MintDialogService
  ) { }
  
  ngOnInit() {
    this.switchIndicatorFlag  = this.item.switch_indicator === 'N' ? true : false;
    this.toSwitchIndicatorFlag = this.item.to_fund_switch_indicator === 'N' ? true  : false;
    this.switchInFlag  = this.item.to_fund_status === null ?  true: false;
    this.switchOutFlag = this.item.fund_status === null ? true  : false ;
    //get fund detail from dashboardReducers because we need to get its fund_house_code value
    this.store.select('dashbordReducers').subscribe((data) => {
      
      const fundList: Fund[] = data.fundList;
      this.fund = fundList.find(fund => fund.fund_code === this.item.fund_code);

    });

    this.inputPlaceholder = `Min ${this.item.min_switch_amt} unit`;
    this.minimumUnit = this.item.min_switch_amt;
    this.maximumUnit = this.item.holding;
    this.updatedSwitchOutUnits = this.item.totalSwitchOut;
    this.updatedSwitchToFundCode = this.item.toFundCode;

    this.indicativeAmountDisplay = this.item.totalSwitchOut * this.item.nav_price;

    //do some weird formatting to pre-populate units text field
    const formattedValue = formatNumber(this.item.totalSwitchOut, 'en-US', '1.2-2').replace(/,/g, '').replace('.','')

    //pre-populate units text field
    this.unitForm.controls.units.setValue(formattedValue);

    this.validateForm();

  } 

  edit() {
    this.toggleEditCartItemState.emit(true);
  }
  
  cancel() {
    this.toggleEditCartItemState.emit(false);
  }

  async done() {

    const balanceUnits = this.item.holding - this.updatedSwitchOutUnits;

    // if remaining units after switch is below the min holding requirement and this is not a "Switch All" scenario
    if(balanceUnits < this.item.min_holding && this.updatedSwitchOutUnits < this.item.holding) {

      const dialogMinimumHoldingRequirements = await this.dialogMinimumHoldingRequirements();
      
      if (dialogMinimumHoldingRequirements === 'Switch all and add to cart') {

        this.sliderValueChangeEvent(this.item.holding);
        
        this.updateCartItem.emit({
          flow: '003',
          unit: this.updatedSwitchOutUnits,
          amount: this.indicativeAmountDisplay,
          toFundCode: this.updatedSwitchToFundCode,
        });
        
      }

    } else {

      this.updateCartItem.emit({
        flow: '003',
        unit: this.updatedSwitchOutUnits,
        amount: this.indicativeAmountDisplay,
        toFundCode: this.updatedSwitchToFundCode,
      });

    }

  }

  remove() {
    this.removeCartItem.emit(true);
  }

  optionSelected(event: SwitchFund) {
    this.updatedSwitchToFundCode = event.fundCode;
  }

  sliderValueChangeEvent(value): void {
    this.updatedSwitchOutUnits = value;
    this.item.switchOutAmount = this.updatedSwitchOutUnits * this.item.nav_price;
    this.indicativeAmountDisplay = this.updatedSwitchOutUnits * this.item.nav_price;
    this.unitForm.controls.units.setValue( formatNumber(value, 'en-US', '1.2-2') );
    this.validateForm();
  }

  changeValueEvent(event: KeyboardEvent) {
    
    let value = 0.00;
    
    const unitsValue: string = this.unitForm.controls.units.value;
    if (unitsValue) {
      value = parseFloat(unitsValue.toString().replace(/,/g, ''));
      if (value) {
        this.indicativeAmountDisplay = value * this.item.nav_price;
        this.item.switchOutAmount = value * this.item.nav_price;
      } else {
        this.indicativeAmountDisplay = 0.0;
        this.item.switchOutAmount = 0.0;
      }
    } else {
      this.indicativeAmountDisplay = 0.0;
      this.item.switchOutAmount = 0.0;
    }
    
    this.updatedSwitchOutUnits = value;

    this.validateForm();

  }

  validateForm() {

    let isValid = false;

    if(this.updatedSwitchOutUnits >= this.minimumUnit
      && this.updatedSwitchOutUnits <= this.maximumUnit) {
        isValid = true;
    }

    this.formValid = isValid;

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

  async dialogMinimumHoldingRequirements() {
    
    const dialogRef = this.mintDialogService.showMinimumHoldingRequirementsForSwitchDialog(this.item.min_holding);
    
    return dialogRef.afterClosed().toPromise();

  }

}
