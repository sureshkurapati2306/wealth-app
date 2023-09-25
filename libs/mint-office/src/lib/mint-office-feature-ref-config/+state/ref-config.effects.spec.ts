import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { Observable, of, throwError } from 'rxjs';
import { Environment } from '../../core/models/environment.model';

import { UnitTrustTransactionsEffects } from './ref-config.effects';
import * as Actions from './ref-config.actions';
import { UnitTrustTransaction } from '../../core/models/unit-trust-transactions.model';
import { State } from './ref-config.reducer';
import { UnitTrustTransactionsService } from '../../core/services/unit-trust-transactions.service';


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
    "riskRatingInd": "",
    "documentInd":""
  }
];

const mockState: State = {
  entities: mockData,
  currentEntity: 1,
  error: '',
  selectedItem: undefined
};

class MockUnitTrustTransactionsService {
  searchRecords() { /* mock */ }
  cancelUnitTrustTransactions() { /* mock */ }
}

describe('UnitTrustTransactionsEffects', () => {
  let actions$: Observable<any>;
  let effects: UnitTrustTransactionsEffects;
  let store: MockStore<any>;
  let unitTrustTransactionsService: UnitTrustTransactionsService;

  const apiUrl = '/';
  const environment: Environment = { production: false, apiUrl: apiUrl };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: 'environment', useValue: environment
        },
        UnitTrustTransactionsEffects,
        provideMockActions(() => actions$),
        provideMockStore({ initialState: mockState }),
        { 
          provide: UnitTrustTransactionsService, useClass: MockUnitTrustTransactionsService
        },
      ]
    });

    effects = TestBed.inject(UnitTrustTransactionsEffects);
    store = TestBed.inject(MockStore);
    unitTrustTransactionsService = TestBed.inject(UnitTrustTransactionsService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should run loadUnitTrustTransactions Success path', (done) => {
      
    const spy = jest.spyOn(unitTrustTransactionsService, 'searchRecords').mockReturnValue(of(mockData));
    
    // create an actions stream and immediately dispatch a GET action
    actions$ = of(Actions.loadRefConfig());

    // subscribe to the Effect stream and verify it dispatches a SUCCESS action
    effects.loadUnitTrustTransactions$
      .subscribe(action => {
        expect(action).toEqual(Actions.loadRefConfigSuccess({
          data: mockData
        }));
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
    
  });

  it('should run loadUnitTrustTransactions Failure path', (done) => {
      
    const spy = jest.spyOn(unitTrustTransactionsService, 'searchRecords').mockReturnValue(throwError('Mock error'));
    
    // create an actions stream and immediately dispatch a GET action
    actions$ = of(Actions.loadRefConfig());

    // subscribe to the Effect stream and verify it dispatches a FAILURE action
    effects.loadUnitTrustTransactions$
      .subscribe(action => {
        expect(action).toEqual(Actions.loadUnitTrustTransactionsFailure({
          error: 'Mock error'
        }));
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
    
  });

});

