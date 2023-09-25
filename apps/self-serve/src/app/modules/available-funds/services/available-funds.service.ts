import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService, UtilsService } from '@cimb/core';
import { environment } from '@env/self-serve/environment';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AssetsClass, FundHouse, FundList, RiskCategory } from '../models';

@Injectable({
    providedIn: 'root',
})
export class AvailableFundsService {
    private endpoint: string = environment.apiUrl;
    private _fundList: BehaviorSubject<FundList[] | null> = new BehaviorSubject(null);
    private _fundNames: BehaviorSubject<string[] | null> = new BehaviorSubject(null);

    constructor(private http: HttpService) {}

    get fundsListByClientId$(): Observable<FundList[]> {
        return this._fundList.asObservable();
    }

    get getFundNames$(): Observable<string[]> {
        return this._fundNames.asObservable();
    }

    getRiskCategories(): Observable<RiskCategory[]> {
        return this.http
            .get(this.endpoint, environment.wealth+`/riskprofiles/id-name-details`)
            .pipe(map((response) => response));
    }

    getAssetsClasses(): Observable<AssetsClass[]> {
        return this.http
            .get(this.endpoint, environment.wealth+`/assetclasses/details-id-name`)
            .pipe(map((response) => response));
    }

    getFundHouse(): Observable<FundHouse[]> {
        return this.http
            .get(this.endpoint, environment.wealth+`/fund-manager`)
            .pipe(map((response) => response));
    }

    getFundNames(): Observable<string[]> {
        return this.http
            .get(this.endpoint, environment.validate+`/cust-support/find-unique-fund-names`)
            .pipe(
                tap((response) => {
                    this._fundNames.next(response);
                }),
            );
    }

    getFundPerHistory(fundCode: any): Observable<any> {
        return this.http.get(this.endpoint, environment.gateway + '/wealth/nav-prices/past-fund-price-details/fund-code/' + fundCode);
    }

    getFundsListByClientId(clientId: string, cifNumber: string, utAccNo: string, filters?: any): Observable<FundList[]> {
        const queryParams: HttpParams = UtilsService.buildQueryParams(filters);
        return this.http
            .get(this.endpoint, environment.emanager+`/fund/v2/getFundListByClient/${utAccNo}`, queryParams)
            .pipe(
                tap((response) => {
                    this._fundList.next(response);
                }),
            );
    }
}
