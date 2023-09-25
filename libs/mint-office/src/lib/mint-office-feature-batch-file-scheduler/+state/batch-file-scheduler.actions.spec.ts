import * as fromBatchFileScheduler from './batch-file-scheduler.actions';

describe('loadBatchFileSchedulers', () => {
  it('should return an action', () => {
    expect(fromBatchFileScheduler.loadBatchFileSchedulers().type).toBe('[BatchFileScheduler] Load BatchFileSchedulers');
  });
});
