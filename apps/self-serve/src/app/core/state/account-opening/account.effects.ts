import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, switchMap, map } from 'rxjs/operators';

import * as AccountOpeningAction from './account.actions';
import { AccountService } from '../../services/account-opening/account.service';
import {
    AccountPersonalDetailsPrototype,
    AccountPersonalDetailsPostPrototype,
} from '@cimb/shared/models';

@Injectable()
export class AccountOpeningEffects {
    /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line
    @Effect()
    GetAccountOpeningApiDATA = this.effectsActions$.pipe(
        ofType(AccountOpeningAction.GET_ACCOUNT_OPENING_API),
        switchMap((GetAccountOpeningApiParams: AccountOpeningAction.GetAccountOpeningApi) => {
            const postObject = new AccountPersonalDetailsPostPrototype(
                GetAccountOpeningApiParams.payload,
            );
            return this.accountService.postAccountOpening(postObject.postObject).pipe(
                map((resData: any) => {
                    return new AccountOpeningAction.GetAccountOpeningApiResponse(resData);
                }),
                catchError(() => {
                    return of(new AccountOpeningAction.GetAccountOpeningApiResponse(null));
                }),
            );
        }),
    );

    /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line
    @Effect()
    PostAccountOpeningAuditApiDATA = this.effectsActions$.pipe(
        ofType(AccountOpeningAction.POST_UTACCOUNT_AUDIT),
        switchMap(
            (PostAccountOpeningAuditApiParams: AccountOpeningAction.PostAccountOpeningAuditApi) => {
                return this.accountService
                    .postAccountOpeningAudit(PostAccountOpeningAuditApiParams.payload)
                    .pipe(
                        map((resData: any) => {
                            return new AccountOpeningAction.PostAccountOpeningAuditApiResponse(
                                resData,
                            );
                        }),
                        catchError(() => {
                            return of(
                                new AccountOpeningAction.PostAccountOpeningAuditApiResponse(null),
                            );
                        }),
                    );
            },
        ),
    );

    /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line
    @Effect()
    GetUserDetailsApiDATA = this.effectsActions$.pipe(
        ofType(AccountOpeningAction.GET_USER_DETAILS_API),
        switchMap(() => {
            return this.accountService.postCustomerDetails().pipe(
                map((resData: any) => {
                    const resp = new AccountPersonalDetailsPrototype(resData || {});
                    if (resData.addresses) {
                        resp.response.addressLine1 = resData.addresses[0].address1;
                        resp.response.addressLine2 = resData.addresses[0].address2;
                        resp.response.addressLine3 = resData.addresses[0].address3;
                        resp.response.addressLine4 = resData.addresses[0].address4;
                        resp.response.addrLine1 = resData.addresses[0].address1;
                        resp.response.addrLine2 = resData.addresses[0].address2;
                        resp.response.addrLine3 = resData.addresses[0].address3;
                        resp.response.addrLine4 = resData.addresses[0].address4;
                        resp.response.postcode = resData.addresses[0].postcode;
                        resp.response.state = resData.addresses[0].state;
                        resp.response.country =
                            resData.addresses[0].country === 'MYS'
                                ? 'MY'
                                : resData.addresses[0].country;
                    }

                    return new AccountOpeningAction.GetUserDetailsApiResponse(resp.response || {});
                }),
                catchError(() => {
                    return of(new AccountOpeningAction.GetUserDetailsApiResponse(null));
                }),
            );
        }),
    );

    /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line
    @Effect()
    GetUserDetailFieldOptionsApiDATA = this.effectsActions$.pipe(
        ofType(AccountOpeningAction.GET_USER_DETAIL_FIELD_OPTIONS_API),
        switchMap(
            (userDetailFieldOptionsAPIParam: AccountOpeningAction.GetUserDetailFieldOptionsApi) => {
                return this.accountService
                    .contactFromMultipleSources(userDetailFieldOptionsAPIParam.payload)
                    .pipe(
                        map((resData: any) => {
                            const resObject = {
                                titleSalutations: resData[0] || [],
                                countryList: resData[1] || [],
                                stateList: resData[2] || [],
                                citizenList: resData[3] || [],
                                genderList: resData[4] || [],
                                raceList: resData[5] || [],
                                religionList: resData[6] || [],
                                martialStatusList: resData[7] || [],
                                industryList: resData[8] || [],
                                professionList: resData[9] || [],
                                postCodeList: resData[10] || [],
                            };
                            return new AccountOpeningAction.GetUserDetailFieldOptionsApiResponse(
                                resObject,
                            );
                        }),
                        catchError(() => {
                            return of(
                                new AccountOpeningAction.GetUserDetailFieldOptionsApiResponse(null),
                            );
                        }),
                    );
            },
        ),
    );

    constructor(private effectsActions$: Actions, private accountService: AccountService) {}
}
