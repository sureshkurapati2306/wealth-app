import { TestBed } from '@angular/core/testing';

import { BatchFileSchedulerService } from './batch-file-scheduler.service';

import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BatchFileScheduler } from '../models/batchfilescheduler.model';
import { of, throwError } from 'rxjs';
import { Environment } from '../models/environment.model'

describe('BatchFileSchedulerService', () => {
  let service: BatchFileSchedulerService;
  const apiUrl = 'https://wld.devapps.tcjteam.tech/api/';
  const production = false;
  const environment: Environment = {production,apiUrl}
  let httpClient: HttpClient;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [BatchFileSchedulerService,
      {provide: 'environment', useValue: environment}
      ]
    });
    service = TestBed.inject(BatchFileSchedulerService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Testing: Create scheduler', () => {

    it('should create new scheduler', done => {

      const mockScheduler: BatchFileScheduler = {
        schedulerName: 'Jest Test',
        schedulerDate: '03 Mar 2022 04:00PM',
        endDate: '04 Mar 2022 04:00PM',
        schedulerType: 'Hourly',
        schedulerStatus: 'U',
        schedulerOccurrence: 'O',
        jobId: 1000,
      }

      const response = {
        message: 'You have saved the changes successfully!'
      }

      const httpMock = {
        post: jest.fn().mockReturnValue(of(response))
      }

      const serviceMock = new BatchFileSchedulerService(environment, httpMock as any);

      serviceMock.createScheduler(mockScheduler)
        .subscribe(data => {
          expect(httpMock.post).toBeDefined();
          expect(httpMock.post).toHaveBeenCalled();
          expect(data).toEqual(response);
          done();
        })
    });
  })

  describe('Testing: Delete a scheduler', () => {
    it('should delete a scheduler', done => {
      const schedulerId = 123;

      const response = {
        message: 'You have deleted a record successfully!'
      }

      const httpMock = {
        delete: jest.fn().mockReturnValue(of(response))
      }

      const serviceMock = new BatchFileSchedulerService(environment, httpMock as any);

      serviceMock.deleteScheduler(schedulerId)
        .subscribe(data => {
          expect(httpMock.delete).toBeDefined();
          expect(httpMock.delete).toHaveBeenCalled();
          expect(data).toEqual(response);
          done();
        })

    })
  })

  describe('Testing: Get all jobs', () => {
    it('should get all jobs', done => {
      const response = {
        message: 'Success!'
      }
      const httpMock = {
        get: jest.fn().mockReturnValue(of(response))
      }
      const serviceMock = new BatchFileSchedulerService(environment, httpMock as any);

      serviceMock.getJobs()
        .subscribe(data => {
          expect(httpMock.get).toBeDefined();
          expect(httpMock.get).toHaveBeenCalled();
          expect(data).toEqual(response);
          done();
        })

    })
  })


  describe('Testing: Get all Schedulers', () => {
    it('should get all schedulers', done => {
      const response = {
        message: 'Success!'
      }
      const httpMock = {
        get: jest.fn().mockReturnValue(of(response))
      }
      const serviceMock = new BatchFileSchedulerService(environment, httpMock as any);

      serviceMock.getSchedulers()
        .subscribe(data => {
          expect(httpMock.get).toBeDefined();
          expect(httpMock.get).toHaveBeenCalled();
          expect(data).toEqual(response);
          done();
        })

    })
  });


  it('should call getSchedulers() error path', (done) => {

    const errorResponse = new HttpErrorResponse({
      error: 'Mock 404 error',
    });

    jest.spyOn(httpClient, 'get').mockReturnValue(throwError(errorResponse));

    service.getSchedulers()
      .subscribe(
        () => { done.fail('') },
        (error: HttpErrorResponse) => {
          expect(error.error).toBe('Mock 404 error');
          done();
        });
  });

  it('should call createScheduler() error path', (done) => {

    const errorResponse: any = new HttpErrorResponse({
      error: 'Mock 404 error',
    });

    jest.spyOn(httpClient, 'post').mockReturnValue(throwError(errorResponse));

    service.createScheduler(errorResponse)
      .subscribe(
        () => { done.fail('') },
        (error: HttpErrorResponse) => {
          expect(error.error).toBe('Mock 404 error');
          done();
        });
  });

  it('should call deleteScheduler() error path', (done) => {

    const errorResponse: any = new HttpErrorResponse({
      error: 'Mock 404 error',
    });

    jest.spyOn(httpClient, 'delete').mockReturnValue(throwError(errorResponse));

    service.deleteScheduler(errorResponse)
      .subscribe(
        () => { done.fail('') },
        (error: HttpErrorResponse) => {
          expect(error.error).toBe('Mock 404 error');
          done();
        });
  });
  it('should call getJob() error path', (done) => {

    const errorResponse: any = new HttpErrorResponse({
      error: 'Mock 404 error',
    });

    jest.spyOn(httpClient, 'get').mockReturnValue(throwError(errorResponse));

    service.getJobs()
      .subscribe(
        () => { done.fail('') },
        (error: HttpErrorResponse) => {
          expect(error.error).toBe('Mock 404 error');
          done();
        });
  });
});
