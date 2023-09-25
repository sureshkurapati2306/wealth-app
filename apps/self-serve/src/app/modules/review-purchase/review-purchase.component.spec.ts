import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import {
  MatDialog,
  MatDialogModule
} from '@angular/material/dialog';

import { PurchaseSummaryComponent } from '../purchase-summary/purchase-summary.component';
import { cartData } from './mock/data';

import { ReviewPurchaseComponent } from './review-purchase.component';

class dialogMock {
  open() {
    return {
      afterClosed: () => of({}),
    };
  }
}

describe('ReviewPurchaseComponent', () => {
  let component: ReviewPurchaseComponent;
  let fixture: ComponentFixture<ReviewPurchaseComponent>;
  let store: MockStore;
  const initialState = {
    totalAmount: 0.0,
    totalNetInvestmentAmount: 0.0,
    totalSalesCharges: 0.0,
    totalFundsCount: 0,
    higherRiskFundCategory: 0,
    fundList: [],
    accountName: '',
    unitTrustAccount: '',
    paymentAccount: '',
    referenceNumber: '',
    transactionSuccessStatus: false,
    transactionStatusName: '',
    transactionStatus: '',
    transactionStatusText: '',
    transactionDate: '',
    transactionWorkingDays: '',
    flow: '',
    flow_text: null,
    total_redemption_units: 0,
    total_redemption_amount: 0,

    total_switch_out_units: 0,
    total_switch_in_units: 0,
    otpResponse: null,
    otpResponseMessage: null,
    otpResponseReferenceNumber: null,
    verifyResponse: null,
    verifyResponseMessage: null,
    verifyResponseReferenceNumber: null,

    postAllTransactionResponse: null,

    cartFooterToggle: true


  };

  const landingPageResponse = {
    landingPageStatus: {
      accountEndDate: null,
      accountStartDate: null,
      accountStatus: 'N',
      clientId: 'C1',
      clientIdType: 'CType1',
      fatcaEndDate: null,
      fatcaStartDate: null,
      fatcaStatus: 'N',
      finalEndDate: null,
      finalStartDate: null,
      finalStatus: 'N',
      investmentEndDate: null,
      investmentStartDate: null,
      investmentStatus: 'N',
      landingEndDate: null,
      landingStartDate: null,
      landingStatus: 'Y',
      onboardingId: 0,
      rwsEndDate: null,
      rwsStartDate: null,
      rwsStatus: 'N',
    },
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'purchase-summary', component: PurchaseSummaryComponent },
        ]),
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        MatSnackBarModule,
        MatDialogModule,
        BrowserAnimationsModule,
        NoopAnimationsModule
      ],
      providers: [
        provideMockStore({ initialState }),
        DatePipe,
        { provide: MatDialog, useClass: dialogMock },
      ],
      declarations: [ReviewPurchaseComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewPurchaseComponent);
    component = fixture.componentInstance;
    jest.spyOn(store, 'dispatch');
    const users = { "user": { "customer_name": "Ali Amir bin Ahmad", "customer_id": "750702105695", "customer_id_type": "SOLO_PROP", "debit_card_no": 12121212121212, "dashbordData": 1, "lastSeen": "4 Sept 2020, 10:30AM", "story": "WJ-85", "sole_prop": "N", "invertment_indicator": "N", "casa_indicator": "N", "risk_profile": "AGGRESIVE", "customer_mobile_no": "0169958471" }, "loadInitialData": false, "loadCount": -1, "dashboardData": "", "dashboardScreenData": "", "unitTrustAccount": "A80091526", "unitTrustAccountList": [{ "default_ind": "Y", "ut_account_no": "A80091526" }, { "default_ind": "N", "ut_account_no": "A80039444" }, { "default_ind": "N", "ut_account_no": "A80070829" }, { "default_ind": "N", "ut_account_no": "A80111221" }, { "default_ind": "N", "ut_account_no": "A80111253" }, { "default_ind": "N", "ut_account_no": "E00000100" }] };
    component.userData = users;
    component.userObj = users.user;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ReviewPurchaseComponent ngOnInit -  clicked', () => {
    expect(component.ngOnInit()).toBeUndefined();
    component.customerType = 'NTP';
    component.flow = '001';
    expect(component.loadPurchaseAdobeAnalytics('', '')).toBeUndefined();
    component.flow = '002';
    expect(component.loadPurchaseAdobeAnalytics('', '')).toBeUndefined();
    component.flow = '003';
    expect(component.loadPurchaseAdobeAnalytics('', '')).toBeUndefined();
  });

  it('ReviewPurchaseComponent ngOnInit loadData -  clicked', () => {
    expect(component.ngOnInit()).toBeUndefined();
    expect(component.loadData()).toBeTruthy();
    component.loadData();
    expect(component.customerName).toBeUndefined();
    expect(component.customerMobileNumber).toBe(null);
  });

  it('ReviewPurchaseComponent ngOnInit -  cartData undefined', () => {
    component.cartData = {
      fundList: [],
      higherRiskFundCategory: 0,
      totalAmount: 2000,
      totalFundsCount: 1,
      totalNetInvestmentAmount: 1988,
      totalSalesCharges: 12,
    };
    expect(component.ngOnInit()).toBeUndefined();
    expect(component.loadData()).toBeTruthy();
    expect(component.cartData).toBeUndefined();
  });

  it('ReviewPurchaseComponent ngOnInit -  cartData undefined', () => {
    expect(component.ngOnInit()).toBeUndefined();
    expect(component.loadData()).toBeTruthy();
    component.cartData = {
      fundList: [],
      higherRiskFundCategory: 0,
      totalAmount: 0,
      totalFundsCount: 1,
      totalNetInvestmentAmount: 1988,
      totalSalesCharges: 12,
    };
    component.totalAmount = component.cartData.totalAmount;
    component.totalFund = component.cartData.totalFundsCount;
    component.totalSalesCharge = component.cartData.totalSalesCharges;
    component.totalNetInvestmentAmount =
      component.cartData.totalNetInvestmentAmount;
    expect(component.totalAmount).toEqual(0);
    expect(component.totalFundsCountVal).toEqual(0);
    expect(component.highRiskCount).toEqual(0);
    expect(component.totalFund).toEqual(1);
    expect(component.totalSalesCharge).toEqual(12);
    expect(component.totalNetInvestmentAmount).toEqual(1988);
  });

  it('ReviewPurchaseComponent ngOnInit -  cartData defined', () => {
    expect(component.ngOnInit()).toBeUndefined();
    expect(component.loadData()).toBeTruthy();

    component.cartData = cartData;
    const cartDetails = [{
      productName: 'CIMB ISLAMIC BALANCED GROWTH FUND',
      fundShariah: 'I',
      fundClass: 'LOCAL EQUITY',
      productID: 'CBT11A',
      category: 'Unit Trust',
      totalValue: '500',
      price: '1.8664',
      fundCategory: 'Balanced'
    }]
    fixture.detectChanges();
    component.investments = cartData.fundList;
    component.cartDetails = cartDetails;
    expect(component.updateData(cartData)).toBeTruthy();
    expect(component.cartData).toBeDefined();
    expect(component.totalAmountVal).toEqual('0');
    expect(component.totalFundsCountVal).toEqual(0);
    expect(component.highRiskCount).toEqual(0);
    expect(component.totalFund).toEqual(0);
    expect(component.totalSalesCharge).toEqual(0);
    expect(component.totalNetInvestmentAmount).toEqual(0);
    expect(component.cartDetails[0].productName).toEqual(component.investments[0].fund_name);
    expect(component.cartDetails[0].fundShariah).toEqual("");
    expect(component.cartDetails[0].fundClass).toEqual("");
    expect(component.cartDetails[0].productID).toEqual(component.investments[0].fund_code);
    expect(component.cartDetails[0].fundCategory).toEqual(component.investments[0].risk_name);
    expect(component.cartDetails[0].totalValue).toEqual("");
    expect(component.cartDetails[0].price).toEqual("");
    expect(component.cartDetails[0].category).toEqual('Unit Trust');
  });
  it('ReviewPurchaseComponent confirmAndProceed -  clicked', () => {
    //expect(component.confirmAndProceed(null)).toBeTruthy();
    component.confirmAndProceed(null);
  });

  it('ReviewPurchaseComponent accountSelectedEvent -  clicked', () => {
    const event: any = { accountNumber: 'Abc10020030' };
    component.accountSelectedEvent(event);
    // expect(component.accountselectedEvent(event)).toBeTruthy();
  });

  it('should requestTAC chk', () => {
    component.requestTAC();
  });


  it('should verifyOTP chk', () => {
    component.topUpHigherFundRiskAck = 'YES';
    component.switchInHigherFundRiskAck = 'Yes';
    component.verifyOTP("111111");
  });

  it('ReviewPurchaseComponent ngOnInit -  updateData check defined', () => {
    expect(component.ngOnInit()).toBeUndefined();
    expect(component.loadData()).toBeTruthy();
    const data = {
      fundList: [],
      higherRiskFundCategory: 0,
      totalAmount: 0,
      totalFundsCount: 0,
      totalNetInvestmentAmount: 0,
      totalSalesCharges: 0,
    };
    component.cartData = data;
    component.callingApi = "otp";

    expect(component.updateData(data)).toBeTruthy();
    expect(component.callingApi).toEqual('otp');
    const users = { "user": { "customer_name": "Ali Amir bin Ahmad", "customer_id": "750702105695", "customer_id_type": "SOLO_PROP", "debit_card_no": 12121212121212, "dashbordData": 1, "lastSeen": "4 Sept 2020, 10:30AM", "story": "WJ-85", "sole_prop": "N", "invertment_indicator": "N", "casa_indicator": "N", "risk_profile": "AGGRESIVE", "customer_mobile_no": "0169958471" }, "loadInitialData": false, "loadCount": -1, "dashboardData": "", "dashboardScreenData": "", "unitTrustAccount": "A80091526", "unitTrustAccountList": [{ "default_ind": "Y", "ut_account_no": "A80091526" }, { "default_ind": "N", "ut_account_no": "A80039444" }, { "default_ind": "N", "ut_account_no": "A80070829" }, { "default_ind": "N", "ut_account_no": "A80111221" }, { "default_ind": "N", "ut_account_no": "A80111253" }, { "default_ind": "N", "ut_account_no": "E00000100" }] };
    component.userData = users;
    component.otpResponseMessage = 'ALREADY_REQUESTED';
    component.flow = '002';


    fixture.detectChanges();

    expect(component.userData).toBe(users);
    expect(component.flow).toBe('002');
    expect(component.cardAccountTitle).toBe('Select Payment Account');
    expect(component.pagwTitle).toBe('Review and Complete Purchase');

    expect(component.customerName).toBeUndefined();
    expect(component.customerMobileNumber).toEqual(null);

    expect(component.otpResponseMessage).toEqual('ALREADY_REQUESTED');
    expect(component.cartData).toBeDefined();
    expect(component.totalAmountVal).toEqual('0');
    expect(component.totalFundsCountVal).toEqual(0);
    expect(component.highRiskCount).toEqual(0);
    expect(component.totalFund).toEqual(0);
    expect(component.totalSalesCharge).toEqual(0);
    expect(component.totalNetInvestmentAmount).toEqual(0);
  });

  it('ReviewPurchaseComponent preparePostParams -  called', () => {

    const investments = [{}];
    component.investments = investments;



    // expect(component.investments ).toBe(investments);
    // expect(component.postParamList.length ).toBe(0);


    component.flow = '001';
    component.flowConst = '01';
    fixture.detectChanges();
    // component.preparePostParams();
    expect(component.flow).toBe('001');
    expect(component.flowConst).toBe('01');

    component.flow = '002';
    component.flowConst = '02';
    fixture.detectChanges();
    // component.preparePostParams();
    expect(component.flowConst).toBe('02');

    component.flow = '003';
    component.flowConst = '03';
    fixture.detectChanges();
    // component.preparePostParams();
    expect(component.flowConst).toBe('03');
  });


  it('should requestTAC customerMobileNumber chk', () => {
    component.customerMobileNumber = '0123456789';
    fixture.detectChanges();
    component.requestTAC();
    expect(component.callingApi).toBe('otp');
  });


  it('should verifyOTP customerMobileNumber chk', () => {
    component.customerMobileNumber = '0123456789';
    fixture.detectChanges();
    // jest.spyOn(store, 'select').mockReturnValue(of(landingPageResponse.landingPageStatus));;
    component.verifyOTP("123456");
    expect(component.callingApi).toBe('verify');
  });


  it('ReviewPurchaseComponent confirmAndProceed - event  clicked', () => {
    const event = '123456';
    fixture.detectChanges();
    component.confirmAndProceed(event);
    expect(component.callPostAPI).toBeTruthy();
    component.verifyOTP(event);
  });


  it('ReviewPurchaseComponent updateData - data  clicked', () => {
    const data = {
      "totalAmount": 500,
      "totalNetInvestmentAmount": 495,
      "totalSalesCharges": 5,
      "totalFundsCount": 1,
      "higherRiskFundCategory": 0,
      "fundList": [
        {
          "min_sub_amt": 500,
          "current_investment": "1,271.76",
          "unit_held": "1,271.76",
          "total_percentage": "27.18%",
          "min_init_amt": 1000,
          "total_return": "+271.76",
          "holding": "1,271.76",
          "max_sub_amt": 1000000000000,
          "risk_rating": "8",
          "average_nav_price": "1.0000",
          "classHexa": "#5CD3CD",
          "sales_charge": 0,
          "class_holding": 40.1,
          "min_holding": 1000,
          "wholesale_msg": "Wholesales Msg Fund Detail Object Found",
          "asset_class": "LOCAL EQUITY",
          "fund_status": "A",
          "class_seq": 3,
          "fund_name": "AMITTIKAL",
          "ut_account_no": "A80039444",
          "total_invested": "1,000.00",
          "max_init_amt": 1000000000000,
          "syariah_complaint": "I",
          "nav_price": "0.57",
          "wholesale_ind": "N",
          "risk_name": "Growth",
          "product_category": "LOCAL_EQT",
          "fundTotalReturnType": null,
          "fundTotalReturnValue": null,
          "displayFlag": true,
          "total_return_type": "+",
          "sales_charge_nonstaff": 1,
          "sales_charge_staff": 0,
          "switch_indicator": 500,
          "fund_code": "AMU03A",
          "minimum_initial_subscription_amount": 1000,
          "maximum_subsequent_subscription_amount": 1000000000000,
          "min_redem_amt": 500,
          "maximum_initial_subscription_amount": 1000000000000,
          "max_switch_amt": 500,
          "total_return_value": "271.76",
          "max_redem_amt": 1000000000000,
          "min_switch_amt": 500,
          "minimum_subsequent_subscription_amount": 500,
          "can_edit": false,
          "txn_type": null,
          "card_amount": 500,
          "card_sale_charge": 5,
          "card_net_amount": 495,
          "card_redemption_units": 0,
          "card_redemption_amount": 0,
          "card_switch_out_units": 0,
          "card_switch_out_amount": 0,
          "card_switch_in_units": 0,
          "card_switch_in_amount": 0,
          "card_switch_percentage": 0,
          "card_switch_charges_fee": 0,
          "card_net_switch_in_amount": 0,
          "card_switch_in_fund": [],
          "flow": "001",
          "flow_text": "topup",
          "min_amt": 500,
          "max_amt": 1000000000000,
          "risk_ind": null,
          "fund_indicator": "I",
          "fund_risk_rating": "Y",
          "fundPosition": "Increase",
          "fundImg": "./assets/images/chart-increase.svg",
          "units_held_number": 1271.76,
          "nav_price_number": 0.57,
          "canEdit": false,
          "source_screen": "dashboard"
        }
      ],
      "accountName": "",
      "unitTrustAccount": "",
      "paymentAccount": "",
      "referenceNumber": "",
      "transactionSuccessStatus": false,
      "transactionStatusName": "",
      "transactionStatus": "",
      "transactionStatusText": "",
      "transactionDate": "",
      "transactionWorkingDays": "",
      "flow": "002",
      "flow_text": "redeem",
      "total_redemption_units": 0,
      "total_redemption_amount": 0,
      "total_switch_out_units": 0,
      "total_switch_in_units": 0,
      "otpResponse": {},
      "otpResponseMessage": 'OTP Sent Successfully',
      "otpResponseReferenceNumber": null,
      "verifyResponse": null,
      "verifyResponseMessage": null,
      "verifyResponseReferenceNumber": null,
      "postAllTransactionResponse": null,
      "cartFooterToggle": false
    };
    fixture.detectChanges();
    component.callingApi = 'otp';
    component.updateData(data);
    fixture.detectChanges();
    expect(component.hasRedeemOption).toBeTruthy();
    expect(component.cardAccountTitle).toBe('Select Settlement Account');
    expect(component.pagwTitle).toBe('Review and Complete Redemption');

  });



  it('ReviewPurchaseComponent updateData - data -ALREADY_REQUESTED  clicked', () => {
    const data = {
      "totalAmount": 500,
      "totalNetInvestmentAmount": 495,
      "totalSalesCharges": 5,
      "totalFundsCount": 1,
      "higherRiskFundCategory": 0,
      "fundList": [
        {
          "min_sub_amt": 500,
          "current_investment": "1,271.76",
          "unit_held": "1,271.76",
          "total_percentage": "27.18%",
          "min_init_amt": 1000,
          "total_return": "+271.76",
          "holding": "1,271.76",
          "max_sub_amt": 1000000000000,
          "risk_rating": "8",
          "average_nav_price": "1.0000",
          "classHexa": "#5CD3CD",
          "sales_charge": 0,
          "class_holding": 40.1,
          "min_holding": 1000,
          "wholesale_msg": "Wholesales Msg Fund Detail Object Found",
          "asset_class": "LOCAL EQUITY",
          "fund_status": "A",
          "class_seq": 3,
          "fund_name": "AMITTIKAL",
          "ut_account_no": "A80039444",
          "total_invested": "1,000.00",
          "max_init_amt": 1000000000000,
          "syariah_complaint": "I",
          "nav_price": "0.57",
          "wholesale_ind": "N",
          "risk_name": "Growth",
          "product_category": "LOCAL_EQT",
          "fundTotalReturnType": null,
          "fundTotalReturnValue": null,
          "displayFlag": true,
          "total_return_type": "+",
          "sales_charge_nonstaff": 1,
          "sales_charge_staff": 0,
          "switch_indicator": 500,
          "fund_code": "AMU03A",
          "minimum_initial_subscription_amount": 1000,
          "maximum_subsequent_subscription_amount": 1000000000000,
          "min_redem_amt": 500,
          "maximum_initial_subscription_amount": 1000000000000,
          "max_switch_amt": 500,
          "total_return_value": "271.76",
          "max_redem_amt": 1000000000000,
          "min_switch_amt": 500,
          "minimum_subsequent_subscription_amount": 500,
          "can_edit": false,
          "txn_type": null,
          "card_amount": 500,
          "card_sale_charge": 5,
          "card_net_amount": 495,
          "card_redemption_units": 0,
          "card_redemption_amount": 0,
          "card_switch_out_units": 0,
          "card_switch_out_amount": 0,
          "card_switch_in_units": 0,
          "card_switch_in_amount": 0,
          "card_switch_percentage": 0,
          "card_switch_charges_fee": 0,
          "card_net_switch_in_amount": 0,
          "card_switch_in_fund": [],
          "flow": "001",
          "flow_text": "topup",
          "min_amt": 500,
          "max_amt": 1000000000000,
          "risk_ind": null,
          "fund_indicator": "I",
          "fund_risk_rating": "Y",
          "fundPosition": "Increase",
          "fundImg": "./assets/images/chart-increase.svg",
          "units_held_number": 1271.76,
          "nav_price_number": 0.57,
          "canEdit": false,
          "source_screen": "dashboard"
        }
      ],
      "accountName": "",
      "unitTrustAccount": "",
      "paymentAccount": "",
      "referenceNumber": "",
      "transactionSuccessStatus": false,
      "transactionStatusName": "",
      "transactionStatus": "",
      "transactionStatusText": "",
      "transactionDate": "",
      "transactionWorkingDays": "",
      "flow": "002",
      "flow_text": "redeem",
      "total_redemption_units": 0,
      "total_redemption_amount": 0,
      "total_switch_out_units": 0,
      "total_switch_in_units": 0,
      "otpResponse": {},
      "otpResponseMessage": 'ALREADY_REQUESTED',
      "otpResponseReferenceNumber": null,
      "verifyResponse": null,
      "verifyResponseMessage": null,
      "verifyResponseReferenceNumber": null,
      "postAllTransactionResponse": null,
      "cartFooterToggle": false
    };
    fixture.detectChanges();
    component.callingApi = 'otp';
    component.updateData(data);
    fixture.detectChanges();
    expect(component.hasRedeemOption).toBeTruthy();
    expect(component.cardAccountTitle).toBe('Select Settlement Account');
    expect(component.pagwTitle).toBe('Review and Complete Redemption');

  });

  it('ReviewPurchaseComponent updateData - data -DUPLICATE  clicked', () => {
    const data = {
      "totalAmount": 500,
      "totalNetInvestmentAmount": 495,
      "totalSalesCharges": 5,
      "totalFundsCount": 1,
      "higherRiskFundCategory": 0,
      "fundList": [
        {
          "min_sub_amt": 500,
          "current_investment": "1,271.76",
          "unit_held": "1,271.76",
          "total_percentage": "27.18%",
          "min_init_amt": 1000,
          "total_return": "+271.76",
          "holding": "1,271.76",
          "max_sub_amt": 1000000000000,
          "risk_rating": "8",
          "average_nav_price": "1.0000",
          "classHexa": "#5CD3CD",
          "sales_charge": 0,
          "class_holding": 40.1,
          "min_holding": 1000,
          "wholesale_msg": "Wholesales Msg Fund Detail Object Found",
          "asset_class": "LOCAL EQUITY",
          "fund_status": "A",
          "class_seq": 3,
          "fund_name": "AMITTIKAL",
          "ut_account_no": "A80039444",
          "total_invested": "1,000.00",
          "max_init_amt": 1000000000000,
          "syariah_complaint": "I",
          "nav_price": "0.57",
          "wholesale_ind": "N",
          "risk_name": "Growth",
          "product_category": "LOCAL_EQT",
          "fundTotalReturnType": null,
          "fundTotalReturnValue": null,
          "displayFlag": true,
          "total_return_type": "+",
          "sales_charge_nonstaff": 1,
          "sales_charge_staff": 0,
          "switch_indicator": 500,
          "fund_code": "AMU03A",
          "minimum_initial_subscription_amount": 1000,
          "maximum_subsequent_subscription_amount": 1000000000000,
          "min_redem_amt": 500,
          "maximum_initial_subscription_amount": 1000000000000,
          "max_switch_amt": 500,
          "total_return_value": "271.76",
          "max_redem_amt": 1000000000000,
          "min_switch_amt": 500,
          "minimum_subsequent_subscription_amount": 500,
          "can_edit": false,
          "txn_type": null,
          "card_amount": 500,
          "card_sale_charge": 5,
          "card_net_amount": 495,
          "card_redemption_units": 0,
          "card_redemption_amount": 0,
          "card_switch_out_units": 0,
          "card_switch_out_amount": 0,
          "card_switch_in_units": 0,
          "card_switch_in_amount": 0,
          "card_switch_percentage": 0,
          "card_switch_charges_fee": 0,
          "card_net_switch_in_amount": 0,
          "card_switch_in_fund": [],
          "flow": "001",
          "flow_text": "topup",
          "min_amt": 500,
          "max_amt": 1000000000000,
          "risk_ind": null,
          "fund_indicator": "I",
          "fund_risk_rating": "Y",
          "fundPosition": "Increase",
          "fundImg": "./assets/images/chart-increase.svg",
          "units_held_number": 1271.76,
          "nav_price_number": 0.57,
          "canEdit": false,
          "source_screen": "dashboard"
        }
      ],
      "accountName": "",
      "unitTrustAccount": "",
      "paymentAccount": "",
      "referenceNumber": "",
      "transactionSuccessStatus": false,
      "transactionStatusName": "",
      "transactionStatus": "",
      "transactionStatusText": "",
      "transactionDate": "",
      "transactionWorkingDays": "",
      "flow": "002",
      "flow_text": "redeem",
      "total_redemption_units": 0,
      "total_redemption_amount": 0,
      "total_switch_out_units": 0,
      "total_switch_in_units": 0,
      "otpResponse": {},
      "otpResponseMessage": 'DUPLICATE',
      "otpResponseReferenceNumber": null,
      "verifyResponse": null,
      "verifyResponseMessage": null,
      "verifyResponseReferenceNumber": null,
      "postAllTransactionResponse": null,
      "cartFooterToggle": false
    };
    fixture.detectChanges();
    component.callingApi = 'otp';
    component.updateData(data);
    fixture.detectChanges();
    expect(component.hasRedeemOption).toBeTruthy();

  });


  it('ReviewPurchaseComponent updateData - data -INVALID_REQUEST  clicked', () => {
    const data = {
      "totalAmount": 500,
      "totalNetInvestmentAmount": 495,
      "totalSalesCharges": 5,
      "totalFundsCount": 1,
      "higherRiskFundCategory": 0,
      "fundList": [
        {
          "min_sub_amt": 500,
          "current_investment": "1,271.76",
          "unit_held": "1,271.76",
          "total_percentage": "27.18%",
          "min_init_amt": 1000,
          "total_return": "+271.76",
          "holding": "1,271.76",
          "max_sub_amt": 1000000000000,
          "risk_rating": "8",
          "average_nav_price": "1.0000",
          "classHexa": "#5CD3CD",
          "sales_charge": 0,
          "class_holding": 40.1,
          "min_holding": 1000,
          "wholesale_msg": "Wholesales Msg Fund Detail Object Found",
          "asset_class": "LOCAL EQUITY",
          "fund_status": "A",
          "class_seq": 3,
          "fund_name": "AMITTIKAL",
          "ut_account_no": "A80039444",
          "total_invested": "1,000.00",
          "max_init_amt": 1000000000000,
          "syariah_complaint": "I",
          "nav_price": "0.57",
          "wholesale_ind": "N",
          "risk_name": "Growth",
          "product_category": "LOCAL_EQT",
          "fundTotalReturnType": null,
          "fundTotalReturnValue": null,
          "displayFlag": true,
          "total_return_type": "+",
          "sales_charge_nonstaff": 1,
          "sales_charge_staff": 0,
          "switch_indicator": 500,
          "fund_code": "AMU03A",
          "minimum_initial_subscription_amount": 1000,
          "maximum_subsequent_subscription_amount": 1000000000000,
          "min_redem_amt": 500,
          "maximum_initial_subscription_amount": 1000000000000,
          "max_switch_amt": 500,
          "total_return_value": "271.76",
          "max_redem_amt": 1000000000000,
          "min_switch_amt": 500,
          "minimum_subsequent_subscription_amount": 500,
          "can_edit": false,
          "txn_type": null,
          "card_amount": 500,
          "card_sale_charge": 5,
          "card_net_amount": 495,
          "card_redemption_units": 0,
          "card_redemption_amount": 0,
          "card_switch_out_units": 0,
          "card_switch_out_amount": 0,
          "card_switch_in_units": 0,
          "card_switch_in_amount": 0,
          "card_switch_percentage": 0,
          "card_switch_charges_fee": 0,
          "card_net_switch_in_amount": 0,
          "card_switch_in_fund": [],
          "flow": "001",
          "flow_text": "topup",
          "min_amt": 500,
          "max_amt": 1000000000000,
          "risk_ind": null,
          "fund_indicator": "I",
          "fund_risk_rating": "Y",
          "fundPosition": "Increase",
          "fundImg": "./assets/images/chart-increase.svg",
          "units_held_number": 1271.76,
          "nav_price_number": 0.57,
          "canEdit": false,
          "source_screen": "dashboard"
        }
      ],
      "accountName": "",
      "unitTrustAccount": "",
      "paymentAccount": "",
      "referenceNumber": "",
      "transactionSuccessStatus": false,
      "transactionStatusName": "",
      "transactionStatus": "",
      "transactionStatusText": "",
      "transactionDate": "",
      "transactionWorkingDays": "",
      "flow": "002",
      "flow_text": "redeem",
      "total_redemption_units": 0,
      "total_redemption_amount": 0,
      "total_switch_out_units": 0,
      "total_switch_in_units": 0,
      "otpResponse": {},
      "otpResponseMessage": null,
      "otpResponseReferenceNumber": null,
      "verifyResponse": {},
      "verifyResponseMessage": 'INVALID_REQUEST',
      "verifyResponseReferenceNumber": "Ref 0001",
      "postAllTransactionResponse": null,
      "cartFooterToggle": false
    };
    fixture.detectChanges();
    component.callingApi = 'verify';
    component.callPostAPI = true;
    component.updateData(data);
    fixture.detectChanges();
    expect(component.hasRedeemOption).toBeTruthy();
    //expect(component.callingApi ).toBe('transaction');
    // expect(component.tagErrorShow).toBeTruthy();

  });


  it('ReviewPurchaseComponent updateData - data -INVALID_CODE  clicked', () => {
    const data = {
      "totalAmount": 500,
      "totalNetInvestmentAmount": 495,
      "totalSalesCharges": 5,
      "totalFundsCount": 1,
      "higherRiskFundCategory": 0,
      "fundList": [
        {
          "min_sub_amt": 500,
          "current_investment": "1,271.76",
          "unit_held": "1,271.76",
          "total_percentage": "27.18%",
          "min_init_amt": 1000,
          "total_return": "+271.76",
          "holding": "1,271.76",
          "max_sub_amt": 1000000000000,
          "risk_rating": "8",
          "average_nav_price": "1.0000",
          "classHexa": "#5CD3CD",
          "sales_charge": 0,
          "class_holding": 40.1,
          "min_holding": 1000,
          "wholesale_msg": "Wholesales Msg Fund Detail Object Found",
          "asset_class": "LOCAL EQUITY",
          "fund_status": "A",
          "class_seq": 3,
          "fund_name": "AMITTIKAL",
          "ut_account_no": "A80039444",
          "total_invested": "1,000.00",
          "max_init_amt": 1000000000000,
          "syariah_complaint": "I",
          "nav_price": "0.57",
          "wholesale_ind": "N",
          "risk_name": "Growth",
          "product_category": "LOCAL_EQT",
          "fundTotalReturnType": null,
          "fundTotalReturnValue": null,
          "displayFlag": true,
          "total_return_type": "+",
          "sales_charge_nonstaff": 1,
          "sales_charge_staff": 0,
          "switch_indicator": 500,
          "fund_code": "AMU03A",
          "minimum_initial_subscription_amount": 1000,
          "maximum_subsequent_subscription_amount": 1000000000000,
          "min_redem_amt": 500,
          "maximum_initial_subscription_amount": 1000000000000,
          "max_switch_amt": 500,
          "total_return_value": "271.76",
          "max_redem_amt": 1000000000000,
          "min_switch_amt": 500,
          "minimum_subsequent_subscription_amount": 500,
          "can_edit": false,
          "txn_type": null,
          "card_amount": 500,
          "card_sale_charge": 5,
          "card_net_amount": 495,
          "card_redemption_units": 0,
          "card_redemption_amount": 0,
          "card_switch_out_units": 0,
          "card_switch_out_amount": 0,
          "card_switch_in_units": 0,
          "card_switch_in_amount": 0,
          "card_switch_percentage": 0,
          "card_switch_charges_fee": 0,
          "card_net_switch_in_amount": 0,
          "card_switch_in_fund": [],
          "flow": "001",
          "flow_text": "topup",
          "min_amt": 500,
          "max_amt": 1000000000000,
          "risk_ind": null,
          "fund_indicator": "I",
          "fund_risk_rating": "Y",
          "fundPosition": "Increase",
          "fundImg": "./assets/images/chart-increase.svg",
          "units_held_number": 1271.76,
          "nav_price_number": 0.57,
          "canEdit": false,
          "source_screen": "dashboard"
        }
      ],
      "accountName": "",
      "unitTrustAccount": "",
      "paymentAccount": "",
      "referenceNumber": "",
      "transactionSuccessStatus": false,
      "transactionStatusName": "",
      "transactionStatus": "",
      "transactionStatusText": "",
      "transactionDate": "",
      "transactionWorkingDays": "",
      "flow": "002",
      "flow_text": "redeem",
      "total_redemption_units": 0,
      "total_redemption_amount": 0,
      "total_switch_out_units": 0,
      "total_switch_in_units": 0,
      "otpResponse": {},
      "otpResponseMessage": null,
      "otpResponseReferenceNumber": null,
      "verifyResponse": {},
      "verifyResponseMessage": 'INVALID_CODE',
      "verifyResponseReferenceNumber": "Ref 0001",
      "postAllTransactionResponse": null,
      "cartFooterToggle": false
    };
    fixture.detectChanges();
    component.callingApi = 'verify';
    component.callPostAPI = true;
    component.updateData(data);
    fixture.detectChanges();
    expect(component.hasRedeemOption).toBeTruthy();
    //expect(component.callingApi ).toBe('transaction');
    // expect(component.tagErrorShow).toBeTruthy();

  });



  it('ReviewPurchaseComponent updateData - data -WRONG_CODE_THROTTLED  clicked', () => {
    const data = {
      "totalAmount": 500,
      "totalNetInvestmentAmount": 495,
      "totalSalesCharges": 5,
      "totalFundsCount": 1,
      "higherRiskFundCategory": 0,
      "fundList": [
        {
          "min_sub_amt": 500,
          "current_investment": "1,271.76",
          "unit_held": "1,271.76",
          "total_percentage": "27.18%",
          "min_init_amt": 1000,
          "total_return": "+271.76",
          "holding": "1,271.76",
          "max_sub_amt": 1000000000000,
          "risk_rating": "8",
          "average_nav_price": "1.0000",
          "classHexa": "#5CD3CD",
          "sales_charge": 0,
          "class_holding": 40.1,
          "min_holding": 1000,
          "wholesale_msg": "Wholesales Msg Fund Detail Object Found",
          "asset_class": "LOCAL EQUITY",
          "fund_status": "A",
          "class_seq": 3,
          "fund_name": "AMITTIKAL",
          "ut_account_no": "A80039444",
          "total_invested": "1,000.00",
          "max_init_amt": 1000000000000,
          "syariah_complaint": "I",
          "nav_price": "0.57",
          "wholesale_ind": "N",
          "risk_name": "Growth",
          "product_category": "LOCAL_EQT",
          "fundTotalReturnType": null,
          "fundTotalReturnValue": null,
          "displayFlag": true,
          "total_return_type": "+",
          "sales_charge_nonstaff": 1,
          "sales_charge_staff": 0,
          "switch_indicator": 500,
          "fund_code": "AMU03A",
          "minimum_initial_subscription_amount": 1000,
          "maximum_subsequent_subscription_amount": 1000000000000,
          "min_redem_amt": 500,
          "maximum_initial_subscription_amount": 1000000000000,
          "max_switch_amt": 500,
          "total_return_value": "271.76",
          "max_redem_amt": 1000000000000,
          "min_switch_amt": 500,
          "minimum_subsequent_subscription_amount": 500,
          "can_edit": false,
          "txn_type": null,
          "card_amount": 500,
          "card_sale_charge": 5,
          "card_net_amount": 495,
          "card_redemption_units": 0,
          "card_redemption_amount": 0,
          "card_switch_out_units": 0,
          "card_switch_out_amount": 0,
          "card_switch_in_units": 0,
          "card_switch_in_amount": 0,
          "card_switch_percentage": 0,
          "card_switch_charges_fee": 0,
          "card_net_switch_in_amount": 0,
          "card_switch_in_fund": [],
          "flow": "001",
          "flow_text": "topup",
          "min_amt": 500,
          "max_amt": 1000000000000,
          "risk_ind": null,
          "fund_indicator": "I",
          "fund_risk_rating": "Y",
          "fundPosition": "Increase",
          "fundImg": "./assets/images/chart-increase.svg",
          "units_held_number": 1271.76,
          "nav_price_number": 0.57,
          "canEdit": false,
          "source_screen": "dashboard"
        }
      ],
      "accountName": "",
      "unitTrustAccount": "",
      "paymentAccount": "",
      "referenceNumber": "",
      "transactionSuccessStatus": false,
      "transactionStatusName": "",
      "transactionStatus": "",
      "transactionStatusText": "",
      "transactionDate": "",
      "transactionWorkingDays": "",
      "flow": "002",
      "flow_text": "redeem",
      "total_redemption_units": 0,
      "total_redemption_amount": 0,
      "total_switch_out_units": 0,
      "total_switch_in_units": 0,
      "otpResponse": {},
      "otpResponseMessage": null,
      "otpResponseReferenceNumber": null,
      "verifyResponse": {},
      "verifyResponseMessage": 'WRONG_CODE_THROTTLED',
      "verifyResponseReferenceNumber": null,
      "postAllTransactionResponse": null,
      "cartFooterToggle": false
    };
    fixture.detectChanges();
    component.callingApi = 'verify';
    component.callPostAPI = true;
    component.updateData(data);
    fixture.detectChanges();
    // expect(component.tagErrorShow).toBe(true);

  });


  it('ReviewPurchaseComponent updateData - data -FAILED  clicked', () => {
    const data = {
      "totalAmount": 500,
      "totalNetInvestmentAmount": 495,
      "totalSalesCharges": 5,
      "totalFundsCount": 1,
      "higherRiskFundCategory": 0,
      "fundList": [
        {
          "min_sub_amt": 500,
          "current_investment": "1,271.76",
          "unit_held": "1,271.76",
          "total_percentage": "27.18%",
          "min_init_amt": 1000,
          "total_return": "+271.76",
          "holding": "1,271.76",
          "max_sub_amt": 1000000000000,
          "risk_rating": "8",
          "average_nav_price": "1.0000",
          "classHexa": "#5CD3CD",
          "sales_charge": 0,
          "class_holding": 40.1,
          "min_holding": 1000,
          "wholesale_msg": "Wholesales Msg Fund Detail Object Found",
          "asset_class": "LOCAL EQUITY",
          "fund_status": "A",
          "class_seq": 3,
          "fund_name": "AMITTIKAL",
          "ut_account_no": "A80039444",
          "total_invested": "1,000.00",
          "max_init_amt": 1000000000000,
          "syariah_complaint": "I",
          "nav_price": "0.57",
          "wholesale_ind": "N",
          "risk_name": "Growth",
          "product_category": "LOCAL_EQT",
          "fundTotalReturnType": null,
          "fundTotalReturnValue": null,
          "displayFlag": true,
          "total_return_type": "+",
          "sales_charge_nonstaff": 1,
          "sales_charge_staff": 0,
          "switch_indicator": 500,
          "fund_code": "AMU03A",
          "minimum_initial_subscription_amount": 1000,
          "maximum_subsequent_subscription_amount": 1000000000000,
          "min_redem_amt": 500,
          "maximum_initial_subscription_amount": 1000000000000,
          "max_switch_amt": 500,
          "total_return_value": "271.76",
          "max_redem_amt": 1000000000000,
          "min_switch_amt": 500,
          "minimum_subsequent_subscription_amount": 500,
          "can_edit": false,
          "txn_type": null,
          "card_amount": 500,
          "card_sale_charge": 5,
          "card_net_amount": 495,
          "card_redemption_units": 0,
          "card_redemption_amount": 0,
          "card_switch_out_units": 0,
          "card_switch_out_amount": 0,
          "card_switch_in_units": 0,
          "card_switch_in_amount": 0,
          "card_switch_percentage": 0,
          "card_switch_charges_fee": 0,
          "card_net_switch_in_amount": 0,
          "card_switch_in_fund": [],
          "flow": "001",
          "flow_text": "topup",
          "min_amt": 500,
          "max_amt": 1000000000000,
          "risk_ind": null,
          "fund_indicator": "I",
          "fund_risk_rating": "Y",
          "fundPosition": "Increase",
          "fundImg": "./assets/images/chart-increase.svg",
          "units_held_number": 1271.76,
          "nav_price_number": 0.57,
          "canEdit": false,
          "source_screen": "dashboard"
        }
      ],
      "accountName": "",
      "unitTrustAccount": "",
      "paymentAccount": "",
      "referenceNumber": "",
      "transactionSuccessStatus": false,
      "transactionStatusName": "",
      "transactionStatus": "",
      "transactionStatusText": "",
      "transactionDate": "",
      "transactionWorkingDays": "",
      "flow": "002",
      "flow_text": "redeem",
      "total_redemption_units": 0,
      "total_redemption_amount": 0,
      "total_switch_out_units": 0,
      "total_switch_in_units": 0,
      "otpResponse": {},
      "otpResponseMessage": null,
      "otpResponseReferenceNumber": null,
      "verifyResponse": {},
      "verifyResponseMessage": 'FAILED',
      "verifyResponseReferenceNumber": null,
      "postAllTransactionResponse": null,
      "cartFooterToggle": false
    };
    fixture.detectChanges();
    component.callingApi = 'verify';
    component.callPostAPI = true;
    component.updateData(data);
    fixture.detectChanges();
    expect(component.tagErrorShow).toBe(false);

  });



  it('ReviewPurchaseComponent updateData - data -postAllTransactionResponse   clicked', () => {
    const data = {
      "totalAmount": 500,
      "totalNetInvestmentAmount": 495,
      "totalSalesCharges": 5,
      "totalFundsCount": 1,
      "higherRiskFundCategory": 0,
      "fundList": [
        {
          "min_sub_amt": 500,
          "current_investment": "1,271.76",
          "unit_held": "1,271.76",
          "total_percentage": "27.18%",
          "min_init_amt": 1000,
          "total_return": "+271.76",
          "holding": "1,271.76",
          "max_sub_amt": 1000000000000,
          "risk_rating": "8",
          "average_nav_price": "1.0000",
          "classHexa": "#5CD3CD",
          "sales_charge": 0,
          "class_holding": 40.1,
          "min_holding": 1000,
          "wholesale_msg": "Wholesales Msg Fund Detail Object Found",
          "asset_class": "LOCAL EQUITY",
          "fund_status": "A",
          "class_seq": 3,
          "fund_name": "AMITTIKAL",
          "ut_account_no": "A80039444",
          "total_invested": "1,000.00",
          "max_init_amt": 1000000000000,
          "syariah_complaint": "I",
          "nav_price": "0.57",
          "wholesale_ind": "N",
          "risk_name": "Growth",
          "product_category": "LOCAL_EQT",
          "fundTotalReturnType": null,
          "fundTotalReturnValue": null,
          "displayFlag": true,
          "total_return_type": "+",
          "sales_charge_nonstaff": 1,
          "sales_charge_staff": 0,
          "switch_indicator": 500,
          "fund_code": "AMU03A",
          "minimum_initial_subscription_amount": 1000,
          "maximum_subsequent_subscription_amount": 1000000000000,
          "min_redem_amt": 500,
          "maximum_initial_subscription_amount": 1000000000000,
          "max_switch_amt": 500,
          "total_return_value": "271.76",
          "max_redem_amt": 1000000000000,
          "min_switch_amt": 500,
          "minimum_subsequent_subscription_amount": 500,
          "can_edit": false,
          "txn_type": null,
          "card_amount": 500,
          "card_sale_charge": 5,
          "card_net_amount": 495,
          "card_redemption_units": 0,
          "card_redemption_amount": 0,
          "card_switch_out_units": 0,
          "card_switch_out_amount": 0,
          "card_switch_in_units": 0,
          "card_switch_in_amount": 0,
          "card_switch_percentage": 0,
          "card_switch_charges_fee": 0,
          "card_net_switch_in_amount": 0,
          "card_switch_in_fund": [],
          "flow": "001",
          "flow_text": "topup",
          "min_amt": 500,
          "max_amt": 1000000000000,
          "risk_ind": null,
          "fund_indicator": "I",
          "fund_risk_rating": "Y",
          "fundPosition": "Increase",
          "fundImg": "./assets/images/chart-increase.svg",
          "units_held_number": 1271.76,
          "nav_price_number": 0.57,
          "canEdit": false,
          "source_screen": "dashboard"
        }
      ],
      "accountName": "",
      "unitTrustAccount": "",
      "paymentAccount": "",
      "referenceNumber": "",
      "transactionStatusName": "",
      "transactionStatus": "",
      "transactionStatusText": "",
      "transactionDate": "",
      "transactionWorkingDays": "",
      "flow": "002",
      "flow_text": "redeem",
      "total_redemption_units": 0,
      "total_redemption_amount": 0,
      "total_switch_out_units": 0,
      "total_switch_in_units": 0,
      "otpResponse": {},
      "otpResponseMessage": null,
      "otpResponseReferenceNumber": null,
      "verifyResponse": {},
      "verifyResponseMessage": null,
      "verifyResponseReferenceNumber": null,
      "postAllTransactionResponse": '{"referenceNumber":"1102907","transactionSuccessStatus":true,"transactionStatus":"Your transaction request has been placed with us succesfully","transactionStatusName":"success","transactionStatusText":"Transaction successful","transactionDate":"23-Nov-2021 at 09.23 PM","transactionWorkingDays":"3"}',
      "transactionSuccessStatus": true,
      "cartFooterToggle": false
    };
    fixture.detectChanges();
    component.callingApi = 'verify';
    component.callPostAPI = true;
    component.updateData(data);
    fixture.detectChanges();
    expect(component.postAllTransactionResponse).toEqual('{"referenceNumber":"1102907","transactionSuccessStatus":true,"transactionStatus":"Your transaction request has been placed with us succesfully","transactionStatusName":"success","transactionStatusText":"Transaction successful","transactionDate":"23-Nov-2021 at 09.23 PM","transactionWorkingDays":"3"}');
    expect(component.postAllTransactionSuccessStatus).toBeTruthy();
    expect(component.callingApi).toBe('');
  });


  it('ReviewPurchaseComponent updateData - data -postAllTransactionResponse   clicked', () => {
    const data = {
      "totalAmount": 500,
      "totalNetInvestmentAmount": 495,
      "totalSalesCharges": 5,
      "totalFundsCount": 1,
      "higherRiskFundCategory": 0,
      "fundList": [
        {
          "min_sub_amt": 500,
          "current_investment": "1,271.76",
          "unit_held": "1,271.76",
          "total_percentage": "27.18%",
          "min_init_amt": 1000,
          "total_return": "+271.76",
          "holding": "1,271.76",
          "max_sub_amt": 1000000000000,
          "risk_rating": "8",
          "average_nav_price": "1.0000",
          "classHexa": "#5CD3CD",
          "sales_charge": 0,
          "class_holding": 40.1,
          "min_holding": 1000,
          "wholesale_msg": "Wholesales Msg Fund Detail Object Found",
          "asset_class": "LOCAL EQUITY",
          "fund_status": "A",
          "class_seq": 3,
          "fund_name": "AMITTIKAL",
          "ut_account_no": "A80039444",
          "total_invested": "1,000.00",
          "max_init_amt": 1000000000000,
          "syariah_complaint": "I",
          "nav_price": "0.57",
          "wholesale_ind": "N",
          "risk_name": "Growth",
          "product_category": "LOCAL_EQT",
          "fundTotalReturnType": null,
          "fundTotalReturnValue": null,
          "displayFlag": true,
          "total_return_type": "+",
          "sales_charge_nonstaff": 1,
          "sales_charge_staff": 0,
          "switch_indicator": 500,
          "fund_code": "AMU03A",
          "minimum_initial_subscription_amount": 1000,
          "maximum_subsequent_subscription_amount": 1000000000000,
          "min_redem_amt": 500,
          "maximum_initial_subscription_amount": 1000000000000,
          "max_switch_amt": 500,
          "total_return_value": "271.76",
          "max_redem_amt": 1000000000000,
          "min_switch_amt": 500,
          "minimum_subsequent_subscription_amount": 500,
          "can_edit": false,
          "txn_type": null,
          "card_amount": 500,
          "card_sale_charge": 5,
          "card_net_amount": 495,
          "card_redemption_units": 0,
          "card_redemption_amount": 0,
          "card_switch_out_units": 0,
          "card_switch_out_amount": 0,
          "card_switch_in_units": 0,
          "card_switch_in_amount": 0,
          "card_switch_percentage": 0,
          "card_switch_charges_fee": 0,
          "card_net_switch_in_amount": 0,
          "card_switch_in_fund": [],
          "flow": "001",
          "flow_text": "topup",
          "min_amt": 500,
          "max_amt": 1000000000000,
          "risk_ind": null,
          "fund_indicator": "I",
          "fund_risk_rating": "Y",
          "fundPosition": "Increase",
          "fundImg": "./assets/images/chart-increase.svg",
          "units_held_number": 1271.76,
          "nav_price_number": 0.57,
          "canEdit": false,
          "source_screen": "dashboard"
        }
      ],
      "accountName": "",
      "unitTrustAccount": "",
      "paymentAccount": "",
      "referenceNumber": "",
      "transactionStatusName": "",
      "transactionStatus": "",
      "transactionStatusText": "",
      "transactionDate": "",
      "transactionWorkingDays": "",
      "flow": "002",
      "flow_text": "redeem",
      "total_redemption_units": 0,
      "total_redemption_amount": 0,
      "total_switch_out_units": 0,
      "total_switch_in_units": 0,
      "otpResponse": {},
      "otpResponseMessage": null,
      "otpResponseReferenceNumber": null,
      "verifyResponse": {},
      "verifyResponseMessage": null,
      "verifyResponseReferenceNumber": null,
      "postAllTransactionResponse": '{"referenceNumber":"1102907","transactionSuccessStatus":true,"transactionStatus":"Your transaction request has been placed with us succesfully","transactionStatusName":"success","transactionStatusText":"Transaction successful","transactionDate":"23-Nov-2021 at 09.23 PM","transactionWorkingDays":"3"}',
      "transactionSuccessStatus": false,
      "cartFooterToggle": false
    };
    fixture.detectChanges();
    component.callingApi = 'transaction';
    component.callPostAPI = true;
    component.updateData(data);
    fixture.detectChanges();
    expect(component.postAllTransactionSuccessStatus).toBe(false);
  });

  it('ReviewPurchaseComponent updateData - data -postAllTransactionResponse   clicked flow 003 switch', () => {
    const data = {
      "totalAmount": 500,
      "totalNetInvestmentAmount": 495,
      "totalSalesCharges": 5,
      "totalFundsCount": 1,
      "higherRiskFundCategory": 0,
      "fundList": [
        {
          "min_sub_amt": 500,
          "current_investment": "1,271.76",
          "unit_held": "1,271.76",
          "total_percentage": "27.18%",
          "min_init_amt": 1000,
          "total_return": "+271.76",
          "holding": "1,271.76",
          "max_sub_amt": 1000000000000,
          "risk_rating": "8",
          "average_nav_price": "1.0000",
          "classHexa": "#5CD3CD",
          "sales_charge": 0,
          "class_holding": 40.1,
          "min_holding": 1000,
          "wholesale_msg": "Wholesales Msg Fund Detail Object Found",
          "asset_class": "LOCAL EQUITY",
          "fund_status": "A",
          "class_seq": 3,
          "fund_name": "AMITTIKAL",
          "ut_account_no": "A80039444",
          "total_invested": "1,000.00",
          "max_init_amt": 1000000000000,
          "syariah_complaint": "I",
          "nav_price": "0.57",
          "wholesale_ind": "N",
          "risk_name": "Growth",
          "product_category": "LOCAL_EQT",
          "fundTotalReturnType": null,
          "fundTotalReturnValue": null,
          "displayFlag": true,
          "total_return_type": "+",
          "sales_charge_nonstaff": 1,
          "sales_charge_staff": 0,
          "switch_indicator": 500,
          "fund_code": "AMU03A",
          "minimum_initial_subscription_amount": 1000,
          "maximum_subsequent_subscription_amount": 1000000000000,
          "min_redem_amt": 500,
          "maximum_initial_subscription_amount": 1000000000000,
          "max_switch_amt": 500,
          "total_return_value": "271.76",
          "max_redem_amt": 1000000000000,
          "min_switch_amt": 500,
          "minimum_subsequent_subscription_amount": 500,
          "can_edit": false,
          "txn_type": null,
          "card_amount": 500,
          "card_sale_charge": 5,
          "card_net_amount": 495,
          "card_redemption_units": 0,
          "card_redemption_amount": 0,
          "card_switch_out_units": 0,
          "card_switch_out_amount": 0,
          "card_switch_in_units": 0,
          "card_switch_in_amount": 0,
          "card_switch_percentage": 0,
          "card_switch_charges_fee": 0,
          "card_net_switch_in_amount": 0,
          "card_switch_in_fund": [],
          "flow": "001",
          "flow_text": "topup",
          "min_amt": 500,
          "max_amt": 1000000000000,
          "risk_ind": null,
          "fund_indicator": "I",
          "fund_risk_rating": "Y",
          "fundPosition": "Increase",
          "fundImg": "./assets/images/chart-increase.svg",
          "units_held_number": 1271.76,
          "nav_price_number": 0.57,
          "canEdit": false,
          "source_screen": "dashboard"
        }
      ],
      "accountName": "",
      "unitTrustAccount": "",
      "paymentAccount": "",
      "referenceNumber": "",
      "transactionStatusName": "",
      "transactionStatus": "",
      "transactionStatusText": "",
      "transactionDate": "",
      "transactionWorkingDays": "",
      "flow": "003",
      "flow_text": "switch",
      "total_redemption_units": 0,
      "total_redemption_amount": 0,
      "total_switch_out_units": 0,
      "total_switch_in_units": 0,
      "otpResponse": {},
      "otpResponseMessage": null,
      "otpResponseReferenceNumber": null,
      "verifyResponse": {},
      "verifyResponseMessage": null,
      "verifyResponseReferenceNumber": null,
      "postAllTransactionResponse": '{"referenceNumber":"1102907","transactionSuccessStatus":true,"transactionStatus":"Your transaction request has been placed with us succesfully","transactionStatusName":"success","transactionStatusText":"Transaction successful","transactionDate":"23-Nov-2021 at 09.23 PM","transactionWorkingDays":"3"}',
      "transactionSuccessStatus": false,
      "cartFooterToggle": false
    };
    fixture.detectChanges();
    component.callingApi = 'transaction';
    component.callPostAPI = true;
    component.updateData(data);
    fixture.detectChanges();
    expect(component.postAllTransactionSuccessStatus).toBe(false);
  });

  it('ReviewPurchaseComponent backButtonEvent -  clicked', () => {
    component.currentUrl = "/dashboard;tab=0"
    expect(component.backButtonEvent()).toBeUndefined();

  });

  it('ReviewPurchaseComponent ngOnInit loadUserData -  clicked', () => {
    expect(component.ngOnInit()).toBeUndefined();
    const users = {
      dashboardData: '',
      dashboardScreenData: '',
      loadCount: -1,
      loadInitialData: false,
      unitTrustAccount: 'A80113794',
      unitTrustAccountList: [
        {
          default_ind: 'Y',
          ut_account_no: 'A80113794',
        },
      ],
      user: {
        casa_indicator: 'N',
        customer_id: '2222222222222222',
        customer_id_type: 'SOLO_PROP',
        customer_mobile_no: 2222222222222222,
        customer_name: 'test',
        dashbordData: 1,
        debit_card_no: 12121212121212,
        invertment_indicator: 'N',
        lastSeen: '4 Sept 2020, 10:30AM',
        risk_profile: 'Defensive',
        sole_prop: 'P',
        story: 'WJ-85',
      },
    };

    component.userData = users;

    component.loadData();
    expect(component.loadData()).toBeTruthy();
    expect(component.loadUserData(users)).toBeTruthy();
    component.loadUserData(users);
    fixture.detectChanges();
    expect(component.userData).toBe(users);
    expect(component.userObj).toBe(users.user);
    expect(component.customerName).toBeUndefined();
  });

  it('ReviewPurchaseComponent requestTagCanEnableEvent - data  clicked', () => {

    expect(component.requestTagCanEnableEvent(true)).toBeTruthy();
    expect(component.requestTagCanEnabled).toBeTruthy();
  });

  it('updateLandingPageFinalStatus ', () => {
    jest.spyOn(store, 'select').mockReturnValue(of(landingPageResponse.landingPageStatus));
    expect(component.updateLandingPageFinalStatus());
    expect(component).toBeTruthy();
  });

  it('verifyOTP for NTP user ', () => {
    component.customerMobileNumber = '0123456789';
    fixture.detectChanges();

    const response = {
      verifyResponseMessage: "OTP Verification Successful",
      verifyResponseReferenceNumber: null
    }
    jest.spyOn(store, 'select').mockReturnValue(of(response));;
    component.userType = 'NTP'
    component.verifyOTP("123456");
    expect(component.callingApi).toBe('verify');
  });

  it('should called checkUserType if NTP', () => {
    const userType = 'NTP';

    expect(component.checkIfNTP(userType)).toBeFalsy();
  });

  it('should called checkUserType non-NTP', () => {
    const userType = 'ETP';

    expect(component.checkIfNTP(userType)).toBeFalsy();
  });

  it('should update tagErrorShow property', () => {
    component.changeTagError(true);
    expect(component.tagErrorShow).toBe(true);
    component.changeTagError(false);
    expect(component.tagErrorShow).toBe(false);
  });

  it('ReviewPurchaseComponent updateData - data -postAllTransactionResponse businessErrors', () => {
    const data = {
      "totalAmount": 2490404.26,
      "totalNetInvestmentAmount": 1660103.48,
      "totalSalesCharges": 0,
      "totalFundsCount": 1,
      "higherRiskFundCategory": 0,
      "fundList": [
        {
          "totalInvestment": 1660103.48,
          "totalRedem": 2490404.26,
          "totalRedemAmount": 1660103.48,
          "switchSalesCharges": 0,
          "totalSwitchOut": 0,
          "switchOutAmount": 0,
          "fundCode": "CBT40A",
          "txnType": "02",
          "currentHolding": null,
          "totalNetAmount": 1660103.48,
          "totalSalesCharges": 0,
          "totalSalesPercentage": 0,
          "maximumInitialSubscriptionAmount": 9999999999999,
          "totalSwitchIn": 0,
          "switchInAmount": 0,
          "toFundCode": "",
          "documentIndicator": true,
          "cartDetailId": "80627b34-a347-44b2-b581-d5030ff58b13",
          "switch_sales_percentage": 0,
          "risk_name": "Growth",
          "nav_price": 0.2954,
          "min_switch_amt": 400,
          "minimum_subsequent_subscription_amount": 200,
          "sales_charges_nonstaff": 2.5,
          "close_date": "18 Nov 2015",
          "three_month_ind": "DOWN",
          "switch_indicator": "Y",
          "minimum_initial_subscription_amount": 1000,
          "maximum_subsequent_subscription_amount": 9999999999999,
          "sales_charge_staff": 5.5,
          "class_name": "REGIONAL EQUITY",
          "min_holding": 400,
          "min_redem_amt": 400,
          "fund_status": "A",
          "fund_name": "CIMB-PRINCIPAL ASIA PACIFIC DYNAMIC INCOME FUND",
          "one_month_ind": "DOWN",
          "fund_indicator": "C",
          "manager_name": "CIMB-PRINCIPAL ASSET MANAGEMENT BERHAD",
          "max_switch_amt": null,
          "three_month": -0.05,
          "one_month": -1.27,
          "charge_id": 0,
          "tax_id": 0,
          "tax_code": "",
          "tax_rate": 0,
          "tax_amount": 0,
          "sales_status": "Y",
          "max_redem_amt": 9999999999999,
          "fund_risk_rating": "Y",
          "to_fund_risk_rating": "N",
          "average_nav_price": 0.6666,
          "holding": 8301347.54,
          "total_invested": 2500000,
          "current_investment": 5533678.27,
          "to_fund_name": null,
          "to_fund_class_name": null,
          "to_fund_risk_name": null,
          "to_fund_indicator": null,
          "to_fund_status": null,
          "fund_code": "CBT40A",
          "canEdit": false,
          "min_amt": 400,
          "max_amt": 9999999999999,
          "flow": "002",
          "flow_text": "redeem",
          "card_amount": 1660103.48,
          "card_sale_charge": 0,
          "card_net_amount": 1660103.48,
          "card_redemption_units": 2490404.26,
          "card_redemption_amount": 1660103.48,
          "source_screen": "api"
        }
      ],
      "accountName": "",
      "unitTrustAccount": "A80111431",
      "paymentAccount": "",
      "referenceNumber": "",
      "transactionSuccessStatus": false,
      "transactionStatusName": "",
      "transactionStatus": "",
      "transactionStatusText": "",
      "transactionDate": "",
      "transactionWorkingDays": "",
      "flow": "002",
      "flow_text": "redeem",
      "total_redemption_units": 2490404.26,
      "total_redemption_amount": 1660103.48,
      "total_switch_out_units": 0,
      "total_switch_in_units": 0,
      "total_switch_out_amount": 0,
      "total_switch_in_amount": 0,
      "otpResponse": "{\"message\":\"OTP Sent Successfully\"}",
      "otpResponseMessage": "Invalid fund status for redeem",
      "otpResponseReferenceNumber": null,
      "verifyResponse": null,
      "verifyResponseMessage": null,
      "verifyResponseReferenceNumber": null,
      "postAllTransactionResponse": '{"headers":{"normalizedNames":{},"lazyUpdate":null},"status":500,"statusText":"Internal Server Error","url":"https://wld20.devapps.tcjteam.tech/api/gateway/emanager/purchase/v2/transaction-audit/","ok":false,"name":"HttpErrorResponse","message":"Http failure response for https://wld20.devapps.tcjteam.tech/api/gateway/emanager/purchase/v2/transaction-audit/: 500 Internal Server Error","error":{"traceid":"0604c727-7689-47a2-b383-7c94ff89d2fb","error":"BUSINESS_ERROR","businessErrorCode":"50008","message":"Invalid fund status for redeem","path":"/purchase/v2/transaction-audit/","status":500,"timestamp":"2023-04-18T08:38:09.048Z"}}',
      "cartFooterToggle": false,
      "showCartIcon": false,
      "createCartResponse": null,
      "createCartResponseMessage": null,
      "updateCartResponse": null,
      "getCartByClientIdResponse": "{\"utAccountNo\":\"A80111431\",\"txnType\":\"02\",\"totalFund\":1,\"staffIndicator\":\"0\",\"totalInvestment\":1660103.48,\"totalNetAmount\":1660103.48,\"totalSalesCharges\":0,\"totalSwitchIn\":0,\"switchInAmount\":0,\"totalRedem\":2490404.26,\"totalRedemAmount\":1660103.48,\"totalSwitchOut\":0,\"switchOutAmount\":0,\"cartSummaryId\":\"8be96071-c917-4c79-9b20-8f794c0c2b9a\",\"cartDetailFund\":[{\"totalInvestment\":1660103.48,\"totalRedem\":2490404.26,\"totalRedemAmount\":1660103.48,\"switchSalesCharges\":0,\"totalSwitchOut\":0,\"switchOutAmount\":0,\"fundCode\":\"CBT40A\",\"txnType\":\"02\",\"currentHolding\":null,\"totalNetAmount\":1660103.48,\"totalSalesCharges\":0,\"totalSalesPercentage\":0,\"maximumInitialSubscriptionAmount\":9999999999999,\"totalSwitchIn\":0,\"switchInAmount\":0,\"toFundCode\":\"\",\"documentIndicator\":true,\"cartDetailId\":\"80627b34-a347-44b2-b581-d5030ff58b13\",\"switch_sales_percentage\":0,\"risk_name\":\"Growth\",\"nav_price\":0.2954,\"min_switch_amt\":400,\"minimum_subsequent_subscription_amount\":200,\"sales_charges_nonstaff\":2.5,\"close_date\":\"18 Nov 2015\",\"three_month_ind\":\"DOWN\",\"switch_indicator\":\"Y\",\"minimum_initial_subscription_amount\":1000,\"maximum_subsequent_subscription_amount\":9999999999999,\"sales_charge_staff\":5.5,\"class_name\":\"REGIONAL EQUITY\",\"min_holding\":400,\"min_redem_amt\":400,\"fund_status\":\"A\",\"fund_name\":\"CIMB-PRINCIPAL ASIA PACIFIC DYNAMIC INCOME FUND\",\"one_month_ind\":\"DOWN\",\"fund_indicator\":\"C\",\"manager_name\":\"CIMB-PRINCIPAL ASSET MANAGEMENT BERHAD\",\"max_switch_amt\":null,\"three_month\":-0.05,\"one_month\":-1.27,\"charge_id\":0,\"tax_id\":0,\"tax_code\":\"\",\"tax_rate\":0,\"tax_amount\":0,\"sales_status\":\"Y\",\"max_redem_amt\":9999999999999,\"fund_risk_rating\":\"Y\",\"to_fund_risk_rating\":\"N\",\"average_nav_price\":0.6666,\"holding\":8301347.54,\"total_invested\":2500000,\"current_investment\":5533678.27,\"to_fund_name\":null,\"to_fund_class_name\":null,\"to_fund_risk_name\":null,\"to_fund_indicator\":null,\"to_fund_status\":null}]}",
      "csId": null,
      "txnType": "02",
      "selectedCasaAccountIndex": 0,
      "switchCartResponse": null,
      "deletCartResponse": null,
      "storeTransaction": [],
      "scheduler_msg": "Transactions performed after 2pm will be executed the next business day",
      "cartSummaryId": "8be96071-c917-4c79-9b20-8f794c0c2b9a"
    }
 
    fixture.detectChanges();
    component.verifyResponse = data.verifyResponse;
    component.postAllTransactionResponse = JSON.parse(data.postAllTransactionResponse);
    component.callingApi = 'verify';
    component.callPostAPI = true;
    component.updateData(data);
    fixture.detectChanges();
    expect(component.postAllTransactionSuccessStatus).toBe(false);
  });
});
