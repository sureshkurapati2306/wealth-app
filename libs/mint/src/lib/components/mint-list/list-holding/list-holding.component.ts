
import { Component, Input, Output, EventEmitter, SimpleChanges, OnInit, OnChanges, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MobileTooltipComponent } from '../../mint-action-sheets/mobile-tooltip/mobile-tooltip.component';
import { DialogAlertComponent } from '../../mint-dialog/dialog-alert/dialog-alert.component';
import { Subject } from 'rxjs';
import { MatAccordion } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { AnalyticService } from '@cimb/shared/services';
import { setOccuranceAndAnalyticsData } from '../../../utils/analytics/adobe-analytics.utils';
import { getDayOfWeek } from '../../../utils/date/date.util';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../../../../../apps/self-serve/src/app/core/state/reducers';
import { uploadFundDetailSuccess } from 'apps/self-serve/src/app/modules/available-funds/+state/available-funds.actions';
import * as LandingPageSelector from 'apps/self-serve/src/app/core/state/landing-page/landing-page.selectors';
import * as DashbordAction from 'apps/self-serve/src/app/core/state/dashbord/dashboard.actions';
import { takeUntil } from 'rxjs/operators';
import { EventService } from '@cimb/core';

@Component({
  selector: 'cimb-list-holding',
  templateUrl: './list-holding.component.html',
  styleUrls: ['./list-holding.component.scss'],
})
export class ListHoldingComponent implements OnInit, OnChanges {
  @Input() myHoldings;
  @Input() currentPageNumber = 1;
  @Input() itemsPerPage = 10;
  @Input() portfolioDatalist;
  @Input() solePropIndicator;
  @Input() flowText;
  @Input() cartFundCount;
  @Input() card_amount;
  @Input() casaIndicator;
  @Input() selectedUnittrustAccountNumber;
  @Input() selectedAccount;
  @Input() cimbStaff: 1;
  @Input() joinOrUtAccountIndicator: 'N';
  @Input() joinAndUtAccountIndicator: false;
  @Input() flow = '01';
  @Input() customerType = ' ';
  @Output() sortingValueChangeEvent: EventEmitter<any> = new EventEmitter();
  @Output() addToCart: EventEmitter<any> = new EventEmitter();
  @Output() removeFromCart: EventEmitter<any> = new EventEmitter();
  @Output() clearAndAddNewToCart: EventEmitter<any> = new EventEmitter();

  @Output() updateAmountInCartTopUp: EventEmitter<any> = new EventEmitter();
  @Output() clearAndAddNewToCartCall: EventEmitter<any> = new EventEmitter();
  @Output() selectAccountChange: EventEmitter<any> = new EventEmitter();
  @Output() clearCartAndContinueEvent: EventEmitter<any> = new EventEmitter();
  @Input() accountOptions = '1';
  @Input() clearAllDataHoldingLists: Subject<boolean>;
  @Input() cartUTAccount = '';
  @ViewChild(MatAccordion) accordion: MatAccordion;
  @Input() r2Enabled: false;

  @Output() updateCartDataInRedeem: EventEmitter<any> = new EventEmitter();

  // Add To Cart Settings
  @Input() enableAddToCartForTopup = false;
  @Input() enableAddToCartInRedeemTnx = false;
  @Input() enableAddToCartInSwitchTnx = false;
  @Input() enableRedeemAtInvestmentDashboard = true;
  @Input() enableSwitchAtInvestmentDashboard = true;
  @Input() amlResult;

  clearAllDataList: Subject<boolean> = new Subject();
  myHoldingsCash = [];
  myHoldingsFixedIncome = [];
  myHoldingsSorted = [];
  myHoldingsLocalEquity = [];
  myHoldingsRegionalEquity = [];
  myHoldingsGlobalEquity = [];
  myHoldingsAlternatives = [];
  pageNumber = 1;
  redeemAll = "Redeem All";
  switchAll = "Switch All";
  redeemAmount: number;
  indicativeAmount = 0;
  accountOptionsGroup: string[] = [];
  currentCustomerType = 'NTP';

  isCashAssetDisplayed = false;
  isFixedIncomeAssetDisplayed = false;
  isLocalEquityAssetDisplayed = false;
  isRegionalEquityAssetDisplayed = false;
  isGlobalEquityAssetDisplayed = false;
  isAlternativesAssetDisplayed = false;

  selectedAccountNumber: any;
  myHoldingsAllFunds: any;

  redeemValue;
  topupValue;
  expandedAll = false;
  currentAcc: string;
  isSortByAlphabetAtoZ: boolean;
  isSortByAlphabetZtoA: boolean;
  isSortByReturnPercentageHighToLow: boolean;
  isSortByReturnPercentageLowToHigh: boolean;
  isSortByReturnValueHighToLow: boolean;
  isSortByReturnValueLowToHigh: boolean;
  @Input() foreignerInd = 'N';
  @Input() occupationInd = 'N';
  currentHolding = [];
  menuOptions = {
    menuItems: [
      { option: 'Alphabet (A-Z)' },
      { option: 'Alphabet (Z-A)' },
      { option: 'Returns by percentages (High-Low)' },
      { option: 'Returns by percentages (Low- High)Alphabet (A-Z)' },
      { option: 'Returns by value (MYR) (High-Low)' },
      { option: 'Returns by value (MYR) (Low-High)' },
    ],
    //For dropdown with a title
    panelTitle:
      'Funds will be sorted according to your choice below within the respective Asset Class.',
    triggerText: 'Sort by',
  };

  panelOpenState: boolean[]; //state for accordion panels
  isEPFAccount = false;

  users: any;
  customerName: string;
  userData: any;
  riskProfileDataReceived = false;
  _unsubscribeAll: Subject<void> = new Subject<void>();
  constructor(
    private dialog: MatDialog,
    private _bottomSheet: MatBottomSheet,
    private router: Router,
    private analyticService: AnalyticService,
    private store: Store<fromStore.AppState>,
    private _eventService: EventService
  ) {
  }
  ngOnInit(): void {
    this.store.select('dashbordReducers').subscribe((data) => {
      this.currentAcc = data.cartUTAccount;
    });
    this._eventService.onReceived()?.subscribe(data => {
      const { accountDetail } = data;
      if (accountDetail) {
        this.sortHoldingInAlphabeticalOrderAtoZ(accountDetail.fund_list.filter(y => y.ut_account_no === this.currentAcc));
        this.setRadioBtnVals();
      }
    });
    if (this.flow) {
      if (this.flow === "001") {
        this.accountOptions = '1';
      } else if (this.flow === "002") {
        this.accountOptions = '2';
      } else if (this.flow === "003") {
        this.accountOptions = '3';
      }
    }

    this.clearAllDataHoldingLists?.subscribe(v => {
      // this.expandedAll = false;
      this.clearAllDataList.next(v);
    });
    this.accordion?.closeAll();
  }

  setRadioBtnVals() {
    this.accountOptionsGroup = this.currentHolding.map((val) => {
      if (val?.cart_list[0]?.cart_txn_type == '01') {
        return '1';
      } else if (val?.cart_list[0]?.cart_txn_type == '02') {
        return '2';
      } else if (val?.cart_list[0]?.cart_txn_type == '03') {
        return '3';
      } else {
        return '1';
      }
    });
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.myHoldings) {
      this.myHoldings = changes.myHoldings.currentValue;
      this.myHoldingsAllFunds = changes.myHoldings.currentValue;
      //Make all the expanded fund rows to collapse when page or UT account is changed
      //this.accordion?.closeAll();
    } else if (!changes.currentPageNumber) {
      this.dashBoardApi()
    }
    if (this.selectedUnittrustAccountNumber == undefined) {
      this.selectedAccountNumber = this.selectedAccount
    } else {
      this.selectedAccountNumber = this.selectedUnittrustAccountNumber
    }

    //Filter fund_list respective of unit trust account Nos:::
    // if(this.myHoldings != undefined) {
    //   this.filterFundListByAccountNumber();
    // }

    if (this.myHoldings != undefined) {
      // filter if ut_account_no starts with "E", then epf flag is true
      this.myHoldings.forEach(data => {
        if (data && data.ut_account_no.includes("E", 0)) {
          this.isEPFAccount = true;
        } else {
          this.isEPFAccount = false;
        }
      })
      this.myHoldings = this.displayFlagPopulationForFunds(
        this.myHoldings,
        this.isCashAssetDisplayed,
        this.isFixedIncomeAssetDisplayed,
        this.isLocalEquityAssetDisplayed,
        this.isRegionalEquityAssetDisplayed,
        this.isGlobalEquityAssetDisplayed,
        this.isAlternativesAssetDisplayed
      );
    }

    //set default state for accordion panels
    this.panelOpenState = this.myHoldings.map((item, index) => {
      return this.panelOpenState[index] || false
    });

  }

  dashBoardApi() {
    let userData: any
    this.store.select('userReducer').pipe(takeUntil(this._unsubscribeAll)).subscribe((users) => {
      this.users = users;
      userData = users.user;
      this.customerName = users?.customer_name ?? '';
      if (this.users?.riskProfileStatus) {
        this.riskProfileDataReceived = true;
      }
    });
    this.userData = userData;
    const params =
      this.userData.customer_id +
      '/' +
      this.userData.cifNumber +
      '/' +
      this.users.customerIdType +
      '/' +
      this.users.riskProfile;
    this.store.dispatch(new DashbordAction.CallDashboardApi(params));
  }

  filterFundListByAccountNumber() {
    const FundDetailsfilterdByAccNo: any = [];

    for (let i = 0; i < this.myHoldingsAllFunds.length; i++) {
      if (this.myHoldingsAllFunds[i].ut_account_no == this.selectedAccountNumber) {
        FundDetailsfilterdByAccNo.push(this.myHoldingsAllFunds[i])
      }
    }
    this.myHoldings = [];
    this.myHoldings = FundDetailsfilterdByAccNo;
    this.isCashAssetDisplayed = false;
    this.isFixedIncomeAssetDisplayed = false;
    this.isLocalEquityAssetDisplayed = false;
    this.isRegionalEquityAssetDisplayed = false;
    this.isGlobalEquityAssetDisplayed = false;
    this.isAlternativesAssetDisplayed = false;
  }

  displayFlagPopulationForFunds(
    myHoldings,
    isCashAssetDisplayed,
    isFixedIncomeAssetDisplayed,
    isLocalEquityAssetDisplayed,
    isRegionalEquityAssetDisplayed,
    isGlobalEquityAssetDisplayed,
    isAlternativesAssetDisplayed
  ) {
    this.isCashAssetDisplayed = isCashAssetDisplayed;
    this.isFixedIncomeAssetDisplayed = isFixedIncomeAssetDisplayed;
    this.isLocalEquityAssetDisplayed = isLocalEquityAssetDisplayed;
    this.isRegionalEquityAssetDisplayed = isRegionalEquityAssetDisplayed;
    this.isGlobalEquityAssetDisplayed = isGlobalEquityAssetDisplayed;
    this.isAlternativesAssetDisplayed = isAlternativesAssetDisplayed;
    this.myHoldings = myHoldings;
    //this.myHoldings = JSON.parse(JSON.stringify(myHoldings));

    for (let i = 0; i < this.myHoldings.length; i++) {
      // if (this.myHoldings[i].displayFlag == false) {
      //   this.myHoldings[i].displayFlag;
      // }

      //Cash Asset
      if (
        !this.isCashAssetDisplayed &&
        this.myHoldings[i].asset_class == 'CASH'
      ) {
        this.isCashAssetDisplayed = true;
        this.myHoldings[i].displayFlag = true;
      }
      //Fixed Income Asset

      else if (
        !this.isFixedIncomeAssetDisplayed &&
        this.myHoldings[i].asset_class == 'FIXED INCOME'
      ) {
        this.myHoldings[i].displayFlag = true;
        this.isFixedIncomeAssetDisplayed = true;
        // this.myHoldings[i].displayOrder = 2;
      }
      //Local Equity Asset
      else if (
        !this.isLocalEquityAssetDisplayed &&
        this.myHoldings[i].asset_class == 'LOCAL EQUITY'
      ) {
        this.myHoldings[i].displayFlag = true;
        this.isLocalEquityAssetDisplayed = true;
        // this.myHoldings[i].displayOrder = 3;
      }
      //Regional Equity Asset
      else if (
        !this.isRegionalEquityAssetDisplayed &&
        this.myHoldings[i].asset_class == 'REGIONAL EQUITY'
      ) {
        this.myHoldings[i].displayFlag = true;
        this.isRegionalEquityAssetDisplayed = true;
        // this.myHoldings[i].displayOrder = 4;
      }
      //Global Equity Asset
      else if (
        !this.isGlobalEquityAssetDisplayed &&
        this.myHoldings[i].asset_class == 'GLOBAL EQUITY'
      ) {
        this.myHoldings[i].displayFlag = true;
        this.isGlobalEquityAssetDisplayed = true;
        //this.myHoldings[i].displayOrder = 5;
      }
      //Alternatives Asset
      else if (
        !this.isAlternativesAssetDisplayed &&
        this.myHoldings[i].asset_class == 'ALTERNATIVES'
      ) {
        this.myHoldings[i].displayFlag = true;
        this.isAlternativesAssetDisplayed = true;
      }
      //  this.myHoldings[i].displayOrder = 6;
      // } else if (this.pagesArray.indexOf(i) > -1) {
      //   this.myHoldings[i].displayFlag = true;
      // } else {
      //   this.myHoldings[i].displayFlag = false;
      // }
    }
    return this.myHoldings;
  }
  openIndicativeAmountActionSheet(): void {
    this._bottomSheet.open(MobileTooltipComponent, {
      panelClass: 'tooltip-action-sheet',
      data: {
        actionHeading: 'Indicative Amount',
        actionContent:
          '<p>The Indicative Amount comes from multiplying the number of selected units by the current NAV price and excludes any charges. However, the actual amount may differ based on the closing NAV price. If you transact after 2pm, the closing price on the next business day will be used.</p>',
      },
    });
  }
  openSwitchActionSheet(): void {
    this._bottomSheet.open(MobileTooltipComponent, {
      panelClass: 'tooltip-action-sheet',
      data: {
        actionHeading: 'Switch',
        actionContent:
          '<p>Switch allows you to sell an existing fund’s units and buy new units from another fund in a single transaction.</p><p>Switching is faster as you do not have to wait to receive the money from your unit trust redemption before purchasing another fund. You can only switch funds within the same fund house.</p>',
      },
    });
  }
  openNAVactionSheet(): void {
    this._bottomSheet.open(MobileTooltipComponent, {
      panelClass: 'tooltip-action-sheet',
      data: {
        actionHeading: 'NAV Price',
        actionContent:
          '<p>Net Asset Value (NAV) price tells you how much one unit of a fund is worth as of the stated date.</p>',
      },
    });
  }
  openFundDetails(fund) {
    this.store.dispatch(uploadFundDetailSuccess({ fundDetail: JSON.parse(JSON.stringify(fund)) }));
    this.router.navigate(['available-funds/fund-detail']);
    this.loadAnalytisFundDetails(fund);
  }
  loadAnalytisFundDetails(fundDetails) {
    const day = getDayOfWeek();
    this.store.select(LandingPageSelector.selectLandingPageStatusState).subscribe((result) => {
      this.currentCustomerType = result?.landingPageStatus?.accountStatus === 'Y' || this.customerType === 'ETP' ? 'ETP' : 'NTP';
    });
    setOccuranceAndAnalyticsData(
      {
        wealthOccurence: 'wealth:funddetail'
      },
      {
        wealthAnalyticsData: {
          page: {
            category: {
              primaryCategory: 'Unit Trust Module',
              pageType: 'Content'
            },
            pageInfo: {
              pageName: 'Wealth: UT Fund Details',
              day: day
            }
          },
          user: {
            loginStatus: 'logged-in',
            customerType: this.currentCustomerType
          },
          product: {
            category: 'Unit Trust',
            fundCategory: fundDetails.risk_name,
            productName: fundDetails.fund_name,
            ID: fundDetails.fund_code
          }
        }
      }
    );
  }
  //Clear the asset class array once the sorting is done again
  clearAssetClassArray() {
    this.myHoldingsCash = [];
    this.myHoldingsFixedIncome = [];
    this.myHoldingsSorted = [];
    this.myHoldingsLocalEquity = [];
    this.myHoldingsRegionalEquity = [];
    this.myHoldingsGlobalEquity = [];
    this.myHoldingsAlternatives = [];
  }

  changeDisplayFlagOnSorting() {
    // cash
    for (let i = 0; i < this.myHoldingsCash.length; i++) {
      if (i == 0) {
        this.myHoldingsCash[i].displayFlag = true;
      } else {
        this.myHoldingsCash[i].displayFlag = false;
      }
      this.myHoldings.push(this.myHoldingsCash[i])
    }//Fixed Income
    for (let i = 0; i < this.myHoldingsFixedIncome.length; i++) {
      if (i == 0) {
        this.myHoldingsFixedIncome[i].displayFlag = true;
      } else {
        this.myHoldingsFixedIncome[i].displayFlag = false;
      }
      this.myHoldings.push(this.myHoldingsFixedIncome[i])
    }//Local Equity
    for (let i = 0; i < this.myHoldingsLocalEquity.length; i++) {
      if (i == 0) {
        this.myHoldingsLocalEquity[i].displayFlag = true;
      } else {
        this.myHoldingsLocalEquity[i].displayFlag = false;
      }
      this.myHoldings.push(this.myHoldingsLocalEquity[i])
    }//Regional Equity
    for (let i = 0; i < this.myHoldingsRegionalEquity.length; i++) {
      if (i == 0) {
        this.myHoldingsRegionalEquity[i].displayFlag = true;
      } else {
        this.myHoldingsRegionalEquity[i].displayFlag = false;
      }
      this.myHoldings.push(this.myHoldingsRegionalEquity[i])
    }//Global Equity
    for (let i = 0; i < this.myHoldingsGlobalEquity.length; i++) {
      if (i == 0) {
        this.myHoldingsGlobalEquity[i].displayFlag = true;
      } else {
        this.myHoldingsGlobalEquity[i].displayFlag = false;
      }
      this.myHoldings.push(this.myHoldingsGlobalEquity[i])
    }//Alternatives
    for (let i = 0; i < this.myHoldingsAlternatives.length; i++) {
      if (i == 0) {
        this.myHoldingsAlternatives[i].displayFlag = true;
      } else {
        this.myHoldingsAlternatives[i].displayFlag = false;
      }
      this.myHoldings.push(this.myHoldingsAlternatives[i])
    }
  }

  sortByAlphabetAtoZ() {
    this.isSortByAlphabetAtoZ = true;
    this.isSortByAlphabetZtoA = false;
    this.isSortByReturnPercentageHighToLow = false;
    this.isSortByReturnPercentageLowToHigh = false;
    this.isSortByReturnValueHighToLow = false;
    this.isSortByReturnValueLowToHigh = false;
    this.sortingValueChangeEvent.emit("sortByAlphabetAtoZ")
    this.changeDisplayFlagOnSorting();
  }


  sortByAlphabetZtoA() {
    this.isSortByAlphabetAtoZ = false;
    this.isSortByAlphabetZtoA = true;
    this.isSortByReturnPercentageHighToLow = false;
    this.isSortByReturnPercentageLowToHigh = false;
    this.isSortByReturnValueHighToLow = false;
    this.isSortByReturnValueLowToHigh = false;
    this.sortingValueChangeEvent.emit("sortByAlphabetZtoA")
    this.changeDisplayFlagOnSorting();
  }

  sortByReturnPercentageHighToLow() {
    this.isSortByAlphabetAtoZ = false;
    this.isSortByAlphabetZtoA = false;
    this.isSortByReturnPercentageHighToLow = true;
    this.isSortByReturnPercentageLowToHigh = false;
    this.isSortByReturnValueHighToLow = false;
    this.isSortByReturnValueLowToHigh = false;
    this.sortingValueChangeEvent.emit("sortByReturnPercentageHighToLow")
    this.changeDisplayFlagOnSorting();
  }

  sortByReturnPercentageLowToHigh() {
    this.isSortByAlphabetAtoZ = false;
    this.isSortByAlphabetZtoA = false;
    this.isSortByReturnPercentageHighToLow = false;
    this.isSortByReturnPercentageLowToHigh = true;
    this.isSortByReturnValueHighToLow = false;
    this.isSortByReturnValueLowToHigh = false;
    this.sortingValueChangeEvent.emit("sortByReturnPercentageLowToHigh")
    this.changeDisplayFlagOnSorting();
  }

  sortByReturnValueHighToLow() {
    this.isSortByAlphabetAtoZ = false;
    this.isSortByAlphabetZtoA = false;
    this.isSortByReturnPercentageHighToLow = false;
    this.isSortByReturnPercentageLowToHigh = false;
    this.isSortByReturnValueHighToLow = true;
    this.isSortByReturnValueLowToHigh = false;
    this.sortingValueChangeEvent.emit("sortByReturnValueHighToLow")
    this.changeDisplayFlagOnSorting();
  }

  sortByReturnValueLowToHigh() {
    this.isSortByAlphabetAtoZ = false;
    this.isSortByAlphabetZtoA = false;
    this.isSortByReturnPercentageHighToLow = false;
    this.isSortByReturnPercentageLowToHigh = false;
    this.isSortByReturnValueHighToLow = false;
    this.isSortByReturnValueLowToHigh = true;
    this.sortingValueChangeEvent.emit("sortByReturnValueLowToHigh")
    this.changeDisplayFlagOnSorting();
  }

  addToCartEvent(values): void {
    const index = parseInt(values.index);
    const fundItem = this.myHoldings[index];
    const fundStatus = fundItem.fund_status;
    const flow = values.flow;
    let currentFlowText = null;
    if (flow === '001') {
      currentFlowText = 'topup';
    } else if (flow === '002') {
      currentFlowText = 'redeem';
    } else if (flow === '003') {
      currentFlowText = 'switch';
    }
    if (fundStatus === "HO") {
      this.unableToTransact('NA')
    } else if ((fundStatus === "SO" || fundStatus === "SOHO") && flow !== '002' && flow !== '003') {
      this.unableToTransact('SOSOHO');
    } else {
      // if(currentFlowText && this.flowText && this.cartFundCount >= 1 && currentFlowText !== this.flowText){
      //     this.pendnigOtherTransactinCart(this.flowText, values.flow, values);
      // } else {
      this.addToCart.emit(values);
      // }
    }
    this.setAccountOptions(values, 'addTo')
  }

  // pendnigOtherTransactinCart(previousFlow, currentFlow, values) {
  //   let previousFlowText = null;
  //   if(previousFlow === 'topup'){
  //     previousFlowText = 'Purchase';
  //   }else if(previousFlow === 'redeem'){
  //     previousFlowText = 'Redeem';
  //   }else if(previousFlow === 'switch'){
  //     previousFlowText = 'Switch';
  //   }
  //   let currentFlowText = null;
  //   if(currentFlow === '001'){
  //     currentFlowText = 'Purchase';
  //   }else if(currentFlow === '002'){
  //     currentFlowText = 'Redeem';
  //   }else if(currentFlow === '003'){
  //     currentFlowText = 'Switch';
  //   }
  //   const dialogRef = this.dialog.open(DialogAlertComponent, {
  //     panelClass: ['custom-dialog', 'dialog-inverse-button'],
  //     maxWidth: '600px',
  //     autoFocus: false,
  //     backdropClass: 'backdrop-modal',
  //     data: {
  //       dialogImage: '<em class="icon-warning">',
  //       dialogHeading: 'Pending Transaction in Cart',
  //       dialogContent:
  //       '<p>You currently have a pending <strong>' +
  //         previousFlowText +
  //         '</strong> transaction in your cart. Adding a <strong>' +
  //         currentFlowText +
  //         '</strong> transaction to your cart will clear your cart.</p>'+
  //         '<p>Do you want to continue?</p>',
  //       dialogButtonCancel: true,
  //       dialogButtonCancelText: 'Cancel',
  //       dialogButtonProceed: true,
  //       dialogButtonProceedText: 'Yes, clear cart and continue',
  //     },
  //   });
  //   this.analyticService.loadPopUpAnalytics('Pending Transaction in Cart');
  //   //Calling dialog Cart
  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result === 'Yes, clear cart and continue') {
  //       this.clearAndAddNewToCart.emit(values);
  //     }
  //   });
  // }

  // to clear and add new flow type account options
  setAccountOptions(values, i) {
    // to clear and add new values to cart
    if (i === 'addNew') {
      this.accountOptionsGroup = this.myHoldings.map((j, e) => {
        if (values.index === e) {
          if (values.flow === '001') {
            return '1';
          } else if (values.flow === '002') {
            return '2'
          } else if (values.flow === '003') {
            return '3'
          }
        } else {
          return '1';
        }
      })
    }
    else if (i === 'addTo') {
      const flow = values.flow;
      // to add same flow type or new flow type to the existing cart 
      this.accountOptionsGroup = this.myHoldings.map((j, e) => {
        if (e == values.index) {
          if (flow === '001') {
            return '1';
          } else if (flow === '002') {
            return '2'
          } else if (flow === '003') {
            return '3'
          } else {
            return '1'
          }
        } else {
          if (j?.cart_list[0]?.cart_txn_type === '01' && flow === '001') {
            return '1';
          } else if (j?.cart_list[0]?.cart_txn_type === '02' && flow === '002') {
            return '2'
          } else if (j?.cart_list[0]?.cart_txn_type === '03' && flow === '003') {
            return '3'
          } else {
            return '1'
          }
        }

      })
    }
  }
  
  clearAndAddNewToCartEvent(values) {
    this.redeemValue = values;
    this.clearAndAddNewToCart.emit(values);
    this.setAccountOptions(values, 'addNew')
  }

  clearAndAddNewToCartTopupEvent(values) {
    this.topupValue = values;
    this.clearAndAddNewToCart.emit(values);
    this.setAccountOptions(values, 'addNew');
  }

  unableToTransact(value) {
    let msg = '<p>We are sorry to inform you that this fund is no longer eligible for purchase.</p>';
    if (value === 'SOSOHO') {
      msg = '<p>We are sorry to inform you that only redeem is allowed for this fund at the moment.</p>';
    }
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


  removeFromCartEvent(indexVal): void {
    this.removeFromCart.emit(indexVal);
  }

  public trackItem(index: number) {
    return index;
  }


  redeemSliderValueChangeEvent(value): void {
    this.redeemAmount = value;
    // this.redeemSliderValueChange.emit(value);
  }

  calculateIndicativeRate(redeemInput, item): void {
    this.indicativeAmount = redeemInput * item.nav_price
    const cloneItem = JSON.parse(JSON.stringify(item))

    cloneItem.indicativeAmount = this.indicativeAmount;
    item = cloneItem;
  }

  goToConsumerContactCentreLink() {
    window.open("https://www.cimb.com.my/en/personal/help-support/contact-us.html", "_blank");
  }

  updateAmountInCartTopUpEvent(value) {
    this.updateAmountInCartTopUp.emit(value);
  }

  openBottomSheet() {
    this._bottomSheet.open(MobileTooltipComponent, {
      panelClass: 'tooltip-action-sheet',
      data: {
        actionHeading: 'Fund Holiday',
        actionContent:
          '<p>The fund is currently not available due to the fund holiday declared by the fund house. Pricing of the fund will resume on the next business day for the fund.</p>',
      },
    });
  }

  onTransactionGroupChange(event) {
    // console.log(event);
  }

  updateRedeem(event) {
    this.updateCartDataInRedeem.emit(event);
  }

  sortHoldingInAlphabeticalOrderAtoZ(myHoldings): boolean {
    this.currentHolding = myHoldings;
    this.groupHoldindsToAssetClassType()
    for (let i = 0; i < this.myHoldingsCash.length; i++) {
      this.myHoldingsCash.sort((a, b) => a.fund_name.localeCompare(b.fund_name));
    }
    for (let i = 0; i < this.myHoldingsLocalEquity.length; i++) {
      this.myHoldingsLocalEquity.sort((a, b) => a.fund_name.localeCompare(b.fund_name));
    }
    for (let i = 0; i < this.myHoldingsFixedIncome.length; i++) {
      this.myHoldingsFixedIncome.sort((a, b) => a.fund_name.localeCompare(b.fund_name));
    }
    for (let i = 0; i < this.myHoldingsGlobalEquity.length; i++) {
      this.myHoldingsGlobalEquity.sort((a, b) => a.fund_name.localeCompare(b.fund_name));
    }
    for (let i = 0; i < this.myHoldingsRegionalEquity.length; i++) {
      this.myHoldingsRegionalEquity.sort((a, b) => a.fund_name.localeCompare(b.fund_name));
    }
    for (let i = 0; i < this.myHoldingsAlternatives.length; i++) {
      this.myHoldingsAlternatives.sort((a, b) => a.fund_name.localeCompare(b.fund_name));
    }

    this.currentHolding = [];
    for (let i = 0; i < this.myHoldingsCash.length; i++) {
      this.currentHolding.push(this.myHoldingsCash[i]);
    }
    for (let i = 0; i < this.myHoldingsFixedIncome.length; i++) {
      this.currentHolding.push(this.myHoldingsFixedIncome[i]);
    }
    for (let i = 0; i < this.myHoldingsLocalEquity.length; i++) {
      this.currentHolding.push(this.myHoldingsLocalEquity[i]);
    }
    for (let i = 0; i < this.myHoldingsRegionalEquity.length; i++) {
      this.currentHolding.push(this.myHoldingsRegionalEquity[i]);
    }
    for (let i = 0; i < this.myHoldingsGlobalEquity.length; i++) {
      this.currentHolding.push(this.myHoldingsGlobalEquity[i]);
    }
    for (let i = 0; i < this.myHoldingsAlternatives.length; i++) {
      this.currentHolding.push(this.myHoldingsAlternatives[i]);
    }
    return true;
  }

  groupHoldindsToAssetClassType() {
    this.clearAssetClassArray();
    for (let i = 0; i < this.currentHolding.length; i++) {
      //Cash Asset
      if (this.currentHolding[i].class_seq == 1) {
        this.myHoldingsCash.push(this.currentHolding[i]);
      } //Fixed Income Asset
      else if (this.currentHolding[i].class_seq == 2) {
        this.myHoldingsFixedIncome.push(this.currentHolding[i]);
      } //Local Equity Asset
      else if (this.currentHolding[i].class_seq == 3) {
        this.myHoldingsLocalEquity.push(this.currentHolding[i]);
      } //Regional Equity Asset
      else if (this.currentHolding[i].class_seq == 4) {
        this.myHoldingsRegionalEquity.push(this.currentHolding[i]);
      } //Global Equity Asset
      else if (this.currentHolding[i].class_seq == 5) {
        this.myHoldingsGlobalEquity.push(this.currentHolding[i]);
      } //Alternatives Asset
      else if (this.currentHolding[i].class_seq == 6) {
        this.myHoldingsAlternatives.push(this.currentHolding[i]);
      }
    }
  }

  ngOnDestroy(): void {
    this.dialog.closeAll();
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
