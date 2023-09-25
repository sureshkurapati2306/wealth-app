import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { CustomerActivityLog } from '../models/customer-activity.model';
import { Environment } from '../models/environment.model';

import { ActivityLogService } from './activity-log.service';

const mockData: CustomerActivityLog[] = [];

describe('ActivityLogService', () => {
  let service: ActivityLogService;
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
    service = TestBed.inject(ActivityLogService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call searchRecords() success path', (done) => {

    jest.spyOn(httpClient, 'get').mockReturnValue(of(mockData));

    service.searchRecords({
      startDate: new Date(),
      endDate: new Date(),
      modules: [''],
      channels: ['']
    }).subscribe(data =>{
      expect(data).toBe(mockData);
      done();
    });

  });

  it('should call searchRecords() error path', (done) => {

    const errorResponse = new HttpErrorResponse({
      error: 'Mock 404 error',
      status: 404
    });

    jest.spyOn(httpClient, 'get').mockReturnValue(throwError(errorResponse));

    service.searchRecords({
      startDate: new Date(),
      endDate: new Date(),
      modules: [''],
      channels: ['']
    })
      .subscribe(
        () => { done.fail('') },
        (error: HttpErrorResponse) => {
          expect(error.error).toBe('Mock 404 error');
          expect(error.status).toBe(404);
          done();
        });
  });

  it('should call getUtActivityRecord() success path', (done) => {

    jest.spyOn(httpClient, 'get').mockReturnValue(of(mockData));

    service.getUtActivityRecord('ABC').subscribe(data =>{
      expect(data).toBe(mockData);
      done();
    });

  });

  it('should call getUtActivityRecord() error path', (done) => {

    const errorResponse = new HttpErrorResponse({
      error: 'Mock 404 error',
      status: 404
    });

    jest.spyOn(httpClient, 'get').mockReturnValue(throwError(errorResponse));

    service.getUtActivityRecord('ABC')
      .subscribe(
        () => { done.fail('') },
        (error: HttpErrorResponse) => {
          expect(error.error).toBe('Mock 404 error');
          expect(error.status).toBe(404);
          done();
        });
  });
  
});
