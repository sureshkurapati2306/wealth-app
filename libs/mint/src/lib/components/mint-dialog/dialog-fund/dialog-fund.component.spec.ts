import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFundComponent } from './dialog-fund.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';
import { MatDialog,MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';

describe('DialogFundComponent', () => {
  let component: DialogFundComponent;
  let fixture: ComponentFixture<DialogFundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        RouterTestingModule.withRoutes([]),
        EffectsModule.forRoot([]),
        MatDialogModule
      ],
      declarations: [ DialogFundComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should switchfundPerfHistory', () => {
    fixture.detectChanges();

    expect(component.switchfundPerfHistory()).toBeUndefined();
  });

  it('should alertOnErrorDocumentDownload', () => {
   fixture.detectChanges();

   expect(component.alertOnErrorDocumentDownload()).toBeUndefined();
  });

  it('should downloadDocumentStatusCheck', () => {
   fixture.detectChanges();

   expect(component.downloadDocumentStatusCheck('test','testDoc')).toBeUndefined();
  });

  it('FundDetailComponent switchFundDocumentDownload Prospectus', ()=> {
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

    component.switchFundDownloadDocument(data, documentName)

   expect(component.switchFundDocumentDownload(documentName)).toBeTruthy();


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

    component.switchFundDownloadDocument(data, documentName)

   expect(component.switchFundDocumentDownload(documentName)).toBeTruthy();


  });

  it('FundDetailComponent documentDownload ', () => {

    const data = {downloadedDocument : { status : undefined}};
    const documentDownloadParams = {documentName : "Fact Sheet"}
    component.docName = "Fact Sheet";
    component.documentDownloaded = false;
    expect(component.switchFundDocumentDownload("Fact Sheet")).toBeTruthy();
  });

  it('FundDetailComponent documentDownload ', () => {

    const data = {downloadedDocument : { status : undefined}};
    const documentDownloadParams = {documentName : "Fact Sheet"}
    component.docName = "Fact Sheet";
    component.documentDownloaded = false;
    expect(component.switchFundDocumentDownload("Fact Sheet")).toBeTruthy();
  });

  it('FundDetailComponent switchFunddownloadDocument documentName=Prospectus ', () => {
    const data = {downloadedDocument : "%PDF-1.6%âãÏÓ375 0 obj "};
    const documentName = "Prospectus"
    expect(component.switchFundDownloadDocument(data,documentName)).toBeTruthy();
  });

  it('FundDetailComponent switchFunddownloadDocument documentName=Fact sheet ', () => {
    const data = {downloadedDocument : "%PDF-1.6%âãÏÓ375 0 obj "};
    const documentName = "Fact sheet"
    expect(component.switchFundDownloadDocument(data,documentName)).toBeTruthy();
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

    it('should ngOnDestroy', () => {
      fixture.detectChanges();
  
      expect(component.ngOnDestroy()).toBeUndefined();
    });
});
