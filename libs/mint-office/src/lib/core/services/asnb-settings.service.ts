import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Environment } from '../models/environment.model';
import {
    FundSuspensionTable,
    FundLibraryTable,
    UrlMaintenanceApiRequest,
    UrlMaintenanceApiResponse,
} from '../models/asnb.model';

@Injectable({
    providedIn: 'root',
})
export class AsnbSettingsService {
    readonly environment: Environment;
    fundSuspensionApiUrl: string;
    fundListApiUrl: string;
    operationHourApiUrl: string;
    funLibraryApiUrl: string;
    urlListApiUrl: string;
    urlDetailsApiUrl: string;

    constructor(@Inject('environment') environment: Environment, private http: HttpClient) {
        this.environment = environment;
        this.fundSuspensionApiUrl = this.environment.apiUrl + 'authenticate/asnb/fund-susp';
        this.fundListApiUrl = this.environment.apiUrl + 'authenticate/asnb/getFundListing';
        this.operationHourApiUrl = this.environment.apiUrl + 'authenticate/asnb/ops-hour';
        this.funLibraryApiUrl = this.environment.apiUrl + 'asnb/fund-library';
        this.urlListApiUrl = this.environment.apiUrl + 'authenticate/asnb/url';
        this.urlDetailsApiUrl = this.environment.apiUrl + 'authenticate/asnb/urlCode';
    }

    getFundList() {
        return this.http.post<any[]>(this.fundListApiUrl, {}).pipe(
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
        );
    }

    getFundSuspensionList() {
        return this.http.get<FundSuspensionTable[]>(this.fundSuspensionApiUrl).pipe(
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
        );
    }

    saveFundSuspensionList(method: string, payload: any) {
        return this.http[method](this.fundSuspensionApiUrl, payload).pipe(
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
        );
    }

    getOperationHours() {
        return this.http.get<FundSuspensionTable[]>(this.operationHourApiUrl).pipe(
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
        );
    }

    saveOperationHours(method: string, payload: any) {
        return this.http[method](this.operationHourApiUrl, payload).pipe(
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
        );
    }

    getFundLibrary(fundId?: number) {
        return this.http
            .get<FundLibraryTable[]>(this.funLibraryApiUrl + (fundId ? '/' + fundId : ''))
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return throwError(error);
                }),
            );
    }

    saveFundLibrary(method: string, payload: any, fundId?: number) {
        return this.http[method](
            this.funLibraryApiUrl + (fundId ? '/' + fundId : ''),
            payload,
        ).pipe(
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
        );
    }

    getUrlList() {
        return this.http.get<UrlMaintenanceApiResponse[]>(this.urlListApiUrl).pipe(
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
        );
    }

    getUrlDetails(urlCode: string) {
        return this.http.get<UrlMaintenanceApiResponse>(this.urlDetailsApiUrl + `/${urlCode}`).pipe(
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
        );
    }

    saveUrlDetails(method: string, payload: UrlMaintenanceApiRequest) {
        return this.http[method](this.urlListApiUrl, payload).pipe(
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
        );
    }
}
