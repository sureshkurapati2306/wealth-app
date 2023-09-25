import { createReducer, on } from '@ngrx/store';
import * as DialogPopupActions from './dialog-popup.actions';

export const DialogPopupTransactionFeatureKey = 'DialogPopupTransaction';

export interface DialogPopupState {
  dialogPopup: any
  loading: boolean;
  error: any;
}

export const initialState: DialogPopupState = {
  dialogPopup: [],
  loading: false,
  error: null,
};

export const dialogPopupReducer = createReducer(
  initialState,
  on(DialogPopupActions.loadPopUpDetails, (state) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }),
  on(DialogPopupActions.loadPopUpDetailsSuccess, (state, { dialogPopup }) => {
    return {
      ...state,
      dialogPopup,
      loading: false,
      error: null,
    };
  }),
  on(DialogPopupActions.loadPopUpDetailsFailure, (state, { error }) => {
    return {
      ...state,
      dialogPopup: null,
      loading: false,
      error,
    };
  })
);




