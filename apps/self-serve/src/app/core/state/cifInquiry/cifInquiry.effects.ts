import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, switchMap, map, shareReplay } from 'rxjs/operators';
import { AccountService } from '../../services/account-opening/account.service';
import * as CifInquiryActions from './cifInquiry.actions';

@Injectable()
export class CifInquiryEffects {
    @Effect()
    GetCifInquiryData = this.effectsActions$.pipe(
        ofType(CifInquiryActions.GET_CIF_INQUIRY_FROM_API),
        switchMap(() => {
            return this.accountService.getCifInquiry().pipe(
                map((cifInquiryResponse) => {
                    return new CifInquiryActions.GetCifInquiryResponse(cifInquiryResponse);
                }),
                shareReplay(),
                catchError((error) => {
                    /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line
                    return of(new CifInquiryActions.GetCifInquiryResponse(error));
                }),
            );
        }),
    );

    constructor(private effectsActions$: Actions, private accountService: AccountService) {}
}
