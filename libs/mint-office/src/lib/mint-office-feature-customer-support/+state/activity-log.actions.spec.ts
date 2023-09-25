import * as fromActivityLog from './activity-log.actions';

describe('loadActivityLogs', () => {
  it('should return an action', () => {
    expect(fromActivityLog.loadActivityLogs({
      searchParams: {}
    }).type).toBe('[API] Load ActivityLogs');
  });
});
