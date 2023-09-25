import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromStore from '../../../../core/state/reducers';
import * as CartActions from '../../../../core/state/cart/cart.actions';

@Component({
    selector: 'cimb-investment-questions',
    templateUrl: './investment-questions.component.html',
    styleUrls: ['./investment-questions.component.scss'],
})
export class InvestmentQuestionsComponent implements OnInit {
    userType$: Observable<string>;
    constructor(private router: Router, private store: Store<fromStore.AppState>) {}

    backButtonEvent() {
        this.router.navigate(['/dashboard']);
    }

    ngOnInit(): void {
        this.store.dispatch(new CartActions.ToggleCartFooter(false));
        this.userType$ = this.store.select('userReducer', 'userType');
    }
}
