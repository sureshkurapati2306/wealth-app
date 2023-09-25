import * as fromActivityLog from './activity-log.reducer';
import { selectActivityLogState } from './activity-log.selectors';

describe('ActivityLog Selectors', () => {
  it('should select the feature state', () => {
    const result = selectActivityLogState({
      [fromActivityLog.activityLogFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
