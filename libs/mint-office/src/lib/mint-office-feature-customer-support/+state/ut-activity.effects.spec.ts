import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable, of, throwError } from 'rxjs';
import { Environment } from '../../core/models/environment.model';
import { UtActivityEffects } from './ut-activity.effects';
import * as Actions from './ut-activity.actions';
import { UnitTrustActivity } from '../../core/models/customer-activity.model';
import { State } from './ut-activity.reducer';
import { ActivityLogService } from '../../core/services/activity-log.service';

const mockData: UnitTrustActivity[] = [{
  "referenceNo": "7000030-01",
  "utAccountNo": "A80091526",
  "fundName": "AMITTIKAL",
  "chargesAmount": 5.00,
  "totalInvestment": 500.00,
  "toFundName": "",
  "transactionUnit": 1000.500000
}];

const mockState: State = {
  referenceNo: null,
  currentEntity: mockData,
  status: 'pending',
  error: ''
};

class MockActivityLogService {
  getUtActivityRecord() { /* mock */ }
}

describe('UtActivityEffects', () => {
  let actions$: Observable<any>;
  let effects: UtActivityEffects;
  let store: MockStore<any>;
  let activityLogService: ActivityLogService;

  const apiUrl = '/';
  const environment: Environment = { production: false, apiUrl: apiUrl };
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: 'environment', useValue: environment
        },
        UtActivityEffects,
        provideMockActions(() => actions$),
        provideMockStore({ initialState: mockState }),
        { 
          provide: ActivityLogService, useClass: MockActivityLogService
        },
      ]
    });

    effects = TestBed.inject(UtActivityEffects);
    store = TestBed.inject(MockStore);
    activityLogService = TestBed.inject(ActivityLogService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should run getUtActivityRecord Success path', (done) => {
      
    const spy = jest.spyOn(activityLogService, 'getUtActivityRecord').mockReturnValue(of(mockData));
    
    // create an actions stream and immediately dispatch a GET action
    actions$ = of(Actions.loadUtActivity({
      referenceNo: 'ABC'
    }));

    // subscribe to the Effect stream and verify it dispatches a SUCCESS action
    effects.loadUtActivity$
      .subscribe(action => {
        expect(action).toEqual(Actions.loadUtActivitySuccess({
          data: mockData
        }));
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
    
  });

  it('should run getUtActivityRecord Failure path', (done) => {
      
    const spy = jest.spyOn(activityLogService, 'getUtActivityRecord').mockReturnValue(throwError('Mock error'));
    
    // create an actions stream and immediately dispatch a GET action
    actions$ = of(Actions.loadUtActivity({
      referenceNo: 'ABC'
    }));

    // subscribe to the Effect stream and verify it dispatches a FAILURE action
    effects.loadUtActivity$
      .subscribe(action => {
        expect(action).toEqual(Actions.loadUtActivityFailure({
          error: 'Fail to retrieve activity record!'
        }));
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
    
  });
  
});
