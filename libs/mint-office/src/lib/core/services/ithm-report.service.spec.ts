import { TestBed } from '@angular/core/testing';

import { IthmReportService } from './ithm-report.service';

import { Environment } from '../models/environment.model';

import { of, throwError } from 'rxjs';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

const mockData:string[] = [
  "01_USER NAME","02_DATE TIME","03_ERROR MESSAGE",
  "test1","2022-04-13T16:21:15.000","Correct username, No retail access",
  "test1","2022-04-13T16:26:49.000","Correct username, No retail access",
  "test1","2022-04-13T16:28:20.000","Correct username, No retail access",
  "test1","2022-04-13T16:28:26.000","Correct username, No retail access",
  "test1","2022-04-13T16:31:18.000","Correct username, No retail access",
  "test1","2022-04-18T10:08:50.000","Correct username, wrong password"
]


describe('IthmReportService', () => {
  let service: IthmReportService;
  let httpClient: HttpClient;
  const apiUrl = '/';
  const production = false;
  const environment: Environment = { production, apiUrl }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: 'environment', useValue: environment
        }
      ]
    });
    service = TestBed.inject(IthmReportService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call a call a download report on success path', (done) => {
    jest.spyOn(httpClient, 'get').mockReturnValue(of(mockData));

    service.getReport('authenticate/admin/report/violations').subscribe(data => {
      expect(data).toEqual(mockData);
      done();
    })
  });

  it('should call a call a download reporton a error path', (done) => {

    const errorResponse = new HttpErrorResponse({
      error: 'Mock 404 error',
      status: 404
    });

    jest.spyOn(httpClient, 'get').mockReturnValue(throwError(errorResponse));

    service.getReport('authenticate/admin/report/violations')
      .subscribe(
        () => { done.fail('') },
        (error: HttpErrorResponse) => {
          expect(error.error).toBe('Mock 404 error');
          expect(error.status).toBe(404);
          done();
        });
  });

});
