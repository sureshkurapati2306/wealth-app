import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromStore from '../../core/state/reducers';
import * as AccountOpeningActions from '../../core/state/account-opening/account.actions';
import * as CifInquiryActions from '../../core/state/cifInquiry/cifInquiry.actions';
import * as UserAction from '../../core/state/user/user.actions';

@Injectable({ providedIn: 'root' })
export class AccountOpeningResolver implements Resolve<any> {
    clicksInfoData: any;

    constructor(private store: Store<fromStore.AppState>) {}

    resolve(): Observable<any> {
        this.store.select('clicks').subscribe((clicksData) => {
            this.clicksInfoData = clicksData;
        });

        this.store.dispatch(
            new UserAction.UpdateUserDetails(
                this.clicksInfoData.customerIDTypeDesc
            ),
        );

        this.store.dispatch(
            new AccountOpeningActions.GetUserDetailFieldOptionsApi(this.clicksInfoData.cifNumber),
        );

        this.store.dispatch(
            new AccountOpeningActions.GetUserDetailsApi(this.clicksInfoData.cifNumber),
        );

        this.store.dispatch(
            new CifInquiryActions.GetCifInquiryParam(),
        );

        return this.clicksInfoData;
    }
}
