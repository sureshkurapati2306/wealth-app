import { SelectionModel } from '@angular/cdk/collections';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterTestingModule } from '@angular/router/testing';
import { UnitTrustTransaction } from '../../core/models/unit-trust-transactions.model';
import { TablePaginatorComponent } from '../../mint-office-ui-paginator/table-paginator/table-paginator.component';
import { provideMockStore } from '@ngrx/store/testing';

import { UtListTableComponent } from './ut-list-table.component';

import { downloadService } from '../../core/services/json-to-csv.service';
import { DecimalPipe } from '@angular/common';
import { EventService } from '../../core/services/event.service';
import { of } from 'rxjs';
import { SimpleChange } from '@angular/core';

class MockEventService {
  on() { 
    return of({startDate: new Date('2022-03-01T13:24:00') , endDate: new Date('2022-03-31T14:24:00') });
    
   }
}
class mockDownloadService {
  downloadFile(headers, items, metadata, filename) { /**mock */}

}

const mockData: UnitTrustTransaction[] = [
  {
    "processingStatusDate":"null",
    "rejectedName": null,
    "rejectedDate": null,
    "rejectedRemark": null,
    "cifNumber": null,
    "accountStatus": null,
    "jointIndicator": null,
    "mobileNo": null,
    "indicativeCharges": null,
    "fileStatusDate": "2021-12-22T09:51:09.000+00:00",
    "fileStatus": null,
    "transactionStatusDate": "2021-12-22T09:51:09.000+00:00",
    "transactionStatus": "Cancelled",
    "transactionUnit": 100.200000,
    "paymentTo": "",
    "contactNo": "0122176370",
    "fdAccountNo": "",
    "einvestsmart": "0",
    "staffIndicator": "02",
    "userId": "",
    "payableAmount": 0.00,
    "taxAmount": 0.00,
    "taxRate": 0.000000,
    "taxCode": "",
    "taxId": 0,
    "netInvestment": 4.96,
    "totalInvestment": 5.00,
    "chargesAmount": 0.01,
    "chargesPercentage": 0.007520,
    "chargeId": 10,
    "utAccountNo": "A80111457",
    "toFundName": "",
    "toFundCode": "",
    "fundName": "CIMB-PRINCIPAL STRATEGIC INCOME BOND FUND",
    "fundCode": "CBT39D",
    "settlementAccount": "8001041503",
    "icNumber": "750702105695",
    "seqNo": 1,
    "clientId": "750702105695",
    "clientName": "XXXXXXT MILLIO",
    "transactionType": "01",
    "transactionDatetime": "2021-12-22T09:51:09.000+00:00",
    "referenceNo": "1-1",
    "transId": 2,
    "auditId": 2,
    "auditDate": "2021-12-16T09:30:42.000+00:00",
    "otp": "NA",
    "moduleName": "Logout",
    "eventName": "Logout And Audit",
    "channelName": "Web Browser",
    "statusInd": "S",
    "browserName": "Chrome",
    "osVersion": "Win10",
    "ipAddress": "12.1.2.1",
    "statusRemark": null,
    "riskRatingInd": null,
    "documentInd": null,
    "staffIndicatorValue" :"",
    "higherFundRiskAck":"N/A"
  },
  {
    "processingStatusDate":null,
    "rejectedName": null,
    "rejectedDate": null,
    "rejectedRemark": "NA",
    "cifNumber": null,
    "accountStatus": null,
    "jointIndicator": null,
    "mobileNo": null,
    "indicativeCharges": null,
    "fileStatusDate": null,
    "fileStatus": null,
    "transactionStatusDate": "2021-12-22T09:51:09.000+00:00",
    "transactionStatus": "Cancelled",
    "transactionUnit": 100.200000,
    "paymentTo": "",
    "contactNo": "0122176370",
    "fdAccountNo": "",
    "einvestsmart": "0",
    "staffIndicator": "01",
    "userId": "",
    "payableAmount": 0.00,
    "taxAmount": 0.00,
    "taxRate": 0.000000,
    "taxCode": "",
    "taxId": 0,
    "netInvestment": 4.96,
    "totalInvestment": 5.00,
    "chargesAmount": 0.01,
    "chargesPercentage": 0.007520,
    "chargeId": 10,
    "utAccountNo": "A80111457",
    "toFundName": "",
    "toFundCode": "",
    "fundName": "CIMB-PRINCIPAL STRATEGIC INCOME BOND FUND",
    "fundCode": "CBT39D",
    "settlementAccount": "8001041503",
    "icNumber": "750702105695",
    "seqNo": 1,
    "clientId": "750702105695",
    "clientName": "XXXXXXT MILLIO",
    "transactionType": "02",
    "transactionDatetime": null,
    "referenceNo": "1-1",
    "transId": 2,
    "auditId": 2,
    "auditDate": "2021-12-16T09:30:42.000+00:00",
    "otp": "NA",
    "moduleName": "Logout",
    "eventName": "Logout And Audit",
    "channelName": "Web Browser",
    "statusInd": "S",
    "browserName": "Chrome",
    "osVersion": "Win10",
    "ipAddress": "12.1.2.1",
    "statusRemark": null,
    "riskRatingInd": null,
    "documentInd": null,
    "staffIndicatorValue" :"",
    "higherFundRiskAck":"N/A"
  },
  {
    "processingStatusDate":null,
    "rejectedName": null,
    "rejectedDate": null,
    "rejectedRemark": "NA",
    "cifNumber": null,
    "accountStatus": null,
    "jointIndicator": null,
    "mobileNo": null,
    "indicativeCharges": null,
    "fileStatusDate": null,
    "fileStatus": null,
    "transactionStatusDate": "2021-12-22T09:51:09.000+00:00",
    "transactionStatus": "Cancelled",
    "transactionUnit": 100.200000,
    "paymentTo": "",
    "contactNo": "0122176370",
    "fdAccountNo": "",
    "einvestsmart": "0",
    "staffIndicator": "01",
    "userId": "",
    "payableAmount": 0.00,
    "taxAmount": 0.00,
    "taxRate": 0.000000,
    "taxCode": "",
    "taxId": 0,
    "netInvestment": 4.96,
    "totalInvestment": 5.00,
    "chargesAmount": 0.01,
    "chargesPercentage": 0.007520,
    "chargeId": 10,
    "utAccountNo": "A80111457",
    "toFundName": "",
    "toFundCode": "",
    "fundName": "CIMB-PRINCIPAL STRATEGIC INCOME BOND FUND",
    "fundCode": "CBT39D",
    "settlementAccount": "8001041503",
    "icNumber": "750702105695",
    "seqNo": 1,
    "clientId": "750702105695",
    "clientName": "XXXXXXT MILLIO",
    "transactionType": "03",
    "transactionDatetime": null,
    "referenceNo": "1-1",
    "transId": 2,
    "auditId": 2,
    "auditDate": "2021-12-16T09:30:42.000+00:00",
    "otp": "NA",
    "moduleName": "Logout",
    "eventName": "Logout And Audit",
    "channelName": "Web Browser",
    "statusInd": "S",
    "browserName": "Chrome",
    "osVersion": "Win10",
    "ipAddress": "12.1.2.1",
    "statusRemark": null,
    "riskRatingInd": null,
    "documentInd": null,
    "staffIndicatorValue" :"",
    "higherFundRiskAck":"N/A"
  }
];


describe('UtListTableComponent', () => {
  let component: UtListTableComponent;
  let fixture: ComponentFixture<UtListTableComponent>;
  let eventService: EventService;
  let downloadServices: downloadService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        UtListTableComponent,
        TablePaginatorComponent
      ],
      imports: [ 
        RouterTestingModule,
        MatPaginatorModule
      ],
      providers: [
        DecimalPipe,
        { 
          provide: EventService, useClass: MockEventService
        },
        { 
          provide: downloadService, useClass: mockDownloadService
        },
        provideMockStore({})
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    eventService = TestBed.inject(EventService);
    downloadServices = TestBed.inject(downloadService);
    fixture = TestBed.createComponent(UtListTableComponent);
    component = fixture.componentInstance;
    component.dataSourceRows = mockData;
    component.tabName = 'Purchase';
    component.getLoadingState = 'success';
    fixture.detectChanges();
  });

  it('should create', () => {

    const spy = jest.spyOn(eventService, 'on');

    eventService.on().subscribe(() => {
      expect(component.transactionStartDate).toEqual("01 Mar 2022");
      expect(component.transactionEndDate).toEqual("31 Mar 2022");
    });

    expect(component).toBeTruthy();
  });
  
  it('should goToDetailPage', () => {
    expect(component.goToDetailPage(mockData[0])).toBeUndefined();
  });

  it('should clickCancelTransactions', () => {
    expect(component.clickCancelTransactions()).toBeUndefined();
  });

  it('should masterToggle blank', () => {
    component.clickableCheckboxRows = mockData;
    expect(component.masterToggle()).toBeUndefined();
  });

  it('should masterToggle not blank', () => {
    component.selection = new SelectionModel<UnitTrustTransaction>(true, mockData);
    component.clickableCheckboxRows = mockData;
    expect(component.masterToggle()).toBeUndefined();
  });


  it('should reset count to 0 when tabName changes', () => {
    const changes = {
      tabName: new SimpleChange('previousValue', 'currentValue',true)
    };
    component.ngOnChanges(changes);
    expect(component.resetCount).toBe(0);
  });
  
  it('should reset count to 0 when tabName is undefined', () => {
    const changes = {
      tabName: new SimpleChange(undefined, undefined, false)
    };
    component.ngOnChanges(changes);
    expect(component.resetCount).toBe(1);
  });
  
  it('should set count to 1 when tabName does not change', () => {
    const changes = {
      tabName: new SimpleChange('value', 'value', true)
    };
    component.ngOnChanges(changes);
    expect(component.resetCount).toBe(1);
  });

  // it('should download a csv file', () => {
  //   const data = [];
  //   const dateFormat = "dd MMM yyyy, hh:mm a";

  //   const gerenatedDateTime = format(new Date(), dateFormat);
  //   const today = format(new Date(), "ddMMyyyy");

  //   expect(data).toEqual(data);
  //   expect(dateFormat).toEqual(dateFormat);
  //   expect(gerenatedDateTime).toEqual(gerenatedDateTime);
  //   expect(today).toEqual(today);

  // });

  it('should download', () => {
    const spy = jest.spyOn(downloadServices, 'downloadFile');

    component.transactionStartDate = "01 Mar 2022";
    component.transactionEndDate = "31 Mar 2022";

    expect(component.download()).toBeUndefined();
  });

});
