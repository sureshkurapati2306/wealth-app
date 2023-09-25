import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { Environment } from '../models/environment.model';
import { UnitTrustSearchFields } from '../models/unit-trust-transactions.model';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class SmsDeliveryLogService {

  readonly environment: Environment;

  constructor(
    @Inject('environment') environment: Environment,
    private http: HttpClient,
  ) { 
    this.environment = environment;
  }

  searchRecords(searchParamsObject: UnitTrustSearchFields): Observable<any[]> {

    const queryStrObj = {
      ...searchParamsObject.startDate && { StartDate: moment(searchParamsObject.startDate).format("YYYY-MM-DDT00:00:00") },
      ...searchParamsObject.endDate && { EndDate: moment(searchParamsObject.endDate).format("YYYY-MM-DDT23:59:59")},

      ...(searchParamsObject.status && searchParamsObject.status != 'All') && { status: searchParamsObject.status },
      ...searchParamsObject.utAccNumber && { accountNo: searchParamsObject.utAccNumber },
    };

    const queryString = new HttpParams({ fromObject: queryStrObj }).toString();

    return this.http.get<any[]>(`${this.environment.apiUrl}otp/sms-delivery-logs/search?${queryString}`)
      .pipe(
        delay(1000),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return throwError(error);
        })
      );

  }
}

