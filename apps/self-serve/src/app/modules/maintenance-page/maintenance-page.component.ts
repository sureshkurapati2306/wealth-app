import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromStore from '../../core/state/reducers';
import * as moment from 'moment';
import { getDayOfWeek, setEventAndDigitalData } from '@cimb/common';
//import { DialogAlertComponent } from '../../mint-dialog/dialog-alert/DialogConcurrentSessionAlertComponent';

@Component({
    selector: 'cimb-maintenance-page',
    templateUrl: './maintenance-page.component.html',
    styleUrls: ['./maintenance-page.component.scss'],
})
export class MaintenancePageComponent implements OnInit {
    totalFundsCountVal = 0;
    routes = new Array<string>();
    startTime = '00.00 PM';
    startDate = '06 April 2022';
    endTime = '00.00 PM';
    endDate = '07 April 2021';

    constructor(private router: Router, private store: Store<fromStore.AppState>) {}

    ngOnInit() {
        this.store.select('authReducer').subscribe((res) => {
            this.startDate = res?.downtime?.startDate;
            this.startTime = moment(res?.downtime?.startTime, 'HH:mm').format('hh:mm A');
            this.endDate = res?.downtime?.endDate;
            this.endTime = moment(res?.downtime?.endTime, 'HH:mm').format('hh:mm A');
        });
        this.loadAnalytics();
    }

    loadAnalytics() {
        const day = getDayOfWeek();

        setEventAndDigitalData(
            {
                wealthEvent: 'wealth:error-page',
            },

            {
                wealthDigitalData: {
                    page: {
                        category: {
                            primaryCategory: 'Error Module',

                            pageType: 'Error',
                        },

                        pageInfo: {
                            pageName: 'Wealth: Error Page',

                            day: day,
                        },
                    },

                    user: {
                        loginStatus: 'logged-in',

                        memberLoginType: 'repeat',
                    },

                    error: {
                        errorCode: 'Scheduled Maintenance',
                    },
                },
            },
        );
    }
}
