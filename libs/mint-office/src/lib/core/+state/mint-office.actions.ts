import { createAction, props } from '@ngrx/store';

export const updateCimbFooterClass = createAction(
  '[Layout] Update CIMB Footer Class',
  props<{ className: string }>()
);
