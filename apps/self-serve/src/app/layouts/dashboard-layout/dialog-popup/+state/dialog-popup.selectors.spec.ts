import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectDialogPopup, DialogPopupTransactionFeatureKey } from './dialog-popup.selectors';
import { DialogPopupState } from './dialog-popup.reducer';

describe('DialogPopupSelectors', () => {
  const mockState: DialogPopupState = {
    dialogPopup: 'Sample Dialog',
    loading: false,
    error: null,
  };

  const mockRootState = {
    [DialogPopupTransactionFeatureKey]: mockState,
  };

  const selectMockDialogPopupState = createFeatureSelector<DialogPopupState>(
    DialogPopupTransactionFeatureKey
  );

  it('should select the dialogPopup from the state', () => {
    const selectedDialogPopup = selectDialogPopup.projector(
      selectMockDialogPopupState(mockRootState)
    );

    expect(selectedDialogPopup).toEqual('Sample Dialog');
  });
});
