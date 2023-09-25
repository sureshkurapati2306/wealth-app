import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromBatchFileScheduler from './batch-file-scheduler.reducer';

export const selectBatchFileSchedulerState = createFeatureSelector<fromBatchFileScheduler.State>(
  fromBatchFileScheduler.batchFileSchedulerFeatureKey
);

//scheduler
export const selectBatchFileSchedulerListing = createSelector(
  selectBatchFileSchedulerState,

  state => {
    return state.schedulers
  }
)

export const selectBatchFileSchedulerForEdit = createSelector(
  selectBatchFileSchedulerState,
  
  state => {
    return state.schedulerEdit
  }
)


//jobs
export const selectJobListing = createSelector(
  selectBatchFileSchedulerState,

  state => {
    return state.jobs
  }
)
