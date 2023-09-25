import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { State } from './customer-support.reducer';
import { Environment } from '../../core/models/environment.model';

import { CustomerSupportEffects } from './customer-support.effects';
import * as Actions from './customer-support.actions';
import { CustomerSupportService } from '../../core/services/customer-support.service';
import { Customer } from '../../core/models/customer.model';

const mockData: Customer[] = [
  {
    "pfId": 1,
    "utAccountNo": "A80111457",
    "accountName": "XXXXXXT MILLIO",
    "jointIndicator": "01",
    "accountStatus": "A",
    "cifNumber": "A80111457",
    "clientIdType": "NEWIC",
    "clientId": "750702105695",
    "authorisedSignatories": ""
  }
];

const mockState: State = {
  entities: mockData,
  currentEntity: null,
  hasSearched: false,
  searchQuery: {
    fullName: '',
    idNumber: '',
    cifNumber: ''
  },
  status: 'pending',
  error: ''
};

class MockCustomerSupportService {
  searchRecords() { /* mock */ }
}

describe('CustomerSupportEffects', () => {
  let actions$: Observable<any>;
  let effects: CustomerSupportEffects;
  let store: MockStore<any>;
  let customerSupportService: CustomerSupportService;
  
  const apiUrl = '/';
  const environment: Environment = { production: false, apiUrl: apiUrl };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CustomerSupportEffects,
        provideMockActions(() => actions$),
        provideMockStore({ initialState: mockState }),
        {
          provide: 'environment', useValue: environment
        },
        { 
          provide: CustomerSupportService, useClass: MockCustomerSupportService
        },
      ]
    });

    effects = TestBed.inject(CustomerSupportEffects);
    store = TestBed.inject(MockStore);
    customerSupportService = TestBed.inject(CustomerSupportService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should run loadCustomerSupports Success path', (done) => {
      
    const spy = jest.spyOn(customerSupportService, 'searchRecords').mockReturnValue(of(mockData));
    
    // create an actions stream and immediately dispatch a GET action
    actions$ = of(Actions.loadCustomerSupports({
      searchParams: {
        fullName: 'John',
      }
    }));

    // subscribe to the Effect stream and verify it dispatches a SUCCESS action
    effects.loadCustomerSupports$
      .subscribe(action => {
        expect(action).toEqual(Actions.loadCustomerSupportsSuccess({
          data: mockData
        }));
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
    
  });

  it('should run loadActivityLogs Failure path', (done) => {
      
    const spy = jest.spyOn(customerSupportService, 'searchRecords').mockReturnValue(throwError('Mock error'));
    
    // create an actions stream and immediately dispatch a GET action
    actions$ = of(Actions.loadCustomerSupports({
      searchParams: {
        fullName: 'John'
      }
    }));

    // subscribe to the Effect stream and verify it dispatches a FAILURE action
    effects.loadCustomerSupports$
      .subscribe(action => {
        expect(action).toEqual(Actions.loadCustomerSupportsFailure({
          error: 'Fail to search Customer records!'
        }));
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
    
  });
  
});
