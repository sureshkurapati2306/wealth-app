import { createAction, props } from '@ngrx/store';
import { ClicksInfo } from './clicks.models';

export const loadClicks = createAction('[Clicks/API] Load Clicks', props<{ code: string }>());

export const loadClicksSuccess = createAction(
    '[Clicks/API] Load Clicks Success',
    props<{ clicks: ClicksInfo }>(),
);

export const loadClicksFailure = createAction(
    '[Clicks/API] Load Clicks Failure',
    props<{ error: any }>(),
);

export const updateNTPtoETP = createAction(
    '[API] Update NTP user to ETP',
    props<{ customerType: string }>()
  );
