import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BatchFileScheduler } from '../models/batchfilescheduler.model';
import { Job } from '../models/job.model';
import { Environment } from '../models/environment.model';
import { Observable, throwError } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BatchFileSchedulerService {

  readonly environment: Environment;
  private schedulerAPIURL: string;
  private editSchedulerAPI: string;
  private jobAPIURL: string;

  constructor(
    @Inject('environment') environment: Environment,
    private http: HttpClient
  ) {
    this.environment = environment;
    this.schedulerAPIURL = this.environment.apiUrl + 'validate/schedulers';
    this.jobAPIURL = this.environment.apiUrl + 'wealth/job-details';
    this.editSchedulerAPI = this.environment.apiUrl + 'validate/schedulers/scheduler-id/'
  }

  getSchedulers(): Observable<BatchFileScheduler> {
    return this.http
      .get<BatchFileScheduler>(this.schedulerAPIURL)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }
  
  deleteScheduler(id: number) {
    return this.http
      .delete(`${this.schedulerAPIURL}/${id}`)
      .pipe(
        delay(2000),
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  createScheduler(scheduler: BatchFileScheduler): Observable<BatchFileScheduler> {
    return this
      .http
      .post<BatchFileScheduler>(this.schedulerAPIURL, scheduler)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      )
  }

  editScheduler(scheduler: BatchFileScheduler, schedulerId): Observable<BatchFileScheduler> {
    return this
      .http
      .put<BatchFileScheduler>(this.editSchedulerAPI + schedulerId, scheduler)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      )
  }

  //jobs
  getJobs(): Observable<Job> {
    return this.http
      .get<Job>(this.jobAPIURL)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

}
