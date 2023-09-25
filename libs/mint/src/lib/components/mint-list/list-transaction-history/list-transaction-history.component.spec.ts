import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTransactionHistoryComponent } from './list-transaction-history.component';
import {MintMenuModule} from '../../mint-menu/mint-menu.module';
import {MatExpansionModule} from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { NgxPaginationModule } from 'ngx-pagination';
import { NO_ERRORS_SCHEMA, SimpleChange } from '@angular/core';
import { PaginationBoundsIndicatorComponent } from '../../mint-paginator/pagination-bounds-indicator/pagination-bounds-indicator.component';

const mockPurchaseData = [
  {
    "transId": 7000473,
    "fdAccountNo": "12345676789",
    "contactNo": "01130702678",
    "paymentTo": "",
    "transactionUnit": 0.0,
    "transactionUnitStr": "0.00",
    "transactionStatus": "Unsuccessful",
    "seqNo": 1,
    "userId": "750702105695",
    "transactionDatetime": "2022-03-15 11:09:06",
    "mobileNo": "01130702678",
    "chargesPercentageStr": "1.00",
    "chargesAmountStr": "10.00",
    "totalInvestmentStr": "1,000.00",
    "netInvestmentStr": "990.00",
    "transactionTypeDesc": "Purchase",
    "transactionStatusDt": "03/15/2022",
    "transactionStatusTm": "07:09:06",
    "transactionDt": "Tue 15 Mar 2022",
    "transactionTm": "07:09 PM",
    "payableAmount": 1000.0,
    "transactionType": "01",
    "processingStatus": "Y",
    "transactionStatusDate": "2022-03-15 11:09:06",
    "fileStatus": "N",
    "indicativeCharges": 1000.0,
    "clientName": "Ali Amir bin Ahmad",
    "clientId": "750702105695",
    "clientIdType": "NEWIC",
    "toFundName": "",
    "utAccountNo": "A80111457",
    "chargeId": 0.0,
    "netInvestment": 990.0,
    "processingStatusDate": "2022-03-16 23:42:46",
    "staffIndicator": "2",
    "einvestsmart": "",
    "taxCode": "0",
    "taxRate": 0.0,
    "icNumber": "750702105695",
    "taxId": 0.0,
    "taxAmount": 0.0,
    "fileStatusDate": "2022-03-16 23:42:46",
    "rejectedDate": null,
    "settlementAccount": "12345676789",
    "fundCode": "ABD01A",
    "fundName": "Aberdeen Islamic World Equity Fund (class A)",
    "toFundCode": "",
    "referenceNo": "7000473-01",
    "chargesPercentage": 1.0,
    "chargesAmount": 10.0,
    "totalInvestment": 1000.0,
    "rejectedName": "NA",
    "rejectedRemark": "NA"
  },
  {
    "transId": 7000474,
    "fdAccountNo": "12345676789",
    "contactNo": "01130702678",
    "paymentTo": "",
    "transactionUnit": 0.0,
    "transactionUnitStr": "0.00",
    "transactionStatus": "Successful",
    "seqNo": 2,
    "userId": "750702105695",
    "transactionDatetime": "2022-03-15 11:09:06",
    "mobileNo": "01130702678",
    "chargesPercentageStr": "1.00",
    "chargesAmountStr": "10.00",
    "totalInvestmentStr": "1,000.00",
    "netInvestmentStr": "990.00",
    "transactionTypeDesc": "Purchase",
    "transactionStatusDt": "03/15/2022",
    "transactionStatusTm": "07:09:06",
    "transactionDt": "Tue 15 Mar 2022",
    "transactionTm": "07:09 PM",
    "payableAmount": 1000.0,
    "transactionType": "01",
    "processingStatus": "Y",
    "transactionStatusDate": "2022-03-15 11:09:06",
    "fileStatus": "N",
    "indicativeCharges": 1000.0,
    "clientName": "Ali Amir bin Ahmad",
    "clientId": "750702105695",
    "clientIdType": "NEWIC",
    "toFundName": "",
    "utAccountNo": "A80111457",
    "chargeId": 0.0,
    "netInvestment": 990.0,
    "processingStatusDate": "2022-03-16 23:42:46",
    "staffIndicator": "2",
    "einvestsmart": "",
    "taxCode": "0",
    "taxRate": 0.0,
    "icNumber": "750702105695",
    "taxId": 0.0,
    "taxAmount": 0.0,
    "fileStatusDate": "2022-03-16 23:42:46",
    "rejectedDate": null,
    "settlementAccount": "12345676789",
    "fundCode": "HDU12D",
    "fundName": "Affin Hwang Aiiman Income Plus Fund",
    "toFundCode": "",
    "referenceNo": "7000473-02",
    "chargesPercentage": 1.0,
    "chargesAmount": 10.0,
    "totalInvestment": 1000.0,
    "rejectedName": "NA",
    "rejectedRemark": "NA"
  },
  {
    "transId": 7000474,
    "fdAccountNo": "12345676789",
    "contactNo": "01130702678",
    "paymentTo": "",
    "transactionUnit": 0.0,
    "transactionUnitStr": "0.00",
    "transactionStatus": "Processing",
    "seqNo": 2,
    "userId": "750702105695",
    "transactionDatetime": "2022-03-15 11:09:06",
    "mobileNo": "01130702678",
    "chargesPercentageStr": "1.00",
    "chargesAmountStr": "10.00",
    "totalInvestmentStr": "1,000.00",
    "netInvestmentStr": "990.00",
    "transactionTypeDesc": "Purchase",
    "transactionStatusDt": "03/15/2022",
    "transactionStatusTm": "07:09:06",
    "transactionDt": "Tue 15 Mar 2022",
    "transactionTm": "07:09 PM",
    "payableAmount": 1000.0,
    "transactionType": "01",
    "processingStatus": "Y",
    "transactionStatusDate": "2022-03-15 11:09:06",
    "fileStatus": "N",
    "indicativeCharges": 1000.0,
    "clientName": "Ali Amir bin Ahmad",
    "clientId": "750702105695",
    "clientIdType": "NEWIC",
    "toFundName": "",
    "utAccountNo": "A80111457",
    "chargeId": 0.0,
    "netInvestment": 990.0,
    "processingStatusDate": "2022-03-16 23:42:46",
    "staffIndicator": "2",
    "einvestsmart": "",
    "taxCode": "0",
    "taxRate": 0.0,
    "icNumber": "750702105695",
    "taxId": 0.0,
    "taxAmount": 0.0,
    "fileStatusDate": "2022-03-16 23:42:46",
    "rejectedDate": null,
    "settlementAccount": "12345676789",
    "fundCode": "HDU12D",
    "fundName": "Affin Hwang Aiiman Income Plus Fund",
    "toFundCode": "",
    "referenceNo": "7000473-02",
    "chargesPercentage": 1.0,
    "chargesAmount": 10.0,
    "totalInvestment": 1000.0,
    "rejectedName": "NA",
    "rejectedRemark": "NA"
  },
  {
    "transId": 7000479,
    "fdAccountNo": "12345676789",
    "contactNo": "01130702678",
    "paymentTo": "",
    "transactionUnit": 0.0,
    "transactionUnitStr": "0.00",
    "transactionStatus": "Cancelled",
    "seqNo": 2,
    "userId": "750702105695",
    "transactionDatetime": "2022-03-15 11:09:06",
    "mobileNo": "01130702678",
    "chargesPercentageStr": "1.00",
    "chargesAmountStr": "10.00",
    "totalInvestmentStr": "1,000.00",
    "netInvestmentStr": "990.00",
    "transactionTypeDesc": "Purchase",
    "transactionStatusDt": "03/15/2022",
    "transactionStatusTm": "07:09:06",
    "transactionDt": "Tue 15 Mar 2022",
    "transactionTm": "07:09 PM",
    "payableAmount": 1000.0,
    "transactionType": "01",
    "processingStatus": "Y",
    "transactionStatusDate": "2022-03-15 11:09:06",
    "fileStatus": "N",
    "indicativeCharges": 1000.0,
    "clientName": "Ali Amir bin Ahmad",
    "clientId": "750702105695",
    "clientIdType": "NEWIC",
    "toFundName": "",
    "utAccountNo": "A80111457",
    "chargeId": 0.0,
    "netInvestment": 990.0,
    "processingStatusDate": "2022-03-16 23:42:46",
    "staffIndicator": "2",
    "einvestsmart": "",
    "taxCode": "0",
    "taxRate": 0.0,
    "icNumber": "750702105695",
    "taxId": 0.0,
    "taxAmount": 0.0,
    "fileStatusDate": "2022-03-16 23:42:46",
    "rejectedDate": null,
    "settlementAccount": "12345676789",
    "fundCode": "HDU12D",
    "fundName": "Affin Hwang Aiiman Income Plus Fund",
    "toFundCode": "",
    "referenceNo": "7000473-02",
    "chargesPercentage": 1.0,
    "chargesAmount": 10.0,
    "totalInvestment": 1000.0,
    "rejectedName": "NA",
    "rejectedRemark": "NA"
  }
];

describe('ListTransactionHistoryComponent', () => {
  let component: ListTransactionHistoryComponent;
  let fixture: ComponentFixture<ListTransactionHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListTransactionHistoryComponent, PaginationBoundsIndicatorComponent],
      imports: [MintMenuModule, MatExpansionModule, BrowserAnimationsModule, MatMenuModule, NgxPaginationModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTransactionHistoryComponent);
    component = fixture.componentInstance;
    component.selectedAccount = 'A80111457';
    component.selectedUnittrustAccountNumber = 'A80111457';
    component.purchaseDetailData = [];
    component.itemsPerPage = 10;
    component.currentPageNumber = 1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should run ngOnChanges selectedUnittrustAccountNumber undefined', () => {

    component.selectedUnittrustAccountNumber = undefined;

    component.ngOnChanges({
      purchaseDetailData: new SimpleChange(undefined, mockPurchaseData, true),
      currentPageNumber: new SimpleChange(undefined, 2, true)
    });

    expect(component).toBeTruthy();
    expect(component.sortBySuccessfulStatus()).toBeUndefined();
    expect(component.sortByAllUnsuccessfulStatus()).toBeUndefined();
    expect(component.sortByCancelStatus()).toBeUndefined();
    expect(component.sortByAllProcessingStatus()).toBeUndefined();
    expect(component.sortByAllStatus()).toBeUndefined();
  });

  it('should run ngOnChanges purchaseDetailData empty array []', () => {

    component.selectedUnittrustAccountNumber = undefined;

    component.ngOnChanges({
      purchaseDetailData: new SimpleChange(undefined, [], true),
      currentPageNumber: new SimpleChange(undefined, 2, true)
    });

    expect(component).toBeTruthy();
    expect(component.sortBySuccessfulStatus()).toBeUndefined();
    expect(component.sortByAllUnsuccessfulStatus()).toBeUndefined();
    expect(component.sortByCancelStatus()).toBeUndefined();
    expect(component.sortByAllProcessingStatus()).toBeUndefined();
    expect(component.sortByAllStatus()).toBeUndefined();
    
  });

  it('should run ngOnChanges purchaseDetailData undefined', () => {

    component.purchaseDetailData = undefined;

    component.ngOnChanges({
      selectedUnittrustAccountNumber: new SimpleChange(undefined, 1123, true),
    });

    expect(component).toBeTruthy();
  });

});
