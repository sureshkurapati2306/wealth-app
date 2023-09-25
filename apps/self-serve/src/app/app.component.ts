import { Component, OnInit, ElementRef, HostListener, ChangeDetectorRef } from '@angular/core';
import { MAT_MENU_SCROLL_STRATEGY } from '@angular/material/menu';
import { Overlay, BlockScrollStrategy } from '@angular/cdk/overlay';
import { MAT_AUTOCOMPLETE_SCROLL_STRATEGY } from '@angular/material/autocomplete';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { DialogAlertComponent } from '@cimb/mint';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Event, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AppService } from '../app/core/services/app.service';
import { path } from '../app/shared/config/path';
import * as fromStore from '../app/core/state/reducers';
import * as UserAction from '../app/core/state/user/user.actions';
import { takeUntil } from 'rxjs/operators';

/* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
export function scrollFactory(overlay: Overlay): () => BlockScrollStrategy {
    return () => overlay.scrollStrategies.block();
}

@Component({
    selector: 'cimb-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [
        {
            provide: MAT_MENU_SCROLL_STRATEGY,
            useFactory: scrollFactory,
            deps: [Overlay],
        },
        {
            provide: MAT_AUTOCOMPLETE_SCROLL_STRATEGY,
            useFactory: scrollFactory,
            deps: [Overlay],
        },
    ],
})
export class AppComponent implements OnInit {
    private destroy$: Subject<void> = new Subject<void>();
    previousPage: string = null;
    currentpage: string = null;
    storeTransaction: any[];
    idleState = 'NOT_STARTED';
    timedOut = false;
    idleTime = 270;
    timeoutCount = 30;
    loginTime: number;
    loadingSpinner$: Observable<boolean>;
    private inactivityTimeout: any;
    private durationThreshold: number = 5 * 60 * 1000; // 5 minutes in milliseconds
    timeoutId: any;

    constructor(
        private idle: Idle,
        public cd: ChangeDetectorRef,
        private store: Store<fromStore.AppState>,
        private dialog: MatDialog,
        private router: Router,
        private appService: AppService,
        private _elementRef: ElementRef
    ) {
        // set idle parameters
        idle.setIdle(this.idleTime); // how long can they be inactive before considered idle, in seconds
        idle.setTimeout(this.timeoutCount); // how long can they be idle before considered timed out, in seconds
        idle.setInterrupts(DEFAULT_INTERRUPTSOURCES); // provide sources that will "interrupt" aka provide events indicating the user is active

        // do something when the user becomes idle
        idle.onIdleStart.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.idleState = "IDLE";
            this.openDialogWarning();
        });
        // do something when the user is no longer idle
        idle.onIdleEnd.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.idleState = "NOT_IDLE";
            cd.detectChanges();
        });
        // do something when the user has timed out
        idle.onTimeout.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.idleState = 'TIMED_OUT';
            this.timedOut = true;

            this.dialog.closeAll();
            this.logoutEvent();
        });
        // do something as the timeout countdown does its thing
        idle.onTimeoutWarning.pipe(takeUntil(this.destroy$)).subscribe(seconds => {
            this.appService.setTimeoutTimer(seconds);
        });

        this.initializeVisibilityChange();
        this.initializeFocusChange();
    }

    @HostListener('window:beforeunload', ['$event'])
    private pageUnloadHandler() {
        this.appService.logoutUser();
        this.appService.redirectProcess();
    }

    ngOnInit() {
        this.loadingSpinner$ = this.appService.getLoadingSpinnerState();
        this._elementRef.nativeElement.removeAttribute("ng-version");
        this.loginTime = Date.now();
        this.store.dispatch(new UserAction.StoreUserLoginTime(this.loginTime));
        this.loadData();

        this.router.events.subscribe((routerEvent: Event) => {
            if (routerEvent instanceof NavigationStart) {
                if (routerEvent.navigationTrigger === 'popstate') {
                    this.appService.logoutUser();
                    this.appService.redirectProcess();
                }
            }

            if (routerEvent instanceof NavigationEnd) {
                window.scrollTo(0, 0);
                this.previousPage = this.currentpage;
                this.currentpage = routerEvent.url;
                if (this.currentpage.includes(path.LOGOUT) || this.currentpage.includes(path.TRANSACTION_LOGOUT)) {
                    this.clearForceLogoutTimeout();
                }
                this.appService.setPreviousUrl(this.previousPage);
                this.appService.setURLs(routerEvent);
            }
        });

        this.forceLogoutTimeout();

        // right when the component initializes, start reset state and start watching
        this.reset();
    }

    /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
    loadData() {
        this.store.select('cartReducer').pipe(takeUntil(this.destroy$)).subscribe((data) => {
            this.storeTransaction = data.storeTransaction;
        });
    }

    reset() {
        // we'll call this method when we want to start/reset the idle process
        // reset any component state and be sure to call idle.watch()
        this.idle.watch();
        this.idleState = "NOT_IDLE";
        this.timedOut = false;
    }

    forceLogoutTimeout() {
        this.timeoutId = setTimeout(() => {
            const dialogRef = this.dialog.open(DialogAlertComponent, {
                panelClass: ['custom-dialog', 'dialog-inverse-button'],
                maxWidth: '600px',
                autoFocus: false,
                disableClose: true,
                backdropClass: 'backdrop-modal',
                data: {
                    dialogHeading: 'You are now logged out.',
                    dialogContent:
                        '<p>Your Session has expired. Please login again to continue.</p>',
                    dialogButtonCancel: false,
                    dialogButtonProceed: true,
                    dialogButtonProceedText: 'Okay',
                    dialogImage: '<em class="icon-danger"></em>',
                },
            });

            dialogRef.afterClosed().subscribe(() => {
                this.logoutEvent();
            });
        }, 30 * 60 * 1000);
    }

    clearForceLogoutTimeout() {
        clearTimeout(this.timeoutId);
    }

    /* istanbul ignore next */ //Used to ignore the next line in spec. Dont remove this line.
    openDialogWarning() {
        this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
        const dialogRefTimeout = this.dialog.open(DialogAlertComponent, {
            panelClass: ['custom-dialog', 'dialog-inverse-button'],
            maxWidth: '600px',
            autoFocus: false,
            backdropClass: 'backdrop-modal',
            data: {
                dialogHeading: 'Session Inactivity',
                hasTimeout: true,
                dialogButtonCancel: true,
                dialogButtonCancelText: 'Logout',
                dialogButtonProceed: true,
                dialogButtonProceedText: 'Continue Session',
                dialogImage: '<em class="icon-danger"></em>',
            },
        });

        dialogRefTimeout.afterClosed().subscribe((result) => {
            if (result === 'Logout') {
                this.logoutEvent();
            } else if (result === 'Continue Session') {
                this.reset();
            } else {
                this.reset();
            }
        });
    }

    private initializeVisibilityChange() {
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                // User switched to another tab or minimized the browser
                this.startInactivityTimeout();
            } else {
                // User switched back to the tab
                this.clearInactivityTimeout();
            }
        });
    }

    private initializeFocusChange() {
        window.addEventListener('focus', () => {
            // User switched back to the tab
            this.clearInactivityTimeout();
        });
    }

    private startInactivityTimeout() {
        this.inactivityTimeout = window.setTimeout(() => {
            // Redirect the user to the login page
            this.logoutEvent()
        }, this.durationThreshold);
    }

    private clearInactivityTimeout() {
        clearTimeout(this.inactivityTimeout);
    }

    logoutEvent() {
        if (!this.currentpage?.includes(path.LOGOUT) && !this.currentpage?.includes(path.TRANSACTION_LOGOUT)) {
            this.appService.logoutUser();

            if (this.storeTransaction?.length !== 0) {
                if (this.timedOut) {
                    this.router.navigate([path.TRANSACTION_LOGOUT, { isTimeout: true }]);
                } else {
                    this.router.navigate([path.TRANSACTION_LOGOUT]);
                }
            } else {
                if (this.timedOut) {
                    this.router.navigate([path.LOGOUT, { isTimeout: true }]);
                } else {
                    this.router.navigate([path.LOGOUT]);
                }
            }

            this.stopAllService();
        }
    }

    stopAllService() {
        // since app.component.ts is a main component it likely won't trigger ngOnDestroy
        // this method is to substitute ngOnDestroy
        this.idle.stop();
        this.destroy$.next();
        this.destroy$.complete();
    }
}
