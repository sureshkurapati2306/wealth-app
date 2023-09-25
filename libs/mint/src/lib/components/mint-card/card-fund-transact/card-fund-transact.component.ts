import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Subject } from 'rxjs';

import { MobileTooltipComponent } from '../../mint-action-sheets/mobile-tooltip/mobile-tooltip.component';
import { CartList, Fund } from '@cimb/shared/models';
import { DialogAlertComponent } from '../../mint-dialog/dialog-alert/dialog-alert.component';
import * as LandingPageSelector from 'apps/self-serve/src/app/core/state/landing-page/landing-page.selectors';
import { Store } from '@ngrx/store';
import * as fromStore from 'apps/self-serve/src/app/core/state/reducers';
import { ActivatedRoute } from '@angular/router';
import { AnalyticService } from '@cimb/shared/services';
import { MintDialogService } from '../../mint-dialog';
import { getClicksCustomerInfo } from '../../../../../../../apps/self-serve/src/app/core/state/clicks/clicks.selectors';

@Component({
  selector: 'cimb-card-fund-transact',
  templateUrl: './card-fund-transact.component.html',
  styleUrls: ['./card-fund-transact.component.scss'],
})
export class CardFundTransactComponent implements OnInit  {
  @Input() fund: Fund;
  @Input() cartUTAccount = '';
  @Input() selectedAccount = '';
  @Input() cartFundCount = 0;
  @Input() flowText = '';
  @Input() occupationInd = 'N';
  @Input() foreignerInd = 'N';
  @Input() enableAddToCartForTopup = true;
  @Input() enableRedeemAtFundDetail = true;
  @Input() enableSwitchAtFundDetails = true;

  @Output() addToCart: EventEmitter<any> = new EventEmitter();
  @Output() removeFromCart: EventEmitter<any> = new EventEmitter();
  @Output() updateCart: EventEmitter<any> = new EventEmitter();
  @Output() clearAndAddNewToCart: EventEmitter<any> = new EventEmitter();

  @Output() updateCartRedeem: EventEmitter<any> = new EventEmitter();

  accountOptions = '01';
  checkboxLabel ='Switch All';
  now = Date.now();
  redeemAmount:number;
  cimbStaff: 1;
  indicativeAmount = 0;
  redeemAll = "Redeem All";
  topupValue;
  
  clearAllDataList: Subject<boolean> = new Subject();
  redeemValue;
  
  selectedUnittrustAccountNumber;
  selectedAccountNumber : any;
  index = 0;
  openedFromLandingPage = false;
  cartList: CartList[] = [];
  cartTotalRedem = 0.00;
  cartRedemAmount = 0.00;
  cartTxnType = '01';
  cartTotalInvestment = 0.00;
  cartSalesCharges = 0.00;
  cartTotalSwitchIn = 0.00;
  cartListObject: CartList;

  // Booleans for Settings
  enableAddToCartInRedeemTnx = true;
  enableAddToCartInSwitchTnx = true;
  amlCheckResult = true;

  @Output() updateCartInRedeem: EventEmitter<any> = new EventEmitter();

  constructor(
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private _bottomSheet: MatBottomSheet,
    private store: Store<fromStore.AppState>,
    private activatedRoute: ActivatedRoute,
    private analyticService: AnalyticService,
    private mintDialogService: MintDialogService
  ) { }

  ngOnInit() {
    this.store.select(LandingPageSelector.selectLandingPageStatusState).subscribe((result) => {
      this.openedFromLandingPage = result.searchFundsFromLandingPage;
    });
    this.store.select(getClicksCustomerInfo).subscribe((info) => {
      this.amlCheckResult = info && info['amlCheckResult'] ? true : false;
  });
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges) {

    this.cartList = this.fund?.cart_list;

    if(this.cartList.length){

        this.cartListObject = this.cartList[0];

        this.cartTxnType = this.cartListObject?.cart_txn_type;
        this.accountOptions = this.cartListObject?.cart_txn_type;

        if(this.cartTxnType){
            if(this.cartTxnType === '01'){
                this.cartTotalInvestment = this.cartListObject?.cart_net_amount;
                this.cartSalesCharges = this.cartListObject?.cart_sales_charges;
            } else if(this.cartTxnType === '02'){
                this.cartTotalRedem = this.cartListObject?.cart_total_redem;
                this.cartRedemAmount = this.cartListObject?.cart_redem_amount;
            }
            else if(this.cartTxnType === '03'){
                this.cartTotalSwitchIn = this.cartListObject?.cart_total_switch_in;
            }
        }
    }

    // if(changes && changes.myHoldings) {
    //   this.myHoldings = changes.myHoldings.currentValue;
    //   this.myHoldingsAllFunds = changes.myHoldings.currentValue;
    //   //Make all the expanded fund rows to collapse when page or UT account is changed
    //   this.accordion?.closeAll();
    // }
    if(this.selectedUnittrustAccountNumber == undefined) {
      this.selectedAccountNumber = this.selectedAccount
    } else {
      this.selectedAccountNumber = this.selectedUnittrustAccountNumber
    }
    //Filter fund_list respective of unit trust account Nos:::
    // if(this.myHoldings != undefined) {
    //   this.filterFundListByAccountNumber();
    // }
    // if(this.myHoldings != undefined) {
    //     this.myHoldings = this.displayFlagPopulationForFunds(
    //     this.myHoldings,
    //     this.isCashAssetDisplayed,
    //     this.isFixedIncomeAssetDisplayed,
    //     this.isLocalEquityAssetDisplayed,
    //     this.isRegionalEquityAssetDisplayed,
    //     this.isGlobalEquityAssetDisplayed,
    //     this.isAlternativesAssetDisplayed
    //     );
    // }

    //set default state for radio buttons
    //this.accountOptionsGroup = this.myHoldings.map(() => this.accountOptions);

  }

  redeemSliderValueChangeEvent(value): void {
    this.redeemAmount = value;
   // this.redeemSliderValueChange.emit(value);
  }

  calculateIndicativeRate(redeemInput , item) : void {
    this.indicativeAmount = redeemInput * item.nav_price
    const cloneItem = JSON.parse(JSON.stringify(item))

    cloneItem.indicativeAmount = this.indicativeAmount;
    item = cloneItem;
  }

  addToCartEvent(val, flow): void {
    const fundItem = this.fund;
    const fundStatus = fundItem.fund_status;
     const values = {
        flow,
        fundObj: this.fund,
        ...val
     }
    let currentFlowText = null;
    if(flow === '001'){
      currentFlowText = 'topup';
    }else if(flow === '002'){
      currentFlowText = 'redeem';
    }else if(flow === '003'){
      currentFlowText = 'switch';
    }
    const msg = '<p>We are sorry to inform you that this fund is no longer eligible for purchase.</p>';
    if(fundStatus === "HO" || (flow === '002' && fundStatus === "BO")){
      this.unableToTransact(msg);
    } else {
      if(currentFlowText && this.flowText && this.cartFundCount >= 1 && currentFlowText !== this.flowText){
          this.pendnigOtherTransactinCart(this.flowText, values.flow, values);
      } else {
       this.addToCart.emit(values);
      }
    }
  }

  pendnigOtherTransactinCart(previousFlow, currentFlow, values) {
    
    const dialogRef = this.mintDialogService.showPendingOtherTransactionInCartDialog(previousFlow, currentFlow);
    //Calling dialog Cart
    dialogRef.afterClosed().subscribe((result) => {
     // this.amountAdded = false;
      if (result === 'Yes, clear cart and continue') {
       // this.clearAndAddNewToCart.emit(values);
      }
    });
  }

  unableToTransact(msg) {
    const dialogRef = this.dialog.open(DialogAlertComponent, {
      panelClass: ['custom-dialog', 'dialog-inverse-button'],
      maxWidth: '600px',
      autoFocus: false,
      backdropClass: 'backdrop-modal',
      data: {
        dialogImage: '<em class="icon-danger"></em>',
        dialogHeading: 'Unable to Transact',
        dialogContent: msg,
        dialogButtonCancel: false,
        dialogButtonCancelText: 'Okay',
        dialogButtonProceed: true,
        dialogButtonProceedText: 'Okay',
      },
    });
    this.analyticService.loadPopUpAnalytics('Unable to Transact');
  }

  removeFromCartEvent(values): void {
    this.cartRedemAmount = 0.00;
    this.removeFromCart.emit(values);
  }

  clearAndAddNewToCartEvent(values) {
    this.redeemValue = values;
    this.topupValue = null;
    this.clearAndAddNewToCart.emit(values);
  }

  clearCartAndContinueDataEvent(value) {
    // this.redeemValue = values;
    // //this.clearAndAddNewToCart.emit(values);
  }

  clearAllCart(value) {
    // this.redeemValue = values;
    // //this.clearAndAddNewToCart.emit(values);
  }

  selectedAccountChange(value) {
    // this.redeemValue = values;
    // //this.clearAndAddNewToCart.emit(values);
  }

  updateAmountInCartTopUpEvent(value) {
    // this.redeemValue = values;
    this.updateCart.emit(value);
  }

  openIndicativeAmountActionSheet(): void {
    const param = {
      panelClass: 'tooltip-action-sheet',
      data: {
        actionHeading: 'Indicative Amount',
        actionContent:
          '<p>The Indicative Amount comes from multiplying the number of selected units by the current NAV price and excludes any charges. However, the actual amount may differ based on the closing NAV price. If you transact after 2pm, the closing price on the next business day will be used.</p>',
      },
    }
    this._bottomSheet.open(MobileTooltipComponent, param);
  }

  openSwitchActionSheet(): void {
    const param = {
      panelClass: 'tooltip-action-sheet',
      data: {
        actionHeading: 'Switch',
        actionContent:
          '<p>Switch allows you to sell an existing fund’s units and buy new units from another fund in a single transaction.</p><p>Switching is faster as you do not have to wait to receive the money from your unit trust redemption before purchasing another fund. You can only switch funds within the same fund house.</p>',
      },
    }
    this._bottomSheet.open(MobileTooltipComponent, param);
  }

  openNAVactionSheet(): void {
    const param = {
      panelClass: 'tooltip-action-sheet',
      data: {
        actionHeading: 'NAV Price',
        actionContent:
          '<p>Net Asset Value (NAV) price tells you how much one unit of a fund is worth as of the stated date.</p>',
      },
    }
    this._bottomSheet.open(MobileTooltipComponent, param);
  }

  clearAndAddNewToCartTopupEvent(values) {
    this.topupValue = values;
    this.redeemValue = null;
    this.clearAndAddNewToCart.emit(values);
  }

  updateAmountInCartRedeemEvent(value, flow) {
    this.updateCartRedeem.emit({
      ...value,
      flow: flow
    });
  }
}



