import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { Observable, of, throwError } from 'rxjs';
import { Environment } from '../../core/models/environment.model';

import { SmsDeliveryLogEffects } from './sms-delivery-log.effects';
import * as Actions from './sms-delivery-log.actions';
import { State } from './sms-delivery-log.reducer';
import { SmsDeliveryLogService } from '../../core/services/sms-delivery-log.service';


const mockData: any[] = [
  {
    "id": 0,
    "contactNumber": "01114300869",
    "utAccountNo": "A80120396",
    "clientId": "500211507504",
    "smsContent": "Unit Trust purchase request Ref 7000802 of RM 10,000.00 from account ending 0396 is received for processing on 01 Aug 2022.",
    "category": "01",
    "smsDeliveryStatus": "SMS delivery successful",
    "deliveryDateTime": "2022-08-01T16:36:49"
  }
];

const mockState: State = {
  entities: mockData,
  currentEntity: 1,
  hasSearched: false,
  searchQuery: {
    status: 'All'
  },
  status: 'pending',
  error: '',
  selectedEntity: null
};

class MockSmsTransactionsService {
  searchRecords() { /* mock */ }
}

describe('UnitTrustTransactionsEffects', () => {
  let actions$: Observable<any>;
  let effects: SmsDeliveryLogEffects;
  let store: MockStore<any>;
  let smsDeliveryLogService: SmsDeliveryLogService;

  const apiUrl = '/';
  const environment: Environment = { production: false, apiUrl: apiUrl };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: 'environment', useValue: environment
        },
        SmsDeliveryLogEffects,
        provideMockActions(() => actions$),
        provideMockStore({ initialState: mockState }),
        { 
          provide: SmsDeliveryLogService, useClass: MockSmsTransactionsService
        },
      ]
    });

    effects = TestBed.inject(SmsDeliveryLogEffects);
    store = TestBed.inject(MockStore);
    smsDeliveryLogService = TestBed.inject(SmsDeliveryLogService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should run loadUnitTrustTransactions Success path', (done) => {
      
    const spy = jest.spyOn(smsDeliveryLogService, 'searchRecords').mockReturnValue(of(mockData));
    actions$ = of(Actions.loadSmsTransactions({
      searchParams: {
        status: 'All'
      }
    }));

    
    effects.loadSmsDeliveryLog$
      .subscribe(action => {
        expect(action).toEqual(Actions.loadSmsTransactionsSuccess({
          data: mockData
        }));
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
    
  });

  it('should run loadSmsTransactions Failure path', (done) => {
      
    const spy = jest.spyOn(smsDeliveryLogService, 'searchRecords').mockReturnValue(throwError('Mock error'));
    
    actions$ = of(Actions.loadSmsTransactions({
      searchParams: {
        status: 'All'
      }
    }));

    effects.loadSmsDeliveryLog$
      .subscribe(action => {
        expect(action).toEqual(Actions.loadSmsTransactionsFailure({
          error: 'Mock error'
        }));
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
    
  });

});

