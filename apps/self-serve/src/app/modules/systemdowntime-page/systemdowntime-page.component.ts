import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getDayOfWeek, setEventAndDigitalData } from '@cimb/common';
import { Store } from '@ngrx/store';
import * as fromStore from '../../core/state/reducers';
@Component({
    selector: 'cimb-systemdowntime-page',
    templateUrl: './systemdowntime-page.component.html',
    styleUrls: ['./systemdowntime-page.component.scss'],
})
export class SystemdowntimePageComponent implements OnInit {
    constructor(private router: Router, private store: Store<fromStore.AppState>) {}

    ngOnInit(): void {
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
                        errorCode: 'System Downtime',
                    },
                },
            },
        );
    }
}
