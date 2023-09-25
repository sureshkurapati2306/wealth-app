import { dialogPopupReducer, initialState } from './dialog-popup.reducer';
import * as DialogPopupActions from './dialog-popup.actions';

describe('DialogPopupReducer', () => {
  it('should set loading to true and error to null on loadPopUpDetails action', () => {
    const id = '123';
    const action = DialogPopupActions.loadPopUpDetails({ id });
    const newState = dialogPopupReducer(initialState, action);

    expect(newState.loading).toBe(true);
    expect(newState.error).toBe(null);
  });

  it('should update dialogPopup, set loading to false, and error to null on loadPopUpDetailsSuccess action', () => {
    const dialogPopup = {
      "detailsId": 1,
      "title": "Hello World new  change 637747724723",
      "subtitle": "23125467iyiuo89",
      "content": "3465789809097645223256580p98754333568980",
      "status": true,
      "category": "DASHBOARD_POPUP_IMAGE",
      "imageId": 10,
      "imageContent": null,
      "binaryImage": null
    };
    const action = DialogPopupActions.loadPopUpDetailsSuccess({ dialogPopup });
    const newState = dialogPopupReducer(initialState, action);

    expect(newState.dialogPopup).toBe(dialogPopup);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(null);
  });

  it('should set dialogPopup to null, set loading to false, and update error on loadPopUpDetailsFailure action', () => {
    const error = 'Test Error';
    const action = DialogPopupActions.loadPopUpDetailsFailure({ error });
    const newState = dialogPopupReducer(initialState, action);

    expect(newState.dialogPopup).toBe(null);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(error);
  });
});
