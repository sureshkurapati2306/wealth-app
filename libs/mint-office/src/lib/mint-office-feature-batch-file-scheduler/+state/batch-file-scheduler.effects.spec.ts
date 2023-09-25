import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';

import { BatchFileSchedulerEffects } from './batch-file-scheduler.effects';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BatchFileSchedulerService } from '../../core/services/batch-file-scheduler.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { Environment } from '../../core/models/environment.model';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import * as Reducer from '../+state/batch-file-scheduler.reducer'

import * as Actions from '../+state/batch-file-scheduler.actions';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


class mockSchedulerService {
  getSchedulers() { /* mock */ }
  deleteScheduler() { /* mock */ }
  createScheduler() { /* mock */ }
  getJobs() { /* mock */ }
  editScheduler() {
    /* mock */
  }
}

const mockData: any = { 
  schedulers: [
    {
      "schedulerName": "testing",
      "schedulerDate": "2022-03-21T07:08:20",
      "endDate": null,
      "schedulerType": "Monthly",
      "schedulerStatus": "C",
      "schedulerOccurrence": "O",
      "jobId": 1001,
    }
  ],
  jobs:  
    {
      "jobId": 1002,
      "jobCode": "STATUS BATCH",
      "jobName": "Status scheduler",
    },
  error: 'Error in loading'
}

const mockState: Reducer.State = {
  schedulers: mockData.schedulers,
  jobs: mockData.jobs,
  error: '',
  schedulerEdit: mockData.schedulers[0]
}

describe('BatchFileSchedulerEffects', () => {
  let actions$: Observable<any>;
  let effects: BatchFileSchedulerEffects;

  const apiUrl = '/';
  const production = false;
  const environment: Environment = { production, apiUrl }

  let httpClient: HttpClient;
  let store: MockStore<any>;

  let schedulerService: BatchFileSchedulerService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,  
        StoreModule.forRoot({}),
        MatSnackBarModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        HttpClientModule,
        BatchFileSchedulerEffects,
        BatchFileSchedulerService,
        provideMockActions(() => actions$), 
        provideMockStore({ initialState: mockState }),
        { provide: 'environment', useValue: environment},
        { 
          provide: BatchFileSchedulerService, useClass: mockSchedulerService
        },
      ]
    });

    effects = TestBed.inject(BatchFileSchedulerEffects);
    httpClient = TestBed.inject(HttpClient);
    store = TestBed.inject(MockStore);
    schedulerService = TestBed.inject(BatchFileSchedulerService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should load batch file scheduler success path', (done) => {
    const spy = jest.spyOn(schedulerService, 'getSchedulers').mockReturnValue(of(mockData));

    actions$ = of(Actions.loadBatchFileSchedulers());

    effects.loadBatchFileSchedulers$
    .subscribe(action => {
      expect(action).toEqual(Actions.loadBatchFileSchedulersSuccess({
        data: mockData
      }));
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('should load batch file scheduler failed path', (done) => {
      
    const spy = jest.spyOn(schedulerService, 'getSchedulers').mockReturnValue(throwError('Mock error'));
    
    // create an actions stream and immediately dispatch a GET action
    actions$ = of(Actions.loadBatchFileSchedulers());

    // subscribe to the Effect stream and verify it dispatches a FAILURE action
    effects.loadBatchFileSchedulers$
      .subscribe(action => {
        expect(action).toEqual(Actions.loadBatchFileSchedulersFailure({
          error: 'Mock error'
        }));
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
    
  });


  it('should add a scheduler on success path', (done) => {
      
    const spy = jest.spyOn(schedulerService, 'createScheduler').mockReturnValue(of(mockData.scheduler));
    
    // create an actions stream and immediately dispatch a GET action
    actions$ = of(Actions.createBatchFileScheduler(
      {
        payload: mockData.scheduler
      }
    ));

    // subscribe to the Effect stream and verify it dispatches a Success action
    effects.addScheduler$
    .subscribe(action => {

      expect(action).toEqual(Actions.createBatchFileSchedulerSuccess({
        payload: mockData.scheduler
      }));
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
    
  });

  it('should add a scheduler on a failed path', (done) => {

    const spy = jest.spyOn(schedulerService, 'createScheduler').mockReturnValue(throwError('Mock error'));

    actions$ = of(Actions.createBatchFileScheduler({payload: []}));

    // subscribe to the Effect stream and verify it dispatches a FAILURE action
    effects.addScheduler$
      .subscribe((action: any) => {
        console.log('action ', action)
        expect(action).toEqual(Actions.createBatchFileSchedulerFailure({
          error: 'Mock error'
        }));
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
  });


  it('should delete a scheduler on a  success path', (done) => {
    const spy = jest.spyOn(schedulerService, 'deleteScheduler').mockReturnValue(of(mockData));

    actions$ = of(Actions.deleteBatchFileScheduler({id: 1}));

    effects.deleteBatchFileSchedulers$
    .subscribe(action => {
      expect(action).toEqual(Actions.deleteBatchFileSchedulerSuccess({
        id: 1
      }));
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

 
  it('should delete a scheduler on a failed path', (done) => {
      
    const spy = jest.spyOn(schedulerService, 'deleteScheduler').mockReturnValue(throwError('Mock error'));
    
    // create an actions stream and immediately dispatch a GET action
    actions$ = of(Actions.deleteBatchFileScheduler({id: 1}));

    // subscribe to the Effect stream and verify it dispatches a FAILURE action
    effects.deleteBatchFileSchedulers$
      .subscribe(action => {
        console.log('action ', action)
        expect(action).toEqual(Actions.deleteBatchFileSchedulerFailure({
          error: 'Mock error'
        }));
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
    
  });

  it('should load jobs on a success path', (done) => {
      
    const spy = jest.spyOn(schedulerService, 'getJobs').mockReturnValue(of(mockData.jobs));
    
    // create an actions stream and immediately dispatch a GET action
    actions$ = of(Actions.loadJobs());

    // subscribe to the Effect stream and verify it dispatches a Success action
    effects.loadJobs$
      .subscribe(action => {
        expect(action).toEqual(Actions.loadJobsSuccess({
          jobs: mockData.jobs,
        }));
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
    
  });


  it('should load jobs on a failed path', (done) => {
      
    const spy = jest.spyOn(schedulerService, 'getJobs').mockReturnValue(throwError('Mock error'));
    
    // create an actions stream and immediately dispatch a GET action
    actions$ = of(Actions.loadJobs());

    // subscribe to the Effect stream and verify it dispatches a FAILURE action
    effects.loadJobs$
      .subscribe(action => {
        expect(action).toEqual(Actions.loadJobsFailure({
          error: 'Mock error'
        }));
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
    
  });
});
