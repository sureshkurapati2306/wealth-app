import { createAction, props } from '@ngrx/store';
import { BatchFileScheduler } from '../../core/models/batchfilescheduler.model';
import { Job } from '../../core/models/job.model';

export const loadBatchFileSchedulers = createAction(
  '[BatchFileScheduler] Load BatchFileSchedulers',
  
);

export const loadBatchFileSchedulersSuccess = createAction(
  '[BatchFileScheduler] Load BatchFileSchedulers Success',
  props<{ data: BatchFileScheduler[] }>()
);

export const loadBatchFileSchedulersFailure = createAction(
  '[BatchFileScheduler] Load BatchFileSchedulers Failure',
  props<{ error: any }>()
);


//create scheduler
export const createBatchFileScheduler = createAction(
  '[BatchFileScheduler] Create BatchFileSchedulers',
  //(scheduler: BatchFileScheduler) => ({scheduler})
  props<{ payload: BatchFileScheduler[] }>()
);

export const editBatchFileScheduler = createAction(
  '[BatchFileScheduler] Edit BatchFileSchedulers',
  //(scheduler: BatchFileScheduler) => ({scheduler})
  props<{ payload: BatchFileScheduler[], schedulerId}>()
);

export const editBatchFileSchedulerSuccess = createAction(
  '[BatchFileScheduler] Edit BatchFileSchedulers Success',
  //(scheduler: BatchFileScheduler) => ({scheduler})
  props<{ payload: BatchFileScheduler[], schedulerId}>()
);

export const editBatchFileSchedulerFailure = createAction(
  '[BatchFileScheduler] Edit BatchFileSchedulers Failure',
  //(scheduler: BatchFileScheduler) => ({scheduler})
  props<{ error: any}>()
);

export const openBatchFileScheduler = createAction(
  '[BatchFileScheduler] Open BatchFileSchedulers',
  //(scheduler: BatchFileScheduler) => ({scheduler})
  props<{ payload: any}>()
);

export const createBatchFileSchedulerSuccess = createAction(
  '[BatchFileScheduler] Create BatchFileSchedulers Success',
  //(scheduler: BatchFileScheduler) => ({scheduler})
  props<{ payload: BatchFileScheduler[] }>()
);

export const createBatchFileSchedulerFailure = createAction(
  '[BatchFileScheduler] Create BatchFileSchedulers Failure',
  props<{ error: any }>()
);


//delete schedulers
export const deleteBatchFileScheduler = createAction(
  '[BatchFileScheduler] Delete BatchFileSchedulers',
  //(id: number) => ({id})
  props<{ id: number }>()
);

export const deleteBatchFileSchedulerSuccess = createAction(
  '[BatchFileScheduler] Delete BatchFileSchedulers Success',
  //(id: number) => ({id})
  props<{ id: number }>()
);

export const deleteBatchFileSchedulerFailure = createAction(
  '[BatchFileScheduler] Delete BatchFileSchedulers Failure',
  props<{ error: any }>()
);


//jobs
export const loadJobs = createAction(
  '[Jobs] Load Jobs'
);

export const loadJobsSuccess = createAction(
  '[Jobs] Load Load Jobs Success',
  //(jobs: ReadonlyArray<Job>) => ({ jobs })
  props<{ jobs: Job[] }>()
);

export const loadJobsFailure = createAction(
  '[Jobs] Load Jobs Failure',
  props<{ error: any }>()
);

