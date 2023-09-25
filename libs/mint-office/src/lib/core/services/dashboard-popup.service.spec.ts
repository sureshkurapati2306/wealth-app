import { HttpClient, HttpErrorResponse, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { throwError, of } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { DashboardPopupService } from './dashboard-popup.service';

describe('DashboardPopupService', () => {
  let service: DashboardPopupService;
  let httpMock: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DashboardPopupService,
        HttpClient,
        HttpHandler,
        { provide: 'environment', useValue: {} }
      ]
    });
    service = TestBed.inject(DashboardPopupService);
    httpMock = TestBed.inject(HttpClient);
  });

  it('should updatePopUpDetails successfully', (done) => {
    const mockResponse: any[] = []; 
    const uploadDate = {}; 

    jest.spyOn(httpMock, 'put').mockReturnValueOnce(of(mockResponse).pipe(delay(1000)));

    service.updatePopUpDetails(uploadDate).subscribe((response) => {
      expect(response).toEqual(mockResponse);
      done();
    });

    expect(httpMock.put).toHaveBeenCalledWith(`${service.environment.apiUrl}/wealth/pop-up`, uploadDate);
  });

  it('should handle error in updatePopUpDetails', (done) => {
    const mockError = new HttpErrorResponse({ error: 'Mock error' });
    const uploadDate = {};

    jest.spyOn(httpMock, 'put').mockReturnValueOnce(throwError(mockError));

    service.updatePopUpDetails(uploadDate).subscribe(
      () => {
        expect(true).toBe(false);
        done();
      },
      (error) => {
        expect(error).toEqual(mockError);
        done();
      }
    );

    expect(httpMock.put).toHaveBeenCalledWith(`${service.environment.apiUrl}/wealth/pop-up`, uploadDate);
  });

  it('should getPopUpDetails successfully', (done) => {
    const mockResponse = {};
    const id = 'mockId';

    jest.spyOn(httpMock, 'get').mockReturnValueOnce(of(mockResponse));

    service.getPopUpDetails(id).subscribe((response) => {
      expect(response).toEqual(mockResponse);
      done();
    });

    expect(httpMock.get).toHaveBeenCalledWith(`${service.environment.apiUrl}/wealth/pop-up/${id}`);
  });

  it('should handle error in getPopUpDetails', (done) => {
    const mockError = new HttpErrorResponse({ error: 'Mock error' });
    const id = 'mockId';

    jest.spyOn(httpMock, 'get').mockReturnValueOnce(throwError(mockError));

    service.getPopUpDetails(id).subscribe(
      () => {
        expect(true).toBe(false); 
        done();
      },
      (error) => {
        expect(error).toEqual(mockError);
        done();
      }
    );

    expect(httpMock.get).toHaveBeenCalledWith(`${service.environment.apiUrl}/wealth/pop-up/${id}`);
  });
});
