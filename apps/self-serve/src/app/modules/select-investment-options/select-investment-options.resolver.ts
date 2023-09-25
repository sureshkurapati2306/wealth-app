import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { getClicksCustomerInfo } from '../../core/state/clicks/clicks.selectors';
import * as CartActions from '../../core/state/cart/cart.actions';
import * as fromStore from '../../core/state/reducers';
import { takeUntil } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class InvesmentOptionsResolver implements Resolve<any> {
    _unsubscribeAll: Subject<any> = new Subject<any>();
    clicksInfo: any;

    constructor(private store: Store<fromStore.AppState>) {}

    resolve(): Observable<any> {
        this.store.select(getClicksCustomerInfo).pipe(takeUntil(this._unsubscribeAll)).subscribe((userDetailsInfo) => {
            this.clicksInfo = userDetailsInfo;
            this.store.dispatch(
                new CartActions.GetCartByClientId(this.clicksInfo.customerIDNumber),
            );
            this.unSubscribe();
        });

        this.store.dispatch(new CartActions.ToggleCartFooter(false));
        this.store.dispatch(new CartActions.ToggleCartIconHeader(true));

        return this.clicksInfo;
    }

    unSubscribe(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
