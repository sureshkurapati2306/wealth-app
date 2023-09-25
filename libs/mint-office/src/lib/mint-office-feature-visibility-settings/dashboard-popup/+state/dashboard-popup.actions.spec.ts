import { createAction } from '@ngrx/store';
import { DashboardPopupUpload } from '../../../../lib/core/models/dashboard-popup.model';

describe('DashboardPopupActions', () => {
  describe('loadDashboardPopup', () => {
    it('should create an action with the provided data', () => {
      const data: DashboardPopupUpload = {
        title: 'This is for the pop up title placeholder queuesfo\n',
        subtitle: 'This is for the secondary subtitle placeholder queues for testing queues for testing queues for test',
        content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu',
        status: true,
        imageContent: '928739127398217398173981723hdgajgdgdhjgajdgasa',
      };

      const expectedAction = {
        type: '[API] Load DashboardPopupActions',
        loadDashboardPopupdata: data,
      };

      const action = {
        type: '[API] Load DashboardPopupActions',
        loadDashboardPopupdata: data,
      };

      expect(action).toEqual(expectedAction);
    });
  });

  describe('loadDashboardPopupSuccess', () => {
    it('should create an action with the provided data', () => {
      const data: any[] = [
        {
          detailsId: '1',
          title: 'This is for the pop up title placeholder queuesfo\n',
          subtitle: 'This is for the secondary subtitle placeholder queues for testing queues for testing queues for test',
          content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu',
          status: true,
          image: {
            id: 10,
            imageName: null,
            category: 'DASHBOARD_POPUP_IMAGE',
            imageData: 'ksdkajhdkjahds87129871982732',
          },
        },
      ];

      const expectedAction = {
        type: '[API] Load Dashbaord Popup Success',
        data,
      };

      const action = {
        type: '[API] Load Dashbaord Popup Success',
        data,
      };

      expect(action).toEqual(expectedAction);
    });
  });

  describe('loadDashboardPopupFailure', () => {
    it('should create an action with the provided error', () => {
      const error = {};

      const expectedAction = {
        type: '[API] Load Dashbaord Popup Failure',
        error,
      };

      const action = {
        type: '[API] Load Dashbaord Popup Failure',
        error,
      };

      expect(action).toEqual(expectedAction);
    });
  });
});
