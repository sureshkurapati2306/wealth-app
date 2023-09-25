import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, delay } from 'rxjs/operators';
import { Environment } from '../models/environment.model';
import { UnitTrustTransaction } from '../models/unit-trust-transactions.model';

@Injectable({
  providedIn: 'root'
})
export class RefConfigService {
  readonly environment: Environment;

  constructor(
    private http: HttpClient,
    @Inject('environment') environment: Environment) { 
    this.environment = environment;
  }

  searchRecordsForRefConfig(): Observable<UnitTrustTransaction[]> {
    return this.http.get<UnitTrustTransaction[]>(`${this.environment.apiUrl}emanager/ref-config`)
      .pipe(
        delay(1000),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return throwError(error);
        })
      );

  }

  deleteRefConfigEntry(deleteItem): Observable<UnitTrustTransaction[]> {
    return this.http.delete<UnitTrustTransaction[]>(`${this.environment.apiUrl}emanager/ref-config/`+ deleteItem)
    .pipe(
      delay(1000),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
   }

   editRefConfigEntry(editItem): Observable<UnitTrustTransaction[]> {
    return this.http.put<UnitTrustTransaction[]>(`${this.environment.apiUrl}emanager/ref-config`, editItem)
    .pipe(
      delay(1000),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
   }

   addRefConfigEntry(addItem): Observable<UnitTrustTransaction[]> {
    return this.http.post<UnitTrustTransaction[]>(`${this.environment.apiUrl}emanager/ref-config`, addItem)
    .pipe(
      delay(1000),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
   }


}
