import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { forkJoin, Observable } from 'rxjs';
import { HealthService } from './core/services/health/health.service';
import { loadClicks } from './core/state/clicks/clicks.actions';
import * as fromStore from './core/state/reducers';
import * as AuthAction from './core/state/auth/auth.actions';
import { EventService } from '@cimb/core';

@Injectable({
    providedIn: 'root',
})
export class InitialDataResolver implements Resolve<any> {
    constructor(
        private _healthService: HealthService,
        private store: Store<fromStore.AppState>,
        private _eventService: EventService,
    ) {}

    /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        const code = route.queryParamMap.get('code');
        // this.store.dispatch(new AuthAction.CallAuthenticateApi('cimbtcjwealth', 'password'));
        if (code) {
            this._eventService.onSendUserName({userName : code});
            // Loading TCJ API
            this.store.dispatch(loadClicks({ code }));

            // get Token, Downtime and Session
            this.store.dispatch(new AuthAction.CallAuthenticateApi(code, ''));

            // this.store.dispatch(new AuthAction.StoreClicksCode(code));
        }

        /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
        return forkJoin([this._healthService.get()]);
    }
}
