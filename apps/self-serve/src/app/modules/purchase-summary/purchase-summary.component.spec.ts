import { DashboardComponent } from './../dashboard/dashboard.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

import { PurchaseSummaryComponent } from './purchase-summary.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

describe('PurchaseSummaryComponent', () => {
  let component: PurchaseSummaryComponent;
  let fixture: ComponentFixture<PurchaseSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'dashboard', component: DashboardComponent }
        ]),
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        MatDialogModule,
      ],
      providers: [MatDialog],
      declarations: [PurchaseSummaryComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('PurchaseSummaryComponent ngOnInit -  clicked', () => {
    expect(component.ngOnInit()).toBeUndefined();
  });
  it('PurchaseSummaryComponent ngOnInit', () => {
    component.cartDetails = [{
      category: "Unit Trust",
      fundCategory: "Growth",
      fundClass: "GLOBAL EQUITY",
      fundShariah: "C",
      price: '0.8645',
      productID: "CBT06A",
      productName: "CIMB-PRINCIPAL GLOBAL TITANS FUND",
      totalValue: '300'
    }];
    expect(component.ngOnInit()).toBeUndefined();
    component.customerType = 'NTP';
    component.flow = '001';
    expect(component.loadPurchaseAdobeAnalytics('', '')).toBeUndefined();
    component.flow = '002';
    expect(component.loadPurchaseAdobeAnalytics('', '')).toBeUndefined();
    component.flow = '003';
    expect(component.loadSwitchAdobeAnalytics()).toBeUndefined();
  });
  // it('PurchaseSummaryComponent ngOnInit -  cartData undefined', () => {
  //   expect(component.ngOnInit()).toBeUndefined();
  //   expect(component.loadData()).toBeTruthy();
  // });

  // it('PurchaseSummaryComponent ngOnInit -  cartData undefined', () => {
  //   expect(component.ngOnInit()).toBeUndefined();
  //   expect(component.loadData()).toBeTruthy();


  //   expect(component.totalAmount).toBeUndefined();
  //   expect(component.totalFundsCountVal).toEqual(0);
  //   // expect(component.highRiskCount).toBeUndefined();
  //   expect(component.totalFund).toBeUndefined();
  //   expect(component.totalSalesCharge).toBeUndefined();
  //   expect(component.totalNetInvestmentAmount).toBeUndefined();
  // });

  it('PurchaseSummaryComponent ngOnInit -  cartData defined', () => {
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
    fixture.detectChanges();
    expect(component.updateData(data)).toBeTruthy();
    expect(component.cartData).toBeDefined();
    expect(component.totalAmountVal).toEqual("0");
    expect(component.totalFundsCountVal).toEqual(0);
    expect(component.highRiskCount).toEqual(0);
    expect(component.totalFund).toEqual(0);
    expect(component.totalSalesCharge).toEqual(0);
    expect(component.totalNetInvestmentAmount).toEqual(0);
  });


  it('PurchaseSummaryComponent ngOnInit -  userData defined', () => {
    expect(component.ngOnInit()).toBeUndefined();
    expect(component.loadData()).toBeTruthy();
    const userData = { customer_name: 'test user', cimb_staff: 'test staff' };
    const userObj = { cimb_staff: 'test staff' };
    component.userData = userData;
    component.userObj = userObj;
    expect(component.accountName).toEqual("");
    expect(component.cimbStaffs).toEqual("N");
  });

  it('PurchaseSummaryComponent updateData - data -postAllTransactionResponse   clicked', () => {
    const data = {
      "totalAmount": 500,
      "totalNetInvestmentAmount": 495,
      "totalSalesCharges": 5,
      "totalFundsCount": 2,
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
          "fund_name": "CIMB ISLAMIC BALANCED GROWTH FUND",
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
          "fund_indicator": "Islamic",
          "fund_risk_rating": "Y",
          "fundPosition": "Increase",
          "fundImg": "./assets/images/chart-increase.svg",
          "units_held_number": 1271.76,
          "nav_price_number": 0.57,
          "canEdit": false,
          "source_screen": "dashboard"
        }, {
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
          "fund_indicator": "C",
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
    const cartDetails = [{
      productName: 'CIMB ISLAMIC BALANCED GROWTH FUND',
      fundShariah: 'I',
      fundClass: 'LOCAL EQUITY',
      productID: 'CBT11A',
      category: 'Unit Trust',
      totalValue: '200',
      price: '1.8664',
      fundCategory: 'Balanced'
    }]
    fixture.detectChanges();
    component.investments = data.fundList;
    component.cartDetails = cartDetails;
    component.updateData(data);
    fixture.detectChanges();
    expect(component.hasRedeemOption).toBeTruthy();
    expect(component.flow).toEqual('002');
    expect(component.pageTitle).toEqual('Redemption Request Completed');
    expect(component.cardTitle).toEqual('Transaction Summary (2 Funds)');
    expect(component.cartDetails[0].productName).toEqual(component.investments[0].fund_name);
    expect(component.cartDetails[0].fundShariah).toEqual(component.investments[0].fund_indicator);
    expect(component.cartDetails[0].fundClass).toEqual(component.investments[0].class_name);
    expect(component.cartDetails[0].productID).toEqual(component.investments[0].fund_code);
    expect(component.cartDetails[0].fundCategory).toEqual(component.investments[0].risk_name);
    expect(component.cartDetails[0].totalValue).toEqual(component.investments[0].card_amount);
    expect(component.cartDetails[0].price).toEqual(component.investments[0].nav_price);
    expect(component.cartDetails[0].category).toEqual('Unit Trust');
  });

  it('PurchaseSummaryComponent updateData - data -postAllTransactionResponse   clicked - flow 003 switch', () => {
    const data = {
      "totalAmount": 500,
      "totalNetInvestmentAmount": 495,
      "totalSalesCharges": 5,
      "totalFundsCount": 2,
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
          "fund_indicator": "Islamic",
          "fund_risk_rating": "Y",
          "fundPosition": "Increase",
          "fundImg": "./assets/images/chart-increase.svg",
          "units_held_number": 1271.76,
          "nav_price_number": 0.57,
          "canEdit": false,
          "source_screen": "dashboard"
        }, {
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
          "fund_indicator": "C",
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
      "transactionSuccessStatus": true,
      "cartFooterToggle": false
    };
    fixture.detectChanges();
    component.updateData(data);
    fixture.detectChanges();
    expect(component.hasRedeemOption).toBeFalsy();
    expect(component.flow).toEqual('003');
    expect(component.pageTitle).toEqual('Switch Request Completed');
    expect(component.cardTitle).toEqual('Transaction Summary (2 Funds)');
  });

  it('PurchaseSummaryComponent backButtonEvent -  clicked', () => {
    component.currentUrl = "/dashboard;tab=0"
    expect(component.backButtonEvent()).toBeUndefined();

  });

  it('checkIfNTP function test', () => {
    component.checkIfNTP("NTP");
    expect(component.noProgressStep).toBe(true);
    component.checkIfNTP("ETP");
    expect(component.noProgressStep).toBe(false);
  });

  // Tests that the method returns 'Islamic' when the fund indicator is 'I' and flow is '003'
  it('check_Islamic', () => {
    const result = component.updateDataFundShariah('003', { to_fund_indicator: 'I' });
    expect(result).toBe('Islamic');
  });

  // Tests that the method returns the fund indicator when it is not 'I' and flow is '003'
  it('check_non_Islamic', () => {
    const result = component.updateDataFundShariah('003', { to_fund_indicator: 'Non-Islamic' });
    expect(result).toBe('Non-Islamic');
  });

});
