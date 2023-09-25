import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { FundSwitchService } from './fund-switch.service';
import { fundListMockData } from './mock/data';
import { of, throwError } from 'rxjs';

describe('FundSwitchService', () => {
  let service: FundSwitchService;
  let httpClient: HttpClient;

  beforeEach(() => {
      TestBed.configureTestingModule({
          imports: [HttpClientTestingModule],
      });
      service = TestBed.inject(FundSwitchService);
      httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getListOfSwitchToFunds() success path', (done) => {
    jest.spyOn(httpClient, 'get').mockReturnValue(of(fundListMockData));

    service
      .getListOfSwitchToFunds()
        .subscribe((data) => {
          expect(data).toBe(fundListMockData);
          done();
        });
  });

  it('should call getListOfSwitchToFunds(managerCode) success path', (done) => {
    jest.spyOn(httpClient, 'get').mockReturnValue(of(fundListMockData));

    service
      .getListOfSwitchToFunds('RHB')
        .subscribe((data) => {
          expect(data).toBe(fundListMockData);
          done();
        });
  });

  it('should call getListOfSwitchToFunds() error path', (done) => {
    const errorResponse = new HttpErrorResponse({
      error: 'Mock 404 error',
      status: 404,
    });

    jest.spyOn(httpClient, 'get').mockReturnValue(throwError(errorResponse));

    service
      .getListOfSwitchToFunds()
        .subscribe(
          () => {
            done.fail('');
          },
          (error: HttpErrorResponse) => {
            expect(error.error).toBe('Mock 404 error');
            expect(error.status).toBe(404);
            done();
          },
        );
  });

});
