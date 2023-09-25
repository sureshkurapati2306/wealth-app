import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../state/reducers/';
import * as moment from 'moment';
import * as AuthActions from '../state/auth/auth.actions';
import { DowntimeService } from '../services/downtime/downtime.service';
import { map } from 'rxjs/operators';
import { EventService } from '@cimb/core';
@Injectable({
    providedIn: 'root',
})
export class DowntimeGuard implements CanActivate {
    constructor(
        private store: Store<fromApp.AppState>,
        private router: Router,
        private downtimeService: DowntimeService,
        private _eventService: EventService
    ) { 
    }


    canActivate() {
        return this.checkDowntime();
    }

    checkDowntime() {
        /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
        const currentUrl = this.getCurrentUrl();
        return this.downtimeService.getDowntime(currentUrl).pipe(
            map((downtime) => {
                if (downtime?.dataPresent === 'Yes') {
                    const format = 'HH:mm:ss';
                    const now = moment().utcOffset('+0800').format(format);
                    const time = moment(now, format);
                    const startTime = moment(downtime?.startTime, format);
                    const endTime = moment(downtime?.endTime, format);

                    if (time.isBetween(startTime, endTime)) {
                        this.store.dispatch(new AuthActions.UpdateDowntime(downtime));
                        this.router.navigate(['/maintenance']);
                        return false;
                    } else {
                        return true;
                    }
                } else {
                    return true;
                }
            }),
        );
    }

    getCurrentUrl(): string {
        let userNameData : string;
        const queryString = window?.location?.search;
        const searchParams = new URLSearchParams(queryString);
        this._eventService.onReceivedUserName().subscribe(data => userNameData = data?.userName);
        if (searchParams?.get('code')) {
            return searchParams.get('code');
        } else {
            return userNameData;
        }
    }
}
