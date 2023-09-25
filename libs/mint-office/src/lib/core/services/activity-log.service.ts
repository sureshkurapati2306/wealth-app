import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Environment } from '../models/environment.model';
import { CustomerActivityLog, CustomerActivityLogChannel, CustomerActivityLogModules, CustomerActivityLogSearchFields, SmsDeliveryLog, UnitTrustActivity } from '../models/customer-activity.model';
// import { LocalDateToUtcPipe } from '../pipes/local-date-to-utc.pipe';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ActivityLogService {

  readonly environment: Environment;
  private logSearchApiUrl: string;
  private utActivtyApiUrl: string;
  private smsDeliveryApiUrl: string;
  private activityModulesApiUrl: string;
  activityChannelApiUrl: string;

  constructor(
    @Inject('environment') environment: Environment,
    private http: HttpClient,
    // private localDateToUtcPipe: LocalDateToUtcPipe
  ) { 
    this.environment = environment;
    this.logSearchApiUrl = this.environment.apiUrl + 'validate/cust-support/activity-search';
    this.utActivtyApiUrl = this.environment.apiUrl + 'validate/ut-activity-search';
    this.smsDeliveryApiUrl = this.environment.apiUrl + 'otp/sms-delivery-logs';
    this.activityModulesApiUrl = this.environment.apiUrl + 'wealth/modules';
    this.activityChannelApiUrl = this.environment.apiUrl + 'wealth/channels';
  }

  searchRecords(searchParamsObject: CustomerActivityLogSearchFields, clientId: string): Observable<CustomerActivityLog[]> {

    //prep the search query string
    const queryStrObj = {
      clientId,
      ...searchParamsObject.startDate && { StartDate: moment(searchParamsObject.startDate).format("YYYY-MM-DDT00:00:00")},
      ...searchParamsObject.endDate && { EndDate: moment(searchParamsObject.endDate).format("YYYY-MM-DDT23:59:59")},
      ...searchParamsObject.modules.length && { module: searchParamsObject.modules.join(',') },
      ...searchParamsObject.channels.length && { channel: searchParamsObject.channels.join(',') },
    };
    const queryString = new HttpParams({ fromObject: queryStrObj }).toString();

    return this.http.get<CustomerActivityLog[]>(`${this.logSearchApiUrl}/?${queryString}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return throwError(error);
        })
      );

  }

  getUtActivityRecord(referenceNo: string): Observable<UnitTrustActivity[]> {

    //prep the search query string
    const queryStrObj = {
      ReferenceNo: referenceNo
    };

    const queryString = new HttpParams({ fromObject: queryStrObj }).toString();

    return this.http.get<UnitTrustActivity[]>(`${this.utActivtyApiUrl}/?${queryString}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return throwError(error);
        })
      );

  }

  getSMSDeliveryRecord(referenceNo: string): Observable<SmsDeliveryLog[]> {

    return this.http.get<SmsDeliveryLog[]>(`${this.smsDeliveryApiUrl}/${referenceNo}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return throwError(error);
        })
      );

  }

  getActivityLogModule(): Observable<CustomerActivityLogModules[]> {

    return this.http.get<CustomerActivityLogModules[]>(`${this.activityModulesApiUrl}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return throwError(error);
        })
      );

  }

  getActivityLogChannel(): Observable<CustomerActivityLogChannel[]> {

    return this.http.get<CustomerActivityLogChannel[]>(`${this.activityChannelApiUrl}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return throwError(error);
        })
      );

  }

}
