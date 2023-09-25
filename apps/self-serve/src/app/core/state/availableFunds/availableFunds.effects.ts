import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import * as AvailableFundsAction from './availableFunds.action';

import { environment } from '../../../../environments/environment';

@Injectable()
export class AvailableFundsEffects {

  @Effect()
  GetAvailableFundApiData = this.effectsActions$.pipe(
    ofType(AvailableFundsAction.GET_AVAILABLE_FUNDS_DATA),
    switchMap((getAvailableFund: AvailableFundsAction.GetAvailableFund) => {
       return this.http
         .get(environment.apiUrl+environment.emanager+'/fund/getFundListByClient/'+getAvailableFund.payload)
        .pipe(
        // return this.http
        //   .get("https://wlt.devapps.tcjteam.tech/api/emanager/fund/getFundListByClient/481124715058")
        //   .pipe(
          map((resData) => {
            return new AvailableFundsAction.StoreAvailableFundData(resData);
          }),
          catchError(() => {
            return of(new AvailableFundsAction.StoreAvailableFundData(null));
          })
        );
    })
  );

  @Effect()
  GetDownloadedDocument = this.effectsActions$.pipe(
    ofType(AvailableFundsAction.GET_DOCUMENT),
    switchMap((getDocument: AvailableFundsAction.GetDocument) => {
       return this.http
        .post<any>(
            environment.apiUrl+environment.validate+'/document-mappings/getDocument' ,
          {
          fileUrl: getDocument.payload.msUrl,
          fileName: getDocument.payload.documentName
          }
          ,
          {
            responseType: 'blob' as 'json',
            headers: new HttpHeaders({
              'content-type': 'application/json',

            }),
          }
        ).pipe(
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          
          map((resData) => {
            return new AvailableFundsAction.StoreDocument(resData);
          }),
          catchError((errorResp) => {
            return of(new AvailableFundsAction.StoreDocument(errorResp));
          })
        );
    })
  );

  @Effect()
  getFundPerHistory = this.effectsActions$.pipe(
    ofType(AvailableFundsAction.FUND_PERF_HISTORY),
    switchMap((getFundPerHistory: AvailableFundsAction.FundPerfo) => {
      return this.http
        .get(
          environment.apiUrl +
          environment.gateway +'/wealth/nav-prices/past-fund-price-details/fund-code/'+
          getFundPerHistory.payload
        )
        .pipe(
          map((resData) => {
            return new AvailableFundsAction.FundPerfoSuccess(resData);
          }),
          catchError((errorResp) => {
            return of(new AvailableFundsAction.FundPerfoFailure(errorResp));
          })
        );
    })
  );

  constructor(
    private effectsActions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}



}


