import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../core/state/reducers';
import { BehaviorSubject, Observable } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { path } from '../../shared/config';
import * as LogoutAction from '../state/logout/logout.action';

@Injectable({
    providedIn: 'root',
})
export class AppService {
    private previousUrl: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    private currentUrl: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    _routeHistory: string[] = [];
    authToken: string;
    private loadingSpinner: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private loadingSpinner$: Observable<boolean> = this.loadingSpinner.asObservable();
    timer$ = new BehaviorSubject<number>(0);
    learn_more: boolean;

    constructor(private store: Store<fromStore.AppState>, private router: Router) {}

    setTimeoutTimer(time) {
        this.timer$.next(time);
    }

    getObservable() {
        return this.timer$.asObservable();
    }

    getLoadingSpinnerState(): Observable<boolean> {
        return this.loadingSpinner$;
    }

    showLoadingSpinner() {
        this.loadingSpinner.next(true);
    }

    hideLoadingSpinner() {
        this.loadingSpinner.next(false);
    }

    isUserLoggedIn() {
        this.store.select('authReducer').subscribe((auth) => {
            this.authToken = auth.token;
        });
        if (this.authToken) {
            return true;
        } else {
            return false;
        }
    }

    redirectProcess() {
        this.router.ngOnDestroy();
        window.location.href = path.CIMBCLICKS;
        return false;
    }

    public setPreviousUrl(previousUrl: string) {
        this.previousUrl.next(previousUrl);
    }

    public getPreviousUrl(): any {
        return this.previousUrl.value;
    }

    public setURLs(event: NavigationEnd): void {
        if (event.url.includes('purchase-summary')) {
            return; // Dont add to history since, it should be shown only after tnx is success
        }
        const tempUrl = this.currentUrl;
        this.previousUrl = tempUrl;
        this._routeHistory = event.urlAfterRedirects.includes('landing-page')
            ? []
            : this._routeHistory;

        const routeIndex = this._routeHistory.indexOf(event.urlAfterRedirects);
        if (routeIndex === -1) {
            if (event.urlAfterRedirects.indexOf('?code') > -1) {
                event.urlAfterRedirects = event.urlAfterRedirects.slice(
                    0,
                    event.urlAfterRedirects.indexOf('?code'),
                );
            }
            this._routeHistory.push(event.urlAfterRedirects);
        } else {
            this._routeHistory = this._routeHistory.slice(0, routeIndex + 1);
        }
    }

    public getURLs() {
        return this._routeHistory;
    }

    logoutUser() {
        this.store.dispatch(new LogoutAction.LogoutTransaction());
    }
}
