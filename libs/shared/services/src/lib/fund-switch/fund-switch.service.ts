import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '@env/self-serve/environment';
import { SwitchFund, Fund } from '@cimb/shared/models';


@Injectable({
  providedIn: 'root'
})
export class FundSwitchService {
  private readonly apiUrl = environment.apiUrl;
  private getListOfFunds = this.apiUrl + environment.validate+'/fundDetails';
  private getListOfFundsByManagerCode = this.apiUrl + environment.validate+'/fundDetailsByManager/';
  private getListOfSwitchFUndetails = this.apiUrl + environment.emanager + '/fund/v2/getFundDetailByFundCode/'

  constructor(private http: HttpClient) {}

  getListOfSwitchToFunds(managerCode?: string): Observable<SwitchFund[]> {

    const endpoint = (managerCode)? this.getListOfFundsByManagerCode + managerCode : this.getListOfFunds;
    return this.http.get<SwitchFund[]>(endpoint).pipe(
      retry(2),
        catchError((error: HttpErrorResponse) => {
            console.error(error);
            return throwError(error);
        }),
      );

  }

  getSwitchFundDetailByFundCode(clientId: string, cifNumber: string, utAccNo: string, selectedSwitchFund: any): Observable<Fund[]> {
    const endpoint = `${this.getListOfSwitchFUndetails}${utAccNo}/${selectedSwitchFund}`
    return this.http.get<Fund[]>(endpoint).pipe( 
      retry(2),
      catchError((error: HttpErrorResponse) => {
          return throwError(error);
      }),
    );
  }

}
