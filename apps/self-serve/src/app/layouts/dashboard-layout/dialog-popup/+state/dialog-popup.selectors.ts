import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DialogPopupTransactionFeatureKey, DialogPopupState } from './dialog-popup.reducer'

const selectDialogPopupState = createFeatureSelector<DialogPopupState>(
  DialogPopupTransactionFeatureKey,
);

export const selectDialogPopup = createSelector(selectDialogPopupState, (state) => {
  return state.dialogPopup;
});

export {DialogPopupTransactionFeatureKey}

