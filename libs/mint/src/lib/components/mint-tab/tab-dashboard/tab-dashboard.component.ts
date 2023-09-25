import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAlertComponent } from '../../mint-dialog/dialog-alert/dialog-alert.component';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Subject } from 'rxjs';
import { getDayOfWeek } from './../../../utils/date/date.util';
import { setOccuranceAndAnalyticsData } from './../../../utils/analytics/adobe-analytics.utils';
import { AnalyticService } from '@cimb/shared/services';
import { Store } from '@ngrx/store';
import { MintDialogService } from '../../mint-dialog';
import * as fromStore from '../../../../../../../apps/self-serve/src/app/core/state/reducers';

@Component({
  selector: 'cimb-tab-dashboard',
  templateUrl: './tab-dashboard.component.html',
  styleUrls: ['./tab-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabDashboardComponent implements OnInit, OnChanges {
  @Input() dashBoard;
  @Input() dashboardFlow;
  @Input() account = [];
  @Input() selectedAccount = "";
  @Input() myHoldings;
  @Input() pageNumber;
  @Input() myHoldingsLength;
  @Input() solePropIndicator;
  @Input() portfolioDatalist;
  @Input() flowText;
  @Input() cartFundCount = 0;
  @Input() selectedTabIndex = 0;
  @Input() purchaseDetailData;
  @Input() selectedUnittrustAccountNumber;
  @Input() selectedAccounts;
  @Input() casaIndicator;
  @Input() cimbStaff: 'N';
  @Input() joinOrUtAccountIndicator: 'N';
  @Input() joinAndUtAccountIndicator: false;
  @Input() flowObj = '01';
  @Output() addToCart: EventEmitter<any> = new EventEmitter();
  @Output() removeFromCart: EventEmitter<any> = new EventEmitter();
  @Output() accountListChange: EventEmitter<any> = new EventEmitter();
  @Output() clearAndAddNewToCartCall: EventEmitter<any> = new EventEmitter();
  @Output() selectAccountChange : EventEmitter<any> = new EventEmitter();
  @Output() updateAmountInCart: EventEmitter<any> = new EventEmitter();
  @Input() accountOptions = '1';
  @Input() unitTrustAccountNumberChanged;
  @Input() cartUTAccount = "";
  @Input() transactionProcessingIndicator;
  @Input() r2Enabled: false;
  @Input() customerType =" ";

  @Output() updateRedeemAmount: EventEmitter<any> = new EventEmitter();

  //selectedAccount="";
  chosenItem = '';
  addNewInvestment = 'Add New Investment';
  pages: number;
  showingStarts = 1;
  showingEnds: number;
  pageSize = 10;
  pageSizeMax = 10;
  clickedAccount;
  portfolioAccountTemp = [];
  //dateFilteredPurchaseDetailData= [];
  @Output() dateFilteredPurchaseDetailData: EventEmitter<any> = new EventEmitter();
  maximumUnitSlider = 9999999999999999999;
  @Output() pageValueChangeEvent: EventEmitter<any> = new EventEmitter();
  @Output() sortingChangeEvent: EventEmitter<any> = new EventEmitter();
  @Output() clearCartAndContinueEvent: EventEmitter<any> = new EventEmitter();
  @Output() tabChangeEvent : EventEmitter<any> = new EventEmitter();
   @Output() selectedAccountDialogCart: EventEmitter<any> = new EventEmitter();

  @ViewChild('tabGroup') tabGroup;
  clearAllDataHoldingList: Subject<boolean> = new Subject();

  currentPageNumberTransHistory = 1;
  itemsPerPageTransHistory = 10;
  currentPageNumberMyHoldings = 1;
  itemsPerPageMyHoldings = 10;
  tabClickCount = 0;
  @Input() foreignerInd = 'N';
  @Input() occupationInd = 'N';

  isEmptyTransactionHistory = false;

  @Input() isTransactionDataLoaded = false

  // Booleans for Settings
  @Input() addNewInvestmentEnabled: boolean;
  @Input() enableAddToCartForTopup: boolean;
  @Input() enableAddToCartInRedeemTnx: boolean;
  @Input() enableAddToCartInSwitchTnx: boolean;
  @Input() enableRedeemAtInvestmentDashboard: boolean;
  @Input() enableSwitchAtInvestmentDashboard: boolean;
  @Input() amlCheckResult;
  constructor(
    public dialog: MatDialog, 
    private store: Store<fromStore.AppState>,
        private analyticService: AnalyticService,
    private mintDialogService: MintDialogService
  ) {}

  ngOnInit(): void {
    if(this.myHoldingsLength === undefined){
      this.myHoldingsLength =1;
    }
    // this.paginate(
    //   this.myHoldingsLength,
    //   this.showingStarts,
    //   this.pageSize,
    //   this.pageSizeMax
    // );
    const day = getDayOfWeek();    
    setOccuranceAndAnalyticsData(
      {
        wealthOccurence: 'wealth:allpage'
      },
      {
        wealthAnalyticsData: {
          page: {
            category: {
              primaryCategory: 'Unit Trust Module',
              subCategory1:'My Holdings',
              pageType: 'Dashboard Summary'
            },
            pageInfo: {
              pageName:'Wealth: Unit Trust Dashboard',
              day: day              
            }
          },
          user: {
            loginStatus:'logged-in',
            memberLoginType:'repeat',
            customerType: this.customerType            
          }   
        }
      }
    );    
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.tabClickCount++;
    this.selectedTabIndex = this.tabGroup.selectedIndex
    if(this.tabClickCount==1 && this.selectedTabIndex==1)
    {
      this.loadAdobeAnalytics();
    }
    this.tabChangeEvent.emit(this.selectedTabIndex)
  }
  loadAdobeAnalytics(){
    const day = getDayOfWeek();    
    setOccuranceAndAnalyticsData(
      {
        wealthOccurence: 'wealth:tab-view'
      },
      {
        wealthAnalyticsData: {
          page: {
            category: {
              primaryCategory: 'Unit Trust Module',
              subCategory1:'Transaction History',
              pageType: 'Dashboard Summary'
            },
            pageInfo: {
              pageName:'Wealth: Unit Trust Dashboard',
              day: day              
            }
          },
          user: {
            loginStatus:'logged-in',
            memberLoginType:'repeat'            
          },
          button:''   
        }
      }
    );
  }
  dialogSetPrimary() {
    const dialogRef = this.dialog.open(DialogAlertComponent, {
      panelClass: ['custom-dialog', 'dialog-inverse-button'],
      maxWidth: '600px',
      autoFocus: false,
      backdropClass: 'backdrop-modal',
      data: {
        dialogHeading: 'Change Primary Unit Trust Account',
        dialogContent:
          '<p>Are you sure you want to change your primary unit trust account to <strong> '+this.selectedAccount+'</strong>? This will be the default Unit Trust account shown in your Dashboard. </p>',
        dialogButtonCancel: true,
        dialogButtonCancelText: 'Cancel',
        dialogButtonProceed: true,
        dialogButtonProceedText: 'Update',
        dialogImage:
          '<img src="./assets/images/transaction.svg" alt="Change Primary Unit Trust Account" />',
      },
    });
    // Calling dialog Minimum Holding
    dialogRef.afterClosed().subscribe((result) => {
      if (result ==='proceed') {
       // this.dialogMinHolding();
      }
    });
  }
  dialogMinHolding() {
    const dialogRef = this.dialog.open(DialogAlertComponent, {
      panelClass: ['custom-dialog', 'dialog-inverse-button'],
      maxWidth: '600px',
      autoFocus: false,
      backdropClass: 'backdrop-modal',
      data: {
        dialogHeading: 'Minimum Holding Requirement',
        dialogContent:
          '<p>This investment requires a minimum holding of <strong>1,000</strong> units. You may choose to redeem all or change redemption units to meet this requirement.</p>',
        dialogButtonCancel: true,
        dialogButtonCancelText: 'Change Redemption units',
        dialogButtonProceed: true,
        dialogButtonProceedText: 'Redeem all & add to cart',
        dialogImage: '<em class="icon-danger"></em>',
      },
    });
    this.analyticService.loadPopUpAnalytics('Minimum Holding Requirement');
    // Calling dialog Minimum Holding
    dialogRef.afterClosed().subscribe((result) => {
      if (result ==='proceed') {
        this.dialogRedemption();
      }
    });
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
        dialogButtonCancel: false,
        dialogButtonCancelText: 'Close',
        dialogButtonProceed: true,
        dialogButtonProceedText: 'View Transaction History',
      },
    });
    // Calling dialog Cart
    dialogRef.afterClosed().subscribe((result) => {
      if (result ==='proceed') {
        this.dialogCart();
      }
    });
  }

  dialogCart() {
    const dialogRef = this.mintDialogService.showPendingTransactionInOtherAccountDialog(this.cartUTAccount);


    dialogRef.afterClosed().subscribe((result) => {
      if (result ==='Yes, clear cart and continue') {
        this.clearAllDataHoldingList.next(true);
        this.clearCartAndContinueEvent.emit(this.clickedAccount);
        this.selectAccountChange.emit(this.clickedAccount);
      }else{
        this.rollbackSelection(this.selectedAccount);
      }
    });
  }

  rollbackSelection(val) {
    if (val) {
       this.portfolioAccountTemp = [];

      const accList = [...this.account];
      let listItem;
      if (accList && accList.length >= 1) {
        for (let m = 0; m < accList.length; m++) {
          listItem = { ...accList[m] };
          if (listItem.ut_account_no === val) {
            listItem.default_ind = 'Y';

          } else {
            listItem.default_ind = 'N';
          }
          this.portfolioAccountTemp.push(listItem);
        }
        this.account =  this.portfolioAccountTemp;
        this.selectedAccount = val;
      }
    }
  }

  // pageValueChanged(pageNumber) {
  //   this.pages = pageNumber;
  //   this.unitTrustAccountNumberChanged = false;
  //   this.pageNumber = pageNumber;
  //   this.paginate(
  //     this.myHoldingsLength,
  //     pageNumber,
  //     this.pageSize,
  //     this.pageSizeMax
  //   );

  //   this.pageValueChangeEvent.emit(this.pages);
  // }

  ngOnChanges(changes: SimpleChanges) {
    if(changes && changes.myHoldingsLength && changes.myHoldingsLength.currentValue){
      this.myHoldingsLength = changes.myHoldingsLength.currentValue;
    }
    if(changes && changes.myHoldings) {
      this.myHoldings = changes.myHoldings.currentValue;
      if(this.myHoldings != undefined) {
        this.unitTrustAccountNumberChanged = this.myHoldings.unitTrustAccountNumberChanged;

        //reset page numbers when switching UT accounts
        this.currentPageNumberMyHoldings = 1;
        this.currentPageNumberTransHistory = 1;
      }
    }

    //If the account number is changed, change the funds in the list + write pagination for it
    // if(this.pageNumber === 1 || this.pageNumber === undefined || this.unitTrustAccountNumberChanged) {
    //   this.paginate(this.myHoldingsLength,this.showingStarts,this.pageSize,this.pageSizeMax);
    // }
  }
  sortingValueChangeEvent(sortingType) {
    this.sortingChangeEvent.emit(sortingType);
  }

  // paginate(
  //   totalItems: number,
  //   currentPage: number = 1,
  //   pageSize: number = 10,
  //   maxPages: number = 10
  // ) {
  //   // calculate total pages
  //   const totalPages = Math.ceil(totalItems / pageSize);
  //   // ensure current page isn't out of range
  //   if (currentPage < 1) {
  //     currentPage = 1;
  //   } else if (currentPage > totalPages) {
  //     currentPage = totalPages;
  //   }

  //   let startPage: number, endPage: number;
  //   if (totalPages <= maxPages) {
  //     // total pages less than max so show all pages
  //     startPage = 1;
  //     endPage = totalPages;
  //   } else {
  //     // total pages more than max so calculate start and end pages
  //     const maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
  //     const maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
  //     if (currentPage <= maxPagesBeforeCurrentPage) {
  //       // current page near the start
  //       startPage = 1;
  //       endPage = maxPages;
  //     } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
  //       // current page near the end
  //       startPage = totalPages - maxPages + 1;
  //       endPage = totalPages;
  //     } else {
  //       // current page somewhere in the middle
  //       startPage = currentPage - maxPagesBeforeCurrentPage;
  //       endPage = currentPage + maxPagesAfterCurrentPage;
  //     }
  //   }

  //   // calculate start and end item indexes
  //   const startIndex = (currentPage - 1) * pageSize;
  //   const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

  //   // create an array of pages to ng-repeat in the pager control
  //   // eslint-disable-next-line
  //   const pages = Array.from(Array(endPage + 1 - startPage).keys()).map(
  //     (i) => startPage + i
  //   );

  //   this.showingStarts = startIndex + 1;
  //   this.showingEnds = endIndex + 1;
  //   if(isNaN(this.showingEnds) || this.showingEnds === undefined){
  //     this.showingEnds = this.showingStarts;
  //   }
  // }

  addToCartEvent(values): void {
    this.addToCart.emit(values);
  }

  removeFromCartEvent(indexVal): void {
    this.removeFromCart.emit(indexVal);
  }

  clearAndAddNewToCartEvent(value): void {
    this.clearAndAddNewToCartCall.emit(value);
  }

  accountListChangeEvent(value) {
    this.clickedAccount  = value;
    // if(this.cartUTAccount !== value && this.cartFundCount > 0){
    //   this.dialogCart();
    // }else {
      this.accountListChange.emit(this.clickedAccount);
      this.selectAccountChange.emit(value);
    //}
  }


  selectedAccountChangeEvent(value) {
    this.clickedAccount  = value;
    //this.selectAccountChange.emit(value)
  }

  dateFilteredPurchaseDetailDataEvent(event) {
    //resets page number when changing date range picker
    this.currentPageNumberTransHistory = 1;

    this.dateFilteredPurchaseDetailData.emit(event);
    //this.purchaseDetailData = event;
  }


  updateAmountInCartTopUpEvent(value){
    this.updateAmountInCart.emit(value);
   }

   selectedAccountDialogCartEvent(event) {
    this.accountListChange.emit(event);
   }
  
  updateAmountInRedeemEvt(event) {
    this.updateRedeemAmount.emit(event);
  }
}

