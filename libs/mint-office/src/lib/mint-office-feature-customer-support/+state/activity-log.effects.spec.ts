import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable, of, throwError } from 'rxjs';
import { Environment } from '../../core/models/environment.model';
import { ActivityLogEffects } from './activity-log.effects';
import * as Actions from './activity-log.actions';
import { CustomerActivityLog } from '../../core/models/customer-activity.model';
import { State } from './activity-log.reducer';
import { ActivityLogService } from '../../core/services/activity-log.service';

const mockData: CustomerActivityLog[] = [
  {
    "auditId": 733,
    "clientId": "NA",
    "mobileNo": "NA",
    "auditDate": "2022-01-24T00:06:10.000+00:00",
    "otp": "NA",
    "referenceNo": "1006043-01",
    "moduleName": "Risk Profile",
    "eventName": "Risk Profile with Audit",
    "channelName": "Web Browser",
    "statusInd": "S",
    "browserName": "Chrome",
    "osVersion": "Win10",
    "ipAddress": "12.1.2.1",
    "statusRemark": null
  },
  {
      "auditId": 739,
      "clientId": "NA",
      "mobileNo": "NA",
      "auditDate": "2022-01-25T00:03:42.000+00:00",
      "otp": "NA",
      "referenceNo": "NA",
      "moduleName": "Risk Profile",
      "eventName": "Risk Profile with Audit",
      "channelName": "Web Browser",
      "statusInd": "S",
      "browserName": "Chrome",
      "osVersion": "Win10",
      "ipAddress": "12.1.2.1",
      "statusRemark": null
  }
];

const mockState: State = {
  entities: mockData,
  hasSearched: false,
  searchQuery: {
    startDate: null,
    endDate: null,
    modules: [],
    channels: []
  },
  status: 'pending',
  error: ''
};

class MockActivityLogService {
  searchRecords() { /* mock */ }
}

describe('ActivityLogEffects', () => {
  let actions$: Observable<any>;
  let effects: ActivityLogEffects;
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
        ActivityLogEffects,
        provideMockActions(() => actions$),
        provideMockStore({ initialState: mockState }),
        { 
          provide: ActivityLogService, useClass: MockActivityLogService
        },
      ]
    });

    effects = TestBed.inject(ActivityLogEffects);
    store = TestBed.inject(MockStore);
    activityLogService = TestBed.inject(ActivityLogService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should run loadActivityLogs Success path', (done) => {
      
    const spy = jest.spyOn(activityLogService, 'searchRecords').mockReturnValue(of(mockData));
    
    // create an actions stream and immediately dispatch a GET action
    actions$ = of(Actions.loadActivityLogs({
      searchParams: {
        startDate: null,
        endDate: null,
        modules: [],
        channels: []
      }
    }));

    // subscribe to the Effect stream and verify it dispatches a SUCCESS action
    effects.loadActivityLogs$
      .subscribe(action => {
        expect(action).toEqual(Actions.loadActivityLogsSuccess({
          data: mockData
        }));
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
    
  });

  it('should run loadActivityLogs Failure path', (done) => {
      
    const spy = jest.spyOn(activityLogService, 'searchRecords').mockReturnValue(throwError('Mock error'));
    
    // create an actions stream and immediately dispatch a GET action
    actions$ = of(Actions.loadActivityLogs({
      searchParams: {
        startDate: null,
        endDate: null,
        modules: [],
        channels: []
      }
    }));

    // subscribe to the Effect stream and verify it dispatches a FAILURE action
    effects.loadActivityLogs$
      .subscribe(action => {
        expect(action).toEqual(Actions.loadActivityLogsFailure({
          error: 'Mock error'
        }));
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
    
  });

});
