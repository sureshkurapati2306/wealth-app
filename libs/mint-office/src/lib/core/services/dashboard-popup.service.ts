import { HttpClient, HttpErrorResponse  } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, delay } from 'rxjs/operators';
import { Environment } from '../models/environment.model';
import { DashboardPopupUpload } from '../models/dashboard-popup.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardPopupService {
  readonly environment: Environment;
  constructor(
    private http: HttpClient,
    @Inject('environment') environment: Environment) {
    this.environment = environment;
  }

  updatePopUpDetails(uploadDate): Observable<DashboardPopupUpload[]> {
     return this.http.put<DashboardPopupUpload[]>(`${this.environment.apiUrl}wealth/pop-up`, uploadDate)
      .pipe(
        delay(1000),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return throwError(error);
        })
      );
  }
  getPopUpDetails(id: string): Observable<any>{
    return this.http.get<any>(`${this.environment.apiUrl}wealth/pop-up/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }
  
}
