import { selectDashboardPopupState, selectDashboardPopupData } from './dashboard-popup.selectors';
import { DashboardPopupState } from './dashboard-popup.reducer';

describe('DashboardPopupSelectors', () => {
  const mockState: DashboardPopupState = {
    data: [
      {
        title: 'Test Title',
        subtitle: 'Test Subtitle',
        content: 'Test Content',
        status: true,
        imageContent: 'Test Image Content'
      }
    ],
    loading: false,
    error: null
  };

  it('should select the dashboard popup state', () => {
    const selectedState = selectDashboardPopupState({
      dashboardPopupReducer: mockState
    });

    expect(selectedState).toBe(mockState);
  });

  it('should select the dashboard popup data', () => {
    const selectedData = selectDashboardPopupData({
      dashboardPopupReducer: mockState
    });

    expect(selectedData).toBe(mockState.data);
  });
});
