import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of, throwError } from 'rxjs';
import { DialogPopupEffects } from './dialog-popup.effects';
import * as DialogPopupActions from './dialog-popup.actions';
import { DialogPopupService } from '../../../../core/services/dialog-popup/dialog-popup.service';

describe('DialogPopupEffects', () => {
  let actions$: Observable<any>;
  let effects: DialogPopupEffects;
  let dialogPopupService: DialogPopupService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        DialogPopupEffects,
        DialogPopupService,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(DialogPopupEffects);
    dialogPopupService = TestBed.inject(DialogPopupService);
  });

  it('should dispatch loadPopUpDetailsSuccess action on successful API response', () => {
    const id = '123';
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

    jest.spyOn(dialogPopupService, 'getPopUpDetails').mockReturnValue(of(dialogPopup));

    actions$ = of(DialogPopupActions.loadPopUpDetails({ id }));

    effects.loadPopUpDetails$.subscribe(action => {
      expect(action).toEqual(DialogPopupActions.loadPopUpDetailsSuccess({ dialogPopup }));
      expect(dialogPopupService.getPopUpDetails).toHaveBeenCalledWith(id);
    });
  });

  it('should dispatch loadPopUpDetailsFailure action on API error response', () => {
    const id = '123';
    const error = 'Test Error';

    jest.spyOn(dialogPopupService, 'getPopUpDetails').mockReturnValue(throwError(error));

    actions$ = of(DialogPopupActions.loadPopUpDetails({ id }));

    effects.loadPopUpDetails$.subscribe(action => {
      expect(action).toEqual(DialogPopupActions.loadPopUpDetailsFailure({ error }));
      expect(dialogPopupService.getPopUpDetails).toHaveBeenCalledWith(id);
    });
  });
});
