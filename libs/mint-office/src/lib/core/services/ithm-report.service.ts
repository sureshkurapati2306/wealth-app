import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Environment } from '../models/environment.model';

@Injectable({
  providedIn: 'root'
})
export class IthmReportService {
  readonly environment: Environment;

  constructor(
    @Inject('environment') environment: Environment,
    private http: HttpClient,
  ) { 
    this.environment = environment;
  }

  getReport(url: string) {
    return this.http
    .get(this.environment.apiUrl + url, { responseType: 'text' as any})
    .pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }
}
