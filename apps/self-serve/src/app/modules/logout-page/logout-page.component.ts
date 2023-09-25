import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationStrategy } from '@angular/common';
import { Idle } from '@ng-idle/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import * as fromStore from '../../core/state/reducers';
import { Observable, Subscription } from 'rxjs';
import { ErrorHandlingService } from '../../core/services/error-handling/error-handling.service'
import { getDayOfWeek } from 'libs/mint/src/lib/utils/date/date.util';
import { setEventAndDigitalData } from 'libs/common/src/lib/utils';
import { environment } from '../../../environments/environment';

//import { DialogAlertComponent } from '../../mint-dialog/dialog-alert/DialogConcurrentSessionAlertComponent';

@Component({
    selector: 'cimb-logout-page',
    templateUrl: './logout-page.component.html',
    styleUrls: ['./logout-page.component.scss'],
})
export class LogoutPageComponent implements OnInit, OnDestroy {
    dateTime: Date;
    currentTime: any;
    seconds: any;
    minute: any;
    hours: any;
    LoginSession: any;
    routes = new Array<string>();
    isTimeout: any;
    userLoginTime: number;
    headerLogoUrl = environment.apiUrl + environment.wealth + '/image/category/1';

    userObservable$: Observable<any>;
    userSubscription: Subscription;

    constructor(
        private router: Router,
        private location: LocationStrategy,
        private idle: Idle,
        private snackbar: MatSnackBar,
        private route: ActivatedRoute,
        private store: Store<fromStore.AppState>,
        private errorHandling:ErrorHandlingService
    ) {
        this.snackbar.dismiss();
        this.idle.stop();
        history.pushState(null, null, window.location.href);
        this.location.onPopState(() => {
            history.pushState(null, null, window.location.href);
        });
    }

    ngOnInit(): void {
        this.loadAnalyticsLogout();
        this.isTimeout = this.route.snapshot.paramMap.get('isTimeout');
        this.errorHandling.popupCloseAfterLogout();
        this.userObservable$ = this.store.select('userReducer');
        this.userSubscription = this.userObservable$.subscribe((data) => {
            this.userLoginTime = data.loginTime;
        });

        this.dateTime = new Date();
        this.currentTime = Date.now();
        this.LoginSession = this.currentTime - this.userLoginTime;
        const seconds = Math.floor((this.LoginSession / 1000) % 60);
        const minutes = Math.floor((this.LoginSession / (1000 * 60)) % 60);
        const hours = Math.floor((this.LoginSession / (1000 * 60 * 60)) % 24);

        this.formatTime(seconds, minutes, hours);
    }

    loadAnalyticsLogout() {
        const day = getDayOfWeek();

        setEventAndDigitalData(
            {
                wealthEvent: 'wealth:successful logout',
            },

            {
                wealthDigitalData: {
                    page: {
                        category: {
                            primaryCategory: 'Logout Module',

                            pageType: 'Logout',
                        },

                        pageInfo: {
                            pageName: 'Wealth: Logout Page',

                            day: day,
                        },
                    },

                    user: {
                        loginStatus: 'logged-out',

                        memberLoginType: 'repeat',
                    },
                },
            },
        );
    }
    
    formatTime(ss: number, min: number, hr: number) {
        this.hours = hr < 10 ? '0' + hr : hr;
        this.minute = min < 10 ? '0' + min : min;
        this.seconds = ss < 10 ? '0' + ss : ss;
        this.LoginSession = this.hours + 'h' + ' ' + this.minute + 'm' + ' ' + this.seconds + 's';
    }

    ngOnDestroy(): void {
        if (this.userSubscription) {
            this.userSubscription.unsubscribe();
        }
    }
}
