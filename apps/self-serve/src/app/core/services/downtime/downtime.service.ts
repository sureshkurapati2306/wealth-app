import { Injectable } from '@angular/core';
import { HttpService } from '@cimb/core';
import { environment } from '@env/self-serve/environment';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { getASNBDowntimeScheduledMaintenance } from '../../state/wealth-dashboard/wealth-dashboard.selectors';
import { ASNBScheduledDowntimeInfo, ScheduledMaintenance } from '../../../modules/asnb/models';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root',
})
export class DowntimeService {
    private data: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    data$: Observable<any> = this.data.asObservable();

    constructor(private http: HttpService, private store: Store) {}

    getDowntime(userName: string): Observable<any> {
        const endpoint = environment.apiUrl;
          return this.http
              .get(endpoint, environment.wealth + `/current-date-schedule-downtime?code=`+ userName)
              .pipe(map((response) => response));
    }

    getASNBScheduledDowntime(): Observable<ASNBScheduledDowntimeInfo | null> {
        return this.store.select(getASNBDowntimeScheduledMaintenance).pipe(
            map((data: ScheduledMaintenance) => {
                if (data?.dataPresent === 'Yes') {
                    const format = 'HH:mm:ss';
                    const now = moment().utcOffset('+0800').format(format);
                    const time = moment(now, format);

                    const scheduledMaintenance = data;
                    const maintenanceStartTime = moment(data.startTime, 'HH:mm:ss').format(
                        'h:mm:ss A',
                    );
                    const maintenanceEndTime = moment(data.endTime, 'HH:mm:ss').format('h:mm:ss A');

                    const startTime = moment(data?.startTime, format);
                    const endTime = moment(data?.endTime, format);

                    let hasScheduledMaintenance = true;

                    if (time.isBetween(startTime, endTime)) {
                        hasScheduledMaintenance = true;
                    } else {
                        hasScheduledMaintenance = false;
                    }

                    return {
                        scheduledMaintenance: scheduledMaintenance,
                        maintenanceStartTime: maintenanceStartTime,
                        maintenanceEndTime: maintenanceEndTime,
                        hasScheduledMaintenance: hasScheduledMaintenance,
                    };
                }

                return null;
            }),
        );
    }
}
