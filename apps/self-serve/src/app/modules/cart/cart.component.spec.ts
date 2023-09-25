import { OpeningAccountComponent } from './../opening-account/opening-account.component';
import { AvailableFundsComponent } from './../available-funds/available-funds.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { ReviewPurchaseComponent } from '../review-purchase/review-purchase.component';

import { CartComponent } from './cart.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectInvestmentOptionsComponent } from '../select-investment-options/select-investment-options.component';
import { DecimalPipe } from '@angular/common';
import { CartService } from '../../core/services/cart/cart.service';
import { of } from 'rxjs';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
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

  postAllTransactionResponse:null,

  cartFooterToggle:true
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
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'review-purchase', component: ReviewPurchaseComponent},
          { path: 'available-funds', component: AvailableFundsComponent},
          { path: 'opening-account', component: OpeningAccountComponent},
          { path: 'investment-options', component: SelectInvestmentOptionsComponent},
        ]),
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        MatDialogModule,
        BrowserAnimationsModule
      ],
      providers: [
          provideMockStore({ initialState }), MatDialog, CartService, DecimalPipe
      ],
      declarations: [ReviewPurchaseComponent,AvailableFundsComponent, OpeningAccountComponent, SelectInvestmentOptionsComponent, CartComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
     store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    jest.spyOn(store, 'dispatch');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('CartComponent ngOnInit -  clicked', () => {
    expect(component.ngOnInit()).toBeUndefined();
  });
  it('CartComponent ngOnInit -  cartData undefined', () => {
    component.cartData = {
      fundList: [],
      higherRiskFundCategory: 0,
      totalAmount: 2000,
      totalFundsCount: 1,
      totalNetInvestmentAmount: 1988,
      totalSalesCharges: 12,
    };
    component.cartData.flow='001';
    component.customerType='NTP';
    expect(component.loadPurchaseAdobeAnalytics(2)).toBeUndefined();
    component.cartData.flow='002';
    component.customerType='NTP';
    expect(component.loadRedeemSwitchAdobeAnalytics('Wealth: UT Redeem Cart','Unit Trust Redemption')).toBeUndefined();
    component.cartData.flow='003';
    component.customerType='NTP';
    expect(component.loadRedeemSwitchAdobeAnalytics('Wealth: UT Switch Cart','Unit Trust Switching')).toBeUndefined();
    expect(component.ngOnInit()).toBeUndefined();
    expect(component.loadData()).toBeTruthy();
    expect(component.cartData).toBeUndefined();
  });

  it('CartComponent ngOnInit -  cartData undefined', () => {
    expect(component.ngOnInit()).toBeUndefined();
    expect(component.loadData()).toBeTruthy();
    component.cartData = {
      fundList: [],
      higherRiskFundCategory: 0,
      totalAmount: 2000,
      totalFundsCount: 1,
      totalNetInvestmentAmount: 1988,
      totalSalesCharges: 12,
    };
    expect(component.totalAmount).toEqual(0);
    expect(component.totalFundsCountVal).toEqual(0);
    expect(component.highRiskCount).toEqual(0);
    expect(component.switchInhighRiskCount).toEqual(0);
    expect(component.totalFund).toEqual(0);
    expect(component.totalSalesCharge).toEqual(0);
    expect(component.totalNetInvestmentAmount).toEqual(0);
  });

  it('CartComponent ngOnInit -  cartData undefined', () => {
    expect(component.ngOnInit()).toBeUndefined();
    expect(component.loadData()).toBeTruthy();
    component.cartData = {
      fundList: [],
      higherRiskFundCategory: 0,
      totalAmount: 2000,
      totalFundsCount: 1,
      totalNetInvestmentAmount: 1988,
      totalSalesCharges: 12,
    };
    expect(component.totalAmount).toEqual(0);
    expect(component.totalFundsCountVal).toEqual(0);
    expect(component.highRiskCount).toEqual(0);
    expect(component.switchInhighRiskCount).toEqual(0);
    expect(component.totalFund).toEqual(0);
    expect(component.totalSalesCharge).toEqual(0);
    expect(component.totalNetInvestmentAmount).toEqual(0);
  });

  it('CartComponent ngOnInit -  loadData undefined', () => {
    expect(component.ngOnInit()).toBeUndefined();
    expect(component.loadData()).toBeTruthy();
    const users = {
          "dashboardData": "",
          "dashboardScreenData": "",
          "loadCount": -1,
          "loadInitialData": false,
          "unitTrustAccount": "A80113794",
          "unitTrustAccountList": [
            {
              "default_ind": "Y",
              "ut_account_no": "A80113794"
            }
          ],
          "user": {
            "casa_indicator": "N",
            "customer_id": "2222222222222222",
            "customer_id_type": "SOLO_PROP",
            "customer_mobile_no": 2222222222222222,
            "customer_name": "",
            "dashbordData": 1,
            "debit_card_no": 12121212121212,
            "invertment_indicator": "N",
            "lastSeen": "4 Sept 2020, 10:30AM",
            "risk_profile": "Defensive",
            "sole_prop": "P",
            "story": "WJ-85"
          }
        };

    component.userData  = users;

    component.unitTrustAccount  = "A80113794";

     fixture.detectChanges();
    expect(component.userData).toBe(users);
    expect(component.unitTrustAccount ).toBe("A80113794");
    expect(component.updateUserDataData(users.user)).toBeTruthy();

    //expect(component.unitRiskProfile).toEqual("Defensive");
    //expect(component.unitTrustAccount).toEqual("A80113794");
  });


  it('CartComponent ngOnInit -  updateCartData undefined', () => {
    expect(component.ngOnInit()).toBeUndefined();
    expect(component.loadData()).toBeTruthy();
    const data = {
            "accountName": "",
            "fundList": [
              {
                "account_status": "A",
                "asset_class": "GLOBAL EQUITY",
                "average_nav_price": "0.5500",
                "canEdit": false,
                "card_amount": 7000,
                "card_net_amount": 6951,
                "card_sale_charge": 48.99999999999999,
                "classHexa": "#5CD3CD",
                "class_holding": "59.4",
                "class_seq": "5",
                "current_investment": "10716.03",
                "displayFlag": true,
                "fundImg": "./assets/images/chart-decrease.svg",
                "fundPosition": "Increase",
                "fundTotalReturnType": "-",
                "fundTotalReturnValue": "283.97",
                "fund_name": "WHOLESALES AMITTIKAL",
                "fund_status": "A",
                "holding": "10,716.03",
                "joint_indicator": "01",
                "max_amt": "7000",
                "max_init_amt": "1200",
                "max_sub_amt": "7000",
                "min_amt": "500",
                "min_holding": "1000",
                "min_init_amt": "500",
                "min_sub_amt": "500",
                "nav_price": "1.00",
                "risk_ind": "Y",
                "risk_name": "BALANCED",
                "sales_charge": "0.70",
                "syariah_complaint": "C",
                "total_invested": "11000.00",
                "total_percentage": "-2.58%",
                "total_return": "-283.97",
                "unit_held": 10716.03,
                "ut_account_no": " A80111993",
                "wholesale_msg": "Wholesales Msg Fund Detail Object Found"
              }
            ],
            "higherRiskFundCategory": 0,
            "paymentAccount": "",
            "referenceNumber": "",
            "totalAmount": 7000,
            "totalFundsCount": 1,
            "totalNetInvestmentAmount": 6951,
            "totalSalesCharges": 48.99999999999999,
            "transactionDate": "",
            "transactionStatus": "",
            "transactionStatusName": "",
            "transactionStatusText": "",
            "transactionSuccessStatus": false,
            "transactionWorkingDays": "",
            "unitTrustAccount": ""
          };

    expect(component.updateCartData(data)).toBeTruthy();
    expect(component.totalAmountVal).toEqual('7000');
    expect(component.totalFundsCountVal).toEqual(1);
    expect(component.highRiskCount).toEqual(0);
    expect(component.switchInhighRiskCount).toEqual(0);
    expect(component.investments.length).toEqual(1);
    expect(component.totalFund).toEqual(1);
    expect(component.totalAmount).toEqual(7000);
    expect(component.totalSalesCharge).toEqual(48.99999999999999);
    expect(component.totalNetInvestmentAmount).toEqual(6951);

    component.cartData = {
      fundList: [],
      higherRiskFundCategory: 0,
      totalAmount: 2000,
      totalFundsCount: 1,
      totalNetInvestmentAmount: 1988,
      totalSalesCharges: 12,
    };
    component.flow = '001';
    component.investments = [      
      { fund_risk_rating: 'Y', fund_status: 'A' },
    ];
    const expectedFilteredInvestmentsFundRiskRating = [      
      { fund_risk_rating: 'Y', fund_status: 'A' }, 
    ];
    expect(component.riskFundList).not.toEqual(expectedFilteredInvestmentsFundRiskRating);
    component.flow = '003';
    component.investments = [      
      { to_fund_risk_rating: 'Y', to_fund_status: 'A' },
    ];
    const expectedFilteredInvestments = [      
      { to_fund_risk_rating: 'Y', to_fund_status: 'A' },  
    ];
    expect(component.riskFundList).not.toEqual(expectedFilteredInvestments);
    component.flow = '001';
    component.investments = null;
    expect(component.riskFundList).toEqual([]);
    expect(component.totalAmount).toEqual(7000);
    expect(component.totalFundsCountVal).toEqual(1);
    expect(component.highRiskCount).toEqual(0);
    expect(component.switchInhighRiskCount).toEqual(0);
    expect(component.totalFund).toEqual(1);
    expect(component.totalSalesCharge).toEqual(48.99999999999999);
    expect(component.totalNetInvestmentAmount).toEqual(6951);
  });

  it('CartComponent editCartItem -  clicked', () => {
    const value = { index: 0, canEdit: false };
    expect(component.editCartItem(value)).toBeTruthy();
  });

  it('CartComponent updateAmountItem -  clicked', () => {
    const value = { index: 0, canEdit: false };
    expect(component.updateAmountItem(value)).toBeTruthy();
  });

//   it('CartComponent updateAmountItem check investment-  clicked', () => {
//     const value = { index: 0, canEdit: false };
//     const data = {
//       "accountName": "",
//       "fundList": [
//         {
//           "account_status": "A",
//           "asset_class": "GLOBAL EQUITY",
//           "average_nav_price": "0.5500",
//           "canEdit": false,
//           "card_amount": 7000,
//           "card_net_amount": 6951,
//           "card_sale_charge": 48.99999999999999,
//           "classHexa": "#5CD3CD",
//           "class_holding": "59.4",
//           "class_seq": "5",
//           "current_investment": "10716.03",
//           "displayFlag": true,
//           "fundImg": "./assets/images/chart-decrease.svg",
//           "fundPosition": "Increase",
//           "fundTotalReturnType": "-",
//           "fundTotalReturnValue": "283.97",
//           "fund_name": "WHOLESALES AMITTIKAL",
//           "fund_status": "A",
//           "holding": "10,716.03",
//           "joint_indicator": "01",
//           "max_amt": "7000",
//           "max_init_amt": "1200",
//           "max_sub_amt": "7000",
//           "min_amt": "500",
//           "min_holding": "1000",
//           "min_init_amt": "500",
//           "min_sub_amt": "500",
//           "nav_price": "1.00",
//           "risk_ind": "Y",
//           "risk_name": "BALANCED",
//           "sales_charge": "0.70",
//           "syariah_complaint": "C",
//           "total_invested": "11000.00",
//           "total_percentage": "-2.58%",
//           "total_return": "-283.97",
//           "unit_held": 10716.03,
//           "ut_account_no": " A80111993",
//           "wholesale_msg": "Wholesales Msg Fund Detail Object Found"
//         }
//       ],
//       "higherRiskFundCategory": 0,
//       "paymentAccount": "",
//       "referenceNumber": "",
//       "totalAmount": 7000,
//       "totalFundsCount": 1,
//       "totalNetInvestmentAmount": 6951,
//       "totalSalesCharges": 48.99999999999999,
//       "transactionDate": "",
//       "transactionStatus": "",
//       "transactionStatusName": "",
//       "transactionStatusText": "",
//       "transactionSuccessStatus": false,
//       "transactionWorkingDays": "",
//       "unitTrustAccount": "",
//       "flow":"002"

//     };
//     const cartData = {"totalAmount":7000,"totalNetInvestmentAmount":6930,"totalSalesCharges":70,"totalFundsCount":1,"higherRiskFundCategory":0,"fundList":[{"totalInvestment":7000,"totalRedem":0,"totalRedemAmount":7000,"switchSalesCharges":0,"totalSwitchOut":0,"switchOutAmount":0,"fundCode":"PRU05A","txnType":"001","currentHolding":null,"totalNetAmount":6930,"totalSalesCharges":70,"totalSalesPercentage":1,"maximumInitialSubscriptionAmount":1000000000,"totalSwitchIn":0,"switchInAmount":0,"cdId":691,"csId":0,"switch_sales_percentage":0,"risk_name":"Aggressive","nav_price":0.6839,"min_switch_amt":1000,"minimum_subsequent_subscription_amount":100,"sales_charges_nonstaff":1,"close_date":"31 Dec 2050","three_month_ind":"DOWN","switch_indicator":"Y","minimum_initial_subscription_amount":1000,"maximum_subsequent_subscription_amount":1000000000,"sales_charge_staff":5.26,"class_name":"LOCAL EQUITY","min_holding":0,"min_redem_amt":1000,"fund_status":"A","fund_name":"EASTSPRING INVESTMENTS DANA AL-ILHAM","one_month_ind":"UP","fund_indicator":"I","manager_name":"EASTSPRING INVESTMENTS BERHAD","max_switch_amt":null,"three_month":-3.61,"one_month":0.9,"max_redem_amt":1000000000,"fund_risk_rating":"N","average_nav_price":0.756603,"holding":1265.71,"total_invested":1000,"current_investment":957.64,"fund_code":"PRU05A","canEdit":false,"min_amt":100,"flow":"001","flow_text":"topup","card_amount":7000,"card_sale_charge":70,"card_net_amount":6930,"card_redemption_units":0,"card_redemption_amount":7000,"source_screen":"api"}],"accountName":"","unitTrustAccount":"E00000026","paymentAccount":"","referenceNumber":"","transactionSuccessStatus":false,"transactionStatusName":"","transactionStatus":"","transactionStatusText":"","transactionDate":"","transactionWorkingDays":"","flow":"001","flow_text":"topup","total_redemption_units":0,"total_redemption_amount":0,"total_switch_out_units":0,"total_switch_in_units":0,"total_switch_out_amount":0,"total_switch_in_amount":0,"otpResponse":null,"otpResponseMessage":null,"otpResponseReferenceNumber":null,"verifyResponse":null,"verifyResponseMessage":null,"verifyResponseReferenceNumber":null,"postAllTransactionResponse":null,"cartFooterToggle":true,"showCartIcon":true,"createCartResponse":null,"createCartResponseMessage":null,"updateCartResponse":null,"getCartByClientIdResponse":"{\"utAccountNo\":\"E00000026\",\"totalSwitchIn\":0,\"totalInvestment\":7000,\"totalNetAmount\":6930,\"totalRedemAmount\":0,\"totalSwitchOut\":0,\"switchOutAmount\":0,\"totalSalesCharges\":70,\"csId\":522,\"totalRedem\":0,\"clientId\":\"481124715058\",\"switchInAmount\":0,\"totalFund\":1,\"txnType\":\"01\",\"cartDetailFund\":[{\"totalInvestment\":7000,\"totalRedem\":0,\"totalRedemAmount\":7000,\"switchSalesCharges\":0,\"totalSwitchOut\":0,\"switchOutAmount\":0,\"fundCode\":\"PRU05A\",\"txnType\":\"01\",\"currentHolding\":null,\"totalNetAmount\":6930,\"totalSalesCharges\":70,\"totalSalesPercentage\":1,\"maximumInitialSubscriptionAmount\":1000000000,\"totalSwitchIn\":0,\"switchInAmount\":0,\"cdId\":691,\"csId\":0,\"switch_sales_percentage\":0,\"risk_name\":\"Aggressive\",\"nav_price\":0.6839,\"min_switch_amt\":1000,\"minimum_subsequent_subscription_amount\":100,\"sales_charges_nonstaff\":1,\"close_date\":\"31 Dec 2050\",\"three_month_ind\":\"DOWN\",\"switch_indicator\":\"Y\",\"minimum_initial_subscription_amount\":1000,\"maximum_subsequent_subscription_amount\":1000000000,\"sales_charge_staff\":5.26,\"class_name\":\"LOCAL EQUITY\",\"min_holding\":0,\"min_redem_amt\":1000,\"fund_status\":\"A\",\"fund_name\":\"EASTSPRING INVESTMENTS DANA AL-ILHAM\",\"one_month_ind\":\"UP\",\"fund_indicator\":\"I\",\"manager_name\":\"EASTSPRING INVESTMENTS BERHAD\",\"max_switch_amt\":null,\"three_month\":-3.61,\"one_month\":0.9,\"max_redem_amt\":1000000000,\"fund_risk_rating\":\"N\",\"average_nav_price\":0.756603,\"holding\":1265.71,\"total_invested\":1000,\"current_investment\":957.64}]}","csId":522,"txnType":"01","clientId":"481124715058","selectedCasaAccountIndex":-1,"switchCartResponse":null,"deletCartResponse":null,"storeTransaction":[]};
//     component.cartData = data;
//     component.updateCartData(data);
//     component.flow = '002';
//     fixture.detectChanges();
//     expect(component.pageSectionTitle).toBe('Redemption Summary');
//     expect(component.updateAmountItem(value)).toBeTruthy();
//   });

  it('CartComponent updateAmountItem -  clicked', () => {
    const value = { index: 0, canEdit: false };

    expect(component.updateAmountItem(value)).toBeTruthy();
  });

  it('CartComponent removeItemItem -  clicked', () => {
    const value = { index: 1 };
    expect(component.removeItemItem(value, null, null)).toBeTruthy();
  });

  it('CartComponent removeItemItem check Investments -  clicked', () => {
    const value = { index: 2, investments : [0 ,1, 2, 3], flow : "002" };
    component.investments = [{"totalInvestment":7000,"totalRedem":0,"totalRedemAmount":7000,"switchSalesCharges":0,"totalSwitchOut":0,"switchOutAmount":0,"fundCode":"PRU05A","txnType":"001","currentHolding":null,"totalNetAmount":6930,"totalSalesCharges":70,"totalSalesPercentage":1,"maximumInitialSubscriptionAmount":1000000000,"totalSwitchIn":0,"switchInAmount":0,"cdId":691,"csId":0,"switch_sales_percentage":0,"risk_name":"Aggressive","nav_price":0.6839,"min_switch_amt":1000,"minimum_subsequent_subscription_amount":100,"sales_charges_nonstaff":1,"close_date":"31 Dec 2050","three_month_ind":"DOWN","switch_indicator":"Y","minimum_initial_subscription_amount":1000,"maximum_subsequent_subscription_amount":1000000000,"sales_charge_staff":5.26,"class_name":"LOCAL EQUITY","min_holding":0,"min_redem_amt":1000,"fund_status":"A","fund_name":"EASTSPRING INVESTMENTS DANA AL-ILHAM","one_month_ind":"UP","fund_indicator":"I","manager_name":"EASTSPRING INVESTMENTS BERHAD","max_switch_amt":null,"three_month":-3.61,"one_month":0.9,"max_redem_amt":1000000000,"fund_risk_rating":"Y","average_nav_price":0.756603,"holding":1265.71,"total_invested":1000,"current_investment":957.64,"fund_code":"PRU05A","canEdit":false,"min_amt":100,"flow":"001","flow_text":"topup","card_amount":7000,"card_sale_charge":70,"card_net_amount":6930,"card_redemption_units":0,"card_redemption_amount":7000,"source_screen":"api"}];
    fixture.detectChanges();
    expect(component.removeItemItem(value, value.investments, value.flow)).toBeTruthy();
  });

  it('CartComponent viewInvestmentOption -  clicked', () => {
    expect(component.viewInvestmentOption()).toBeTruthy();
  });

  it('CartComponent proceedToCheckoutClick - userType - NTP -  clicked', () => {
      component.userType = 'NTP';
      component.landingPageStatus = landingPageResponse.landingPageStatus;
      expect(component.proceedToCheckoutClick()).toBeTruthy();
  });

  it('CartComponent proceedToCheckoutClick -  clicked', () => {
    expect(component.proceedToCheckoutClick()).toBeTruthy();
    expect(component.loadPurchaseAdobeAnalytics('wealth:proceed-to-checkout')).toBeUndefined();
  });

  it('CartComponent proceedToCheckoutClick -  clicked false', () => {
    expect(component.proceedToCheckoutClick()).toBeTruthy();

    component.unitTrustAccount  = "ABC123456789";
    expect(component.unitTrustAccount.toString().length).toEqual(12);
  });


  it('CartComponent proceedToCheckoutClick -  clicked true', () => {
    expect(component.proceedToCheckoutClick()).toBeTruthy();

    component.unitTrustAccount  = null;
    expect(component.unitTrustAccount).toEqual(null);
  });

  it('should openFundDetails chk', () => {
     component.openFundDetails();
  });

  it('CartComponent proceedToCheckoutClick casa_indicator = "Y" -  clicked', () => {
    fixture.detectChanges();
    component.casa_indicator = "Y";
    component.proceedToCheckoutClick();
    fixture.detectChanges();
    component.openFundDetails();
  });


   it('CartComponent proceedToCheckoutClick casa_indicator = "N" -  clicked', () => {

    component.casa_indicator = "N";
    component.unitTrustAccount = "sdfsfs";
    component.proceedToCheckoutClick();
    fixture.detectChanges();
  });

    it('CartComponent removeItemItem check Investments Full -  clicked', () => {
    const values = { "index": 0 };
     const investments =   [{}];
    component.flow =  '002';
    fixture.detectChanges();
    component.removeItemItem(values, investments, '002');
    fixture.detectChanges();
    expect(component.removeItemItem(values, investments, '002')).toBeTruthy();
  });


  it('CartComponent ngOnInit -  cartData user data', () => {
    expect(component.ngOnInit()).toBeUndefined();
    expect(component.loadData()).toBeTruthy();
    const userData= {"user":{"customer_name":"Ali Amir bin Ahmad","customer_id":"481124715058","customer_id_type":"SOLO_PROB","debit_card_no":1234123412341234,"dashbordData":1,"lastSeen":"4 Sept 2020, 10:30AM","story":"WJ-85","sole_prop":"N","invertment_indicator":"N","casa_indicator":"N","risk_profile":"AGGRESIVE","cimb_staff":"N","join_or_ut_account":"N","join_and_ut_account":"N"},"loadInitialData":false,"loadCount":-1,"dashboardData":"","dashboardScreenData":"","unitTrustAccount":"E00000026","unitTrustAccountList":[{"default_ind":"Y","ut_account_no":"E00000026"},{"default_ind":"N","ut_account_no":"A80050479"}],"customer_name":"Ramasamy","userTypeData":"","userType":"NTP","userTypeSuccessData":"NTP"};
    component.userData  = userData;
    const user = userData.user;
    //component.userData  = user;
    fixture.detectChanges();

    expect(component.updateUserDataData(userData)).toBeTruthy();
    expect(component.userData).toEqual(user);
    expect(component.unitTrustAccount).toEqual(null);
    expect(component.highRiskCount).toEqual(0);
    expect(component.switchInhighRiskCount).toEqual(0);
    expect(component.customerID ).toEqual("481124715058");
    expect(component.cimbStaff ).toEqual("N");
  });
  it('CartComponent backButtonEvent -  clicked', () => {
    component.currentUrl="/dashboard;tab=0"
    expect(component.backButtonEvent()).toBeUndefined();

  });

  it('CartComponent showTaxReCallPopup -  clicked', () => {
    expect(component.showTaxReCallPopup()).toBeTruthy();
  });
  it('CartComponent reCalculateTaxCartApi -  clicked', () => {
    expect(component.reCalculateTaxCartApi()).toBeTruthy();
  });

  it('updateLandingPageStatus called', () => {
    jest.spyOn(store, 'select').mockReturnValue(of(landingPageResponse.landingPageStatus));
    const request = {totalFundsCount : null}
    component.userType = 'NTP'
    component.updateLandingPageStatus(request);
    expect(component).toBeTruthy();
  });

  it('should called checkUserType if NTP', () => {
    const customerType = 'NTP';

    expect(component.checkUserType(customerType)).toBeTruthy();
});

    it('should called checkUserType non-NTP', () => {
        const customerType = 'ETP';

        expect(component.checkUserType(customerType)).toBeFalsy();
    });

});
