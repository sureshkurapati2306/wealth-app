
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';
import { Environment } from '../models/environment.model';
import { CsatQuestionnaire } from '../models/csat-report.model';

@Injectable({
  providedIn: 'root'
})
export class CsatReportService {

  readonly environment: Environment;
  constructor(
    private http: HttpClient,
    @Inject('environment') environment: Environment) {
    this.environment = environment;
  }

  updateCsatQuestionnaireDetails(CsatQuestionnaireData): Observable<CsatQuestionnaire[]> {
    return this.http.put<CsatQuestionnaire[]>(`${this.environment.apiUrl}wealth/survey-config/1`, CsatQuestionnaireData)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return throwError(error);
        })
      );
  }

  getCsatQuestionnaireDetails(id: string): Observable<CsatQuestionnaire> {
    return this.http.get<any>(`${this.environment.apiUrl}wealth/survey-config/${id}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return throwError(error);
        })
      );
  }

  getReportData(startDate: string, endDate: string): Observable<any> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);
    return this.http.get(this.environment.apiUrl + 'wealth/csa-survey/report', { params, responseType: 'text' })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return throwError(error);
        })
      );
  }
}
