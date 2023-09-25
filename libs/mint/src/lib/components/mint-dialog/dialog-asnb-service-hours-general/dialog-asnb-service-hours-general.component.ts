import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OperationHourResponse } from 'apps/self-serve/src/app/modules/asnb/models';
import * as moment from 'moment';

@Component({
    selector: 'cimb-dialog-asnb-service-hours-general',
    templateUrl: './dialog-asnb-service-hours-general.component.html',
    styleUrls: ['./dialog-asnb-service-hours-general.component.scss'],
})
export class DialogAsnbServiceHoursGeneralComponent implements OnInit {
    operationHours: OperationHourResponse = {
        startTime: '',
        endTime: '',
    };

    constructor(@Inject(MAT_DIALOG_DATA) private data: OperationHourResponse) {}

    ngOnInit() {
        this.operationHours.startTime = this.convertTime(this.data.startTime);
        this.operationHours.endTime = this.convertTime(this.data.endTime);
    }

    convertTime(inputTime: string) {
        const timeFormat = 'HH:mm';
        const outputFormat = 'hh:mmA';
        let formattedTime = '';

        const inputMoment = moment(inputTime, timeFormat);
        if (inputMoment.isValid()) {
            formattedTime = inputMoment.format(outputFormat);
        } else {
            formattedTime = 'Invalid time format';
        }

        return formattedTime;
    }
}
