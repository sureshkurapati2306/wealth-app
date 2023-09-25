import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, Subscription } from 'rxjs';
import { AppService } from '../../core/services/app.service'
import * as fromStore from '../../core/state/reducers';
import * as CartActions from '../../core/state/cart/cart.actions';
import { setEventAndDigitalData, getDayOfWeek, getTimeOfDay } from '@cimb/common';
import { CartDetails } from '../../core/model/cart_info.models';
import { MatDialog } from '@angular/material/dialog';
import { DialogCsatSurveyComponent } from 'libs/mint/src/lib/components/mint-dialog/dialog-csat-survey/dialog-csat-survey.component';
import * as CSATSurveyActions from '../../core/state/csat-survey/csat-survey.actions';
import * as CSATSuveySelector from '../../core/state/csat-survey/csat-survey.selectors';
import { CSATSurvey } from '../../core/model/csat-survey.model';
import { skip, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'cimb-purchase-summary',
  templateUrl: './purchase-summary.component.html',
  styleUrls: ['./purchase-summary.component.scss'],
})
export class PurchaseSummaryComponent implements OnInit, OnDestroy {
  pageTitle = 'Purchase Request Completed';
  isBackButtonEnabled = false;

  message = 'Your transaction request has been placed with us succesfully';
  accountName = '';
  unitTrustAccount = '';
  paymentAccount;
  referenceNumber = '';
  status = 'Pending Processing';
  dateTime = '';
  transactionStatusName = '';
  csatSurveyObservable$: Observable<CSATSurvey>;
  investments: any[];
  private unsubscribeAll: Subject<any> = new Subject<any>();
  cardTitle = 'Order Summary';

  totalInvestmentItems;

  cardTitleTotal = 'Total';

  totalFundValue;
  totalNetInvestmentAmountValue;
  totalSalesChargeValue;

  totalFund: number;
  totalSalesCharge: number;
  totalNetInvestmentAmount: number;
  totalAmount: number;

  phoneNumber = '+60 xxxxx0900';

  cardAccountTitle = 'Select Payment Account';
  cardAccountSelectionPlaceholder = 'Select Payment Account';

  cardTtileSelectedInvestment = 'Selected Investment';

  cartData: any;
  cartObservable: Observable<any>;
  subscription: Subscription;
  totalAmountVal = '0.00';
  totalFundsCountVal = 0;
  highRiskCount = 0;

  hasRedeemOption = false;

  userData: any;
  userObj: any;
  userObservable: Observable<any>;
  userSubscription: Subscription;
  noProgressStep: boolean;
  currentCustomerType = 'ETP'

  flow = 'topup';
  totalRedemptionUnits = 0;
  totalRedemptionAmount = 0;
  totalSwitchOutUnits = 0;
  totalSwitchInUnits = 0;
  cimbStaffs = 'N';
  currentUrl: any;
  customerType = '';
  cartDetails: CartDetails[] = [];
  constructor(
    private router: Router,
    private store: Store<fromStore.AppState>,
    private appService: AppService,
    public dialog: MatDialog,
  ) {
    this.currentUrl = this.appService.getPreviousUrl();
  }
  ngOnInit(): void {
    this.loadData();

    if (this.flow === '001') {
      const pageName = 'Wealth: UT Purchase Complete';
      const type = 'Unit Trust Purchase';
      this.loadPurchaseAdobeAnalytics(pageName, type);
    } else if (this.flow === '002') {
      const pageName = 'Wealth: UT Redeem Complete';
      const type = 'Unit Trust Redemption';
      this.loadPurchaseAdobeAnalytics(pageName, type);
    } else if (this.flow === '003') {
      this.loadSwitchAdobeAnalytics();
    }
    this.store.dispatch(
      new CartActions.ToggleCartFooter(
        false
      )
    );

    this.store.dispatch(
      new CartActions.ToggleCartIconHeader(
        false
      )
    );
  }
  loadPurchaseAdobeAnalytics(pageName, type) {
    const day = getDayOfWeek();
    const dayTime = getTimeOfDay();
    setEventAndDigitalData(
      {
        wealthEvent: 'wealth:complete'
      },
      {
        wealthDigitalData: {
          page: {
            category: {
              primaryCategory: 'Unit Trust Module',
              pageType: 'Completion'
            },
            pageInfo: {
              pageName: pageName,
              day: day
            }
          },
          user: {
            loginStatus: 'logged-in',
            customerType: this.currentCustomerType
          },
          sales: {
            saleStatus: this.status,
            salesVolume: this.flow === '002' ? '' : this.totalAmountVal,
            salesEndTime: dayTime,
            type: type
          },
          product: this.cartDetails,
          cart: {
            quantity: this.totalFundsCountVal
          }
        }
      }
    )
  }
  loadSwitchAdobeAnalytics() {
    const day = getDayOfWeek();
    const dayTime = getTimeOfDay();
    setEventAndDigitalData(
      {
        wealthEvent: 'wealth:complete'
      },
      {
        wealthDigitalData: {
          page: {
            category: {
              primaryCategory: 'Unit Trust Module',
              pageType: 'Completion'
            },
            pageInfo: {
              pageName: 'Wealth: UT Switch Complete',
              day: day
            }
          },
          user: {
            loginStatus: 'logged-in',
            customerType: this.currentCustomerType
          },
          sales: {
            saleStatus: this.status,
            salesEndTime: dayTime,
            salesVolume: '',
            type: 'Unit Trust Switching'
          },
          product: this.cartDetails,
          cart: {
            quantity: this.totalFundsCountVal
          }
        }
      }
    )
  }
  ngOnDestroy(): void {
    this.clearCart();
    this.store.dispatch(
      new CartActions.ToggleCartFooter(
        true
      )
    );
    this.store.dispatch(
      new CartActions.ToggleCartIconHeader(
        true
      )
    );
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }

  loadData(): boolean {
    this.cartObservable = this.store.select('cartReducer');
    this.subscription = this.cartObservable.subscribe((data) => {

      this.cartData = data;
      this.updateData(data);
    });

    this.userObservable = this.store.select('userReducer');
    /* istanbul ignore next */  //Used to ignore the next line in spec. Dont remove this line.
    this.userSubscription = this.userObservable.subscribe((users) => {
      this.userData = users;
      this.userObj = this.userData.user;
      this.customerType = this.userData.userType;
      this.accountName = users.customer_name;
      this.cimbStaffs = this.userObj.cimb_staff;
      this.checkIfNTP(users.userType);
    });

    return true;
  }

  updateData(data): boolean {
    if (data) {
      this.unitTrustAccount = data.unitTrustAccount ? data.unitTrustAccount : null;
      this.totalAmountVal = data.totalAmount.toString();
      this.totalFundsCountVal = data.totalFundsCount;
      this.highRiskCount = data.higherRiskFundCategory;

      this.investments = data.fundList;

      const len = this.investments ? this.investments.length : -1;
      if (this.investments && len >= 1) {
        for (let i = 0; i < len; i++) {
          const postParamObj = this.investments[i];
          this.cartDetails[i] = {
            productName: this.flow === '003' ? postParamObj.to_fund_name : postParamObj.fund_name, fundShariah: this.updateDataFundShariah( this.flow, postParamObj), fundClass: this.flow === '003' ? postParamObj.to_fund_class_name : postParamObj.class_name,
            productID: this.flow === '003' ? postParamObj.toFundCode : postParamObj.fund_code, totalValue: this.flow === '003' ? postParamObj.totalNetAmount : postParamObj.card_amount,
            category: 'Unit Trust', fundCategory: this.flow === '003' ? postParamObj.to_fund_risk_name : postParamObj.risk_name, price: postParamObj.nav_price
          }
        }
      }

      this.totalFund = data.totalFundsCount;
      this.totalAmount = data.totalAmount;
      this.totalSalesCharge = data.totalSalesCharges;
      this.totalNetInvestmentAmount = data.totalNetInvestmentAmount;

      this.dateTime = data.transactionDate;
      this.paymentAccount = data.paymentAccount;
      this.referenceNumber = data.referenceNumber;
      this.message = data.transactionStatus;
      this.status = data.transactionStatusText;
      this.transactionStatusName = data.transactionStatusName;
      this.flow = data.flow;
      this.hasRedeemOption = data.flow_text === 'redeem' ? true : false;
      this.totalRedemptionUnits = data.total_redemption_units;
      this.totalRedemptionAmount = data.total_redemption_amount;
      this.totalSwitchOutUnits = data.total_switch_out_units;
      this.totalSwitchInUnits = data.total_switch_in_units;
      if (this.flow === '002') {
        this.pageTitle = 'Redemption Request Completed';
      } else if (this.flow === '003') {
        this.pageTitle = 'Switch Request Completed';
      }

      this.cardTitle = this.totalFundsCountVal > 1 ? 'Transaction Summary (' + this.totalFundsCountVal + ' Funds)' : 'Transaction Summary (' + this.totalFundsCountVal + ' Fund)';

    }

    return true;
  }

  updateDataFundShariah(flow: string, postParamObj: any): string {
    if (flow === '003') {
      if (postParamObj.to_fund_indicator === 'I') {
        return 'Islamic';
      } else {
        return postParamObj.to_fund_indicator;
      }
    } else {
      if (postParamObj.fund_indicator === 'I') {
        return 'Islamic';
      } else {
        return postParamObj.fund_indicator;
      }
    }
  }

  goToDesiredPage(page) {
    this.store.dispatch(CSATSurveyActions.loadCSATSurvey());
    this.csatSurveyObservable$ = this.store.select(CSATSuveySelector.selectCSATSurveyPopup);
    this.csatSurveyObservable$.pipe(skip(1),
      takeUntil(this.unsubscribeAll)).subscribe((result) => {
        if (result.dashboardPrompterRequired && result.allowSurvey) {
          this.openFeedbackSurveyDialog(result, page);
        } else {
          this.redirectPage(page);
        }
      });
  }

  openFeedbackSurveyDialog(data, page) {
    const dialogSurvey = this.dialog.open(DialogCsatSurveyComponent, {
      panelClass: ['custom-dialog', 'dialog-inverse-button'],
      maxWidth: '600px',
      autoFocus: false,
      backdropClass: 'backdrop-modal',
      disableClose: true,
      data: data
    });
    dialogSurvey.afterClosed().subscribe(() => {
      this.redirectPage(page);
    });
  }

  redirectPage(page) {
    this.clearCart();
    if (page === 'dashboard') {
      this.router.navigate(['/dashboard', { tab: 0 }]);
    } else if (page === 'transactionHistory') {
      this.router.navigate(['/dashboard', { tab: 1 }]);
    }
  }

  clearCart(): boolean {
    this.store.dispatch(new CartActions.ClearCart(true));

    return true;
  }
  backButtonEvent() {
    if (this.currentUrl === "/dashboard;tab=0") {
      this.currentUrl = '/dashboard';
    }
    this.router.navigate([this.currentUrl]);
  }

  checkIfNTP(userType: string) {
    if (userType === "NTP") {
      this.noProgressStep = true;
    } else {
      this.noProgressStep = false;
    }
  }
}
