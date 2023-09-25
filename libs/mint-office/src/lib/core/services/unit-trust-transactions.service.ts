import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { Environment } from '../models/environment.model';
import { UnitTrustRejectionFields, UnitTrustSearchFields, UnitTrustTransaction } from '../models/unit-trust-transactions.model';
import { LocalDateToUtcPipe } from '../pipes/local-date-to-utc.pipe';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class UnitTrustTransactionsService {

  readonly environment: Environment;

  constructor(
    @Inject('environment') environment: Environment,
    private http: HttpClient,
    private localDateToUtcPipe: LocalDateToUtcPipe
  ) { 
    this.environment = environment;
  }

  searchRecords(searchParamsObject: UnitTrustSearchFields): Observable<UnitTrustTransaction[]> {

    //prep the search query string
    const queryStrObj = {
      ...searchParamsObject.startDate && { startDate: moment(searchParamsObject.startDate).format("YYYY-MM-DDT00:00:00") },
      ...searchParamsObject.endDate && { endDate: moment(searchParamsObject.endDate).format("YYYY-MM-DDT23:59:59")},
      ...(searchParamsObject.status && searchParamsObject.status != 'All') && { status: searchParamsObject.status },
      ...searchParamsObject.utAccNumber?.length > 2 && { utAcctNbr: searchParamsObject.utAccNumber },
      ...searchParamsObject.customerName?.length > 2 && { custName: searchParamsObject.customerName },
      ...searchParamsObject.idNumber?.length > 2 && { id: searchParamsObject.idNumber },
    };

    // return this.http.get<UnitTrustTransaction[]>(`assets/back-office/mock-data/unit-trust-transactions.json?${queryString}`)
    return this.http.post<UnitTrustTransaction[]>(`${this.environment.apiUrl}validate/v2/ut-search`, queryStrObj)
      .pipe(
        delay(1000),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return throwError(error);
        })
      );

  }

  cancelUnitTrustTransactions(data: UnitTrustRejectionFields[]) {

    return this.http.put<UnitTrustTransaction[]>(`${this.environment.apiUrl}validate/ut-update`, data)
      .pipe(
        delay(1000),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return throwError(error);
        })
      );

  }

}
