import { Injectable } from '@angular/core';
import { accountData, checkoutSourceDetail, cartSummary, myInvestment } from '../mocks/data';
import {
    CartAccountDetails,
    CartPurchaseSummary,
    CartSource,
    AsnbApiResponse,
    AsnbRiskStatusApiResponse,
    AsnbCheckAccountLinkResponse,
    AsnbCreateOrderRequest,
    AsnbCreateOrderResponse,
    AsnbCreateSubscriptionRequest,
    AsnbCreateSubscriptionResponse,
    AsnbTransactionLimit,
    AsnbOtp,
    ScheduledMaintenance,
    AsnbAccountListingRequest,
    AsnbAccountListingResponse,
    AsnbLookupParamApiResponse,
    OperationHourResponse,
    UrlMaintenanceApiResponse,
    AsnbMember,
    AsnbFavouriteList,
    AsnbFundListing,
    AsnbIdTypeApiResponse,
    AsnbRelationshipApiResponse,
    AsnbValidateFavouriteApiResponse,
    AsnbValidateFavouriteApiRequest,
    AsnbFavouriteApiResponse,
    AsnbLookupParamApiTransferReasonResponse,
    AsnbRejectCodeMapping,
    AsnbRemoveFavouriteResponse,
    AsnbRemoveFavouriteRequest,
    AsnbSaveFavouriteApiRequest,
    AsnbSaveFavouriteApiResponse,
    AsnbEligibleFunds,
    PastTransactionResponse,
} from '../models';
import { environment } from '@env/self-serve/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { ASNBWhiteList, Setting } from '@cimb/shared/models';
import { catchError, map, retry, shareReplay } from 'rxjs/operators';
import { of, Subject, throwError, Observable, BehaviorSubject } from 'rxjs';

export interface RequestOtpResponseData {
    message: string;
}

@Injectable({
    providedIn: 'root',
})
export class AsnbService {
    private readonly apiUrl = environment.apiUrl;
    private subject = new Subject();
    private subjectDelinkedAccount = new Subject();

    private memberHolderId$ = new BehaviorSubject<any>({});
    selectedMemberHolderId$ = this.memberHolderId$.asObservable();

    private tabIndexSubject = new BehaviorSubject(0);
    tabIndex$ = this.tabIndexSubject.asObservable();

    asnbSettings: Observable<Setting[]>;
    private utSettingsApiUrl = this.apiUrl + environment.validate + '/ss-ut-settings/settings';

    private favListSubject = new BehaviorSubject(null);
    favList$ = this.favListSubject.asObservable();

    constructor(private http: HttpClient) {}

    updateTabIndex(index: number) {
        this.tabIndexSubject.next(index);
    }

    refreshFavList() {
        this.favListSubject.next(null);
    }

    getInvestmentDetails() {
        return myInvestment;
    }

    requestOtp(mobileNumber: string) {
        const requestOtpUrl = this.apiUrl + environment.wealth + '/v3/otp-audit';
        const otpData = {
            otp: {
                mobileNumber,
            },
        };

        return this.http.post<AsnbOtp>(requestOtpUrl, otpData, {
            responseType: 'json',
            headers: new HttpHeaders({
                'content-type': 'application/json',
            }),
        });
    }

    verifyOtp({ otp, transactionId }: { otp: string; transactionId: string }) {
        const verifyOtpUrl = this.apiUrl + environment.wealth + '/v3/otpverify-audit';

        const otpData = {
            otpVerify: {
                otp,
                transactionId,
            },
        };

        return this.http.post(verifyOtpUrl, otpData, {
            responseType: 'json',
            headers: new HttpHeaders({
                'content-type': 'application/json',
            }),
        });
    }

    getAccountLinkingStatus() {
        // To get user's account linking status
        return this.http
            .post<{ accountExist: boolean }>(
                this.apiUrl + environment.asnb + '/accounts/check-account-exist',
                {},
            )
            .pipe(
                retry(2),
                shareReplay(),
                catchError((error: HttpErrorResponse) => {
                    return throwError(error);
                }),
            );
    }

    checkWhitelist() {
        const checkWhitelistUrl = this.apiUrl + environment.asnb + '/user/validate-whitelisted';

        return this.http.post<ASNBWhiteList>(checkWhitelistUrl, {}).pipe(
            retry(2),
            shareReplay(),
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
        );
    }

    sendLinkAccountEvent() {
        return this.http
            .post(this.apiUrl + environment.asnb + '/accounts/account-link', {
                action: 'link',
            })
            .pipe(
                retry(2),
                shareReplay(),
                catchError((error: HttpErrorResponse) => {
                    return throwError(error);
                }),
            )
            .subscribe(() => {
                this.subject.next();
            });
    }

    getLinkAccountEvent() {
        return this.subject.asObservable();
    }

    sendDelinkAccountEvent() {
        return this.http
            .post(this.apiUrl + environment.asnb + '/accounts/account-delink', {})
            .pipe(
                retry(2),
                shareReplay(),
                catchError((error: HttpErrorResponse) => {
                    return throwError(error);
                }),
            )
            .subscribe(() => {
                this.subjectDelinkedAccount.next();
            });
    }

    getDelinkAccountEvent() {
        return this.subjectDelinkedAccount.asObservable();
    }

    getCheckoutBankAccounts(
        params: AsnbAccountListingRequest,
    ): Observable<AsnbAccountListingResponse> {
        const url = this.apiUrl + environment.ut + '/accountlisting';
        return this.http.post<AsnbAccountListingResponse>(url, params).pipe(
            retry(2),
            shareReplay(),
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
        );
    }

    getCheckoutPurchaseSummary(): Observable<CartPurchaseSummary> {
        return of(cartSummary) as any;
    }
    getCheckoutAccountDetails(): Observable<CartAccountDetails> {
        return of(accountData) as any;
    }
    getCheckoutSourceDetails(): Observable<CartSource> {
        return of(checkoutSourceDetail) as any;
    }

    getPastTransaction(options) {
        const url = this.apiUrl + environment.asnb + '/pnbapi/cashTransactions';
        return this.http.post<PastTransactionResponse>(url, options, {
            responseType: 'json',
        });
    }

    // get asnb fund list lookup api
    getASNBFundListLookup() {
        const url = this.apiUrl + 'gateway/authenticate/asnb/getFundListing';
        return this.http.post<AsnbFundListing[]>(
            url,
            {},
            {
                responseType: 'json',
            },
        );
    }

    // get asnb fund list for own account
    getASNBFundListOwnAccount(options) {
        const url = this.apiUrl + environment.asnb + '/pnbapi/inquiry';
        return this.http.post(url, options, {
            responseType: 'json',
        });
    }

    // Get user risk status
    getUserAccountStatus() {
        const url = this.apiUrl + environment.asnb + '/user/status/get-account-status';
        return this.http.get<AsnbApiResponse>(url).pipe(
            retry(2),
            shareReplay(),
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
        );
    }

    getUserRiskStatus() {
        const url = this.apiUrl + environment.asnb + '/user/status/riskStatus';
        return this.http.get<AsnbRiskStatusApiResponse>(url).pipe(
            retry(2),
            shareReplay(),
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
        );
    }

    getSourceOfWealthAndFunds() {
        const url = this.apiUrl + environment.asnb + '/lookup/param';
        return this.http.get<AsnbLookupParamApiResponse>(url).pipe(
            retry(2),
            shareReplay(),
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
        );
    }

    checkAccountLink() {
        const url = this.apiUrl + environment.asnb + '/accounts/check-account-link';
        return this.http.get<AsnbCheckAccountLinkResponse>(url).pipe(
            retry(2),
            shareReplay(),
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
        );
    }

    createOrder(params: AsnbCreateOrderRequest): Observable<AsnbCreateOrderResponse> {
        const url = this.apiUrl + environment.asnb + '/purchase/create-order';

        return this.http.post<AsnbCreateOrderResponse>(url, params).pipe(
            retry(2),
            shareReplay(),
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
        );
    }

    createSubscription(
        params: AsnbCreateSubscriptionRequest,
    ): Observable<AsnbCreateSubscriptionResponse> {
        const url = this.apiUrl + environment.asnb + '/checkout';

        return this.http.post<AsnbCreateSubscriptionResponse>(url, params).pipe(
            retry(2),
            shareReplay(),
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
        );
    }

    getTransactionLimit() {
        const url = this.apiUrl + environment.authenticate + '/asnb/getTransactionAmount';

        return this.http.post<AsnbTransactionLimit>(url, {}).pipe(
            retry(2),
            shareReplay(),
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
        );
    }

    getASNBScheduledMaintenance() {
        const url = this.apiUrl + environment.authenticate + '/asnb-current-date-schedule-downtime';

        return this.http.get<ScheduledMaintenance>(url).pipe(
            retry(2),
            shareReplay(),
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
        );
    }

    getEligibleFunds(unitHolderId: string | number) {
        const url = this.apiUrl + environment.asnb + '/pnbapi/eligiblefunds';

        return this.http
            .post<AsnbEligibleFunds>(url, {
                unitHolderId: unitHolderId,
            })
            .pipe(
                shareReplay(),
                catchError((error: HttpErrorResponse) => {
                    return throwError(error);
                }),
            );
    }

    getOperationHourDetails() {
        const url = this.apiUrl + environment.authenticate + '/asnb/ops-hour';
        return this.http.get<OperationHourResponse>(url).pipe(
            retry(2),
            shareReplay(),
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
        );
    }

    setMemberAccount(account: AsnbMember) {
        this.memberHolderId$.next(account);
    }

    getExternalUrlList() {
        const url = this.apiUrl + environment.authenticate + '/asnb/url';
        return this.http.get<UrlMaintenanceApiResponse[]>(url).pipe(
            retry(2),
            shareReplay(),
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
        );
    }

    getSpecificExternalUrl(code: string) {
        const url = this.apiUrl + environment.authenticate + '/asnb/urlCode/' + code;
        return this.http.get<UrlMaintenanceApiResponse>(url).pipe(
            retry(2),
            shareReplay(),
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
        );
    }

    getAsnbFavourites(pageNo: number): Observable<AsnbFavouriteList> {
        const url = this.apiUrl + environment.asnb + '/favourite/account-list';

        return this.http
            .get<AsnbFavouriteApiResponse>(url, {
                params: {
                    pageNo,
                },
            })
            .pipe(
                shareReplay(),
                catchError((error: HttpErrorResponse) => {
                    return throwError(error);
                }),
                map((response) => {
                    return response.data;
                }),
            );
    }

    getTransferReasons() {
        const url = this.apiUrl + environment.asnb + '/lookup/param';
        return this.http.get<AsnbLookupParamApiTransferReasonResponse>(url).pipe(
            retry(2),
            shareReplay(),
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
        );
    }

    getIdTypeList() {
        const url = this.apiUrl + environment.asnb + '/lookup/param/IDTYPE';
        return this.http.get<AsnbIdTypeApiResponse[]>(url).pipe(
            retry(2),
            shareReplay(),
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
        );
    }

    getRelationshipList() {
        const url = this.apiUrl + environment.asnb + '/lookup/param/THIRDPARTYRELATIONSHIP';
        return this.http.get<AsnbRelationshipApiResponse>(url).pipe(
            retry(2),
            shareReplay(),
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
        );
    }

    validateFavourite(request: AsnbValidateFavouriteApiRequest) {
        const url = this.apiUrl + environment.asnb + '/favourite/validate';
        return this.http.post<AsnbValidateFavouriteApiResponse>(url, request).pipe(
            shareReplay(),
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
        );
    }

    getAsnbFeatureSettings() {
        this.asnbSettings = this.http.get<Setting[]>(this.utSettingsApiUrl).pipe(
            retry(3),
            shareReplay(),
            catchError((error: string) => {
                return throwError(error);
            }),
        );
    }

    saveFavourite(request: AsnbSaveFavouriteApiRequest) {
        const url = this.apiUrl + environment.asnb + '/favourite/save';
        return this.http.post<AsnbSaveFavouriteApiResponse>(url, request).pipe(
            shareReplay(),
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            }),
        );
    }

    getAsnbSettings(settingId: string) {
        return this.asnbSettings.pipe(
            map((settings) => {
                if (settings) {
                    return settings.find((setting) => setting.utSettingId === settingId);
                }
            }),
        );
    }

    getErrorCodeMapping(rejectCode: string, hasEngDesc: boolean) {
        const url = this.apiUrl + environment.asnb + '/reject-code';

        return this.http
            .get<AsnbRejectCodeMapping>(url, {
                params: {
                    rejectCode,
                    hasEngDesc,
                },
            })
            .pipe(
                retry(3),
                shareReplay(),
                catchError((error: string) => {
                    return throwError(error);
                }),
            );
    }

    sendRemoveFavouriteEvent(params: AsnbRemoveFavouriteRequest) {
        return this.http
            .post<AsnbRemoveFavouriteResponse>(
                this.apiUrl + environment.asnb + '/favourite/remove',
                params,
            )
            .pipe(
                retry(2),
                shareReplay(),
                catchError((error: HttpErrorResponse) => {
                    return throwError(error);
                }),
            );
    }
}
