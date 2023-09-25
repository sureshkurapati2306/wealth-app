import { Injectable } from '@angular/core';
import { HttpService } from '@cimb/core';
import { environment } from '@env/self-serve/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CSATSurveyPayload } from '../../model/csat-survey.model';

@Injectable({
  providedIn: 'root'
})
export class CsatSurveyService {

  constructor(private http: HttpService) { }

  getCSATSurvey(): Observable<any> {
    const endpoint = environment.apiUrl;
    return this.http
      .get(endpoint, environment.wealth + `/csa-survey?surveyConfigId=1`)
      .pipe(map((response) => response));
  }

  submitCSATSurvey(param: CSATSurveyPayload): Observable<any> {
    const endpoint = environment.apiUrl;
    return this.http.post(endpoint + environment.wealth, `/csa-survey`, param)
      .pipe(map((response) => response));
  }
}
