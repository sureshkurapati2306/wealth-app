import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PortfolioRecommendationService {

  constructor(private http: HttpClient) {
  }

  getPortfolioData(riskProfileName: string) {
    if(riskProfileName) {
      return this.http
      .get(environment.apiUrl + environment.emanager + '/fund/v2/getInvestmentFundList/' + riskProfileName)
      .pipe(
        retry(2),
        catchError((error: HttpErrorResponse) => {
            return throwError(error);
        }),
      )
    }
    
  }
}
