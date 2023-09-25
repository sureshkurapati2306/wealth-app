import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, shareReplay } from 'rxjs/operators';
import { environment } from '@env/self-serve/environment';
import {
    AccountSummary,
    AccountSummaryRequest,
    RiskProfile,
    RiskProfileRequest,
    Setting,
} from '@cimb/shared/models';
import { RiskProfileService } from '../../../modules/risk-profile/services/risk-profile.service';

@Injectable({
    providedIn: 'root',
})
export class WealthService {
    private readonly apiUrl = environment.apiUrl;
    private compositeAccountSummaryApiUrl =
        this.apiUrl + environment.ut + '/v3/compositeacctsummary';
    private riskProfileEnquiryApiUrl = this.apiUrl + environment.wealth + '/rws/riskprofileinquiry';
    private utSettingsApiUrl = this.apiUrl + environment.wealth + '/ss-ut-settings/settings';

    constructor(private http: HttpClient, private riskProfileService: RiskProfileService) {}

    getAccountSummary(request: AccountSummaryRequest): Observable<AccountSummary> {
        return this.http.post<AccountSummary>(this.compositeAccountSummaryApiUrl, request).pipe(
            retry(2),
            shareReplay(),
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
        );
    }

    getRiskProfileEnquiry(request: RiskProfileRequest): Observable<RiskProfile> {
        return this.http.get<RiskProfile>(this.riskProfileEnquiryApiUrl).pipe(
            retry(2),
            shareReplay(),
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
        );
    }

    getSettingsData(): Observable<Setting[]> {
        return this.http.get<Setting[]>(this.utSettingsApiUrl).pipe(
            retry(3),
            shareReplay(),
            catchError((error: string) => {
                return throwError(error);
            }),
        );
    }
}
