import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EventService } from '@cimb/core';
import { of, throwError } from 'rxjs';
import { catchError, switchMap, map } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import * as CartAction from './cart.actions';
import { ErrorHandlingService } from '../../services/error-handling/error-handling.service';
import { AppService } from '../../services/app.service';

export interface RequestOtpResponseData {
    message: string;
}

export interface VerifyOtpResponseData {
    message: string;
    referenceNumber: string;
}

export interface PostTransactionResponseData {
    referenceNumber: string;
    transactionSuccessStatus: boolean;
    transactionStatus: string;
    transactionStatusName: string;
    transactionStatusText: string;
    transactionDate: string;
    transactionWorkingDays: string;
}

export interface CartDetailList {
    cdId: number;
    fundCode: string;
    txnType: string;
    totalInvestment: number;
    totalNetAmount: number;
    totalSalesCharges: number;
    totalSalesPercentage: number;
    totalSwitchIn: number;
    switchInAmount: number;
    totalSwitchOut: number;
    switchOutAmount: number;
    totalRedem: number;
    totalRedemAmount: number;
    switchSalesCharges: number;
    switchSalesPercentage: number;
}
export interface GetCartByClientIdResponseData {
    csId: number;
    utAccountNo: string;
    clientId: string;
    txnType: string;
    totalRedem: number;
    totalRedemAmount: number;
    totalFund: number;
    totalInvestment: number;
    totalNetAmount: number;
    totalSalesCharges: number;
    totalSwitchIn: number;
    switchInAmount: number;
    totalSwitchOut: number;
    switchOutAmount: number;
    cartDetailList: CartDetailList[];
}

const handleOtp = (data: any) => {
    // const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    return new CartAction.RequestOtpSuccess(JSON.stringify(data));
};

const handleOtpError = (errorRes: any) => {
    return of(new CartAction.RequestOtpFail(JSON.stringify(errorRes)));
};

const handleVerify = (data: any) => {
    // const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    return new CartAction.VerifyOtpSuccess(JSON.stringify(data));
};

const handleVerifyError = (errorRes: any) => {
    return of(new CartAction.VerifyOtpFail(JSON.stringify(errorRes)));
};

const handlePostTransaction = (data: any, request: any) => {
    return new CartAction.PostAllTransactionSuccess(JSON.stringify(data), request);
};

const handlePostTransactionError = (errorRes: any) => {
    return of(new CartAction.PostAllTransactionFail(JSON.stringify(errorRes)));
};

const handleCreateCart = (data) => {
    return new CartAction.GetCartByClientIdSuccess(JSON.stringify(data));
};

const handleCreateCartError = (errorRes: any) => {
    return of(new CartAction.CreateCartFail(JSON.stringify(errorRes)));
};

@Injectable()
export class CartEffects {
    @Effect()
    getOtpApi = this.actions$.pipe(
        ofType(CartAction.CALL_OTP_API),
        switchMap((RequestOtpApi: CartAction.RequestOtpApi) => {
            return this.http
                .post<RequestOtpResponseData>(
                    environment.apiUrl + environment.wealth + '/otp-audit',
                    RequestOtpApi.payload,
                    {
                        responseType: 'json',
                        headers: new HttpHeaders({
                            'content-type': 'application/json',
                        }),
                    },
                )
                .pipe(
                    // eslint-disable-next-line @typescript-eslint/no-empty-function
                  

                    map((resData) => {
                        return handleOtp(resData);
                    }),
                    catchError((errorRes) => {
                        return handleOtpError(errorRes);
                    }),
                );
        }),
    );

    @Effect()
    verifyOtpApi = this.actions$.pipe(
        ofType(CartAction.VERIFY_OTP_API),
        switchMap((VerifyOTPApi: CartAction.VerifyOTPApi) => {
            return this.http
                .post<VerifyOtpResponseData>(
                    environment.apiUrl + environment.wealth + '/otpverify-audit',
                    VerifyOTPApi.payload,
                    {
                        responseType: 'json',
                        headers: new HttpHeaders({
                            'content-type': 'application/json',
                        }),
                    },
                )
                .pipe(
                    // eslint-disable-next-line @typescript-eslint/no-empty-function
                    

                    map((resData) => {
                        return handleVerify(resData);
                    }),
                    catchError((errorRes) => {
                        return handleVerifyError(errorRes);
                    }),
                );
        }),
    );

    @Effect()
    postAllTransactionApi = this.actions$.pipe(
        ofType(CartAction.POST_ALL_TRANSACTION_API),
        switchMap((PostAllTransaction: CartAction.PostAllTransaction) => {
            this.appService.showLoadingSpinner();
            return this.http
                .post<PostTransactionResponseData>(
                    environment.apiUrl +
                        environment.emanager +
                        '/purchase/v2/transaction-audit/',
                    JSON.parse(PostAllTransaction.payload),
                    {
                        responseType: 'json',
                        headers: new HttpHeaders({
                            'content-type': 'application/json',
                        }),
                    },
                )
                .pipe(
                    map((resData) => {
                        this.appService.hideLoadingSpinner();
                        return handlePostTransaction(resData, PostAllTransaction.payload);
                    }),
                    catchError((errorRes) => {
                        this.appService.hideLoadingSpinner();
                        return handlePostTransactionError(errorRes);
                    }),
                );
        }),
    );

    @Effect()
    createCartApi = this.actions$.pipe(
        ofType(CartAction.CREATE_CART_API),
        switchMap((CreateCart: CartAction.CreateCart) => {
            return this.http
                .post<any>(
                    environment.apiUrl +
                        environment.emanager +
                        '/cart/v2/createCart',
                        JSON.parse(CreateCart.payload),                    {
                        responseType: 'json',
                        headers: new HttpHeaders({
                            'content-type': 'application/json',
                        }),
                    },
                )
                .pipe(
                    map((resData) => {
                        this._eventService.onSend({ addedToCartAPISuccessfully: true });
                        return handleCreateCart(
                            resData
                        );
                    }),
                    catchError((errorRes) => {
                        if (errorRes.error.businessErrorCode === "50000" && errorRes.error.status === 500 && errorRes.error.error === "BUSINESS_ERROR") {
                            this._eventService.onSend({ fullRedeemPopUp: true });
                            this._eventService.onSend({ addedToCartAPIFailed: true, data: JSON.parse(CreateCart.payload)});
                        }else {
                            this._eventService.onSend({ fullRedeemPopUp: false });
                        }
                        return handleCreateCartError(errorRes);

                    }),
                );
        }),
    );

    @Effect()
    updateCartByClientIdApi = this.actions$.pipe(
        ofType(CartAction.UPDATE_CART_BY_CLIENT_ID_API),
        switchMap((UpdateCartByClientId: CartAction.UpdateCartByClientId) => {
            return this.http
                .put<any>(
                    environment.apiUrl +
                        environment.emanager +
                        '/cart/v2/updateCartByClientId',
                    JSON.parse(UpdateCartByClientId.payload),
                    {
                        responseType: 'json',
                        headers: new HttpHeaders({
                            'content-type': 'application/json',
                        }),
                    },
                )
                .pipe(
                    map((resData) => {
                        return this.getClientData(resData);
                    }),
                    catchError((errorRes) => {
                        if (errorRes.error.businessErrorCode === "50000" && errorRes.error.status === 500 && errorRes.error.error === "BUSINESS_ERROR") {
                            this._eventService.onSend({ fullRedeemPopUp: true });
                            this._eventService.onSend({ addedToCartAPIFailed: true, data: JSON.parse(UpdateCartByClientId.payload)});
                        }else {
                            this._eventService.onSend({ fullRedeemPopUp: false });
                        }
                        return of(
                            new CartAction.UpdateCartByClientIdFail(JSON.stringify(errorRes)),
                        );
                    }),
                );
        }),
    );

    @Effect()
    getCartByClientId = this.actions$.pipe(
        ofType(CartAction.GET_CART_BY_CLIENT_ID),
        switchMap((GetCartByClientId: CartAction.GetCartByClientId) => {
            return this.http
                .get(
                    environment.apiUrl +
                        environment.emanager +
                        '/cart/v2/getCartByClientIdDetail'
                )
                .pipe(
                    map((resData: GetCartByClientIdResponseData) => {
                        const toJsonString: string = JSON.stringify(resData);
                        return new CartAction.GetCartByClientIdSuccess(toJsonString);
                    }),
                    catchError(() => {
                        return of(new CartAction.GetCartByClientIddFail(null));
                    }),
                );
        }),
    );

    @Effect()
    switchCartApi = this.actions$.pipe(
        ofType(CartAction.SWITCH_CART_API),
        switchMap((SwitchCart: CartAction.SwitchCart) => {
            return this.http
                .post<any>(
                    environment.apiUrl +
                        environment.emanager +
                        '/cart/v2/switchCart',
                    JSON.parse(SwitchCart.payload),
                    {
                        responseType: 'json',
                        headers: new HttpHeaders({
                            'content-type': 'application/json',
                        }),
                    },
                )
                .pipe(
                    map((resData) => {
                        return this.getClientData(resData);
                    }),
                    catchError((errorRes) => {
                        if (errorRes.error.businessErrorCode === "50000" && errorRes.error.status === 500 && errorRes.error.error === "BUSINESS_ERROR") {
                            this._eventService.onSend({ fullRedeemPopUp: true });
                        }else {
                            this._eventService.onSend({ fullRedeemPopUp: false });
                        }
                        return of(new CartAction.SwitchCartFail(JSON.stringify(errorRes)));
                    }),
                );
        }),
    );

    @Effect()
    deleteFullCartApi = this.actions$.pipe(
        ofType(CartAction.DELETE_CART_BY_CLIENT_ID_API),
        switchMap((DeleteCart: CartAction.DeleteCart) => {
            return this.http
                .delete<any>(
                    environment.apiUrl +
                        environment.emanager +
                        '/cart/v2/deleteCartByClientId'
                )
                .pipe(
                    map((resData) => {
                        return this.getClientData(resData);
                    }),
                    catchError((errorRes) => {
                        return of(new CartAction.DeleteCartFail(JSON.stringify(errorRes)));
                    }),
                );
        }),
    );

    @Effect()
    updateUTAccountNoCart = this.actions$.pipe(
        ofType(CartAction.UPDATE_CART_UTACCOUNTNO_API),
        switchMap((UpdateUTAccountNoCartAPI: CartAction.UpdateUTAccountNoCartAPI) => {
            return this.http
                .put<any>(environment.apiUrl + environment.emanager + '/cart/updateUTAccountNo', {
                    clientId: UpdateUTAccountNoCartAPI.clientId,
                    utAccountNo: UpdateUTAccountNoCartAPI.utAccountNo,
                })
                .pipe(
                    map((response) => {
                        return new CartAction.UpdateUTAccountNoCartAPISuccess(response);
                    }),
                    catchError((errorRes) => {
                        return throwError(errorRes);
                    }),
                );
        }),
    );

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private router: Router,
        private _eventService: EventService,
        private errorService: ErrorHandlingService,
        private appService: AppService,
    ) {}

        getClientData(resData) {
            this._eventService.onSend({ addedToCartAPISuccessfully: true });
            return new CartAction.GetCartByClientIdSuccess(JSON.stringify(resData));
        }
}
