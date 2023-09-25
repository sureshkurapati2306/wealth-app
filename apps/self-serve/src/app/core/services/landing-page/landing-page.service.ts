import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LandingPageService {



  constructor(private http: HttpClient) { }

  getLandingPageStatus(pathVariable: any): Observable<any> {
    return this.http.get(environment.apiUrl + environment.wealth + '/v2/landing-page-status/client');
  }
  updateFatcaStatus(postData: any): Observable<any> {
    return this.http.patch(environment.apiUrl + environment.wealth +  '/landing-page-status/fatca', postData);
  }
  addNewLandingPageStatus(postData: any): Observable<any> {
    return this.http.post(environment.apiUrl + environment.wealth + '/v2/landing-page-status', postData);
  }

  updateLandingStatus(postData: any): Observable<any> {
    return this.http.patch(environment.apiUrl + environment.wealth+ '/landing-page-status/landing', postData);
  }

  updateRwsStatus(postData: any): Observable<any> {
    return this.http.patch(environment.apiUrl + environment.wealth + '/landing-page-status/rws', postData);
  }
  updateAccountStatus(postData: any): Observable<any> {
    return this.http.patch(environment.apiUrl + environment.wealth + '/landing-page-status/account', postData);
  }
  updateInvestmentStatus(postData: any): Observable<any> {
    return this.http.patch(environment.apiUrl + environment.wealth +'/landing-page-status/investment', postData);
  }

  updateFinalStatus(postData: any): Observable<any> {
    return this.http.patch(environment.apiUrl + environment.wealth + '/landing-page-status/final', postData);
  }
  getBlockedUserStatus(postData: any): Observable<any> {
    return this.http.post(environment.apiUrl + environment.ut + '/customerdetails', postData);
  }

}
