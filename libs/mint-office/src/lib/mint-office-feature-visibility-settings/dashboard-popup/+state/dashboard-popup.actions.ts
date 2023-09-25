import { createAction, props } from '@ngrx/store';
import { DashboardPopupUpload } from '../../../../lib/core/models/dashboard-popup.model';


export const loadDashboardPopup = createAction(
    '[API] Load DashboardPopupActions',
    props<{ loadDashboardPopupdata: DashboardPopupUpload }>()
);

export const loadDashboardPopupSuccess = createAction(
    '[API] Load Dashbaord Popup Success',
    props<{ data: DashboardPopupUpload[] }>()
);

export const loadDashboardPopupFailure = createAction(
    '[API] Load Dashbaord Popup Failure',
    props<{ error: any }>()
);