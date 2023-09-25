import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { AppService } from '../../core/services/app.service';
import * as fromStore from '../../core/state/reducers';
import * as CartActions from '../../core/state/cart/cart.actions';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';

import { DialogAlertComponent } from '@cimb/mint';
import { CartService } from '../../core/services/cart/cart.service';
import { Dashboard } from '../../core/model/dashboard.model';
import * as LandingPageSelector from 'apps/self-serve/src/app/core/state/landing-page/landing-page.selectors';
import * as LandingPageActions from 'apps/self-serve/src/app//core/state/landing-page/landing-page.actions';
import { InvestmentStatus, LandingPageStatus } from '../../core/model/landing-page-status.model';
import { getDayOfWeek, setEventAndDigitalData, getTimeOfDay } from '@cimb/common';
import { AnalyticService } from '@cimb/shared/services';
import { BankAccount } from '../../core/model/customerDetail.model';
import { Setting, SettingsUid } from '@cimb/shared/models';
import * as WealthDashboardSelectors from '../../../../../../apps/self-serve/src/app/core/state/wealth-dashboard/wealth-dashboard.selectors';
import * as WealthDashboardActions from '../../../../../../apps/self-serve/src/app/core/state/wealth-dashboard/wealth-dashboard.actions'
import { EventService } from '@cimb/core';

@Component({
  selector: 'cimb-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  cartData: any;
  cartObservable: Observable<any>;
  carstSubscription: Subscription;
  totalAmountVal = '0.00';
  totalFundsCountVal = 0;
  highRiskCount = 0;
  flowText = null;

  switchInhighRiskCount = 0;
  pageTitle = 'My Cart';
  isBackButtonEnabled = true;

  investments;

  unitTrustAccount = null;

  totalFund = 0;

  totalSalesCharge = 0.0;

  totalNetInvestmentAmount = 0.0;

  totalAmount = 0.0;

  hasRedeemOption = false;

  userObservable: Observable<any>;
  userSubscription: Subscription;
  userType: string;

  dashboardObservable$: Observable<any>;
  dashboardSubscription: Subscription;
  dashboardData: Dashboard;

  unitRiskProfile = '';
  userData;
  riskFundList = [];
  taxCalculationFailedFundList = [];
  taxCalculationFailedPopShow = false;
  totalRedemptionUnits = 0;
  totalRedemptionAmount = 0;
  totalSwitchOutUnits = 0;
  totalSwitchInUnits = 0;
  flow = null;
  pageSectionTitle = 'Purchase Summary';
  casa_indicator = 'N';
  disableProceedToCheckoutValue = false;
  disableProceedToCheckoutTaxValue = false;
  isEditingCartItem = false;
  customerID = null;
  cimbStaff = 1;
  currentUrl: string;
  schedulerMsg = 'Transactions performed after 2pm will be executed the next business day';
  pageExistDone = false;
  landingPageStatus: LandingPageStatus;
  customerType = '';
  documentIndicatorFundList = [];
  documentIndicatorShow = false;
  accountLists: BankAccount[];
  holdingFundList = [];
  showViewInvestmentOption = false;
  progressStepEnabled: boolean;
  userDetails;
  fundStatusIndicatorList: Array<any>;
  disableCheckoutButton = false;
  currentCustomerType = 'NTP';

  isFundOnHoliday = false;
  disableProceedToCheckoutFundStatus = false;

  cartDetailFundCount = 0;

      // Settings Data
      settingsData: Setting[];

      // Uid For Settings
      enableProceedToCheckOutInPurchaseTnxSettingUid = SettingsUid.PURCHASE_TRANSACTION_IN_CART;
      enableRedeemTransationAtCartSettingUid = SettingsUid.REDEEM_TRANSACTION_AT_CART;
      enableSwitchTransactionAtCartSettingsUid = SettingsUid.SWITCH_TRANSACTION_AT_CART;
    
      // Booleans for Settings
      enableProceedToCheckOutInPurchaseTnx = true;
      enableRedeemTransationAtCart = true;
      enableSwitchTransactionAtCart = true;
    

  constructor(
    private router: Router,
    private _location: Location,
    private store: Store<fromStore.AppState>,
    public dialog: MatDialog,
    private cartService: CartService,
    private appService: AppService,
    private analyticService: AnalyticService,
    private _eventService: EventService,
  ) {
    this.currentUrl = this.appService.getPreviousUrl();
  }

  ngOnInit(): void {
    this.store.dispatch(WealthDashboardActions.settingsData());
    this.getNdSetSettings();
    this.store.dispatch(new CartActions.ToggleCartFooter(false));
    this.store.dispatch(new CartActions.ToggleCartIconHeader(false));
    this.disableProceedToCheckoutValue = false;
    this.disableProceedToCheckoutFundStatus = false;
    this.disableProceedToCheckoutTaxValue = false;
    this.isEditingCartItem = false;
    this.pageExistDone = false;
    this.cartObservable = this.store.select('cartReducer');
    /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
    this.loadData();
    this.carstSubscription = this.cartObservable.subscribe((data) => {
      this.cartData = data;
      try {
        if (data) {
          this.updateCartData(JSON.parse(JSON.stringify(data)));
          this.updateLandingPageStatus(JSON.parse(JSON.stringify(data)));
        }
      } catch (e) {
        // console.log("loadData :: ",e);
      }
    });
    if (this.flow === '001') {
      const wealthEvent = 'wealth:sales-start';
      this.loadPurchaseAdobeAnalytics(wealthEvent);
    } else if (this.flow === '002') {
      const pageName = 'Wealth: UT Redeem Cart';
      const salesType = 'Unit Trust Redemption';
      this.loadRedeemSwitchAdobeAnalytics(pageName, salesType);
    } else if (this.flow === '003') {
      const pageName = ' Wealth: UT Switch Cart';
      const salesType = 'Unit Trust Switching';
      this.loadRedeemSwitchAdobeAnalytics(pageName, salesType);
    }
    this.cartService.refreshDataFundDetails(this.cartData, this.userDetails);
  }

  getNdSetSettings(): void {
    this.store.select(WealthDashboardSelectors.settingsDataSuccess).subscribe((resp) => {
      if(resp) {
        this.settingsData = resp;
        if(this.settingsData) {
          this.settingsData.forEach((settingData: Setting) => {
            
            const isEnabled = settingData.enabled;
            const settingUid = settingData.utSettingId;

            if (settingUid === this.enableProceedToCheckOutInPurchaseTnxSettingUid) {
              this.enableProceedToCheckOutInPurchaseTnx = isEnabled;
            }

            if (settingUid === this.enableRedeemTransationAtCartSettingUid) {
              this.enableRedeemTransationAtCart = isEnabled;
            }

            if (settingUid === this.enableSwitchTransactionAtCartSettingsUid) {
              this.enableSwitchTransactionAtCart = isEnabled;
            }
            
          })
        }
      }
    })
  }

  loadPurchaseAdobeAnalytics(wealthEvent) {
    this.store.select(LandingPageSelector.selectLandingPageStatusState).subscribe((result) => {
      this.currentCustomerType = result?.landingPageStatus?.accountStatus === 'Y' || this.customerType === 'ETP' ? 'ETP' : 'NTP';
    });
    const getCartConut = wealthEvent === 'wealth:proceed-to-checkout' ? this.totalFund : '' 
    const day = getDayOfWeek();
    const dayTime = getTimeOfDay();
    setEventAndDigitalData(
      {
        wealthEvent: wealthEvent,
      },
      {
        wealthDigitalData: {
          page: {
            category: {
              primaryCategory: 'Unit Trust Module',
              pageType: 'Cart',
            },
            pageInfo: {
              pageName: 'Wealth: UT Purchase Cart',
              day: day,
            },
          },
          user: {
            loginStatus: 'logged-in',
            customerType: this.currentCustomerType,
          },
          sales: {
            saleStartTime: dayTime,
            type: 'Unit Trust Purchase',
          },
          cart: {
            quantity: getCartConut,
          },
        },
      },
    );
  }

  loadRedeemSwitchAdobeAnalytics(pageName, salesType) {
    const day = getDayOfWeek();
    const dayTime = getTimeOfDay();
    setEventAndDigitalData(
      {
        wealthEvent: 'wealth:sales-start',
      },
      {
        wealthDigitalData: {
          page: {
            category: {
              primaryCategory: 'Unit Trust Module',
              pageType: 'Cart',
            },
            pageInfo: {
              pageName: pageName,
              day: day,
            },
          },
          user: {
            loginStatus: 'logged-in',
            customerType: this.customerType,
          },
          sales: {
            saleStartTime: dayTime,
            type: salesType,
          },
          cart: {
            quantity: this.totalFund,
          },
        },
      },
    );
  }

  ngOnDestroy(): void {
    this.pageExistDone = true;
    this.taxCalculationFailedPopShow = true;
    this.disableProceedToCheckoutValue = false;
    this.disableProceedToCheckoutFundStatus = false;
    this.disableProceedToCheckoutTaxValue = false;
    this.isEditingCartItem = false;
    this.store.dispatch(new CartActions.ToggleCartFooter(true));
    this.store.dispatch(new CartActions.ToggleCartIconHeader(true));
    /* istanbul ignore else */
    if (this.carstSubscription) {
      this.carstSubscription.unsubscribe();
    }
    /* istanbul ignore else */
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    /* istanbul ignore else */
    if (this.dashboardSubscription) {
      this.dashboardSubscription.unsubscribe();
    }
  }

  loadData(): boolean {
    this.userObservable = this.store.select('userReducer');
    this.userSubscription = this.userObservable.subscribe((users) => {
      this.userDetails = users;
      this.updateUserDataData(users);
      this.customerType = users.userType;
      this.checkUserType(this.customerType);
      this.store.dispatch(LandingPageActions.storeLandingPageStatus({ customerID: users.user.customer_id }))

      this.store.dispatch(new CartActions.GetCartByClientId(users.user.customer_id));
    });

    //load dashboardReducer data
    this.dashboardObservable$ = this.store.select('dashbordReducers');
    this.dashboardSubscription = this.dashboardObservable$.subscribe((data) => {
      if (data && data.casa_account) {
        /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
        this.accountLists = [...data.casa_account];
        this.holdingFundList = [...data.fundList];
      }
      this.updateDashboardData(data);
    });

    /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
    const accountOpeningObserble$ = this.store.select('accountOpeningReducer');
    accountOpeningObserble$
      .pipe(
        map((res) => {
          if (res && res.userDetailsAPIResponseData) {
            this.accountLists = [...res.userDetailsAPIResponseData.bankAccounts];
          }
        }),
      )
      .subscribe();

    // Comment out for fix WJ-4674
    // if (this.accountLists && this.accountLists.length >= 1) {
    //     this.showViewInvestmentOption = true;
    // } else {
    //     this.showViewInvestmentOption = false;
    // }
    return true;
  }

  checkUserType(customerType: string): boolean {
    if (customerType === 'NTP') {
      this.progressStepEnabled = true
      return this.progressStepEnabled;
    } else {
      this.progressStepEnabled = false
      return this.progressStepEnabled;
    }
  }

  updateUserDataData(users): boolean {
    this.userType = users.userType;
    this.userData = users ? users.user : null;
    /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
    if (this.userData) {
      const user = users.user;
      this.customerID = user && user.customer_id ? user.customer_id : null;
      this.cimbStaff = user && user.cimb_staff ? user.cimb_staff : null;
      this.unitRiskProfile = user && user.risk_profile ? user.risk_profile.toString() : '';
      this.casa_indicator = user && user.casa_indicator ? user.casa_indicator : null;
      if (this.customerID && this.investments && this.investments.length <= 0) {
        this.store.dispatch(new CartActions.GetCartByClientId(this.customerID));
      }
    }

    return true;
  }

  /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
  updateCartData(data): boolean {
    let totalCartDetail = 0;

    if (data) {
      this.totalAmountVal = data.totalAmount ? data.totalAmount.toString() : 0.0;
      this.totalFundsCountVal = data.totalFundsCount;
      
      totalCartDetail = data.fundList.length;

      this.investments = [];
      const cartFundListFinalized = [];
      const cartFundList = data.fundList;
      if (this.holdingFundList.length !== 0) {
        cartFundList.map(res => {
          const fundExist = this.holdingFundList.filter(item => item.fund_code === res.fund_code);
          if (fundExist.length !== 0) {
            const listFund = {
              ...res,
              current_holding: 'Y'
            };
            cartFundListFinalized.push(listFund);
          } else {
            const listFund = {
              ...res,
              current_holding: 'N'
            };
            cartFundListFinalized.push(listFund);
          }
        });
        this.investments = [...cartFundListFinalized];
      } else {
        this.investments = [...data.fundList];
      }
      this.totalFund = data.totalFundsCount;
      this.totalAmount = data.totalAmount;
      this.totalSalesCharge = data.totalSalesCharges;
      this.totalNetInvestmentAmount = data.totalNetInvestmentAmount;
      this.flowText = data.flow_text;
      this.flow = data.flow;
      this.hasRedeemOption = data.flow_text === 'redeem' ? true : false;
      this.totalRedemptionUnits = data.total_redemption_units;
      this.totalRedemptionAmount = data.total_redemption_amount;
      this.totalSwitchOutUnits = data.total_switch_out_units;
      this.totalSwitchInUnits = data.total_switch_in_units;
      this.unitTrustAccount = data.unitTrustAccount ? data.unitTrustAccount : null;
      
      this.cartDetailFundCount = totalCartDetail;

      //filter fundList by fund status
      if(this.flow === '001' || this.flow === '002' || this.flow === '003') {
        const inActiveFundCount = data.fundList.filter(item => {
          return item.fund_status === 'I' || item.to_fund_status === 'I';
        });
        if(inActiveFundCount.length >= 1) {
          this.isFundOnHoliday = true;
        } else {
          this.isFundOnHoliday = false;
        }
      }

      let fund_status;
      data.fundList.map(i => {
        fund_status = i.fund_status
      });
      //check if cart items is only 1 and fund_status === I
      if(this.totalFund === 1 && fund_status === 'I') {
        this.isFundOnHoliday = true;
      }
      
      if((this.flow === '001' && this.investments.filter(v => v.fund_status === 'SO' || v.fund_status === 'SOHO').length > 0) ||
      (this.flow === '002' && this.investments.filter(v => v.fund_status === 'BO').length > 0) ||
      (this.flow === '003' && this.investments.filter(v => v.switch_indicator === 'N').length > 0) ||
      (this.flow === '003' && this.investments.filter(v => v.to_fund_switch_indicator === 'N').length > 0) ||
      (this.investments.filter(v => v.fund_status === null).length > 0) ||
      (this.flow === '003' && this.investments.filter(v => v.to_fund_status === null).length > 0)){
        this.disableCheckoutButton = true;
      } else {
        this.disableCheckoutButton = false;
      }

      if (this.flow === '002') {
        this.pageSectionTitle = 'Redemption Summary';
      } else if (this.flow === '003') {
        this.pageSectionTitle = 'Switch Summary';
      }

      if (!this.unitTrustAccount) {
        this.unitTrustAccount = data.unitTrustAccount;
      }

      if (!this.customerID) {
        this.customerID = data.clientId;
      }

      if(this.flow === '001') {
        this.riskFundList = this.investments
        ? this.investments.filter(function (item) {
          return item.fund_risk_rating === 'Y' && item.fund_status !== 'I' && item.fund_status !== null;
        })
        : [];
      } 
      else if(this.flow === '003') {
        this.riskFundList = this.investments
        ? this.investments.filter(function (item) {
          return item.to_fund_risk_rating === 'Y' && item.to_fund_status !== 'I' && item.fund_status !== null && item.to_fund_status !== null;
        })
        : [];
      }

      this.taxCalculationFailedFundList = this.investments
        ? this.investments.filter(function (item) {
          return item?.charge_id === null  || (item?.charge_id === 0 && item?.fund_status !== null);
        })
        : [];
      if (
        this.flow === '001' &&
        !this.pageExistDone &&
        this.taxCalculationFailedFundList &&
        this.taxCalculationFailedFundList.length >= 1
      ) {
        this.taxCalculationFailedPopShow = false;
      } else {
        this.taxCalculationFailedPopShow = true;
      }
      if (
        this.flow === '001' &&
        !this.taxCalculationFailedPopShow &&
        this.taxCalculationFailedFundList &&
        this.taxCalculationFailedFundList.length >= 1
      ) {
        this.disableProceedToCheckoutTaxValue = true;
        this.showTaxReCallPopup();
      } else {
        this.disableProceedToCheckoutTaxValue = false;
      }

      //filter inactive high risk funds
      const filteredHighRiskFunds: any[]  = this.riskFundList.filter(x => {
        return x.fund_risk_rating === 'Y' && x.fund_status !== 'I'
      });

      this.highRiskCount = filteredHighRiskFunds.length;
      const filteredSwitchInHighRiskFunds: any[]  = this.riskFundList.filter(x => {
        return x.to_fund_risk_rating === 'Y' && x.to_fund_status !== 'I'
      });
      this.switchInhighRiskCount = filteredSwitchInHighRiskFunds.length;

      if(data.scheduler_msg)
        this.schedulerMsg = data.scheduler_msg;

      this.documentIndicatorFundList = this.investments
        ? this.investments.filter(function (item) {
          return !item?.documentIndicator;
        })
        : [];

      this.fundStatusIndicatorList = this.investments
        ? this.investments.filter((item) => item.fund_status === 'I')
        : [];
      
      if (this.fundStatusIndicatorList && this.fundStatusIndicatorList.length >= 1) {
        this.disableProceedToCheckoutFundStatus = true;
      } else {
        this.disableProceedToCheckoutFundStatus = false;
      }

      if (this.documentIndicatorFundList && this.documentIndicatorFundList.length >= 1) {
        this.disableProceedToCheckoutValue = true;
      } else {
        this.disableProceedToCheckoutValue = false;
      }
    }

    return true;
  }

  updateDashboardData(data: Dashboard): boolean {
    this.dashboardData = data;
    return true;
  }

  viewInvestmentOption(): boolean {
    if (this.accountLists && this.accountLists.length >= 1) {
      this.router.navigate(['/investment-options']);
    } else {
      this.openFundDetails();
    }

    return true;
  }

  editCartItem(value): boolean {
    //if(value && value.index && value.index >= 0){
    this.isEditingCartItem = value.canEdit;
    this.store.dispatch(new CartActions.ToggleEditCartItem(value.index, value.canEdit));
    //}
    return true;
  }

  updateAmountItem(value): boolean {
    this.isEditingCartItem = false;
    if (this.investments && value) {
      const index = parseFloat(value.index);
      const amount = value?.amount?.toString()?.replace(/,/g, '') ?? '0.00';
      const unit = value?.unit?.toString()?.replace(/,/g, '') ?? '0.00';
      this.cartService.updateCartItem(
        {
          cartData: this.cartData,
          index: index,
          flow: this.cartData && this.cartData.flow ? this.cartData.flow : '',
          toFundCode: value?.to_fund_code
        },
        index,
        parseFloat(amount),
        parseFloat(unit),
      );
    }

    return true;
  }

  /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
  removeItemItem(value, investments, flow): boolean {
    investments = this.investments;
    this.isEditingCartItem = false;
    if (investments) {
      if (value) {
        const index = parseFloat(value.index);
        const fundObj = investments[index];
        const fund_code = fundObj ? fundObj.fund_code : null;
        const flow = this.cartData ? this.cartData.flow : null;
        this.cartService.removeFromCart(
          { cartData: this.cartData, index: index, flow: flow },
          fund_code,
        );
      }
    }

    return true;
  }

  /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
  proceedToCheckoutClick(): boolean {
    if(this.flow === '001'){
      const wealthEvent = 'wealth:proceed-to-checkout';
      this.loadPurchaseAdobeAnalytics(wealthEvent);
    }
    //check if user have active casa account TODO
    if (this.dashboardData && !this.dashboardData.casa_account) {
      //open alert Dialog if no casa
      const dialogRefNoCasaAccount = this.dialog.open(DialogAlertComponent, {
        panelClass: 'dialog-transaction-issue',
        maxWidth: '600px',
        autoFocus: false,
        backdropClass: 'backdrop-modal',
        data: {
          dialogImage: '<em class="icon-warning">',
          dialogHeading: 'Unable to Proceed',
          dialogContent:
            '<p>You need to have an active current or savings account with CIMB to open a Unit Trust account.</p> <p><b>For assistance, please contact our call centre at +603 6204 7788 or visit your nearest CIMB Bank’s branch.</b></p>',
          dialogButtonProceed: true,
          dialogButtonProceedText: 'Okay',
        },
      });

      dialogRefNoCasaAccount.afterClosed().subscribe((result) => {
        /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
        if (result === 'proceed') {
          this.router.navigate([this.currentUrl]);
        }
      });
    } else if (this.casa_indicator === 'Y') {
      this.openFundDetails();
    } else {
      this.router.navigate(['/review-purchase']);
    }
    return true;
  }

  openFundDetails() {
    this.dialog.open(DialogAlertComponent, {
      panelClass: 'custom-dialog',
      maxWidth: '600px',
      autoFocus: false,
      backdropClass: 'backdrop-modal',
      data: {
        dialogHeading: 'Unable to Transact (No CASA)',
        dialogContent:
          '<p>To complete your transaction, open a current or savings account/-i with CIMB. You may apply via CIMB Clicks.</p><p><strong>For assistance, please <a class="go_to_consumer_contact_centre_link" >contact us or visit any CIMB branch.</a></strong></p>',
        dialogButtonProceed: true,
        dialogButtonProceedText: 'Okay',
        dialogImage: '<em class="icon-danger"></em>',
      },
    });
    this.analyticService.loadPopUpAnalytics('Unable to Transact (No CASA)');
  }

  /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
  backButtonEvent() {
    if (this.currentUrl === '/dashboard;tab=0') {
      this.currentUrl = '/dashboard';
    }
    this.router.navigate([this.currentUrl]);
  }

  showTaxReCallPopup(): boolean {
    this.taxCalculationFailedPopShow = true;
    const dialogRef = this.dialog.open(DialogAlertComponent, {
      panelClass: ['dialog-transaction-issue', 'dialog-inverse-button'],
      maxWidth: '600px',
      autoFocus: false,
      backdropClass: 'backdrop-modal',
      data: {
        dialogImage: '<em class="icon-warning-bubble">',
        dialogHeading: 'Unable to Proceed',
        dialogContent:
          '<p>We’re unable to get the effective sales charge for you at the moment. Please try again.</p>',
        dialogButtonCancel: true,
        dialogButtonCancelText: 'Go back',
        dialogButtonProceed: true,
        dialogButtonProceedText: 'Try again',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'Try again') {
        /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
        this.reCalculateTaxCartApi();
      } else {
        this.disableProceedToCheckoutTaxValue = true;
      }
    });
    return true;
  }

  reCalculateTaxCartApi(): boolean {
    this.disableProceedToCheckoutTaxValue = true;
    this.cartService.reCalculateTaxCart({
      cartData: this.cartData,
      flow: this.cartData && this.cartData.flow ? this.cartData.flow : '',
      cimbStaff: this.cimbStaff,
    });
    return true;
  }

  updateLandingPageStatus(data) {
     /* istanbul ignore else */
      this.store.select(LandingPageSelector.selectLandingPageStatus).subscribe((result) => {
        this.landingPageStatus = result;
      });
      if (data.totalFundsCount === null && this.userType === 'NTP') {
          const request: InvestmentStatus = {
              onboardingId: this.landingPageStatus.onboardingId,
              investmentStatus: 'N',
              investmentStartDate: '',
              investmentEndDate: '',
          };
          this.store.dispatch(
              LandingPageActions.updateInvestmentStatus({ investmentStatus: request }),
          );
      } else {
          if(this.userType === 'NTP') {
            const request: InvestmentStatus = {
              onboardingId: this.landingPageStatus.onboardingId,
              investmentStatus: 'Y',
              investmentStartDate: '',
              investmentEndDate: '',
          };
          this.store.dispatch(
              LandingPageActions.updateInvestmentStatus({ investmentStatus: request }),
          );
        }
      }
  }
}
