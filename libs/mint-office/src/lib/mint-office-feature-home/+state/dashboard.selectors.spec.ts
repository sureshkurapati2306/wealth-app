import * as fromDashboard from './dashboard.reducer';
import { selectDashboardState } from './dashboard.selectors';

describe('Dashboard Selectors', () => {
  it('should select the feature state', () => {
    const result = selectDashboardState({
      [fromDashboard.dashboardFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
