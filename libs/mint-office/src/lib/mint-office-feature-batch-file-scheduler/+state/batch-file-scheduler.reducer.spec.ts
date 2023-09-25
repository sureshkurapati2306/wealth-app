import { reducer, initialState} from './batch-file-scheduler.reducer';

import * as Actions from './batch-file-scheduler.actions';

const mockData: any = { 
  schedulers:  
    {
      "schedulerName": "testing",
      "schedulerDate": "2022-03-21T07:08:20",
      "endDate": null,
      "schedulerType": "Monthly",
      "schedulerStatus": "C",
      "schedulerOccurrence": "O",
      "jobId": 1001,
    },
  jobs:  
    {
      "jobId": 1002,
      "jobCode": "STATUS BATCH",
      "jobName": "Status scheduler",
    },
  error: 'Error in loading'
}


describe('BatchFileScheduler Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('Load Batch File Scheduler', () => {
    it('should start to load data from API', () => {
      const action = Actions.loadBatchFileSchedulers();
  
      const result = reducer(initialState, action);

      expect(result).toEqual(initialState);
    });
  });

  describe('Load Batch File Scheduler Success', () => {
    it('should start to load data from API', () => {
      const action = Actions.loadBatchFileSchedulersSuccess({
        data: mockData.schedulers
      });
  
      const result = reducer(initialState, action);

      expect(result.schedulers).toEqual(mockData.schedulers);
    });
  });


  describe('Load Batch File Scheduler Failure', () => {
    it('should check for a failure state', () => {
      const action = Actions.loadBatchFileSchedulersFailure({
        error: 'Error in loading'
      });
  
      const result = reducer(initialState, action);
  
      expect(result.error).toEqual('Error in loading');
    });
  });


  describe('Create Batch File Scheduler', () => {
    it('should save a scheduler', () => {
      const action = Actions.createBatchFileScheduler({
        payload: mockData.schedulers
      });

      const result = reducer(initialState, action);
  
      expect(result.schedulers).toEqual(mockData.schedulers);
    });
  });


  describe('Create Batch File Scheduler Success', () => {
    it('should save a scheduler', () => {
      const action = Actions.createBatchFileSchedulerSuccess({
        payload: mockData.schedulers
      });
  
      const result = reducer(initialState, action);
  
      expect(result.schedulers).toEqual(mockData.schedulers);
    });
  });

  describe('Create Batch File Scheduler Failure', () => {
    it('should save a scheduler with failure notice', () => {
      const action = Actions.createBatchFileSchedulerFailure({
        error: mockData.error
      });
  
      const result = reducer(initialState, action);
  
      expect(result.error).toEqual(mockData.error);
    });
  });

  describe('Delete Batch File Scheduler', () => {
    it('should delete a scheduler', () => {
      const action = Actions.deleteBatchFileScheduler({
        id: 1101
      });
  
      const result = reducer(initialState, action);
  
      expect(result.schedulers).toEqual([]);
    });
  });

  describe('Delete Batch File Scheduler Success', () => {
    it('should delete a scheduler', () => {
      const action = Actions.deleteBatchFileSchedulerSuccess({
        id: 1101
      });
  
      const result = reducer(initialState, action);
  
      expect(result.schedulers).toEqual([]);
    });
  });

  describe('Delete Batch File Scheduler Failure', () => {
    it('should delete a scheduler with a failure message', () => {
      const action = Actions.deleteBatchFileSchedulerFailure({
        error: mockData.error
      });
  
      const result = reducer(initialState, action);
  
      expect(result.error).toEqual(mockData.error);
    });
  });


  describe('Load Jobs', () => {
    it('should load jobs', () => {
      const action = Actions.loadJobs();
  
      const result = reducer(initialState, action);
  
      expect(result).toEqual(initialState);
    });
  });

  describe('Load Jobs Success', () => {
    it('should load jobs on a success state', () => {
      const action = Actions.loadJobsSuccess({
        jobs: mockData.jobs
      });
  
      const result = reducer(initialState, action);
  
      expect(result.jobs).toEqual(mockData.jobs);
    });
  });

  describe('Load Jobs Failure', () => {
    it('should load jobs on a failure state', () => {
      const action = Actions.loadJobsFailure({
        error: mockData.error
      });
  
      const result = reducer(initialState, action);
  
      expect(result.error).toEqual(mockData.error);
    });
  });
});
