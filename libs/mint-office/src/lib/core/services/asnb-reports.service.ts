import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Environment } from '../models/environment.model';
import { 
    AsnbLinkAccountResponse,
    AsnbSearchFields,
    AsnbSearchLinkAccount,
    AsnbSearchFavourite,
    AsnbFavouriteResponse
} from '../models/asnb.model';

@Injectable({
    providedIn: 'root',
})
export class AsnbReportsService {
    readonly environment: Environment;
    linkAccountReportUrl: string;
    seachTransactionUrl: string;
    favouriteUrl: string;

    constructor(@Inject('environment') environment: Environment, private http: HttpClient) {
        this.environment = environment;
        this.linkAccountReportUrl = this.environment.apiUrl + 'asnb/link-delink-report';
        this.seachTransactionUrl = this.environment.apiUrl + 'validate/asnb/asnb-search';
        this.favouriteUrl = this.environment.apiUrl + 'validate/asnb/asnb-search-favourite';
    }

    getReport(url: string) {
        return this.http.get(this.environment.apiUrl + url, { responseType: 'text' as any }).pipe(
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
        );
    }

    searchTransactions(filter: AsnbSearchFields) {
        return this.http.post(this.seachTransactionUrl, filter, {}).pipe(
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
        );
    }

    searchLinkAccount(filter: AsnbSearchLinkAccount) {
        return this.http.post<AsnbLinkAccountResponse>(this.linkAccountReportUrl, filter, {}).pipe(
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
        );
    }

    searchFavourite(filter: AsnbSearchFavourite) {
        return this.http.post<AsnbFavouriteResponse[]>(this.favouriteUrl, filter, {}).pipe(
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
        );
    }
}
