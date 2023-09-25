import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { Environment } from '../models/environment.model';
import { UnitTrustTransaction } from '../models/unit-trust-transactions.model';

import { UnitTrustTransactionsService } from './unit-trust-transactions.service';

const mockData: UnitTrustTransaction[] = [
  {
    "processingStatusDate":null,
    "rejectedName": null,
    "rejectedDate": null,
    "rejectedRemark": null,
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
    "staffIndicator": "2",
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
    "transId": 1,
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
    "statusRemark": null
  }
];

describe('UnitTrustTransactionsService', () => {
  let service: UnitTrustTransactionsService;
  let httpClient: HttpClient;
  const apiUrl = '/';
  const production = false;
  const environment: Environment = { production, apiUrl }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: 'environment', useValue: environment
        }
      ]
    });
    service = TestBed.inject(UnitTrustTransactionsService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call searchRecords() success path', (done) => {

    jest.spyOn(httpClient, 'get').mockReturnValue(of(mockData));

    service.searchRecords({
      status: 'All',
      startDate: new Date(),
      endDate: new Date(),
      utAccNumber: 'abc123',
      idNumber: 'abcabc123',
      customerName: 'John'
    }).subscribe(data =>{
      expect(data).toBe(mockData);
      done();
    });

  });

  it('should call searchRecords() error path', (done) => {

    const errorResponse = new HttpErrorResponse({
      error: 'Mock 404 error',
      status: 404
    });

    jest.spyOn(httpClient, 'get').mockReturnValue(throwError(errorResponse));

    service.searchRecords({
      status: 'Processing'
    })
      .subscribe(
        () => { done.fail('') },
        (error: HttpErrorResponse) => {
          expect(error.error).toBe('Mock 404 error');
          expect(error.status).toBe(404);
          done();
        });
  });

  it('should call cancelUnitTrustTransactions() success path', (done) => {
    
    jest.spyOn(httpClient, 'put').mockReturnValue(of(mockData));

    service.cancelUnitTrustTransactions([]).subscribe(data =>{
      expect(data).toBe(mockData);
      done();
    });

  });

  it('should call cancelUnitTrustTransactions() error path', (done) => {

    const errorResponse = new HttpErrorResponse({
      error: 'Mock 404 error',
      status: 404
    });

    jest.spyOn(httpClient, 'put').mockReturnValue(throwError(errorResponse));

    service.cancelUnitTrustTransactions([])
      .subscribe(
        () => { done.fail('') },
        (error: HttpErrorResponse) => {
          expect(error.error).toBe('Mock 404 error');
          expect(error.status).toBe(404);
          done();
        });
  });

});
