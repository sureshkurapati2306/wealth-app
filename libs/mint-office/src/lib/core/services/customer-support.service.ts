import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Environment } from '../models/environment.model';
import { Customer, CustomerSearchFields } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerSupportService {

  readonly environment: Environment;
  private csSearchApiUrl: string;

  constructor(
    @Inject('environment') environment: Environment,
    private http: HttpClient,
  ) { 
    this.environment = environment;
    this.csSearchApiUrl = this.environment.apiUrl + 'validate/cust-support/customer-search';
  }

  searchRecords(searchParamsObject: CustomerSearchFields): Observable<Customer[]> {

    //prep the search query string
    const queryStrObj = {
      ...searchParamsObject.fullName && { accountName: searchParamsObject.fullName },
      ...searchParamsObject.idNumber && { clientId: searchParamsObject.idNumber },
      ...searchParamsObject.cifNumber && { cifNo: searchParamsObject.cifNumber },
    };

    const queryString = new HttpParams({ fromObject: queryStrObj }).toString();

    return this.http.get<Customer[]>(`${this.csSearchApiUrl}/?${queryString}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return throwError(error);
        })
      );

  }

}
