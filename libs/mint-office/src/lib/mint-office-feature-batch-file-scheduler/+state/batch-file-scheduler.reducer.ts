import { createReducer, on } from '@ngrx/store';
import * as BatchFileSchedulerActions from './batch-file-scheduler.actions';

export const batchFileSchedulerFeatureKey = 'batchFileScheduler';
export const jobsKey = 'JobsScheduler';

import { BatchFileScheduler } from '../../core/models/batchfilescheduler.model';
import { Job } from '../../core/models/job.model';


export interface State {
  schedulers: BatchFileScheduler[];
  jobs: Job[];
  error: string
  schedulerEdit: any;

}

export const initialState: State = {
  schedulers: [],
  jobs: [],
  error: '',
  schedulerEdit: ''
};


export const reducer = createReducer(
  initialState,

  /** Load schedulers */
  on(BatchFileSchedulerActions.loadBatchFileSchedulers, (state) => {
    return {
      ...state,
    }
  }),

  on(BatchFileSchedulerActions.loadBatchFileSchedulersSuccess, (state, action) =>  {
    return {
      ...state,
      schedulers: action.data
    }
  }),

  on(BatchFileSchedulerActions.loadBatchFileSchedulersFailure, (state, action) => batchFileSchedulerError(state, action)),


  /** Create scheduler */
  on(BatchFileSchedulerActions.createBatchFileScheduler, (state, action) => updateAddBatchState(state, action)),

  on(BatchFileSchedulerActions.editBatchFileScheduler, (state, action) => updateAddBatchState(state, action)),

  on(BatchFileSchedulerActions.openBatchFileScheduler, (state, action) => {
    return {
      ...state, 
      schedulerEdit: action
    }
  }),


  on(BatchFileSchedulerActions.createBatchFileSchedulerSuccess, (state, action) =>  {
    return {
      ...state,
      schedulers: action.payload
    }
  }),

  on(BatchFileSchedulerActions.createBatchFileSchedulerFailure, (state, action) => batchFileSchedulerError(state, action)),


  /**Delete scheduler */
  on(BatchFileSchedulerActions.deleteBatchFileScheduler, (state) => getState(state)),

  /**Delete scheduler */
  on(BatchFileSchedulerActions.deleteBatchFileSchedulerSuccess, (state, action) => {

    const updatedData = state.schedulers.filter((item: any) => {
      /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
      return item.schedulerId !== action.id
    })

    return {
      ...state,
      schedulers: updatedData
    }
  }),

  on(BatchFileSchedulerActions.deleteBatchFileSchedulerFailure, (state, action ) => batchFileSchedulerError(state, action)),


  //Load jobs
  on(BatchFileSchedulerActions.loadJobs, (state) => getState(state)),

  on(BatchFileSchedulerActions.loadJobsSuccess, (state, action) =>  {
    return {
      ...state,
      jobs: action.jobs
    }
  }),


  on(BatchFileSchedulerActions.loadJobsFailure, (state, action) => batchFileSchedulerError(state, action))


);

export function updateAddBatchState(state, action) {
  return {
    ...state, 
    schedulers: action.payload
  }
}

export function batchFileSchedulerError(state, action) {
  return {
    ...state,
    error: action.error
  }
}

export function getState(state) {
  return {
    ...state
  }
}