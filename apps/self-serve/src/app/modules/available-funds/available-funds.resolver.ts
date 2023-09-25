/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { AvailableFundsService } from './services/available-funds.service';
import * as fromStore from '../../core/state/reducers';
import { Store } from '@ngrx/store';

@Injectable({
    providedIn: 'root',
})
export class AvailableFundsResolver implements Resolve<any> {
    constructor(
        private _availableFundsService: AvailableFundsService,
        private store: Store<fromStore.AppState>,
    ) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        let customerId: string;
        let cifNumber: string;
        let utAccNo : string;
        this.store.select('userReducer', 'user').subscribe((res) => {
            utAccNo = res.utAccNo;
            customerId = res.customer_id;
            cifNumber = res.cifNumber;

        });

        //to send selectedAccountNumber


        const filters = {
            recommended: 'Y',
        };

        return forkJoin([
            this._availableFundsService.getFundsListByClientId(customerId, cifNumber, utAccNo, filters),
            this._availableFundsService.getFundNames()
        ]);
    }
}
