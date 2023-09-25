import { createAction, props } from '@ngrx/store';
import { DialogPopup } from '../../../../core/model/dialog-popup.model'

export const loadPopUpDetails = createAction(
  '[Dialog Popup] Load PopUp Details',
  props<{ id: string }>()
);

export const loadPopUpDetailsSuccess = createAction(
  '[Dialog Popup] Load PopUp Details Success',
  props<{ dialogPopup: DialogPopup }>()
);

export const loadPopUpDetailsFailure = createAction(
  '[Dialog Popup] Load PopUp Details Failure',
  props<{ error: any }>()
);