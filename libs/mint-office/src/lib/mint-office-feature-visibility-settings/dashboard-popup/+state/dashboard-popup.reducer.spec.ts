import { dashboardPopupReducer, initialState, DashboardPopupState } from './dashboard-popup.reducer';
import * as DashboardPopupActions from './dashboard-popup.actions';
import { DashboardPopupUpload } from '../../../../lib/core/models/dashboard-popup.model';

describe('DashboardPopupReducer', () => {
  const mockData: DashboardPopupUpload[] = [
    {
      title: 'Test Title',
      subtitle: 'Test Subtitle',
      content: 'Test Content',
      status: true,
      imageContent: 'Test Image Content'
    }
  ];

  it('should return the initial state', () => {
    const action = {} as any;
    const state = dashboardPopupReducer(undefined, action);

    expect(state).toBe(initialState);
  });

  it('should handle loadDashboardPopup action', () => {
    const action = DashboardPopupActions.loadDashboardPopup({ loadDashboardPopupdata: mockData[0] });
    const state = dashboardPopupReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      loading: true,
      error: null
    });
  });

  it('should handle loadDashboardPopupSuccess action', () => {
    const action = DashboardPopupActions.loadDashboardPopupSuccess({ data: mockData });
    const state = dashboardPopupReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      data: mockData,
      loading: false
    });
  });

  it('should handle loadDashboardPopupFailure action', () => {
    const error = new Error('Test Error');
    const action = DashboardPopupActions.loadDashboardPopupFailure({ error });
    const state = dashboardPopupReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      error,
      loading: false
    });
  });
});
