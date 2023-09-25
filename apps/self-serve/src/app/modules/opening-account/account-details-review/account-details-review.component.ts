import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountPersonalDetails } from '@cimb/shared/models';
import { Store } from '@ngrx/store';
import * as fromStore from 'apps/self-serve/src/app/core/state/reducers';
import * as CartActions from '../../../core/state/cart/cart.actions';
import { Router } from '@angular/router';

@Component({
    selector: 'cimb-account-details-review',
    templateUrl: './account-details-review.component.html',
    styleUrls: ['./account-details-review.component.scss'],
})
export class AccountDetailsReviewComponent implements OnInit {
    @Input() accountOpeningValues: any;
    @Input() otherDetailsList: any;
    @Output() previousPage = new EventEmitter<string>();
    @Output() btnSubmit = new EventEmitter<string>();
    loadingSpinner$ =false;

    accountPersonalDetails: AccountPersonalDetails[] = [];

    constructor(private store: Store<fromStore.AppState>, public router: Router) {}

    editButton($event) {
        if ($event) {
            this.previousPage.emit($event);
        }
    }

    ngOnInit(): void {
        this.accountPersonalDetails = [this.accountOpeningValues];
        this.store.dispatch(new CartActions.ToggleCartIconHeader(true));
    }

    confirmAccountDetails() {
        this.btnSubmit.emit('btnSubmit');
        this.loadingSpinner$ = true;
    }
}
