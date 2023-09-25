import { createAction, props } from '@ngrx/store';
import { SmsDeliveryLog, UnitTrustActivity } from '../../core/models/customer-activity.model';

export const loadUtActivity = createAction(
  '[API] Load UtActivity',
  props<{ referenceNo: string }>()
);

export const loadUtActivitySuccess = createAction(
  '[API] Load UtActivity Success',
  props<{ data: UnitTrustActivity[] }>()
);

export const loadUtActivityFailure = createAction(
  '[API] Load UtActivity Failure',
  props<{ error: string }>()
);

export const loadUtActivitySMSDelivery = createAction(
  '[API] Load loadUtActivitySMSDelivery',
  props<{ referenceNo: string }>()
);

export const loadUtActivitySMSDeliverySuccess = createAction(
  '[API] Load activitySMSDelivery Success',
  props<{ data: SmsDeliveryLog[] }>()
);

export const resetUtActicity = createAction(
  '[API] Reset UtActivity',
);
