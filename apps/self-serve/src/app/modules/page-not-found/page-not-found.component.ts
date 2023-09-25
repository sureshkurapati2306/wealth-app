import { Component, OnInit } from '@angular/core';
import { AppService } from '../../core/services/app.service';
import { Router } from '@angular/router';
import { getDayOfWeek, setEventAndDigitalData } from '@cimb/common';
//import { DialogAlertComponent } from '../../mint-dialog/dialog-alert/DialogConcurrentSessionAlertComponent';
import * as CartActions from '../../core/state/cart/cart.actions';
import { Store } from '@ngrx/store';
import * as fromStore from '../../core/state/reducers';

@Component({
    selector: 'cimb-page-not-found',
    templateUrl: './page-not-found.component.html',
    styleUrls: ['./page-not-found.component.scss'],
})
export class PageNotFoundComponent implements OnInit {
    totalFundsCountVal = 0;
    previousUrl: string = null;
    constructor(
        private readonly appService: AppService,
        private readonly router: Router,
        private readonly store: Store<fromStore.AppState>,
    ) {}

    ngOnInit(): void {
        this.previousUrl = this.appService.getPreviousUrl();
        this.store.dispatch(new CartActions.ToggleCartFooter(false));
        this.store.dispatch(new CartActions.ToggleCartIconHeader(false));

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
                        errorCode: 'Page Not Found',
                    },
                },
            },
        );
    }

    returnPreviousPage() {
        this.router.navigate([this.previousUrl]);
    }
}
