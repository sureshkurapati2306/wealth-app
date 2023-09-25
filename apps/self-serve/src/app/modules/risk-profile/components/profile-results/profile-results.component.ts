import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadRiskProfileDetails } from '../../+state/risk-profile.actions';
import * as fromStore from '../../../../core/state/reducers';
import * as CartActions from '../../../../core/state/cart/cart.actions';

@Component({
    selector: 'cimb-profile-results',
    templateUrl: './profile-results.component.html',
    styleUrls: ['./profile-results.component.scss'],
})
export class ProfileResultsComponent implements OnInit {
    customerType: string;
    noProgressStep: boolean;
    constructor(private store: Store<fromStore.AppState>) {}

    ngOnInit(): void {
        this.store.select('userReducer').subscribe((data) => {
            this.customerType = data.userType;
            this.checkUserType(data.userType);
        });
        this.store.dispatch(loadRiskProfileDetails());
        this.store.dispatch(new CartActions.ToggleCartFooter(false));
        this.store.dispatch(new CartActions.ToggleCartIconHeader(true));
    }

    checkUserType(userType: string) {
        if (userType === 'NTP') {
            this.noProgressStep = true;
        } else {
            this.noProgressStep = false;
        }
    }
}
