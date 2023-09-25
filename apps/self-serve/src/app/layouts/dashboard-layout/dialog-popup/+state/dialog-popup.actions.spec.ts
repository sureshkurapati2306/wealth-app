import { loadPopUpDetails, loadPopUpDetailsSuccess, loadPopUpDetailsFailure } from './dialog-popup.actions';

describe('Dialog Popup Actions', () => {
  it('should create the loadPopUpDetails action', () => {
    const id = '123';
    const action = loadPopUpDetails({ id });

    expect(action.type).toEqual('[Dialog Popup] Load PopUp Details');
    expect(action.id).toEqual(id);
  });

  it('should create the loadPopUpDetailsSuccess action', () => {
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
    const action = loadPopUpDetailsSuccess({ dialogPopup });

    expect(action.type).toEqual('[Dialog Popup] Load PopUp Details Success');
    expect(action.dialogPopup).toEqual(dialogPopup);
  });

  it('should create the loadPopUpDetailsFailure action', () => {
    const error = 'Test Error';
    const action = loadPopUpDetailsFailure({ error });

    expect(action.type).toEqual('[Dialog Popup] Load PopUp Details Failure');
    expect(action.error).toEqual(error);
  });
});
