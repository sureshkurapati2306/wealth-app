import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getDayOfWeek, setEventAndDigitalData } from '@cimb/common';
import { Store } from '@ngrx/store';
import * as fromStore from '../../core/state/reducers';
@Component({
    selector: 'cimb-unabletoproceed-page',
    templateUrl: './unabletoproceed-page.component.html',
    styleUrls: ['./unabletoproceed-page.component.scss'],
})
export class UnabletoproceedPageComponent implements OnInit {
    constructor(private router: Router, private store: Store<fromStore.AppState>) {}

    ngOnInit(): void {
        const day = getDayOfWeek();
        const event = {
            wealthEvent: 'wealth:error-page',
        };
        const DigitalData = {
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
                    errorCode: 'Unable to Proceed',
                },
            },
        };

        setEventAndDigitalData(event, DigitalData);
    }
}
