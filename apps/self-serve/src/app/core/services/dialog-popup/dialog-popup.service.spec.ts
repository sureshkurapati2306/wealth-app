import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { DialogPopupService } from './dialog-popup.service';

describe('DialogPopupService', () => {
  let service: DialogPopupService;
  let httpMock: HttpClient;

  beforeEach(() => {
    httpMock = {
      get: jest.fn()
    } as unknown as HttpClient;

    service = new DialogPopupService(httpMock);
  });

  it('should handle successful API response', () => {
    const popupId = '123';
    const response = { popupData: 'Some data' };

    jest.spyOn(httpMock, 'get').mockReturnValue(of(response));

    service.getPopUpDetails(popupId).subscribe(data => {
      expect(data).toEqual(response);
      expect(httpMock.get).toHaveBeenCalledWith(
        'your-api-url/pop-up/123'
      );
    });
  });

  it('should handle API error response', () => {
    const popupId = '123';
    const errorResponse = new HttpErrorResponse({ status: 500 });

    jest.spyOn(httpMock, 'get').mockReturnValue(throwError(errorResponse));

    service.getPopUpDetails(popupId).subscribe(
      error => {
        expect(error).toBe(errorResponse);
        expect(console.error).toHaveBeenCalledWith(errorResponse);
      }
    );
  });
});
