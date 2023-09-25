import { Component, OnInit } from '@angular/core';
import { ScheduledMaintenance } from '../../models';
import { Store } from '@ngrx/store';
import { getASNBDowntimeScheduledMaintenance } from '../../+state/asnb.selectors';
import { tap } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
    selector: 'cimb-asnb-downtime-maintenance',
    templateUrl: './asnb-downtime-maintenance.component.html',
    styleUrls: ['./asnb-downtime-maintenance.component.scss'],
})
export class AsnbDowntimeMaintenanceComponent implements OnInit {
    scheduledMaintenance: ScheduledMaintenance;

    maintenanceStartTime;
    maintenanceEndTime;

    constructor(private store: Store) {}

    ngOnInit(): void {
        this.getASNBDowntimeScheduledMaintenance();
    }

    getASNBDowntimeScheduledMaintenance() {
        this.store
            .select(getASNBDowntimeScheduledMaintenance)
            .pipe(
                tap((data: ScheduledMaintenance) => {
                    if (data) {
                        this.scheduledMaintenance = data;
                        this.maintenanceStartTime = moment(data.startTime, 'HH:mm:ss').format(
                            'hh:mm A',
                        );
                        this.maintenanceEndTime = moment(data.endTime, 'HH:mm:ss').format(
                            'hh:mm A',
                        );
                    }
                }),
            )
            .subscribe();
    }
}
