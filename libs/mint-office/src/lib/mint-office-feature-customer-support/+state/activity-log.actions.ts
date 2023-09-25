import { createAction, props } from '@ngrx/store';
import { CustomerActivityLog, CustomerActivityLogChannel, CustomerActivityLogModules, CustomerActivityLogSearchFields } from '../../core/models/customer-activity.model';

export const loadActivityLogs = createAction(
  '[API] Load ActivityLogs',
  props<{ searchParams: CustomerActivityLogSearchFields }>()
);

export const loadActivityLogsSuccess = createAction(
  '[API] Load ActivityLogs Success',
  props<{ data: CustomerActivityLog[] }>()
);

export const loadActivityLogsFailure = createAction(
  '[API] Load ActivityLogs Failure',
  props<{ error: string }>()
);

export const resetActivityLogs = createAction(
  '[Customer Detail] Reset Activity Logs'
);

export const loadActivityLogModules = createAction(
  '[API] Load ActivityLogModules'
);

export const loadActivityLogModulesSuccess = createAction(
  '[API] Load ActivityLogModules Success',
  props<{ data: CustomerActivityLogModules[] }>()
);

export const loadActivityLogModulesFailure = createAction(
  '[API] Load ActivityLogModules Failure',
  props<{ error: string }>()
);

export const loadActivityLogChannel = createAction(
  '[API] Load ActivityLogChannel'
);

export const loadActivityLogChannelSuccess = createAction(
  '[API] Load ActivityLogChannel Success',
  props<{ data: CustomerActivityLogChannel[] }>()
);

export const loadActivityLogChannelFailure = createAction(
  '[API] Load ActivityLogChannel Failure',
  props<{ error: string }>()
);
