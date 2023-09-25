import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AppService } from '../services/app.service';
import { Store } from '@ngrx/store';
import * as fromStore from '../../core/state/reducers';
import { environment } from '@env/self-serve/environment';
import { getClicksCustomerInfo } from '../state/clicks/clicks.selectors';

@Injectable({
    providedIn: 'root',
})
export class NTPGuard implements CanActivate { 
    constructor(
        public appService: AppService,
        private router: Router,
        private store: Store<fromStore.AppState>,
    ) {}

    canActivate() { 
        if (environment.r2Enabled) {
            this.store.select(getClicksCustomerInfo).subscribe((info) => {
                if(info.customerType === 'NTP'){
                     this.router.navigate(['/landing-page'])
                    return false
                } else{
                    return true
                }
            });
        } else {
            return true;
        }
    }
}
