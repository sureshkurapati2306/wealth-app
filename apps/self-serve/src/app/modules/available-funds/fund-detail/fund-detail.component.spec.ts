import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { MatDialog,MatDialogModule } from '@angular/material/dialog';

import { FundDetailComponent } from './fund-detail.component';
import { mockFundDetailData, mockfundListResponse, mockUserStateEtp } from '../mock/data';
import { mockCartDataSwitch } from '../../cart/mock/data';

import { DecimalPipe } from '@angular/common';
import { CartService } from '../../../core/services/cart/cart.service';
import { Store as CartState } from '../../../core/state/cart/cart.reducer';

describe('FundDetailComponent', () => {
  let component: FundDetailComponent;
  let fixture: ComponentFixture<FundDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        RouterTestingModule.withRoutes([]),
        MatDialogModule
      ],
      providers: [
        CartService, DecimalPipe,
        {
          provide: MatDialog,
          useValue: {},
        },
      ],
      declarations: [FundDetailComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FundDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('setFundValues class_name defined', () => {

    const selectedFund =  mockfundListResponse[0];

    const selectedFundId = "BHL17D"

    component.selectedFund = selectedFund as any;
    component.selectedFundId = selectedFundId;

    expect(component.setFundValues(selectedFund, selectedFundId)).toBeTruthy();

  });

  it('setFundValues class_name undefined', () => {

   const selectedFund =  mockFundDetailData;

   const selectedFundId = "AMU03A"

   component.selectedFund = selectedFund;
   component.selectedFundId = selectedFundId;

   expect(component.setFundValues(selectedFund, selectedFundId)).toBeTruthy();

  });

  it('FundDetailComponent documentDownload Prospectus', ()=> {
    const documentName = "Prospectus";
    const selectedFund =  {
      "close_date": "31 Dec 2050",
      "three_month_ind": "UP",
      "switch_indicator": 500,
      "fund_document": [
         {
            "msId": 10724,
            "fundCode": "BHL17D",
            "msLink": "F000000AP0",
            "msUrl": "https://doc.morningstar.com/LatestDoc.aspx?clientid=cimbmsia&key=0f3db24a72f03156&language=451&investmentid=F000000AP0&documenttype=1&investmenttype=1",
            "isActive": "Y",
            "docId": 1,
            "startDate": "2021-07-01T00:00:00",
            "endDate": null,
            "createdBy": null,
            "modifiedBy": null,
            "createdDate": null,
            "documentName": "Prospectus",
            "modifiedDate": "2021-12-31T16:40:01"
         },
         {
            "msId": 10725,
            "fundCode": "BHL17D",
            "msLink": "F000000AP0",
            "msUrl": "https://doc.morningstar.com/LatestDoc.aspx?clientid=cimbmsia&key=0f3db24a72f03156&language=451&investmentid=F000000AP0&documenttype=77&investmenttype=1",
            "isActive": "Y",
            "docId": 77,
            "startDate": "2021-07-01T00:00:00",
            "endDate": null,
            "createdBy": null,
            "modifiedBy": null,
            "createdDate": null,
            "documentName": "Product Highlight Sheet",
            "modifiedDate": "2021-12-31T16:40:01"
         },
         {
            "msId": 10726,
            "fundCode": "BHL17D",
            "msLink": "F000000AP0",
            "msUrl": "https://doc.morningstar.com/LatestDoc.aspx?clientid=cimbmsia&key=0f3db24a72f03156&language=451&investmentid=F000000AP0&documenttype=4&investmenttype=1",
            "isActive": "Y",
            "docId": 4,
            "startDate": "2021-08-31T00:00:00",
            "endDate": null,
            "createdBy": null,
            "modifiedBy": null,
            "createdDate": null,
            "documentName": "Annual Report",
            "modifiedDate": "2021-12-31T16:40:01"
         },
         {
            "msId": 10727,
            "fundCode": "BHL17D",
            "msLink": "F000000AP0",
            "msUrl": "https://doc.morningstar.com/LatestDoc.aspx?clientid=cimbmsia&key=0f3db24a72f03156&language=451&investmentid=F000000AP0&documenttype=5&investmenttype=1",
            "isActive": "Y",
            "docId": 5,
            "startDate": "2021-02-28T00:00:00",
            "endDate": null,
            "createdBy": null,
            "modifiedBy": null,
            "createdDate": null,
            "documentName": "Semi-Annual Report",
            "modifiedDate": "2021-12-31T16:40:01"
         },
         {
            "msId": 10728,
            "fundCode": "BHL17D",
            "msLink": "F000000AP0",
            "msUrl": "https://doc.morningstar.com/LatestDoc.aspx?clientid=cimbmsia&key=0f3db24a72f03156&language=451&investmentid=F000000AP0&documenttype=52&investmenttype=1",
            "isActive": "Y",
            "docId": 52,
            "startDate": "2021-10-31T00:00:00",
            "endDate": null,
            "createdBy": null,
            "modifiedBy": null,
            "createdDate": null,
            "documentName": "Fact sheet",
            "modifiedDate": "2021-12-31T16:40:01"
         }
      ],
      "fund_code": "BHL17D",
      "risk_rating": "2",
      "minimum_initial_subscription_amount": 2000,
      "maximum_subsequent_subscription_amount": 1000000000000,
      "manager_code": "BHL",
      "sales_charge_staff": 2,
      "class_name": "FIXED INCOME",
      "min_holding": 1000,
      "current_holding": "Y",
      "min_redem_amt": 500,
      "recommend_fund": "Y",
      "fund_status": "A",
      "class_seq": 2,
      "maximum_initial_subscription_amount": 1000000000000,
      "fund_name": "PRINCIPAL ISLAMIC LIFETIME SUKUK FUND (FKA CIMB ISLAMIC SUKUK FUND)",
      "one_month_ind": "DOWN",
      "fund_indicator": "I",
      "manager_name": "PRINCIPAL ASSET MANAGEMENT BERHAD",
      "max_switch_amt": 500,
      "three_month": 0.48,
      "cart_list": [],
      "one_month": -0.25,
      "max_redem_amt": 1000000000000,
      "fund_risk_rating": "Y",
      "nav_price": 1.3078,
      "min_switch_amt": 500,
      "risk_name": "Defensive",
      "product_category": "FIX_ INCOME ",
      "minimum_subsequent_subscription_amount": 500,
      "sales_charge_nonstaff": 2,
      "shariah_complaint " : 'Y'
   }

   component.selectedFund = selectedFund as any;
   const data = {downloadedDocument : "%PDF-1.6%âãÏÓ375 0 obj "};

    global.URL.createObjectURL = jest.fn();
    global.URL.revokeObjectURL = jest.fn();

    component.downloadDocument(data, documentName)

   expect(component.documentDownload(documentName)).toBeTruthy();


  });

  it('FundDetailComponent documentDownload Fact Sheet', ()=> {
    const documentName = "Fact Sheet";
    const selectedFund =  {
      "close_date": "31 Dec 2050",
      "three_month_ind": "UP",
      "switch_indicator": 500,
      "fund_document": [
         {
            "msId": 10724,
            "fundCode": "BHL17D",
            "msLink": "F000000AP0",
            "msUrl": "https://doc.morningstar.com/LatestDoc.aspx?clientid=cimbmsia&key=0f3db24a72f03156&language=451&investmentid=F000000AP0&documenttype=1&investmenttype=1",
            "isActive": "Y",
            "docId": 1,
            "startDate": "2021-07-01T00:00:00",
            "endDate": null,
            "createdBy": null,
            "modifiedBy": null,
            "createdDate": null,
            "documentName": "Prospectus",
            "modifiedDate": "2021-12-31T16:40:01"
         },
         {
            "msId": 10725,
            "fundCode": "BHL17D",
            "msLink": "F000000AP0",
            "msUrl": "https://doc.morningstar.com/LatestDoc.aspx?clientid=cimbmsia&key=0f3db24a72f03156&language=451&investmentid=F000000AP0&documenttype=77&investmenttype=1",
            "isActive": "Y",
            "docId": 77,
            "startDate": "2021-07-01T00:00:00",
            "endDate": null,
            "createdBy": null,
            "modifiedBy": null,
            "createdDate": null,
            "documentName": "Product Highlight Sheet",
            "modifiedDate": "2021-12-31T16:40:01"
         },
         {
            "msId": 10726,
            "fundCode": "BHL17D",
            "msLink": "F000000AP0",
            "msUrl": "https://doc.morningstar.com/LatestDoc.aspx?clientid=cimbmsia&key=0f3db24a72f03156&language=451&investmentid=F000000AP0&documenttype=4&investmenttype=1",
            "isActive": "Y",
            "docId": 4,
            "startDate": "2021-08-31T00:00:00",
            "endDate": null,
            "createdBy": null,
            "modifiedBy": null,
            "createdDate": null,
            "documentName": "Annual Report",
            "modifiedDate": "2021-12-31T16:40:01"
         },
         {
            "msId": 10727,
            "fundCode": "BHL17D",
            "msLink": "F000000AP0",
            "msUrl": "https://doc.morningstar.com/LatestDoc.aspx?clientid=cimbmsia&key=0f3db24a72f03156&language=451&investmentid=F000000AP0&documenttype=5&investmenttype=1",
            "isActive": "Y",
            "docId": 5,
            "startDate": "2021-02-28T00:00:00",
            "endDate": null,
            "createdBy": null,
            "modifiedBy": null,
            "createdDate": null,
            "documentName": "Semi-Annual Report",
            "modifiedDate": "2021-12-31T16:40:01"
         },
         {
            "msId": 10728,
            "fundCode": "BHL17D",
            "msLink": "F000000AP0",
            "msUrl": "https://doc.morningstar.com/LatestDoc.aspx?clientid=cimbmsia&key=0f3db24a72f03156&language=451&investmentid=F000000AP0&documenttype=52&investmenttype=1",
            "isActive": "Y",
            "docId": 52,
            "startDate": "2021-10-31T00:00:00",
            "endDate": null,
            "createdBy": null,
            "modifiedBy": null,
            "createdDate": null,
            "documentName": "Fact sheet",
            "modifiedDate": "2021-12-31T16:40:01"
         }
      ],
      "fund_code": "BHL17D",
      "risk_rating": "2",
      "minimum_initial_subscription_amount": 2000,
      "maximum_subsequent_subscription_amount": 1000000000000,
      "manager_code": "BHL",
      "sales_charge_staff": 2,
      "class_name": "FIXED INCOME",
      "min_holding": 1000,
      "current_holding": "Y",
      "min_redem_amt": 500,
      "recommend_fund": "Y",
      "fund_status": "A",
      "class_seq": 2,
      "maximum_initial_subscription_amount": 1000000000000,
      "fund_name": "PRINCIPAL ISLAMIC LIFETIME SUKUK FUND (FKA CIMB ISLAMIC SUKUK FUND)",
      "one_month_ind": "DOWN",
      "fund_indicator": "I",
      "manager_name": "PRINCIPAL ASSET MANAGEMENT BERHAD",
      "max_switch_amt": 500,
      "three_month": 0.48,
      "cart_list": [],
      "one_month": -0.25,
      "max_redem_amt": 1000000000000,
      "fund_risk_rating": "Y",
      "nav_price": 1.3078,
      "min_switch_amt": 500,
      "risk_name": "Defensive",
      "product_category": "FIX_ INCOME ",
      "minimum_subsequent_subscription_amount": 500,
      "sales_charge_nonstaff": 2,
      "shariah_complaint " : 'Y'
   }

   component.selectedFund = selectedFund as any;
   const data = {downloadedDocument : "%PDF-1.6%âãÏÓ375 0 obj "};

    global.URL.createObjectURL = jest.fn();
    global.URL.revokeObjectURL = jest.fn();

    component.downloadDocument(data, documentName)

   expect(component.documentDownload(documentName)).toBeTruthy();


  });


  it('FundDetailComponent backButtonEvent -  clicked', () => {
    component.currentUrl="/dashboard;tab=0"
    expect(component.backButtonEvent()).toBeUndefined();

  });
  it('FundDetailComponent backButtonEvent -  clicked', () => {
    component.currentUrl="/dashboard;tab=0"
    expect(component.backButtonEvent()).toBeUndefined();

  });

  it('FundDetailComponent documentDownload ', () => {

    const data = {downloadedDocument : { status : undefined}};
    const documentDownloadParams = {documentName : "Fact Sheet"}
    component.docName = "Fact Sheet";
    component.documentDownloaded = false;
    expect(component.documentDownload("Fact Sheet")).toBeTruthy();
  });

  it('FundDetailComponent downloadDocument documentName=Prospectus ', () => {
    const data = {downloadedDocument : "%PDF-1.6%âãÏÓ375 0 obj "};
    const documentName = "Prospectus"
    expect(component.downloadDocument(data,documentName)).toBeTruthy();
  });

  it('FundDetailComponent downloadDocument documentName=Fact sheet ', () => {
    const data = {downloadedDocument : "%PDF-1.6%âãÏÓ375 0 obj "};
    const documentName = "Fact sheet"
    expect(component.downloadDocument(data,documentName)).toBeTruthy();
  });

  it('FundDetailComponent populateFundDocumentNames', () => {
     component.selectedFund =  {
        "close_date": "31 Dec 2050",
        "three_month_ind": "UP",
        "switch_indicator": 500,
        "fund_document": [
           {
              "msId": 10724,
              "fundCode": "BHL17D",
              "msLink": "F000000AP0",
              "msUrl": "https://doc.morningstar.com/LatestDoc.aspx?clientid=cimbmsia&key=0f3db24a72f03156&language=451&investmentid=F000000AP0&documenttype=1&investmenttype=1",
              "isActive": "Y",
              "docId": 1,
              "startDate": "2021-07-01T00:00:00",
              "endDate": null,
              "createdBy": null,
              "modifiedBy": null,
              "createdDate": null,
              "documentName": "Prospectus",
              "modifiedDate": "2021-12-31T16:40:01"
           },
           {
              "msId": 10725,
              "fundCode": "BHL17D",
              "msLink": "F000000AP0",
              "msUrl": "https://doc.morningstar.com/LatestDoc.aspx?clientid=cimbmsia&key=0f3db24a72f03156&language=451&investmentid=F000000AP0&documenttype=77&investmenttype=1",
              "isActive": "Y",
              "docId": 77,
              "startDate": "2021-07-01T00:00:00",
              "endDate": null,
              "createdBy": null,
              "modifiedBy": null,
              "createdDate": null,
              "documentName": "Product Highlight Sheet",
              "modifiedDate": "2021-12-31T16:40:01"
           },
           {
              "msId": 10726,
              "fundCode": "BHL17D",
              "msLink": "F000000AP0",
              "msUrl": "https://doc.morningstar.com/LatestDoc.aspx?clientid=cimbmsia&key=0f3db24a72f03156&language=451&investmentid=F000000AP0&documenttype=4&investmenttype=1",
              "isActive": "Y",
              "docId": 4,
              "startDate": "2021-08-31T00:00:00",
              "endDate": null,
              "createdBy": null,
              "modifiedBy": null,
              "createdDate": null,
              "documentName": "Annual Report",
              "modifiedDate": "2021-12-31T16:40:01"
           },
           {
              "msId": 10727,
              "fundCode": "BHL17D",
              "msLink": "F000000AP0",
              "msUrl": "https://doc.morningstar.com/LatestDoc.aspx?clientid=cimbmsia&key=0f3db24a72f03156&language=451&investmentid=F000000AP0&documenttype=5&investmenttype=1",
              "isActive": "Y",
              "docId": 5,
              "startDate": "2021-02-28T00:00:00",
              "endDate": null,
              "createdBy": null,
              "modifiedBy": null,
              "createdDate": null,
              "documentName": "Semi-Annual Report",
              "modifiedDate": "2021-12-31T16:40:01"
           },
           {
              "msId": 10728,
              "fundCode": "BHL17D",
              "msLink": "F000000AP0",
              "msUrl": "https://doc.morningstar.com/LatestDoc.aspx?clientid=cimbmsia&key=0f3db24a72f03156&language=451&investmentid=F000000AP0&documenttype=52&investmenttype=1",
              "isActive": "Y",
              "docId": 52,
              "startDate": "2021-10-31T00:00:00",
              "endDate": null,
              "createdBy": null,
              "modifiedBy": null,
              "createdDate": null,
              "documentName": "Fact sheet",
              "modifiedDate": "2021-12-31T16:40:01"
           }
        ],
        "fund_code": "BHL17D",
        "risk_rating": "2",
        "minimum_initial_subscription_amount": 2000,
        "maximum_subsequent_subscription_amount": 1000000000000,
        "manager_code": "BHL",
        "sales_charge_staff": 2,
        "class_name": "FIXED INCOME",
        "min_holding": 1000,
        "current_holding": "Y",
        "min_redem_amt": 500,
        "recommend_fund": "Y",
        "fund_status": "I",
        "class_seq": 2,
        "maximum_initial_subscription_amount": 1000000000000,
        "fund_name": "PRINCIPAL ISLAMIC LIFETIME SUKUK FUND (FKA CIMB ISLAMIC SUKUK FUND)",
        "one_month_ind": "DOWN",
        "fund_indicator": "I",
        "manager_name": "PRINCIPAL ASSET MANAGEMENT BERHAD",
        "max_switch_amt": 500,
        "three_month": 0.48,
        "cart_list": [],
        "one_month": -0.25,
        "max_redem_amt": 1000000000000,
        "fund_risk_rating": "Y",
        "nav_price": 1.3078,
        "min_switch_amt": 500,
        "risk_name": "Defensive",
        "product_category": "FIX_ INCOME ",
        "minimum_subsequent_subscription_amount": 500,
        "sales_charge_nonstaff": 2,
        "shariah_complaint": "Y"
     } as any;

     expect(component.populateFundDocumentNames()).toBeUndefined();

    });

    it('FundDetailComponent addToCartEvent defined', () => {
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
         const value = { amount: 1000, index: '-1' , unit : 1000 };
         component.userData = mockUserStateEtp;

         const selectedFund =  mockFundDetailData;

         const selectedFundId = "AMU03A"

         component.selectedFund = selectedFund;
         component.selectedFundId = selectedFundId;
         component.landingPageStatus = landingPageResponse.landingPageStatus;
        expect(component.addToCartEvent(value)).toBeTruthy();
    });

    it('FundDetailComponent addToCartEvent defined userData null', () => {
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
         const value = {  index: '-1' };

         const selectedFund =  mockFundDetailData;

         const selectedFundId = "AMU03A"

         component.selectedFund = selectedFund;
         component.selectedFundId = selectedFundId;
         component.landingPageStatus = landingPageResponse.landingPageStatus;
        expect(component.addToCartEvent(value)).toBeTruthy();
    });

    it('FundDetailComponent removeFromCartEvent defined', () => {
      const value = { amount: '1000', index: '-1' };
      component.cartData = mockCartDataSwitch as any;
      expect(component.removeFromCartEvent(value)).toBeUndefined();
    });

    it('FundDetailComponent removeFromCartEvent defined cartData null', () => {
        const value = { amount: '1000', index: '-1' };

        expect(component.removeFromCartEvent(value)).toBeUndefined();
        });

    // it('FundDetailComponent updateAmountItem defined', () => {
    //     const value = { amount: '1000', index: '-1' };
    //     expect(component.updateAmountItem(value)).toBeUndefined();
    //     });

//    it('CartComponent updateAmountItem check investment-  clicked', () => {
//       const value = { index: 0, canEdit: false };
//       const data = {
//          "accountName": "",
//          "fundList": [
//          {
//                "account_status": "A",
//                "asset_class": "GLOBAL EQUITY",
//                "average_nav_price": "0.5500",
//                "canEdit": false,
//                "card_amount": 7000,
//                "card_net_amount": 6951,
//                "card_sale_charge": 48.99999999999999,
//                "classHexa": "#5CD3CD",
//                "class_holding": "59.4",
//                "class_seq": "5",
//                "current_investment": "10716.03",
//                "displayFlag": true,
//                "fundImg": "./assets/images/chart-decrease.svg",
//                "fundPosition": "Increase",
//                "fundTotalReturnType": "-",
//                "fundTotalReturnValue": "283.97",
//                "fund_name": "WHOLESALES AMITTIKAL",
//                "fund_status": "A",
//                "holding": "10,716.03",
//                "joint_indicator": "01",
//                "max_amt": "7000",
//                "max_init_amt": "1200",
//                "max_sub_amt": "7000",
//                "min_amt": "500",
//                "min_holding": "1000",
//                "min_init_amt": "500",
//                "min_sub_amt": "500",
//                "nav_price": "1.00",
//                "risk_ind": "Y",
//                "risk_name": "BALANCED",
//                "sales_charge": "0.70",
//                "syariah_complaint": "C",
//                "total_invested": "11000.00",
//                "total_percentage": "-2.58%",
//                "total_return": "-283.97",
//                "unit_held": 10716.03,
//                "ut_account_no": " A80111993",
//                "wholesale_msg": "Wholesales Msg Fund Detail Object Found"
//          }
//          ],
//          "higherRiskFundCategory": 0,
//          "paymentAccount": "",
//          "referenceNumber": "",
//          "totalAmount": 7000,
//          "totalFundsCount": 1,
//          "totalNetInvestmentAmount": 6951,
//          "totalSalesCharges": 48.99999999999999,
//          "transactionDate": "",
//          "transactionStatus": "",
//          "transactionStatusName": "",
//          "transactionStatusText": "",
//          "transactionSuccessStatus": false,
//          "transactionWorkingDays": "",
//          "unitTrustAccount": "",
//          "flow":"002"

//       };
//       component.cartData = data as any;
//       // component.updateCartData(data);
//       // component.flow = '002';
//       // fixture.detectChanges();
//       // expect(component.pageSectionTitle).toBe('Redemption Summary');
//       expect(component.updateAmountItem(value)).toBeUndefined();
//    });

    it('should call the startInvestmentEvent()', () => {
      component.startInvestmentEvent();
      expect(component).toBeTruthy();
  });

   it('should call clearCartAndContinueDataEvent()', () => {
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
       component.landingPageStatus = landingPageResponse.landingPageStatus;
      expect(component.clearCartAndContinueDataEvent({})).toBeUndefined();
   });

//    it('should update item on Redeem', () => {
//       const obj = {
//          "amount": "900.00",
//          "flow": "002",
//          "fund_code": "CBT40A",
//          "unit": 900,
//          "index": 0
//      }
//       expect(component.updateAmountItemForRedeem(obj)).toBeUndefined();
//    });

});
